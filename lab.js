/* معمل Dart التفاعلي — part 2: missions + editor UI (browser) */
(function (global) {
'use strict';
var C = global.DART_CORE;

/* ---------- missions: expected outputs computed by running model solutions ---------- */
var MISSIONS = [
  { id: 'hello', title: 'أول سطر Dart',
    desc: 'اطبع الجملة "أهلاً يا عالم" بالظبط كما هي.',
    hint: 'استخدم print مع النص جوه single quotes، ومتنساش الـ ; في الآخر.',
    starter: '// اكتب أول كود Dart ليك هنا\n',
    solution: "print('أهلاً يا عالم');" },
  { id: 'vars', title: 'عرّف نفسك',
    desc: 'عرّف متغيرين: name فيه اسمك و age فيه سنك، وبعدين اطبع الجملة "اسمي أحمد وعندي 21 سنة" (بقيمك انت) في سطر واحد.',
    hint: 'استخدم string interpolation: \'اسمي $name وعندي $age سنة\'',
    starter: "var name = 'أحمد';\nvar age = 21;\n// اطبع الجملة هنا\n",
    solution: "var name = 'أحمد';\nvar age = 21;\nprint('اسمي $name وعندي $age سنة');" },
  { id: 'area', title: 'احسب مساحة',
    desc: 'مستطيل طوله 8 وعرضه 5. عرّف المتغيرين واحسب المساحة واطبع الجملة "المساحة = 40".',
    hint: 'المساحة = الطول × العرض. استخدم interpolation جوه الطباعة.',
    starter: "var length = 8;\nvar width = 5;\n",
    solution: "var length = 8;\nvar width = 5;\nprint('المساحة = ${length * width}');" },
  { id: 'sum', title: 'اجمع قايمة',
    desc: 'عندك القايمة [4, 8, 15, 16, 23, 42]. اجمع عناصرها كلها بلووب واطبع المجموع النهائي (رقم واحد بس).',
    hint: 'متغير sum يبدأ من صفر، و for (var n in nums) تزوده كل لفة.',
    starter: "var nums = [4, 8, 15, 16, 23, 42];\n",
    solution: "var nums = [4, 8, 15, 16, 23, 42];\nvar sum = 0;\nfor (var n in nums) {\n  sum += n;\n}\nprint(sum);" },
  { id: 'countdown', title: 'عدّاد تنازلي',
    desc: 'اطبع الأرقام من 5 لـ 1 (كل رقم في سطر) وبعدين اطبع "انطلاق!" في سطر لوحده.',
    hint: 'while مع متغير بينقص، أو for بعدّاد بينزل. الشرط يخلص قبل الصفر.',
    starter: "// العد التنازلي هنا\n",
    solution: "var i = 5;\nwhile (i >= 1) {\n  print(i);\n  i--;\n}\nprint('انطلاق!');" },
  { id: 'fizzbuzz', title: 'FizzBuzz المصري',
    desc: 'للأرقام من 1 لـ 15: لو الرقم من مضاعفات 3 اطبع "فز"، من مضاعفات 5 اطبع "بز"، من مضاعفات الاتنين اطبع "فزبز"، غير كده اطبع الرقم نفسه.',
    hint: 'افحص مضاعفات 15 الأول! واستخدم % لمعرفة باقي القسمة.',
    starter: "for (var i = 1; i <= 15; i++) {\n  // أكمل هنا\n}\n",
    solution: "for (var i = 1; i <= 15; i++) {\n  if (i % 15 == 0) {\n    print('فزبز');\n  } else if (i % 3 == 0) {\n    print('فز');\n  } else if (i % 5 == 0) {\n    print('بز');\n  } else {\n    print(i);\n  }\n}" },
  { id: 'function', title: 'اكتب أول دالة',
    desc: 'اكتب function اسمها square بتاخد int وترجع مربعه، وبعدين اطبع نتيجة square(9) — المفروض تطلع 81.',
    hint: 'int square(int n) { return n * n; } وبعدين print(square(9));',
    starter: "// عرّف الدالة هنا\n\n// وجربها هنا\n",
    solution: "int square(int n) {\n  return n * n;\n}\nprint(square(9));" }
];

/* pre-compute expected outputs by running the model solutions */
MISSIONS.forEach(function (m) {
  var r = C.runProgram(m.solution);
  m.expected = r.ok ? r.output : '';
});

global.DART_LAB_META = { commands: C.FEATURES.length, missions: MISSIONS.length };

if (typeof document === 'undefined') {
  global.DART_LAB = { MISSIONS: MISSIONS };
  return;
}

/* ---------- UI ---------- */
var LAB_KEY = 'flutter-zero-lab-v1';
var missionsDone = {};
var editorCode = null;
var editor = document.getElementById('dart-editor');
var outEl = document.getElementById('dart-output');
var runBtn = document.getElementById('dart-run');
var clearBtn = document.getElementById('dart-clear');
var exBtn = document.getElementById('dart-example');
var missionsPanel = document.getElementById('missions-panel');

function save() {
  try {
    localStorage.setItem(LAB_KEY, JSON.stringify({ missionsDone: missionsDone, code: editor.value }));
  } catch (e) {}
}
function load() {
  try {
    var raw = localStorage.getItem(LAB_KEY);
    if (!raw) return;
    var d = JSON.parse(raw);
    if (d) {
      missionsDone = d.missionsDone || {};
      if (typeof d.code === 'string' && d.code.trim()) editor.value = d.code;
    }
  } catch (e) {}
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function showOutput(text, cls) {
  outEl.innerHTML = '';
  var pre = document.createElement('pre');
  pre.className = cls || '';
  pre.textContent = text;
  outEl.appendChild(pre);
  outEl.scrollTop = outEl.scrollHeight;
}

function runCode() {
  var src = editor.value;
  if (!src.trim()) { showOutput('اكتب كود الأول 🙂', 't-dim'); return; }
  var r;
  try {
    r = C.runProgram(src);
  } catch (e) {
    showOutput('خطأ غير متوقع في المعمل: ' + e.message, 't-err');
    return;
  }
  if (r.ok) {
    showOutput(r.output === '' ? '(الكود اشتغل من غير ما يطبع حاجة — استخدم print)' : r.output, '');
  } else {
    var loc = r.line ? ' (سطر ' + r.line + ')' : '';
    showOutput((r.output ? r.output + '\n' : '') + '❌ خطأ' + loc + ': ' + r.error, 't-err');
  }
  checkMissions(src, r);
  save();
}

function checkMissions(src, r) {
  if (!r.ok) return;
  MISSIONS.forEach(function (m) {
    if (missionsDone[m.id]) return;
    if (norm(r.output) === norm(m.expected)) {
      missionsDone[m.id] = true;
      renderMissions();
      var note = document.createElement('div');
      note.className = 't-ok';
      note.textContent = '🎯 مهمة خلصت: ' + m.title;
      var pre = outEl.querySelector('pre');
      if (pre) pre.textContent += '\n🎯 مهمة خلصت: ' + m.title;
      save();
    }
  });
}

function norm(s) { return String(s).replace(/\s+$/gm, '').replace(/\n+$/g, ''); }

function renderMissions() {
  missionsPanel.innerHTML = '';
  MISSIONS.forEach(function (m, i) {
    var done = !!missionsDone[m.id];
    var box = document.createElement('div');
    box.className = 'mission' + (done ? ' done' : '');
    box.innerHTML =
      '<div class="m-title"><span class="m-check">' + (done ? '✓' : (i + 1)) + '</span>' + esc(m.title) + '</div>' +
      '<p>' + esc(m.desc) + '</p>' +
      '<div class="m-hint">💡 ' + esc(m.hint) + '</div>' +
      '<div class="lab-actions"><button type="button" class="solution-toggle m-load">حمل كود البداية</button>' +
      (done ? '<span class="t-ok" style="font-weight:700">تمام ✓</span>' : '') +
      '</div>';
    box.querySelector('.m-load').addEventListener('click', function () {
      editor.value = m.starter;
      editor.focus();
      save();
    });
    missionsPanel.appendChild(box);
  });
}

runBtn.addEventListener('click', runCode);
editor.addEventListener('keydown', function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
});
clearBtn.addEventListener('click', function () { editor.value = ''; showOutput('الترمنال فاضي. اكتب كود ودوس "شغّل الكود".', 't-dim'); save(); });
exBtn.addEventListener('click', function () {
  editor.value = "// جرب: عدّاد من 1 لـ 5\nfor (var i = 1; i <= 5; i++) {\n  print('رقم $i');\n}\n\nvar names = ['علي', 'منى'];\nfor (var n in names) {\n  print('أهلاً يا $n');\n}";
  runCode();
});

document.getElementById('missions-toggle').addEventListener('click', function () {
  missionsPanel.hidden = !missionsPanel.hidden;
});
document.getElementById('reset-lab').addEventListener('click', function () {
  if (confirm('متأكد إنك عايز تمسح كل تقدمك في المعمل؟')) {
    missionsDone = {};
    try { localStorage.removeItem(LAB_KEY); } catch (e) {}
    editor.value = '';
    showOutput('المعمل اتصفّر. يلا من الأول 💪', 't-dim');
    renderMissions();
  }
});

/* features list (اللي المعمل بيدعمه) */
(function renderFeatures() {
  var host = document.getElementById('dart-features');
  if (!host) return;
  host.innerHTML = C.FEATURES.map(function (f) {
    return '<div class="gs-file"><span class="gs-id">' + esc(f[0]) + '</span> — ' + esc(f[1]) + '</div>';
  }).join('');
})();

load();
if (!editor.value.trim()) {
  editor.value = "// أهلاً بيك في معمل Dart!\n// اكتب كودك هنا ودوس \"شغّل الكود\" (أو Ctrl+Enter)\n\nprint('أهلاً يا عالم');\n";
}
renderMissions();
showOutput('اكتب كود Dart في المحرر ودوس "شغّل الكود" — أو حمل مهمة من مهام التدريب فوق.', 't-dim');

global.DART_LAB_FOCUS = function () { editor.focus(); };

})(typeof window !== 'undefined' ? window : globalThis);
