/* معمل Dart التفاعلي — interpreter core (no DOM, testable in node)
   Supports a teaching subset of Dart:
   - var/final/const and typed declarations (int, double, num, String, bool)
   - int / double / String / bool / null values and List literals
   - string interpolation: '$name' and '${expr}'
   - arithmetic: + - * / ~/ %  and compound += -= *=
   - comparison and logic: == != < > <= >= && || !
   - print(...), if/else, while, classic for, for-in, break, continue
   - function declarations with return, postfix i++ / i--
   - .length on strings and lists, list indexing, list.add(x)
*/
(function (global) {
'use strict';

var KEYWORDS = ['var','final','const','int','double','num','String','bool','void','if','else','while','for','in','return','break','continue','true','false','null','print','dynamic'];

/* ---------- value model: tagged numbers so int/double print like Dart ---------- */
function I(v) { return { t: 'int', v: Math.trunc(v) }; }
function D(v) { return { t: 'double', v: v }; }
function S(v) { return { t: 'String', v: String(v) }; }
function B(v) { return { t: 'bool', v: !!v }; }
function L(v) { return { t: 'List', v: v }; }
var NULL = { t: 'null', v: null };

function isNum(x) { return x.t === 'int' || x.t === 'double' || x.t === 'num'; }
function numOf(x) { return x.v; }
function promote(a, b) { return (a.t === 'double' || b.t === 'double') ? 'double' : 'int'; }

function dartStr(x) {
  switch (x.t) {
    case 'int': return String(x.v);
    case 'double':
      if (Number.isInteger(x.v)) return x.v.toFixed(1);
      return String(x.v);
    case 'String': return x.v;
    case 'bool': return x.v ? 'true' : 'false';
    case 'null': return 'null';
    case 'List': return '[' + x.v.map(dartStr).join(', ') + ']';
    case 'function': return '<function ' + x.name + '>';
  }
  return String(x.v);
}

function sameVal(a, b) {
  if (isNum(a) && isNum(b)) return a.v === b.v;
  if (a.t !== b.t) return false;
  if (a.t === 'List') {
    if (a.v.length !== b.v.length) return false;
    for (var i = 0; i < a.v.length; i++) if (!sameVal(a.v[i], b.v[i])) return false;
    return true;
  }
  return a.v === b.v;
}

/* ---------- errors ---------- */
function DartError(msg, line) {
  var e = new Error(msg);
  e.dartMsg = msg;
  e.line = line;
  return e;
}

/* ---------- lexer ---------- */
function lex(src) {
  var toks = [];
  var i = 0, line = 1;
  var n = src.length;
  function isIdStart(c) { return /[A-Za-z_]/.test(c); }
  function isId(c) { return /[A-Za-z0-9_]/.test(c); }

  while (i < n) {
    var c = src[i];
    if (c === '\n') { line++; i++; continue; }
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++; }
      i += 2; continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      var j = i, hasDot = false;
      while (j < n && (/[0-9]/.test(src[j]) || (src[j] === '.' && !hasDot && /[0-9]/.test(src[j + 1] || '')))) {
        if (src[j] === '.') hasDot = true;
        j++;
      }
      var raw = src.slice(i, j);
      toks.push({ t: 'num', v: raw, dbl: hasDot, line: line });
      i = j; continue;
    }
    if (c === '"' || c === "'") {
      var q = c; i++;
      var parts = [], cur = '';
      while (i < n && src[i] !== q) {
        var ch = src[i];
        if (ch === '\n') { throw DartError('السطر اتقطع جوه string — قفل الـ quotes', line); }
        if (ch === '\\') {
          var nx = src[i + 1];
          var map = { 'n': '\n', 't': '\t', '\\': '\\', "'": "'", '"': '"', '$': '$' };
          cur += (nx in map) ? map[nx] : nx;
          i += 2; continue;
        }
        if (ch === '$') {
          if (src[i + 1] === '{') {
            if (cur !== '') { parts.push({ lit: cur }); cur = ''; }
            var depth = 1, k = i + 2, exprSrc = '';
            while (k < n && depth > 0) {
              if (src[k] === '{') depth++;
              else if (src[k] === '}') { depth--; if (depth === 0) break; }
              exprSrc += src[k]; k++;
            }
            if (depth !== 0) throw DartError('قفلتش الـ } بتاعة الـ interpolation', line);
            parts.push({ expr: exprSrc });
            i = k + 1; continue;
          } else if (isIdStart(src[i + 1] || '')) {
            if (cur !== '') { parts.push({ lit: cur }); cur = ''; }
            var m = i + 1;
            while (m < n && isId(src[m])) m++;
            parts.push({ expr: src.slice(i + 1, m) });
            i = m; continue;
          }
        }
        cur += ch; i++;
      }
      if (i >= n) throw DartError('string مش مقفول — نسيت الـ quote التانية', line);
      i++;
      if (cur !== '' || parts.length === 0) parts.push({ lit: cur });
      toks.push({ t: 'str', parts: parts, line: line });
      continue;
    }
    if (isIdStart(c)) {
      var p = i;
      while (p < n && isId(src[p])) p++;
      var w = src.slice(i, p);
      toks.push({ t: KEYWORDS.indexOf(w) >= 0 ? 'kw' : 'id', v: w, line: line });
      i = p; continue;
    }
    var three = src.slice(i, i + 3);
    var two = src.slice(i, i + 2);
    if (three === '~/=' ) { toks.push({ t: 'op', v: '~/=', line: line }); i += 3; continue; }
    if (['==','!=','<=','>=','&&','||','+=','-=','*=','++','--','~/'].indexOf(two) >= 0) {
      toks.push({ t: 'op', v: two, line: line }); i += 2; continue;
    }
    if ('+-*/%<>=!;:,(){}[].'.indexOf(c) >= 0) {
      toks.push({ t: 'op', v: c, line: line }); i++; continue;
    }
    throw DartError('رمز مش مفهوم: ' + c, line);
  }
  toks.push({ t: 'eof', v: '', line: line });
  return toks;
}

/* ---------- parser ---------- */
function Parser(toks) {
  this.toks = toks; this.pos = 0;
}
Parser.prototype.peek = function () { return this.toks[this.pos]; };
Parser.prototype.next = function () { return this.toks[this.pos++]; };
Parser.prototype.expect = function (v, msg) {
  var t = this.next();
  if (!t || t.v !== v) throw DartError(msg || ('كنت مستني `' + v + '` لقيت `' + (t ? t.v : 'نهاية الكود') + '`'), t ? t.line : 0);
  return t;
};
Parser.prototype.at = function (v) { return this.peek().v === v; };
Parser.prototype.eat = function (v) { if (this.at(v)) { this.next(); return true; } return false; };

Parser.prototype.parseProgram = function () {
  var body = [];
  while (this.peek().t !== 'eof') body.push(this.parseStatement());
  return { k: 'Program', body: body };
};

var TYPE_KWS = ['var','final','const','int','double','num','String','bool','dynamic'];

Parser.prototype.isDeclStart = function () {
  var t = this.peek();
  if (t.t !== 'kw') return false;
  if (TYPE_KWS.indexOf(t.v) >= 0) return true;
  if (t.v === 'void') return true;
  // typed function like `int add(...)` or decl `int x = 1;`
  return false;
};

Parser.prototype.parseStatement = function () {
  var t = this.peek();

  // function declaration or variable declaration with type keyword
  if (t.t === 'kw' && TYPE_KWS.indexOf(t.v) >= 0) {
    // lookahead: kw id ( -> function; kw id =|; -> var decl
    if (this.toks[this.pos + 1] && this.toks[this.pos + 1].t === 'id' &&
        this.toks[this.pos + 2] && this.toks[this.pos + 2].v === '(') {
      return this.parseFuncDecl();
    }
    return this.parseVarDecl();
  }
  if (t.t === 'kw' && t.v === 'void') return this.parseFuncDecl();

  if (t.t === 'kw') {
    switch (t.v) {
      case 'print': {
        this.next();
        this.expect('(', 'بعد print لازم قوس مفتوح');
        var e = this.parseExpr();
        this.expect(')', 'قفل قوس الـ print');
        this.expect(';', 'السطر ناقصه ; في الآخر');
        return { k: 'Print', expr: e, line: t.line };
      }
      case 'if': return this.parseIf();
      case 'while': return this.parseWhile();
      case 'for': return this.parseFor();
      case 'return': {
        this.next();
        var re = null;
        if (!this.at(';')) re = this.parseExpr();
        this.expect(';', 'بعد return لازم ;');
        return { k: 'Return', expr: re, line: t.line };
      }
      case 'break': this.next(); this.expect(';', 'بعد break لازم ;'); return { k: 'Break', line: t.line };
      case 'continue': this.next(); this.expect(';', 'بعد continue لازم ;'); return { k: 'Continue', line: t.line };
    }
  }

  // untyped function declaration: name(...) { ... }
  if (t.t === 'id' && this.toks[this.pos + 1] && this.toks[this.pos + 1].v === '(') {
    // distinguish `foo(args);` call from `foo(args) {` decl: scan past parens
    var depth = 0, p = this.pos + 1;
    do {
      var tk = this.toks[p];
      if (tk.v === '(') depth++;
      else if (tk.v === ')') depth--;
      p++;
    } while (depth > 0 && p < this.toks.length);
    if (this.toks[p] && this.toks[p].v === '{') return this.parseFuncDecl();
  }

  return this.parseSimpleStatement(true);
};

Parser.prototype.parseVarDecl = function () {
  var kw = this.next(); // var/final/const/type
  var name = this.next();
  if (name.t !== 'id') throw DartError('بعد ' + kw.v + ' لازم اسم متغير', name.line);
  var init = null;
  if (this.eat('=')) init = this.parseExpr();
  else if (kw.v === 'final' || kw.v === 'const') throw DartError(kw.v + ' لازم تديها قيمة في نفس السطر', kw.line);
  this.expect(';', 'سطر تعريف المتغير ناقصه ; في الآخر');
  return { k: 'VarDecl', decl: kw.v, name: name.v, init: init, line: kw.line };
};

Parser.prototype.parseFuncDecl = function () {
  var retType = null;
  if (this.peek().t === 'kw' && (TYPE_KWS.indexOf(this.peek().v) >= 0 || this.peek().v === 'void')) {
    retType = this.next().v;
  }
  var name = this.next();
  if (name.t !== 'id') throw DartError('اسم الدالة مش صح', name.line);
  this.expect('(', 'ناقص ( بعد اسم الدالة');
  var params = [];
  while (!this.at(')')) {
    var ptype = null;
    if (this.peek().t === 'kw' && TYPE_KWS.indexOf(this.peek().v) >= 0) ptype = this.next().v;
    var pname = this.next();
    if (pname.t !== 'id') throw DartError('اسم parameter مش صح', pname.line);
    params.push({ type: ptype, name: pname.v });
    if (!this.eat(',')) break;
  }
  this.expect(')', 'قفل أقواس الدالة');
  this.expect('{', 'جسم الدالة لازم يتكتب جوه { }');
  var body = this.parseBlock();
  return { k: 'FuncDecl', ret: retType, name: name.v, params: params, body: body, line: name.line };
};

Parser.prototype.parseBlock = function () {
  var body = [];
  while (!this.at('}')) {
    if (this.peek().t === 'eof') throw DartError('قفلتش الـ } بتاعة البلوك', this.peek().line);
    body.push(this.parseStatement());
  }
  this.next(); // }
  return body;
};

Parser.prototype.parseIf = function () {
  var t = this.next(); // if
  this.expect('(', 'بعد if لازم (');
  var cond = this.parseExpr();
  this.expect(')', 'قفل قوس الـ if');
  this.expect('{', 'جسم الـ if لازم يتكتب جوه { }');
  var thenB = this.parseBlock();
  var elseB = null;
  if (this.peek().t === 'kw' && this.peek().v === 'else') {
    this.next();
    if (this.peek().t === 'kw' && this.peek().v === 'if') {
      elseB = [this.parseIf()];
    } else {
      this.expect('{', 'جسم الـ else لازم يتكتب جوه { }');
      elseB = this.parseBlock();
    }
  }
  return { k: 'If', cond: cond, thenB: thenB, elseB: elseB, line: t.line };
};

Parser.prototype.parseWhile = function () {
  var t = this.next();
  this.expect('(', 'بعد while لازم (');
  var cond = this.parseExpr();
  this.expect(')', 'قفل قوس الـ while');
  this.expect('{', 'جسم الـ while لازم يتكتب جوه { }');
  var body = this.parseBlock();
  return { k: 'While', cond: cond, body: body, line: t.line };
};

Parser.prototype.parseFor = function () {
  var t = this.next();
  this.expect('(', 'بعد for لازم (');
  // for-in:  (var x in list) or (int x in list)
  var save = this.pos;
  if (this.peek().t === 'kw' && TYPE_KWS.indexOf(this.peek().v) >= 0) {
    this.next();
    if (this.peek().t === 'id' && this.toks[this.pos + 1] && this.toks[this.pos + 1].v === 'in') {
      var nm = this.next().v;
      this.next(); // in
      var iter = this.parseExpr();
      this.expect(')', 'قفل قوس الـ for');
      this.expect('{', 'جسم الـ for لازم يتكتب جوه { }');
      var b = this.parseBlock();
      return { k: 'ForIn', name: nm, iter: iter, body: b, line: t.line };
    }
    this.pos = save;
  }
  var init = null;
  if (!this.at(';')) init = this.parseSimpleStatement(true);
  else this.next();
  var cond = null;
  if (!this.at(';')) cond = this.parseExpr();
  this.expect(';', 'ناقص ; تانية جوه الـ for');
  var update = null;
  if (!this.at(')')) update = this.parseSimpleStatement(false);
  this.expect(')', 'قفل قوس الـ for');
  this.expect('{', 'جسم الـ for لازم يتكتب جوه { }');
  var body = this.parseBlock();
  return { k: 'ForC', init: init, cond: cond, update: update, body: body, line: t.line };
};

/* simple statement: var decl, assignment, inc/dec, expression statement */
Parser.prototype.parseSimpleStatement = function (needSemi) {
  var t = this.peek();
  var st;
  if (t.t === 'kw' && TYPE_KWS.indexOf(t.v) >= 0) {
    st = this.parseVarDeclNoSemi();
  } else if ((t.t === 'id') && this.toks[this.pos + 1] &&
             ['=', '+=', '-=', '*=', '~/='].indexOf(this.toks[this.pos + 1].v) >= 0) {
    var name = this.next().v;
    var op = this.next().v;
    var e = this.parseExpr();
    st = { k: 'Assign', name: name, op: op, expr: e, line: t.line };
  } else if ((t.t === 'id') && this.toks[this.pos + 1] && this.toks[this.pos + 1].v === '[') {
    var nm2 = this.next().v;
    this.next(); // [
    var idx = this.parseExpr();
    this.expect(']', 'قفل أقواس الـ index');
    var op2 = this.next();
    if (op2.v !== '=') throw DartError('بعد الـ index لازم = لتعديل العنصر', op2.line);
    var e3 = this.parseExpr();
    st = { k: 'IndexAssign', name: nm2, idx: idx, expr: e3, line: t.line };
  } else {
    var e2 = this.parseExpr();
    st = { k: 'ExprStmt', expr: e2, line: t.line };
  }
  if (needSemi) this.expect(';', 'السطر ناقصه ; في الآخر');
  return st;
};

Parser.prototype.parseVarDeclNoSemi = function () {
  var kw = this.next();
  var name = this.next();
  if (name.t !== 'id') throw DartError('بعد ' + kw.v + ' لازم اسم متغير', name.line);
  var init = null;
  if (this.eat('=')) init = this.parseExpr();
  return { k: 'VarDecl', decl: kw.v, name: name.v, init: init, line: kw.line };
};

/* ---------- expressions ---------- */
Parser.prototype.parseExpr = function () { return this.parseOr(); };

Parser.prototype.parseOr = function () {
  var l = this.parseAnd();
  while (this.at('||')) { var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseAnd(), line: op.line }; }
  return l;
};
Parser.prototype.parseAnd = function () {
  var l = this.parseEq();
  while (this.at('&&')) { var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseEq(), line: op.line }; }
  return l;
};
Parser.prototype.parseEq = function () {
  var l = this.parseRel();
  while (this.at('==') || this.at('!=')) { var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseRel(), line: op.line }; }
  return l;
};
Parser.prototype.parseRel = function () {
  var l = this.parseAdd();
  while (this.at('<') || this.at('>') || this.at('<=') || this.at('>=')) {
    var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseAdd(), line: op.line };
  }
  return l;
};
Parser.prototype.parseAdd = function () {
  var l = this.parseMul();
  while (this.at('+') || this.at('-')) { var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseMul(), line: op.line }; }
  return l;
};
Parser.prototype.parseMul = function () {
  var l = this.parseUnary();
  while (this.at('*') || this.at('/') || this.at('~/') || this.at('%')) {
    var op = this.next(); l = { k: 'Binary', op: op.v, l: l, r: this.parseUnary(), line: op.line };
  }
  return l;
};
Parser.prototype.parseUnary = function () {
  if (this.at('!') || this.at('-')) {
    var op = this.next();
    return { k: 'Unary', op: op.v, e: this.parseUnary(), line: op.line };
  }
  return this.parsePostfix();
};
Parser.prototype.parsePostfix = function () {
  var e = this.parsePrimary();
  for (;;) {
    if (this.at('(')) {
      this.next();
      var args = [];
      while (!this.at(')')) { args.push(this.parseExpr()); if (!this.eat(',')) break; }
      this.expect(')', 'قفل أقواس الاستدعاء');
      e = { k: 'Call', callee: e, args: args, line: e.line };
    } else if (this.at('[')) {
      this.next();
      var idx = this.parseExpr();
      this.expect(']', 'قفل أقواس الـ index');
      e = { k: 'Index', obj: e, idx: idx, line: e.line };
    } else if (this.at('.')) {
      this.next();
      var nm = this.next();
      if (nm.t !== 'id') throw DartError('بعد النقطة لازم اسم خاصية زي length', nm.line);
      if (nm.v === 'length') {
        e = { k: 'Member', obj: e, name: 'length', line: e.line };
      } else if (nm.v === 'add' && this.at('(')) {
        this.next();
        var arg = this.parseExpr();
        this.expect(')', 'قفل قوس add');
        e = { k: 'ListAdd', obj: e, arg: arg, line: e.line };
      } else {
        throw DartError('المعمل بيدعم .length و .add بس للقوائم — مش ' + nm.v, nm.line);
      }
    } else if (this.at('++') || this.at('--')) {
      var op = this.next().v;
      e = { k: 'Postfix', op: op, e: e, line: e.line };
    } else break;
  }
  return e;
};
Parser.prototype.parsePrimary = function () {
  var t = this.next();
  if (t.t === 'num') return { k: 'Num', v: parseFloat(t.v), dbl: t.dbl, line: t.line };
  if (t.t === 'str') {
    var parts = t.parts.map(function (p) {
      if (p.lit !== undefined) return { k: 'StrLit', v: p.lit };
      return { k: 'StrExpr', expr: new Parser(lex(p.expr)).parseExprOnly(), line: t.line };
    });
    return { k: 'Str', parts: parts, line: t.line };
  }
  if (t.t === 'kw') {
    if (t.v === 'true') return { k: 'Bool', v: true, line: t.line };
    if (t.v === 'false') return { k: 'Bool', v: false, line: t.line };
    if (t.v === 'null') return { k: 'Null', line: t.line };
  }
  if (t.t === 'id') return { k: 'Ident', name: t.v, line: t.line };
  if (t.v === '(') {
    var e = this.parseExpr();
    this.expect(')', 'قفل القوس');
    return e;
  }
  if (t.v === '[') {
    var items = [];
    while (!this.at(']')) { items.push(this.parseExpr()); if (!this.eat(',')) break; }
    this.expect(']', 'قفل أقواس القايمة [ ]');
    return { k: 'ListLit', items: items, line: t.line };
  }
  throw DartError('مش فاهم `' + (t.v || 'نهاية الكود') + '` هنا', t.line);
};
Parser.prototype.parseExprOnly = function () {
  var e = this.parseExpr();
  if (this.peek().t !== 'eof') throw DartError('في حاجة زيادة جوه الـ interpolation', this.peek().line);
  return e;
};

/* ---------- evaluator ---------- */
function Env(parent) {
  this.vars = Object.create(null);
  this.finals = Object.create(null);
  this.parent = parent || null;
}
Env.prototype.has = function (n) {
  if (n in this.vars) return true;
  return this.parent ? this.parent.has(n) : false;
};
Env.prototype.get = function (n, line) {
  if (n in this.vars) return this.vars[n];
  if (this.parent) return this.parent.get(n, line);
  throw DartError('المتغير `' + n + '` مش متعرف — عرّفه الأول', line || 0);
};
Env.prototype.declare = function (n, v, isFinal, line) {
  if (n in this.vars) throw DartError('المتغير `' + n + '` متعرف قبل كده', line || 0);
  this.vars[n] = v;
  if (isFinal) this.finals[n] = true;
};
Env.prototype.assign = function (n, v, line) {
  if (n in this.vars) {
    if (this.finals[n]) throw DartError('`' + n + '` متعرفة بـ final/const — مش ممكن تتغير', line || 0);
    this.vars[n] = v; return;
  }
  if (this.parent) { this.parent.assign(n, v, line); return; }
  throw DartError('المتغير `' + n + '` مش متعرف — عرّفه الأول', line || 0);
};

var MAX_STEPS = 300000;

function makeRuntime() {
  return { out: [], steps: 0 };
}

function checkStep(rt, line) {
  rt.steps++;
  if (rt.steps > MAX_STEPS) throw DartError('الكود خد وقت أكتر من اللازم — غالباً عندك loop مش بيخلص (زي while بشرط دايم true)', line || 0);
}

function evalStrParts(node, env, rt) {
  var s = '';
  node.parts.forEach(function (p) {
    if (p.k === 'StrLit') s += p.v;
    else s += dartStr(evalExpr(p.expr, env, rt));
  });
  return S(s);
}

function evalExpr(node, env, rt) {
  switch (node.k) {
    case 'Num': return node.dbl ? D(node.v) : I(node.v);
    case 'Bool': return B(node.v);
    case 'Null': return NULL;
    case 'Str': return evalStrParts(node, env, rt);
    case 'ListLit': return L(node.items.map(function (it) { return evalExpr(it, env, rt); }));
    case 'Ident': {
      var v = env.get(node.name, node.line);
      if (v && v.t === 'function') return v;
      if (v === undefined) throw DartError('المتغير `' + node.name + '` لسه معملتلهوش تعريف بقيمة', node.line);
      return v;
    }
    case 'Member': {
      var o = evalExpr(node.obj, env, rt);
      if (o.t === 'List') return I(o.v.length);
      if (o.t === 'String') return I(o.v.length);
      throw DartError('.length بشتغل على String أو List بس', node.line);
    }
    case 'Index': {
      var ob = evalExpr(node.obj, env, rt);
      var ix = evalExpr(node.idx, env, rt);
      if (ix.t !== 'int') throw DartError('الـ index لازم يكون int', node.line);
      if (ob.t === 'List') {
        if (ix.v < 0 || ix.v >= ob.v.length) throw DartError('الـ index ' + ix.v + ' بره حدود القايمة (طولها ' + ob.v.length + ')', node.line);
        return ob.v[ix.v];
      }
      if (ob.t === 'String') {
        if (ix.v < 0 || ix.v >= ob.v.length) throw DartError('الـ index ' + ix.v + ' بره حدود الـ string', node.line);
        return S(ob.v[ix.v]);
      }
      throw DartError('الـ indexing بشتغل على List أو String بس', node.line);
    }
    case 'ListAdd': {
      var lo = evalExpr(node.obj, env, rt);
      if (lo.t !== 'List') throw DartError('.add بشتغل على List بس', node.line);
      lo.v.push(evalExpr(node.arg, env, rt));
      return NULL;
    }
    case 'Unary': {
      var val = evalExpr(node.e, env, rt);
      if (node.op === '!') {
        if (val.t !== 'bool') throw DartError('علامة ! بتحتاج bool', node.line);
        return B(!val.v);
      }
      if (!isNum(val)) throw DartError('السالب بيشتغل على الأرقام بس', node.line);
      return val.t === 'double' ? D(-val.v) : I(-val.v);
    }
    case 'Postfix': {
      if (node.e.k !== 'Ident') throw DartError(node.op + ' بيشتغل على متغير بس', node.line);
      var cur = env.get(node.e.name, node.line);
      if (!isNum(cur)) throw DartError(node.op + ' بيشتغل على الأرقام بس', node.line);
      var nv = node.op === '++' ? cur.v + 1 : cur.v - 1;
      env.assign(node.e.name, cur.t === 'double' ? D(nv) : I(nv), node.line);
      return cur;
    }
    case 'Binary': return evalBinary(node, env, rt);
    case 'Call': {
      var fn = evalExpr(node.callee, env, rt);
      if (!fn || fn.t !== 'function') throw DartError('الحاجة اللي بتحاول تناديها مش function', node.line);
      var args = node.args.map(function (a) { return evalExpr(a, env, rt); });
      if (args.length !== fn.params.length) {
        throw DartError('الدالة `' + fn.name + '` محتاجة ' + fn.params.length + ' قيم وانت باعت ' + args.length, node.line);
      }
      var local = new Env(fn.env);
      fn.params.forEach(function (p, i) { local.declare(p.name, args[i], false, node.line); });
      try {
        execBlock(fn.body, local, rt);
      } catch (sig) {
        if (sig && sig.__return) return sig.value;
        throw sig;
      }
      return NULL;
    }
  }
  throw DartError('خطأ داخلي في المترجم', node.line || 0);
}

function evalBinary(node, env, rt) {
  var op = node.op;
  if (op === '&&') {
    var a = evalExpr(node.l, env, rt);
    if (a.t !== 'bool') throw DartError('&& محتاجة bool على اليمين والشمال', node.line);
    if (!a.v) return B(false);
    var b = evalExpr(node.r, env, rt);
    if (b.t !== 'bool') throw DartError('&& محتاجة bool على اليمين والشمال', node.line);
    return B(b.v);
  }
  if (op === '||') {
    var a2 = evalExpr(node.l, env, rt);
    if (a2.t !== 'bool') throw DartError('|| محتاجة bool على اليمين والشمال', node.line);
    if (a2.v) return B(true);
    var b2 = evalExpr(node.r, env, rt);
    if (b2.t !== 'bool') throw DartError('|| محتاجة bool على اليمين والشمال', node.line);
    return B(b2.v);
  }
  var l = evalExpr(node.l, env, rt);
  var r = evalExpr(node.r, env, rt);

  if (op === '==') return B(sameVal(l, r));
  if (op === '!=') return B(!sameVal(l, r));

  if (op === '+') {
    if (l.t === 'String' && r.t === 'String') return S(l.v + r.v);
    if (l.t === 'String' || r.t === 'String') {
      throw DartError("مش ممكن تجمع String مع رقم بـ + في Dart — استخدم interpolation زي 'الناتج: $x'", node.line);
    }
    if (isNum(l) && isNum(r)) {
      return promote(l, r) === 'double' ? D(l.v + r.v) : I(l.v + r.v);
    }
    if (l.t === 'List' && r.t === 'List') return L(l.v.concat(r.v));
    throw DartError('عملية + مش ممكنة بين النوعين دول', node.line);
  }

  if (isNum(l) && isNum(r)) {
    var pt = promote(l, r);
    switch (op) {
      case '-': return pt === 'double' ? D(l.v - r.v) : I(l.v - r.v);
      case '*': return pt === 'double' ? D(l.v * r.v) : I(l.v * r.v);
      case '/':
        if (r.v === 0) throw DartError('قسمة على صفر — مش مسموحة', node.line);
        return D(l.v / r.v);
      case '~/':
        if (r.v === 0) throw DartError('قسمة على صفر — مش مسموحة', node.line);
        return I(Math.floor(l.v / r.v));
      case '%':
        if (r.v === 0) throw DartError('قسمة على صفر — مش مسموحة', node.line);
        return pt === 'double' ? D(((l.v % r.v) + r.v) % r.v) : I(((l.v % r.v) + r.v) % r.v);
      case '<': return B(l.v < r.v);
      case '>': return B(l.v > r.v);
      case '<=': return B(l.v <= r.v);
      case '>=': return B(l.v >= r.v);
    }
  }
  if ((op === '<' || op === '>' || op === '<=' || op === '>=') && l.t === 'String' && r.t === 'String') {
    if (op === '<') return B(l.v < r.v);
    if (op === '>') return B(l.v > r.v);
    if (op === '<=') return B(l.v <= r.v);
    return B(l.v >= r.v);
  }
  throw DartError('العملية `' + op + '` مش ممكنة بين ' + l.t + ' و ' + r.t, node.line);
}

function truthy(v, line) {
  if (v.t !== 'bool') throw DartError('الشرط لازم يطلع bool (true أو false) مش ' + v.t, line || 0);
  return v.v;
}

function execBlock(body, env, rt) {
  for (var i = 0; i < body.length; i++) execStmt(body[i], env, rt);
}

function execStmt(st, env, rt) {
  checkStep(rt, st.line);
  switch (st.k) {
    case 'VarDecl': {
      var v = st.init ? evalExpr(st.init, env, rt) : undefined;
      env.declare(st.name, v, st.decl === 'final' || st.decl === 'const', st.line);
      return;
    }
    case 'Assign': {
      if (st.op === '=') { env.assign(st.name, evalExpr(st.expr, env, rt), st.line); return; }
      var cur = env.get(st.name, st.line);
      var rhs = evalExpr(st.expr, env, rt);
      var bop = st.op.slice(0, -1); // += -> +
      var res = combineValues(cur, rhs, bop, st.line);
      env.assign(st.name, res, st.line);
      return;
    }
    case 'IndexAssign': {
      var target = env.get(st.name, st.line);
      if (target.t !== 'List') throw DartError('تعديل الـ index بيشتغل على List بس', st.line);
      var ix2 = evalExpr(st.idx, env, rt);
      if (ix2.t !== 'int') throw DartError('الـ index لازم يكون int', st.line);
      if (ix2.v < 0 || ix2.v >= target.v.length) throw DartError('الـ index ' + ix2.v + ' بره حدود القايمة (طولها ' + target.v.length + ')', st.line);
      target.v[ix2.v] = evalExpr(st.expr, env, rt);
      return;
    }
    case 'Print': {
      var pv = evalExpr(st.expr, env, rt);
      rt.out.push(dartStr(pv));
      return;
    }
    case 'ExprStmt': evalExpr(st.expr, env, rt); return;
    case 'If': {
      if (truthy(evalExpr(st.cond, env, rt), st.line)) execBlock(st.thenB, new Env(env), rt);
      else if (st.elseB) execBlock(st.elseB, new Env(env), rt);
      return;
    }
    case 'While': {
      while (truthy(evalExpr(st.cond, env, rt), st.line)) {
        checkStep(rt, st.line);
        try { execBlock(st.body, new Env(env), rt); }
        catch (sig) {
          if (sig && sig.__break) break;
          if (sig && sig.__continue) continue;
          throw sig;
        }
      }
      return;
    }
    case 'ForC': {
      var loopEnv = new Env(env);
      if (st.init) execStmt(st.init, loopEnv, rt);
      for (;;) {
        if (st.cond && !truthy(evalExpr(st.cond, loopEnv, rt), st.line)) break;
        checkStep(rt, st.line);
        try { execBlock(st.body, new Env(loopEnv), rt); }
        catch (sig) {
          if (sig && sig.__break) break;
          if (sig && sig.__continue) { /* fall through to update */ }
          else if (sig && sig.__return) throw sig;
          else throw sig;
        }
        if (st.update) execStmt(st.update, loopEnv, rt);
      }
      return;
    }
    case 'ForIn': {
      var it = evalExpr(st.iter, env, rt);
      if (it.t !== 'List') throw DartError('for-in بتحتاج List تلف عليها', st.line);
      var arr = it.v.slice();
      for (var i = 0; i < arr.length; i++) {
        checkStep(rt, st.line);
        var fe = new Env(env);
        fe.declare(st.name, arr[i], false, st.line);
        try { execBlock(st.body, fe, rt); }
        catch (sig) {
          if (sig && sig.__break) break;
          if (sig && sig.__continue) continue;
          throw sig;
        }
      }
      return;
    }
    case 'FuncDecl': {
      var fn = { t: 'function', name: st.name, params: st.params, body: st.body, env: env };
      if (env.has(st.name)) env.assign(st.name, fn, st.line);
      else env.declare(st.name, fn, false, st.line);
      return;
    }
    case 'Return': {
      var rv = st.expr ? evalExpr(st.expr, env, rt) : NULL;
      throw { __return: true, value: rv };
    }
    case 'Break': throw { __break: true };
    case 'Continue': throw { __continue: true };
  }
}

/* compound assignment: apply op directly to two values */
function combineValues(l, r, op, line) {
  if (op === '+') {
    if (l.t === 'String' && r.t === 'String') return S(l.v + r.v);
    if (l.t === 'String' || r.t === 'String') {
      throw DartError("مش ممكن تجمع String مع رقم بـ + في Dart — استخدم interpolation زي 'الناتج: $x'", line);
    }
    if (isNum(l) && isNum(r)) return promote(l, r) === 'double' ? D(l.v + r.v) : I(l.v + r.v);
    throw DartError('عملية += مش ممكنة بين النوعين دول', line);
  }
  if (isNum(l) && isNum(r)) {
    var pt = promote(l, r);
    if (op === '-') return pt === 'double' ? D(l.v - r.v) : I(l.v - r.v);
    if (op === '*') return pt === 'double' ? D(l.v * r.v) : I(l.v * r.v);
    if (op === '~/') {
      if (r.v === 0) throw DartError('قسمة على صفر — مش مسموحة', line);
      return I(Math.floor(l.v / r.v));
    }
  }
  throw DartError('العملية `' + op + '=` مش ممكنة بين ' + l.t + ' و ' + r.t, line);
}

function runProgram(source) {
  var rt = makeRuntime();
  try {
    var toks = lex(source);
    var parser = new Parser(toks);
    var prog = parser.parseProgram();
    var env = new Env(null);
    // hoist function declarations so calling order does not matter
    prog.body.forEach(function (st) {
      if (st.k === 'FuncDecl') execStmt(st, env, rt);
    });
    prog.body.forEach(function (st) {
      if (st.k !== 'FuncDecl') execStmt(st, env, rt);
    });
    return { ok: true, output: rt.out.join('\n'), lines: rt.out };
  } catch (e) {
    if (e && e.dartMsg) {
      return { ok: false, error: e.dartMsg, line: e.line, output: rt.out.join('\n'), lines: rt.out };
    }
    if (e && e.__return) {
      return { ok: false, error: 'return لوحدها من غير function ملهاش معنى', line: 0, output: rt.out.join('\n'), lines: rt.out };
    }
    throw e;
  }
}

var FEATURES = [
  ['var / final / const', 'تعريف متغيرات'],
  ['int, double, String, bool', 'الأنواع الأساسية'],
  ["'نص فيه $var'", 'string interpolation'],
  ['+ - * / ~/ %', 'العمليات الحسابية'],
  ['== != < > <= >=', 'المقارنات'],
  ['&& || !', 'العمليات المنطقية'],
  ['[1, 2, 3]', 'القوائم List'],
  ['list[i] / list.length / list.add', 'التعامل مع القوائم'],
  ['print(...)', 'الطباعة'],
  ['if / else', 'الشروط'],
  ['while', 'اللووب الشرطية'],
  ['for (var i = 0; i < n; i++)', 'اللووب العدّادية'],
  ['for (var x in list)', 'اللف على قايمة'],
  ['break / continue', 'التحكم في اللووب'],
  ['int add(int a, int b) { ... }', 'تعريف دوال'],
  ['return', 'رجوع قيمة من دالة']
];

global.DART_CORE = {
  runProgram: runProgram,
  dartStr: dartStr,
  lex: lex,
  FEATURES: FEATURES
};

})(typeof window !== 'undefined' ? window : globalThis);
