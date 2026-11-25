/* Curriculum part 1: ليه Flutter، Dart basics، collections، setup، أول تطبيق، widgets، layouts */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
 "id": "why-flutter",
 "nav": "ليه Flutter أصلاً؟",
 "title": "ليه Flutter أصلاً؟ تطوير الموبايل من الصفر",
 "subtitle": "المشكلة اللي Flutter بيحلها، وإزاي بيشتغل، وليه اخترناه",
 "blocks": [
  {
   "type": "p",
   "text": "تخيل إنك عايز تعمل تطبيق موبايل. السوق منقسم نصين: ناس معاها iPhone (بيشتغل بنظام iOS) وناس معاها Android. الطريقة القديمة كانت إنك تكتب التطبيق مرتين: مرة بـ Swift عشان iOS ومرة بـ Kotlin عشان Android. ضعف الشغل، ضعف الوقت، وضعف الفلوس."
  },
  {
   "type": "p",
   "text": "`Flutter` هو framework (إطار عمل) من Google بيحل المشكلة دي: بتكتب الكود مرة واحدة بلغة `Dart`، والكود ده بيشتغل على Android و iOS والويب وكمان Windows و macOS و Linux. مش تقريب ولا محاكاة: Flutter بيرسم واجهة التطبيق بنفسه بيكسل بيكسل، عشان كده الشكل بيطلع نفسه على كل الأجهزة."
  },
  {
   "type": "h",
   "text": "Flutter بيشتغل إزاي؟"
  },
  {
   "type": "list",
   "items": [
    "بتكتب الكود بلغة `Dart`, لغة سهلة وقريبة من JavaScript و Java.",
    "الكود بينزل على الجهاز native code سريع، مش بيشتغل جوه WebView بطيء.",
    "الواجهة كلها بتتبني من قطع صغيرة اسمها widgets, دي الفكرة اللي هنعيش معاها الكورس كله.",
    "ميزة `hot reload` بتخليك تشوف التعديل في أقل من ثانية من غير ما تقفل التطبيق وتفتحه تاني."
   ]
  },
  {
   "type": "h",
   "text": "Flutter ولا native ولا React Native؟"
  },
  {
   "type": "table",
   "head": [
    "المعيار",
    "Flutter",
    "Native (Swift/Kotlin)",
    "React Native"
   ],
   "rows": [
    [
     "لغة البرمجة",
     "Dart",
     "Swift و Kotlin",
     "JavaScript"
    ],
    [
     "كود واحد للمنصتين",
     "أيوه",
     "لا، كودين منفصلين",
     "أيوه"
    ],
    [
     "الأداء",
     "سريع جداً (native compiled)",
     "الأسرع",
     "جيد"
    ],
    [
     "شكل الواجهة",
     "متطابق 100% بين المنصتين",
     "مختلف بين المنصتين",
     "بيعتمد على مكونات النظام"
    ],
    [
     "الشركة المطورة",
     "Google",
     "Apple و Google",
     "Meta"
    ]
   ]
  },
  {
   "type": "p",
   "text": "Flutter مش مشروع جامد: Google نفسها بتستخدمه، وشركات كبيرة زي BMW و Alibaba نشرت بيه تطبيقات إنتاج حقيقية. والأهم ليك كمتعلم: سوق العمل فيه طلب متزايد على Flutter developers، والتعلم فيه أسرع من إنك تتعلم منصتين native."
  },
  {
   "type": "note",
   "text": "في الكورس ده هتتعلم الاتنين مع بعض: لغة `Dart` من الصفر، وبعدين framework الـ Flutter نفسه. الدرسين الجايين عن Dart لوحدها، وجرب كل كود فيهم في معمل Dart التفاعلي اللي في الموقع من غير ما تنزل أي حاجة على جهازك."
  },
  {
   "type": "h",
   "text": "الرحلة اللي جاية"
  },
  {
   "type": "list",
   "items": [
    "هتتعلم Dart: المتغيرات والأنواع والقوائم والدوال (وفي معمل Dart تجرب كل حاجة).",
    "هتنزل Flutter وتظبط بيئة الشغل، وتعمل أول تطبيق شغال.",
    "هتفهم فكرة الـ widgets والـ layouts والقوائم والتنقل بين الشاشات.",
    "هتتعلم الـ state والـ forms والـ theming وإزاي تضيف packages جاهزة.",
    "في الآخر: مشروع ختامي, تطبيق ملاحظات كامل فيه أكتر من شاشة، من الصفر للآخر."
   ]
  }
 ],
 "quiz": [
  {
   "q": "إيه الفكرة الأساسية اللي بيقدمها Flutter؟",
   "options": [
    {
     "text": "تكتب الكود مرة واحدة بـ Dart ويشتغل على Android و iOS ومنصات تانية"
    },
    {
     "text": "تحويل تطبيقات iOS لتطبيقات Android أوتوماتيك من غير ما تعدل في الكود"
    },
    {
     "text": "برمجة تطبيقات Android بس، لكن بطريقة أسهل من Java أو Kotlin"
    },
    {
     "text": "الاستغناء عن البرمجة خالص والاعتماد على السحب والإفلات لبناء الشاشات"
    }
   ],
   "answer": 0,
   "explain": "دي خلاصة Flutter: single codebase بلغة Dart بينزل على أكتر من منصة، من غير ما تكتب التطبيق مرتين."
  },
  {
   "q": "لغة البرمجة اللي بنستخدمها مع Flutter هي:",
   "options": [
    {
     "text": "JavaScript"
    },
    {
     "text": "Kotlin"
    },
    {
     "text": "Dart"
    },
    {
     "text": "Swift"
    }
   ],
   "answer": 2,
   "explain": "Flutter مبني على لغة Dart اللي طورتها Google. هنتعلمها من الصفر في الدرسين الجايين."
  },
  {
   "q": "ميزة hot reload معناها إيه؟",
   "options": [
    {
     "text": "إن التطبيق بيشتغل أسرع كتير على موبايل المستخدم بعد ما يتنزل من المتجر، لأن الكود بيتحسن لوحده"
    },
    {
     "text": "إنك تشوف نتيجة تعديل الكود في التطبيق الشغال خلال لحظات من غير ما تعيد تشغيله من الأول"
    },
    {
     "text": "إن التطبيق بيحدّث نفسه من الإنترنت لوحده من غير ما المستخدم يعمل update من المتجر"
    },
    {
     "text": "إن الجهاز مبيسخنش ولا بيستهلك بطارية كتير وهو بيشغل التطبيق، حتى لو الشاشة فاضلة منورة"
    }
   ],
   "answer": 1,
   "explain": "hot reload بيحقن التعديل في التطبيق الشغال مع الاحتفاظ بحالته، فالتجربة بتبقى فورية تقريباً."
  }
 ],
 "exercises": [
  {
   "task": "من غير ما تدور في جوجل: اكتب بكلماتك الفرق بين framework و programming language، واديني مثال لكل واحد من اللي فات.",
   "hint": "فكر في العلاقة بين Dart و Flutter.",
   "code": "اللغة (programming language) هي اللي بيكتب بيها الكود نفسه:\nقواعد وكلمات وأوامر. زي Dart.\n\nالـ framework هو مجموعة أدوات ومكونات جاهزة مبنية بلغة\nمعينة، بتوفرلك الشغل المتكرر: Flutter مكتوب بلغة Dart\nوبيديك widgets جاهزة ونظام تنقل وثيمات وغيرها.\n\nيعني: Dart هي اللغة، Flutter هو الـ framework المبني عليها.",
   "why": "العلاقة دي هتتكرر معاك كتير: Python و Django، JavaScript و React. اللغة هي الأساس والـ framework بيبني عليها."
  },
  {
   "task": "افتح موقع dartpad.dev في المتصفح (من غير تسطيب أي حاجة) واكتب فيه أول كود Dart ليك: ",
   "hint": "استخدم void main() و print().",
   "code": "void main() {\n  print('أهلاً من DartPad');\n}",
   "why": "DartPad بيشتغل Dart حقيقي في المتصفح. هنستخدمه لما نيجي نتمرن على الكود على جهازك، لكن دلوقتي معمل Dart اللي هنا في الموقع أسرع ومن غير ما تسيب الصفحة."
  }
 ]
},
{
 "id": "dart-basics",
 "nav": "أساسيات Dart: المتغيرات",
 "title": "Dart من الصفر: المتغيرات والأنواع",
 "subtitle": "var و final والأنواع الأساسية والطباعة والـ string interpolation",
 "blocks": [
  {
   "type": "p",
   "text": "قبل ما نبني تطبيقات، لازم نتعلم لغة Dart نفسها. الكويس إنها سهلة ومنطقية، وأي كود هتشوفه في الدرس ده تقدر تجربه فوراً في معمل Dart اللي في الموقع (من القايمة اللي فوق), من غير تسطيب أي حاجة."
  },
  {
   "type": "h",
   "text": "أول سطر: print"
  },
  {
   "type": "p",
   "text": "أمر `print` بيطبع أي حاجة على الشاشة (أو في الـ console). جربه في المعمل:"
  },
  {
   "type": "code",
   "code": "print('أهلاً يا عالم');\nprint(2 + 3);"
  },
  {
   "type": "p",
   "text": "الناتج هيكون:"
  },
  {
   "type": "code",
   "code": "أهلاً يا عالم\n5"
  },
  {
   "type": "note",
   "warn": true,
   "text": "خد بالك من ٣ قواعد مهمة في Dart: كل جملة بتخلص بـ `;`، والنصوص بتتحط جوه علامات تنصيص زي `\"كده\"` (single أو double، الاتنين شغالين)، وDart حساسة لحالة الحروف: `print` صح لكن `Print` غلط."
  },
  {
   "type": "h",
   "text": "المتغيرات: علبة ليها اسم"
  },
  {
   "type": "p",
   "text": "المتغير (variable) هو اسم بيشاور على قيمة. بنعرفه بكلمة `var`:"
  },
  {
   "type": "code",
   "code": "var name = 'أحمد';\nvar age = 20;\nprint(name);\nprint(age);"
  },
  {
   "type": "p",
   "text": "Dart لوحدها بتعرف نوع المتغير من القيمة: `'أحمد'` نوعها `String` (نص)، و `20` نوعها `int` (رقم صحيح). تقدر كمان تكتب النوع بنفسك لو حبيت تكون واضح:"
  },
  {
   "type": "code",
   "code": "String name = 'أحمد';\nint age = 20;\ndouble height = 175.5;\nbool isStudent = true;"
  },
  {
   "type": "table",
   "head": [
    "النوع",
    "معناه",
    "مثال"
   ],
   "rows": [
    [
     "int",
     "رقم صحيح",
     "20"
    ],
    [
     "double",
     "رقم عشري",
     "175.5"
    ],
    [
     "String",
     "نص",
     "'أحمد'"
    ],
    [
     "bool",
     "قيمة منطقية",
     "true أو false"
    ]
   ]
  },
  {
   "type": "h",
   "text": "var و final و const: إيه الفرق؟"
  },
  {
   "type": "list",
   "items": [
    "`var`: متغير عادي، تقدر تغير قيمته بعدين.",
    "`final`: بتحط القيمة مرة واحدة ومش ممكن تتغير بعد كده.",
    "`const`: قيمة ثابتة معروفة من وقت كتابة الكود، مش بس مش بتتغير."
   ]
  },
  {
   "type": "code",
   "code": "var city = 'أسيوط';\ncity = 'القاهرة';  // عادي، var بتتغير\n\nfinal country = 'مصر';\n// country = 'الإمارات';  // ❌ غلط: final مش بتتغير"
  },
  {
   "type": "h",
   "text": "الحسابات في Dart"
  },
  {
   "type": "code",
   "code": "print(7 + 2);   // 9\nprint(7 - 2);   // 5\nprint(7 * 2);   // 14\nprint(7 / 2);   // 3.5, قسمة عادية، الناتج double\nprint(7 ~/ 2);  // 3, قسمة صحيحة (بترمي الكسر)\nprint(7 % 2);   // 1, باقي القسمة"
  },
  {
   "type": "p",
   "text": "العمليتين اللي بيلخبطوا الناس: `/` بتطلع ناتج عشري دايماً، و `~/` بتطلع الجزء الصحيح بس. و `%` بترجعلك الباقي، ودي مفيدة جداً: لو `x % 2 == 0` يبقى الرقم زوجي."
  },
  {
   "type": "h",
   "text": "string interpolation: حط المتغيرات جوه النص"
  },
  {
   "type": "p",
   "text": "عايز تطبع جملة فيها قيمة متغير؟ في Dart بتستخدم علامة `$` جوه النص نفسه:"
  },
  {
   "type": "code",
   "code": "var name = 'منى';\nvar score = 95;\nprint('أهلاً يا $name');\nprint('درجتك ${score + 5} من 100');"
  },
  {
   "type": "code",
   "code": "أهلاً يا منى\nدرجتك 100 من 100"
  },
  {
   "type": "p",
   "text": "القاعدة: `$name` لو متغير لوحده، و `${أي تعبير}` لو عايز تحسب حاجة جوه النص. ومتجمعش String مع رقم بـ `+`, دي غلطة شائعة وDart بترفضها. استخدم interpolation بدلها."
  }
 ],
 "quiz": [
  {
   "q": "هيطبع إيه الكود ده؟",
   "code": "int x = 10;\nprint(x ~/ 3);",
   "options": [
    {
     "text": "3.33",
     "mono": true
    },
    {
     "text": "3",
     "mono": true
    },
    {
     "text": "3.0",
     "mono": true
    },
    {
     "text": "4",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "القسمة الصحيحة ~/ بترمي الكسر خالص: 10 ~/ 3 = 3. (لو كانت / كانت هتطلع 3.333...)"
  },
  {
   "q": "هيطبع إيه الكود ده؟",
   "code": "var name = 'علي';\nprint('صباح الخير يا $name');",
   "options": [
    {
     "text": "صباح الخير يا $name",
     "mono": true
    },
    {
     "text": "صباح الخير يا علي",
     "mono": true
    },
    {
     "text": "خطأ لأن النص فيه متغير",
     "mono": true
    },
    {
     "text": "علي",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "علامة $ جوه النص بتتحول لقيمة المتغير, دي الـ string interpolation."
  },
  {
   "q": "عايز متغير يحفظ اسم بلدك وميتغيرش طول ما البرنامج شغال. الأنسب:",
   "options": [
    {
     "text": "var",
     "mono": true
    },
    {
     "text": "final",
     "mono": true
    },
    {
     "text": "int",
     "mono": true
    },
    {
     "text": "print",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "final معناها قيمة بتتحط مرة واحدة ومش بتتغير. var لو هتغير القيمة، و int نوع بيانات مش طريقة تعريف."
  },
  {
   "q": "إيه ناتج `print(6 / 2);` في Dart؟",
   "code": "print(6 / 2);",
   "options": [
    {
     "text": "3",
     "mono": true
    },
    {
     "text": "3.0",
     "mono": true
    },
    {
     "text": "2",
     "mono": true
    },
    {
     "text": "6/2",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "القسمة العادية / في Dart بترجع double دايماً، حتى لو الناتج صحيح, عشان كده بتطبع 3.0. لو عايز 3 استخدم ~/."
  }
 ],
 "exercises": [
  {
   "task": "عرّف ٣ متغيرات: اسمك (String) وسنك (int) وطولك بالسنتيمتر (double)، وبعدين اطبع جملة واحدة فيهم التلاتة باستخدام interpolation.",
   "hint": "الجملة ممكن تكون: اسمي كذا وعندي كذا سنة وطولي كذا.",
   "code": "String name = 'أحمد';\nint age = 21;\ndouble height = 178.5;\n\nprint('اسمي $name وعندي $age سنة وطولي $height سم');",
   "why": "جرب الكود ده في معمل Dart, لازم يطبع جملة واحدة فيها القيم التلاتة. غيّر القيم لقيمك انت وجرب تاني."
  },
  {
   "task": "اكتب كود يحسب متوسط ٣ درجات (85 و 90 و 78) ويطبعه. خد بالك: المتوسط ممكن يطلع عشري.",
   "hint": "اجمع التلاتة واقسم على 3. استخدم double للنتيجة.",
   "code": "var a = 85;\nvar b = 90;\nvar c = 78;\ndouble avg = (a + b + c) / 3;\nprint('المتوسط = $avg');",
   "why": "هيطبع \"المتوسط = 84.33333333333333\". القسمة / بتطلع double عادي. لو عايز الجزء الصحيح بس كنت هتكتب ~/."
  }
 ]
},
{
 "id": "dart-collections",
 "nav": "القوائم واللووبس والدوال",
 "title": "Dart من الصفر: القوائم واللووبس والدوال",
 "subtitle": "List و for و while والشروط وإزاي تكتب function",
 "blocks": [
  {
   "type": "p",
   "text": "الدرس اللي فات كان عن القيم المفردة. دلوقتي هنتعامل مع مجموعات قيم (القوائم)، ونخلي الكود يكرر شغل لوحده (اللووبس)، ونقسم الكود لقطع قابلة لإعادة الاستخدام (الدوال). دي آخر محطة في Dart قبل ما ندخل على Flutter نفسه."
  },
  {
   "type": "h",
   "text": "القايمة List: قيم كتير في متغير واحد"
  },
  {
   "type": "code",
   "code": "var grades = [85, 90, 78, 92];\nprint(grades);        // [85, 90, 78, 92]\nprint(grades[0]);     // 85, أول عنصر (العد من صفر!)\nprint(grades.length); // 4, عدد العناصر"
  },
  {
   "type": "note",
   "warn": true,
   "text": "العد في البرمجة بيبدأ من صفر: أول عنصر هو `grades[0]` مش `grades[1]`. ولو طلبت index أكبر من حجم القايمة، الكود هيقع بخطأ RangeError."
  },
  {
   "type": "p",
   "text": "تضيف عنصر جديد بـ `.add` وتعدل عنصر موجود بالـ index:"
  },
  {
   "type": "code",
   "code": "var todos = ['أذاكر Dart'];\ntodos.add('أعمل مشروع');\ntodos[0] = 'أذاكر Dart كويس';\nprint(todos);  // [أذاكر Dart كويس, أعمل مشروع]"
  },
  {
   "type": "h",
   "text": "اللووبس: خلي الكود يكرر"
  },
  {
   "type": "p",
   "text": "أشهر لووب هي `for` بعدّاد: بتبدأ من قيمة، وبتفضل شغالة طول ما الشرط متحقق، وبتزود العداد كل لفة:"
  },
  {
   "type": "code",
   "code": "for (var i = 1; i <= 5; i++) {\n  print('لفة رقم $i');\n}"
  },
  {
   "type": "p",
   "text": "ولو عندك قايمة وعايز تلف على عناصرها واحد واحد، في صيغة أريح اسمها for-in:"
  },
  {
   "type": "code",
   "code": "var names = ['علي', 'منى', 'سامي'];\nfor (var n in names) {\n  print('أهلاً يا $n');\n}"
  },
  {
   "type": "p",
   "text": "وفي `while` اللي بتلف طول ما شرطها متحقق, خلي بالك لازم حاجة جوه اللووب تغير الشرط وإلا هتلف للأبد:"
  },
  {
   "type": "code",
   "code": "var battery = 100;\nwhile (battery > 80) {\n  print('البطارية $battery%');\n  battery -= 10;\n}"
  },
  {
   "type": "h",
   "text": "الشروط: if و else"
  },
  {
   "type": "code",
   "code": "var degree = 75;\nif (degree >= 85) {\n  print('ممتاز');\n} else if (degree >= 50) {\n  print('ناجح');\n} else {\n  print('محتاج تعيد');\n}"
  },
  {
   "type": "p",
   "text": "تقدر تربط شروط ببعض بـ `&&` (لازم الاتنين يتحققوا) و `||` (يكفي واحد فيهم) و `!` (العكس)."
  },
  {
   "type": "h",
   "text": "الدوال functions: كود له اسم"
  },
  {
   "type": "p",
   "text": "الدالة بتاخد مدخلات (parameters) وترجع نتيجة بـ `return`. كده بتكتب المنطق مرة وتستخدمه في أي حتة:"
  },
  {
   "type": "code",
   "code": "int add(int a, int b) {\n  return a + b;\n}\n\nString greet(String name) {\n  return 'أهلاً يا $name';\n}\n\nprint(add(3, 4));       // 7\nprint(greet('منى'));    // أهلاً يا منى"
  },
  {
   "type": "p",
   "text": "الكلمة قبل اسم الدالة هي نوع الرجعة: `int` يعني بترجع رقم، `String` بترجع نص، ولو مش بترجع حاجة بنكتب `void`. ولو الدالة سطر واحد فيه اختصار بالسهم: `int add(int a, int b) => a + b;`"
  },
  {
   "type": "note",
   "text": "كل اللي فات شغال حرفياً في معمل Dart اللي في الموقع. افتحه وجرب: غيّر الأرقام، اكسر الكود عمداً، وشوف رسايل الخطأ, دي أسرع طريقة للتعلم."
  }
 ],
 "quiz": [
  {
   "q": "هيطبع إيه الكود ده؟",
   "code": "var nums = [10, 20, 30];\nprint(nums[1]);",
   "options": [
    {
     "text": "10",
     "mono": true
    },
    {
     "text": "20",
     "mono": true
    },
    {
     "text": "30",
     "mono": true
    },
    {
     "text": "خطأ",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "العد من صفر: nums[0] = 10 و nums[1] = 20 و nums[2] = 30."
  },
  {
   "q": "هيطبع إيه الكود ده؟",
   "code": "var total = 0;\nfor (var i = 1; i <= 4; i++) {\n  total += i;\n}\nprint(total);",
   "options": [
    {
     "text": "4",
     "mono": true
    },
    {
     "text": "10",
     "mono": true
    },
    {
     "text": "24",
     "mono": true
    },
    {
     "text": "6",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "بنجمع 1+2+3+4 = 10. العداد بيوقف عند 4 لأن الشرط i <= 4."
  },
  {
   "q": "عايز تلف على كل عناصر قايمة اسمها students واحد واحد. أنضف طريقة:",
   "options": [
    {
     "text": "for (var s in students) { ... }",
     "mono": true
    },
    {
     "text": "while (true) { print(students); }",
     "mono": true
    },
    {
     "text": "if (students) { print(students); }",
     "mono": true
    },
    {
     "text": "print(students.length); students++;",
     "mono": true
    }
   ],
   "answer": 0,
   "explain": "for-in معمولة بالظبط للف على عناصر قايمة بدون ما تدير index بنفسك."
  },
  {
   "q": "دالة بتاخد رقمين وترجع مجموعهم. أي تعريف صحيح؟",
   "options": [
    {
     "text": "int add(int a, int b) { return a + b; }",
     "mono": true
    },
    {
     "text": "int add(int a, int b) => return a + b;",
     "mono": true
    },
    {
     "text": "int add(int a, b) { a + b; }",
     "mono": true
    },
    {
     "text": "void add(int a, int b) { print(a + b); }",
     "mono": true
    }
   ],
   "answer": 0,
   "explain": "التعريف الصحيح: نوع الرجعة، اسم الدالة، المدخلات بين قوسين، والجسم بين { } مع return."
  }
 ],
 "exercises": [
  {
   "task": "عندك قايمة درجات [70, 45, 88, 50, 93]. احسب واطبع عدد الناجحين (اللي درجتهم 50 أو أكتر).",
   "hint": "اعمل عداد يبدأ من صفر، ولف على القايمة بـ for-in، وكل ما تلاقي درجة >= 50 زود العداد.",
   "code": "var grades = [70, 45, 88, 50, 93];\nvar passed = 0;\nfor (var g in grades) {\n  if (g >= 50) {\n    passed++;\n  }\n}\nprint('عدد الناجحين: $passed');",
   "why": "الناتج 4 (كلهم نجحوا إلا 45). جربه في المعمل وبعدين غيّر شرط النجاح لـ 60 وشوف الفرق."
  },
  {
   "task": "اكتب function اسمها maxOf بتاخد رقمين وترجع الأكبر فيهم، وجربها على 7 و 12.",
   "hint": "قارن بـ if وارجع الأكبر بـ return.",
   "code": "int maxOf(int a, int b) {\n  if (a > b) {\n    return a;\n  }\n  return b;\n}\n\nprint(maxOf(7, 12));",
   "why": "هتطبع 12. لاحظ إن return بتخرج من الدالة فوراً، فمش محتاج else بعد أول return."
  }
 ]
},
{
 "id": "setup",
 "nav": "تجهيز بيئة العمل",
 "title": "تجهيز بيئة العمل: تسطيب Flutter من الصفر",
 "subtitle": "Flutter SDK و flutter doctor والمحرر والجهاز اللي هتجرب عليه",
 "blocks": [
  {
   "type": "p",
   "text": "خلصنا أساسيات Dart، ودلوقتي هنجهز جهازك عشان تبني تطبيقات حقيقية. التسطيب بياخد شوية وقت (تحميلات كبيرة)، بس بيتعمل مرة واحدة."
  },
  {
   "type": "h",
   "text": "الخطوة 1: نزّل Flutter SDK"
  },
  {
   "type": "list",
   "items": [
    "ادخل على docs.flutter.dev/get-started/install واختار نظامك (Windows أو macOS أو Linux).",
    "حمّل ملف الـ SDK المضغوط وفك ضغطه في مكان سهل زي C:\\flutter على الويندوز (متختارش مكان فيه مسافات أو أذونات).",
    "ضيف فولدر `flutter\\bin` لمتغير البيئة PATH عشان أمر flutter يشتغل من أي terminal."
   ]
  },
  {
   "type": "h",
   "text": "الخطوة 2: أمر flutter doctor"
  },
  {
   "type": "p",
   "text": "أهم أمر في مرحلة التسطيب. بيفحص جهازك وبيقولك إيه الناقص بالظبط:"
  },
  {
   "type": "code",
   "code": "flutter doctor"
  },
  {
   "type": "p",
   "text": "هتلاقي قايمة فيها علامات ✓ أو ✗: Flutter نفسه، Android toolchain، Chrome (للتجربة على الويب)، Visual Studio أو Xcode حسب نظامك. هدفك توصل لعلامات خضرا على الأقل في Flutter و Android toolchain و Chrome."
  },
  {
   "type": "note",
   "text": "لو ظهرلك مشكلة في Android licenses، الحل أمر واحد: `flutter doctor --android-licenses` ووافق على كل حاجة بـ y."
  },
  {
   "type": "h",
   "text": "الخطوة 3: المحرر"
  },
  {
   "type": "p",
   "text": "أشهر اختيارين: `VS Code` (خفيف وسريع) أو `Android Studio` (أثقل لكن متكامل). الاتنين شغالين كويس جداً مع Flutter. في الاتنين، نزّل extension اسمه Flutter من سوق الإضافات, هيضيف معاها extension الخاص بـ Dart لوحده، وهيديك إكمال تلقائي وزرار Run وتصحيح أخطاء."
  },
  {
   "type": "h",
   "text": "الخطوة 4: جهاز تجرب عليه"
  },
  {
   "type": "p",
   "text": "عندك تلات خيارات، أي واحد فيهم يكفي:"
  },
  {
   "type": "list",
   "items": [
    "موبايلك الحقيقي: فعّل Developer options و USB debugging من إعدادات الموبايل ووصله بالكمبيوتر بكابل USB.",
    "محاكي Android (Emulator): بيتسطب من جوه Android Studio، بيشتغل كموبايل افتراضي على الشاشة.",
    "المتصفح: `flutter run -d chrome` بيشغل التطبيق على الويب مباشرة, أسهل بداية لو مساحتك ضيقة."
   ]
  },
  {
   "type": "p",
   "text": "بعدها شغل `flutter doctor` تاني وتأكد إن جهازك ظهر. جاهز؟ الدرس الجاي هنعمل أول تطبيق."
  }
 ],
 "quiz": [
  {
   "q": "إيه وظيفة أمر `flutter doctor`؟",
   "options": [
    {
     "text": "بيفحص بيئة العمل ويقولك إيه الناقص عشان Flutter يشتغل"
    },
    {
     "text": "بيصلح أخطاء الكود في التطبيق تلقائياً ويعدل الملفات بنفسه"
    },
    {
     "text": "بينزل آخر نسخة من Dart"
    },
    {
     "text": "بيشغل التطبيق على الموبايل"
    }
   ],
   "answer": 0,
   "explain": "flutter doctor هو الدكتور بتاعك: يفحص كل مكون ويقولك إيه الشغل وإيه الناقص وإزاي تكمله."
  },
  {
   "q": "ليه بنضيف فولدر flutter\\bin للـ PATH؟",
   "options": [
    {
     "text": "عشان أمر flutter يشتغل من أي terminal من غير ما نكتب مساره كامل"
    },
    {
     "text": "عشان التطبيقات تشتغل أسرع وتستهلك رامات أقل على الجهاز"
    },
    {
     "text": "عشان Android Studio يلاقي المحرر ويفتح مشاريع Flutter تلقائي"
    },
    {
     "text": "مش خطوة مهمة، مجرد عادة عند ناس كتير، والأمر بيشتغل من غيرها"
    }
   ],
   "answer": 0,
   "explain": "الـ PATH هو قايمة الأماكن اللي النظام بيدور فيها على الأوامر. من غيره هتضطر تكتب المسار الكامل كل مرة."
  },
  {
   "q": "أسهل طريقة تشغل بيها أول تطبيق Flutter لو مفيش مساحة لمحاكي:",
   "options": [
    {
     "text": "flutter run -d chrome",
     "mono": true
    },
    {
     "text": "flutter install phone",
     "mono": true
    },
    {
     "text": "flutter buy emulator",
     "mono": true
    },
    {
     "text": "flutter doctor --web",
     "mono": true
    }
   ],
   "answer": 0,
   "explain": "الكورس معتمد على Flutter web للتجربة السريعة: أمر flutter run -d chrome بيشغل التطبيق في المتصفح مباشرة."
  }
 ],
 "exercises": [
  {
   "task": "على جهازك: نزّل Flutter SDK وظبط الـ PATH وبعدين شغل flutter doctor واكتب (أو صور) نتيجة الفحص.",
   "hint": "لو على ويندوز، فك الضغط في C:\\flutter وبعدين ابحث عن Edit environment variables من قائمة Start.",
   "code": "$ flutter doctor\nDoctor summary (to see all details, run flutter doctor -v):\n[✓] Flutter (Channel stable, 3.x.x, on Microsoft Windows ...)\n[✓] Android toolchain - develop for Android devices\n[✓] Chrome - develop for the web\n[!] Android Studio (not installed)\n...",
   "why": "الشكل ده تقريبي, المهم عندك إن Flutter و Android toolchain و Chrome بعلامة ✓. لو Android Studio ✗ وانت بتستخدم VS Code، مش مشكلة كبيرة في البداية."
  },
  {
   "task": "فعّل Developer options على موبايلك الأندرويد (أو جهز محاكي). اكتب الخطوات اللي عملتها بترتيبها.",
   "hint": "في أغلب الموبايلات: Settings ← About phone ← اضغط Build number سبع مرات.",
   "code": "خطوات نموذجية على أندرويد:\n1. Settings ← About phone ← Build number (اضغط 7 مرات)\n2. هتظهر رسالة \"You are now a developer!\"\n3. ارجع Settings ← Developer options\n4. فعّل USB debugging\n5. وصّل الموبايل بالكمبيوتر ووافق على رسالة السماح\n6. تأكد بأمر: flutter devices",
   "why": "أمر flutter devices بيعرض الأجهزة المتصلة. لو موبايلك ظهر في القايمة، انت جاهز للتشغيل عليه."
  }
 ]
},
{
 "id": "first-app",
 "nav": "أول تطبيق Flutter",
 "title": "أول تطبيق Flutter ليك: من flutter create للتشغيل",
 "subtitle": "إنشاء المشروع، فهم lib/main.dart، والتشغيل بـ hot reload",
 "blocks": [
  {
   "type": "p",
   "text": "جهازك جاهز؟ يلا نعمل أول تطبيق. أمر واحد بيخلق مشروع كامل شغال:"
  },
  {
   "type": "code",
   "code": "flutter create my_first_app\ncd my_first_app"
  },
  {
   "type": "p",
   "text": "بعدها شغل التطبيق على المتصفح (أو على موبايلك لو واصل):"
  },
  {
   "type": "code",
   "code": "flutter run -d chrome"
  },
  {
   "type": "p",
   "text": "هيفتحلك متصفح فيه تطبيق العداد الشهير: زرار + بيزود رقم. التطبيق ده جهز من غير سطر واحد منك, وده معناه إن البيئة شغالة 100%."
  },
  {
   "type": "h",
   "text": "شجرة المشروع: إيه الفولدرات دي؟"
  },
  {
   "type": "table",
   "head": [
    "المسار",
    "وظيفته"
   ],
   "rows": [
    [
     "lib/main.dart",
     "قلب التطبيق, الكود اللي انت هتكتبه هنا"
    ],
    [
     "pubspec.yaml",
     "ملف الإعدادات: اسم المشروع والـ packages"
    ],
    [
     "android/ و ios/",
     "مشاريع المنصات الجاهزة, نادراً ما هتلمسها دلوقتي"
    ],
    [
     "web/",
     "نسخة الويب, عشان كده chrome بيشتغل"
    ],
    [
     "test/",
     "اختبارات الكود"
    ]
   ]
  },
  {
   "type": "note",
   "text": "90% من وقتك هيقضي جوه فولدر `lib`. باقي الفولدرات هي اللي بتحول كودك لتطبيق حقيقي على كل منصة."
  },
  {
   "type": "h",
   "text": "نفكك main.dart سطر سطر"
  },
  {
   "type": "p",
   "text": "افتح `lib/main.dart`. أبسط تطبيق Flutter ممكن يتكتب كده:"
  },
  {
   "type": "code",
   "code": "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(const MyApp());\n}\n\nclass MyApp extends StatelessWidget {\n  const MyApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      home: Scaffold(\n        appBar: AppBar(title: const Text('أول تطبيق ليا')),\n        body: const Center(\n          child: Text('أهلاً يا Flutter!'),\n        ),\n      ),\n    );\n  }\n}"
  },
  {
   "type": "note",
   "warn": true,
   "text": "تنبيه لو نزلت أحدث إصدار Flutter: من Flutter 3.50 المكتبة `package:flutter/material.dart` اتصنفت deprecated، وممكن يظهرلك تحذير في المحرر. الكود في الكورس ده لسه بيشتغل بنفس الشكل. عشان تتخلص من التحذير شغل `dart fix --apply --code=migrate_design_widgets` وهو بيبدل الاستيراد لوحده، أو ضيف الباكدج `material_ui` وغير الاستيراد لـ `package:material_ui/material_ui.dart`. باقي الكود (Scaffold و Text وغيرهم) مفيش فيه أي تغيير."
  },
  {
   "type": "list",
   "items": [
    "`import`: بنجيب مكتبة Material, فيها كل الـ widgets الجاهزة بتصميم Google.",
    "`void main()`: نقطة البداية، زي أي برنامج Dart. بتنده `runApp` وتديلها أول widget.",
    "`MyApp`: كلاس بيمثل تطبيقك، وارث من `StatelessWidget` (هنشرحها بالتفصيل درس الجاي).",
    "دالة `build`: بترجع شجرة widgets بتوصف الشاشة. MaterialApp ← Scaffold ← AppBar و Center ← Text.",
    "`Scaffold`: الهيكل الأساسي للشاشة (شريط فوق وجسم تحت). هتشوفه في كل شاشة تقريباً."
   ]
  },
  {
   "type": "h",
   "text": "hot reload: صاحبك الجديد"
  },
  {
   "type": "p",
   "text": "والتطبيق شغال، غيّر نص الـ Text في الكود واحفظ الملف (Ctrl+S). هتلاقي التغيير ظهر في المتصفح في أقل من ثانية من غير ما التطبيق يقفل ويفتح. دي ميزة `hot reload`، وفي الـ terminal تقدر تضغط `r` لعمل reload يدوي و `R` لعمل hot restart (بيرجع الحالة للصفر)."
  },
  {
   "type": "note",
   "warn": true,
   "text": "hot reload مش بيعمل كل حاجة: لو غيرت منطق `initState` أو تعريف كلاس بشكل جذري، هتحتاج hot restart (حرف R كابيتال في الترمنال). القاعدة: لو التعديل مظهرش، اضغط R."
  }
 ],
 "quiz": [
  {
   "q": "فين بيتكتب كود تطبيقك الأساسي؟",
   "options": [
    {
     "text": "android/app",
     "mono": true
    },
    {
     "text": "lib/main.dart",
     "mono": true
    },
    {
     "text": "pubspec.yaml",
     "mono": true
    },
    {
     "text": "web/index.html",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "lib/main.dart هو قلب التطبيق. باقي الفولدرات خاصة بالمنصات والإعدادات."
  },
  {
   "q": "إيه وظيفة `runApp`؟",
   "options": [
    {
     "text": "بتحمل الـ packages المكتوبة في pubspec.yaml من الإنترنت للمشروع"
    },
    {
     "text": "بتشغل التطبيق وتعرض أول widget على الشاشة"
    },
    {
     "text": "بتنشر التطبيق على متجر Google Play بعد ما تفحص الإعدادات"
    },
    {
     "text": "بتفحص الأخطاء"
    }
   ],
   "answer": 1,
   "explain": "runApp بتوصل أول widget بمحرك Flutter عشان يبدأ يرسم واجهة التطبيق."
  },
  {
   "q": "عدلت نص في التطبيق وهو شغال والتعديل مظهرش بعد الحفظ. تعمل إيه؟",
   "options": [
    {
     "text": "تمسح المشروع كله وتبدأ من جديد عشان الكود القديم بيبوّظ التعديل"
    },
    {
     "text": "تضغط R في الترمنال لعمل hot restart"
    },
    {
     "text": "تقفل الكمبيوتر وتفتحه تاني وتعيد تشغيل Android Studio كله"
    },
    {
     "text": "تعيد تسطيب Flutter من الأول وتمسح فولدر الـ cache القديم"
    }
   ],
   "answer": 1,
   "explain": "hot restart (R كابيتال) بيعيد بناء التطبيق من أول main مع تصفير الحالة, بيحل أغلب الحالات اللي reload مش كافي فيها."
  }
 ],
 "exercises": [
  {
   "task": "اعمل مشروع جديد باسم hello_flutter وشغله، وبعدين غيّر نص الترحيب في main.dart لأي جملة باسمك واحفظ وشوف hot reload شغال.",
   "hint": "flutter create hello_flutter وبعدين flutter run -d chrome.",
   "code": "$ flutter create hello_flutter\n$ cd hello_flutter\n$ flutter run -d chrome\n\n# وبعدين في lib/main.dart غيّر:\n# const Text('أهلاً يا Flutter!')\n# لأي جملة فيها اسمك واحفظ Ctrl+S",
   "why": "لما تشوف الجملة بتتغير في المتصفح في أقل من ثانية، دي لحظة مهمة: دي دورة الشغل اللي هتعيش معاها في كل تطوير Flutter."
  },
  {
   "task": "في كود التطبيق البسيط فوق، حط النص الترحيبي جوه Container له لون خلفية و padding. ابحث في التوثيق عن خصائص Container.",
   "hint": "Container(color: Colors.blue, padding: EdgeInsets.all(16), child: ...)",
   "code": "body: Center(\n  child: Container(\n    color: Colors.blue,\n    padding: const EdgeInsets.all(16),\n    child: const Text(\n      'أهلاً يا Flutter!',\n      style: TextStyle(color: Colors.white),\n    ),\n  ),\n),",
   "why": "ده أول تعديل تصميمي حقيقي: لفيت الـ Text جوه Container وظبطت اللون والمساحة الداخلية. هنتعمق في Container درس الـ layouts."
  }
 ]
},
{
 "id": "widgets",
 "nav": "عقلية الـ Widgets",
 "title": "عقلية الـ Widgets: كل حاجة Widget",
 "subtitle": "شجرة الـ widgets و build والفرق بين Stateless و Stateful",
 "blocks": [
  {
   "type": "p",
   "text": "في Flutter في جملة هتسمعها كتير: \"كل حاجة widget\". النص widget، الزرار widget، المسافة الفاضية widget، الشاشة كلها widget، وحتى التطبيق نفسه widget. الواجهة بتتبني من widgets صغيرة بتتركب جوه بعض زي قطع الليجو."
  },
  {
   "type": "h",
   "text": "شجرة الـ widgets"
  },
  {
   "type": "p",
   "text": "لما بنكتب واجهة، بنرجع شجرة: كل widget ممكن يحتوي child واحد أو children كتير. شوف الشكل ده:"
  },
  {
   "type": "code",
   "code": "Scaffold\n└── AppBar\n│   └── Text('ملاحظاتي')\n└── body: Center\n    └── Column\n        ├── Icon(Icons.note)\n        ├── Text('مفيش ملاحظات لسه')\n        └── ElevatedButton\n            └── Text('ضيف أول ملاحظة')"
  },
  {
   "type": "p",
   "text": "Flutter بيرسم الشاشة من الشجرة دي. لما حاجة تتغير، بيبني الشجرة تاني (أو الجزء المتغير منها), وده شغال بسرعة كبيرة جداً."
  },
  {
   "type": "h",
   "text": "دالة build: بتوصف الشكل"
  },
  {
   "type": "p",
   "text": "كل widget عنده دالة اسمها `build` بترجع الـ widgets اللي تحته. لما Flutter محتاج يرسم الـ widget ده، بينده build وياخد النتيجة ويرسمها. انت مش بترسم بيكسل بيكسل, انت بتوصف الشكل وFlutter بيتكفل بالباقي. دي اسمها واجهة declarative (وصفية): بتقول \"عايز إيه\" مش \"اعمل إيه خطوة خطوة\"."
  },
  {
   "type": "h",
   "text": "StatelessWidget و StatefulWidget"
  },
  {
   "type": "table",
   "head": [
    "",
    "StatelessWidget",
    "StatefulWidget"
   ],
   "rows": [
    [
     "معناه",
     "widget شكلها ثابت، مفيش فيها حاجة بتتغير",
     "widget عندها state (حالة) ممكن تتغير"
    ],
    [
     "مثال",
     "شاشة \"عن التطبيق\" فيها نص ثابت",
     "عداد، فورم، قايمة بتتحدث"
    ],
    [
     "بتتبني إزاي",
     "class واحدة فيها build",
     "كلاسين: الـ widget و State فيها المتغيرات و build"
    ],
    [
     "التحديث",
     "مش بتتحدث لوحدها",
     "setState() بتعيد بناء الواجهة"
    ]
   ]
  },
  {
   "type": "code",
   "code": "// widget ثابتة: شكلها بيعتمد بس على اللي اتبعتلها\nclass WelcomeBanner extends StatelessWidget {\n  final String name;\n  const WelcomeBanner({super.key, required this.name});\n\n  @override\n  Widget build(BuildContext context) {\n    return Text('أهلاً يا $name');\n  }\n}"
  },
  {
   "type": "note",
   "text": "لاحظ `const` قبل كتير من الـ widgets: لما الـ widget ثابتة تماماً، const بيقول لـ Flutter \"دي مش هتتغير\" فيوفر في الأداء. لو نسيتها مش مشكلة، بس عادة كويسة."
  },
  {
   "type": "h",
   "text": "التركيب composition أهم من الوراثة"
  },
  {
   "type": "p",
   "text": "في Flutter مش بنعمل widgets عملاقة فيها كل حاجة. بنركب widgets صغيرة جوه بعض: Text جوه Center جوه Container جوه Column جوه Scaffold. لو شاشتك كبرت، قسّمها لـ widgets أصغر بأسماء معبرة. دي المهارة الحقيقية في بناء الواجهات."
  }
 ],
 "quiz": [
  {
   "q": "جملة \"كل حاجة widget\" معناها إيه؟",
   "options": [
    {
     "text": "إن Flutter مبيستخدمش إلا نوع بيانات واحد بس لكل عناصر الواجهة، فكل حاجة بتتكتب بنفس الطريقة"
    },
    {
     "text": "إن كل عنصر في الواجهة، من النص للشاشة كلها، هو widget بتركب جوه شجرة من widgets"
    },
    {
     "text": "إن الـ widgets بتتخزن في قاعدة بيانات وبتتحمل منها وقت التشغيل لما الشاشة تفتح"
    },
    {
     "text": "إن مفيش فرق بين تطبيقات Android و iOS خالص فمش محتاج تعدل حاجة في الواجهة أبداً"
    }
   ],
   "answer": 1,
   "explain": "الواجهة كلها شجرة widgets: النص والزرار والمسافات والشاشة نفسها كلها widgets بتركب جوه بعض."
  },
  {
   "q": "إمتى أختار StatefulWidget بدل StatelessWidget؟",
   "options": [
    {
     "text": "لما الـ widget تكون كبيرة في الحجم وفيها عناصر كتير جواها"
    },
    {
     "text": "لما في بيانات جوه الـ widget بتتغير والشاشة محتاجة تتحدث معاها"
    },
    {
     "text": "لما التطبيق يكون فيه أكتر من شاشة ونحتاج نتنقل بينهم"
    },
    {
     "text": "Stateful دايماً أحسن وأأمن، فاستخدمها في أي widget من غير تفكير"
    }
   ],
   "answer": 1,
   "explain": "StatefulWidget للحاجات اللي حالتها بتتغير (عداد، إدخال مستخدم، قايمة). الثابت يفضل Stateless, أبسط وأسرع."
  },
  {
   "q": "واجهة declarative يعني إيه؟",
   "options": [
    {
     "text": "إنك بترسم كل بيكسل في الشاشة بإيدك بإحداثيات وأوامر رسم مباشرة"
    },
    {
     "text": "إنك بتوصف الشكل المطلوب كشجرة widgets، وFlutter بيتكفل بإزاي يرسمه"
    },
    {
     "text": "إن الكود بيكون بالإنجليزي بس وبيتترجم للغات تانية وقت التشغيل"
    },
    {
     "text": "إنك مش بتكتب كود خالص، وبتختار التصميم من قوالب جاهزة بس"
    }
   ],
   "answer": 1,
   "explain": "بتقول للـ framework \"عايز إيه\" مش \"اعمل إيه خطوة خطوة\", وده بيخلي تحديث الواجهة سهل: غيّر الوصف والباقي على Flutter."
  }
 ],
 "exercises": [
  {
   "task": "ارسم (بإيدك على ورقة أو في تعليق كود) شجرة الـ widgets لشاشة فيها: AppBar بعنوان، وتحته Column فيها صورة ونص وزرارين جنب بعض في Row.",
   "hint": "ابدأ من Scaffold وانزل تحت. الزرارين جنب بعض يعني Row جواها زرارين.",
   "code": "Scaffold\n├── AppBar\n│   └── Text('معرض الصور')\n└── body: Column\n    ├── Image(...)\n    ├── Text('صورتي الأولى')\n    └── Row\n        ├── ElevatedButton(Text('أعجبني'))\n        └── ElevatedButton(Text('شارك'))",
   "why": "التدريب على رسم الشجرة قبل كتابة الكود هو بالظبط إزاي المطورين المحترفين بيفكروا في الواجهات."
  },
  {
   "task": "حوّل الشجرة اللي رسمتها في التمرين اللي فات لكود Dart حقيقي جوه build.",
   "hint": "Row بتاخد children: [] زي Column بالظبط.",
   "code": "@override\nWidget build(BuildContext context) {\n  return Scaffold(\n    appBar: AppBar(title: const Text('معرض الصور')),\n    body: Column(\n      children: [\n        Image.network('https://picsum.photos/300'),\n        const Text('صورتي الأولى'),\n        Row(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            ElevatedButton(onPressed: () {}, child: const Text('أعجبني')),\n            ElevatedButton(onPressed: () {}, child: const Text('شارك')),\n          ],\n        ),\n      ],\n    ),\n  );\n}",
   "why": "لاحظ إن كل سطر في الشجرة اللي رسمتها قابلته بـ widget في الكود بنفس الترتيب. كده الشجرة بتتحول لكود ميكانيكياً تقريباً."
  }
 ]
},
{
 "id": "layouts",
 "nav": "الـ Layouts: Row و Column",
 "title": "ترتيب الشاشة: Row و Column و Container",
 "subtitle": "المحاور والمحاذاة والمسافات وأشهر غلطة في الـ layout",
 "blocks": [
  {
   "type": "p",
   "text": "عرفنا إن الواجهة شجرة widgets. السؤال دلوقتي: إزاي أظبط مكان كل widget في الشجرة؟ الإجابة في تلاتة widgets هتستخدمهم كل يوم: `Row` و `Column` و `Container`."
  },
  {
   "type": "h",
   "text": "Column و Row: رصّ عمودي وأفقي"
  },
  {
   "type": "p",
   "text": "`Column` بترص العناصر تحت بعض (عمودي)، و `Row` بترصها جنب بعض (أفقي). الاتنين بياخدوا `children` قايمة من الـ widgets:"
  },
  {
   "type": "code",
   "code": "Column(\n  children: [\n    Text('العنوان'),\n    Text('سطر تحته'),\n    ElevatedButton(onPressed: () {}, child: Text('زرار')),\n  ],\n)"
  },
  {
   "type": "h",
   "text": "المحور الرئيسي والمحور العرضي"
  },
  {
   "type": "p",
   "text": "كل Row و Column ليها محورين: الـ main axis هو اتجاه الرص نفسه (أفقي في Row، عمودي في Column)، والـ cross axis هو العمودي عليه. المحاذاة بتتظبط بخاصيتين:"
  },
  {
   "type": "code",
   "code": "Row(\n  mainAxisAlignment: MainAxisAlignment.spaceBetween, // على المحور الرئيسي\n  crossAxisAlignment: CrossAxisAlignment.start,      // على المحور العرضي\n  children: [ ... ],\n)"
  },
  {
   "type": "table",
   "head": [
    "القيمة",
    "بتعمل إيه على المحور الرئيسي"
   ],
   "rows": [
    [
     "start",
     "تلزق العناصر في الأول"
    ],
    [
     "center",
     "توسّطهم"
    ],
    [
     "end",
     "تلزقهم في الآخر"
    ],
    [
     "spaceBetween",
     "توزعهم بمسافات بينهم بس"
    ],
    [
     "spaceAround",
     "مسافات حوالين كل عنصر"
    ],
    [
     "spaceEvenly",
     "مسافات متساوية في كل حتة"
    ]
   ]
  },
  {
   "type": "h",
   "text": "Container: علبة التنسيق متعددة الاستخدامات"
  },
  {
   "type": "p",
   "text": "`Container` هي الـ widget اللي بتدي اللي جواها لون وحجم ومسافات وحدود. أهم خاصيتين بيلخبطوا الناس: `padding` (مسافة داخلية بين الحدود والمحتوى) و `margin` (مسافة خارجية بين الـ Container واللي حواليها):"
  },
  {
   "type": "code",
   "code": "Container(\n  margin: const EdgeInsets.all(16),      // مسافة خارجية من كل الجهات\n  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),\n  decoration: BoxDecoration(\n    color: Colors.blue,\n    borderRadius: BorderRadius.circular(12),\n  ),\n  child: const Text('جوّه علبة زرقا', style: TextStyle(color: Colors.white)),\n)"
  },
  {
   "type": "note",
   "text": "لو محتاج مسافة فاضية بس بين عنصرين، في widget أخف اسمها `SizedBox`: `SizedBox(height: 20)` بتدي مسافة عمودية 20 بيكسل من غير أي لون أو حدود."
  },
  {
   "type": "h",
   "text": "Expanded: وزّع المساحة الباقية"
  },
  {
   "type": "p",
   "text": "جوه Row أو Column، لو عايز عنصر ياخد كل المساحة الفاضية، لفه بـ `Expanded`. مثال كلاسيكي: زرارين يملوا عرض الشاشة بالتساوي:"
  },
  {
   "type": "code",
   "code": "Row(\n  children: [\n    Expanded(child: ElevatedButton(onPressed: () {}, child: Text('موافق'))),\n    SizedBox(width: 12),\n    Expanded(child: OutlinedButton(onPressed: () {}, child: Text('إلغاء'))),\n  ],\n)"
  },
  {
   "type": "h",
   "text": "أشهر غلطة: الخطوط الصفرا والسودا"
  },
  {
   "type": "p",
   "text": "هتقابلك حتماً: شاشة فيها خطوط صفرا وسودا ورسالة `A RenderFlex overflowed`. معناها إن Row أو Column حاولت ترص عناصر أكبر من المساحة المتاحة. الحلول الشائعة: لف العنصر الكبير بـ `Expanded`، أو لف الـ Column كلها بـ `SingleChildScrollView` عشان الشاشة تعمل scroll، أو قلل أحجام العناصر."
  },
  {
   "type": "note",
   "warn": true,
   "text": "حطيت Column فيها عناصر كتير جوه Column تانية؟ Flutter مش هتعرف تحدد ارتفاع الداخلية وهيقع الخطأ الشهير unbounded height. الحل الغالب: Expanded أو ListView (درس القوائم الجاي)."
  }
 ],
 "quiz": [
  {
   "q": "عايز ترص تلات أيقونات جنب بعض أفقياً. تستخدم إيه؟",
   "options": [
    {
     "text": "Column",
     "mono": true
    },
    {
     "text": "Row",
     "mono": true
    },
    {
     "text": "Container",
     "mono": true
    },
    {
     "text": "Expanded",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "Row بترص children أفقياً جنب بعض. Column بترصهم تحت بعض."
  },
  {
   "q": "إيه الفرق بين padding و margin في Container؟",
   "options": [
    {
     "text": "مفيش فرق بينهم، اسمين مختلفين لنفس المسافة جوه حدود الـ Container، والنتيجة بتبقى واحدة في الشكل والأداء"
    },
    {
     "text": "padding مسافة داخلية بين حدود الـ Container والمحتوى، و margin مسافة خارجية بين الـ Container والعناصر اللي حواليه"
    },
    {
     "text": "padding بيتطبق على النصوص بس، و margin بيتطبق على الصور والأيقونات بس، ومينفعش الاتنين في نفس الـ Container"
    },
    {
     "text": "margin بيشتغل على Android بس، و padding بيشتغل على iOS بس، وده سبب إن الشكل بيختلف بين الجهازين"
    }
   ],
   "answer": 1,
   "explain": "padding جوه العلبة، margin بره العلبة. فكر في صندوق: padding سماكة الفوم اللي جواه، margin المسافة بينه وبين الصناديق التانية."
  },
  {
   "q": "ظهرت خطوط صفرا وسودا على الشاشة مع رسالة overflowed. المشكلة إيه؟",
   "options": [
    {
     "text": "إن الإنترنت فصل أثناء تحميل الشاشة فالعناصر معرفتش تتحمل"
    },
    {
     "text": "إن العناصر جوه Row أو Column أكبر من المساحة المتاحة"
    },
    {
     "text": "إن في فيروس في التطبيق بيرسم الخطوط دي بنفسه على الشاشة"
    },
    {
     "text": "إن نسخة Flutter قديمة ومحتاجة تتحدث عشان الواجهة تتعرض"
    }
   ],
   "answer": 1,
   "explain": "التحذير ده بيظهر لما الرص يتجاوز المساحة. الحلول: Expanded للعنصر الكبير، أو SingleChildScrollView للشاشة الطويلة."
  },
  {
   "q": "عايز زرار ياخد نص عرض الشاشة وزرار تاني جنبه ياخد النص التاني. تستخدم:",
   "options": [
    {
     "text": "Column فيها الزرارين، وكل واحد ياخد نص الارتفاع بدل العرض",
     "mono": true
    },
    {
     "text": "Row فيها كل زرار ملفوف بـ Expanded",
     "mono": true
    },
    {
     "text": "Container كبيرة بس",
     "mono": true
    },
    {
     "text": "SizedBox بعرض 50",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "Expanded بتوزع المساحة الباقية على المحور الرئيسي, اتنين Expanded متساويين يعني نصين بالظبط."
  }
 ],
 "exercises": [
  {
   "task": "ابني \"بطاقة تعريف\": Container فيه لون خلفية و padding، جواه Column فيها اسمك (نص كبير) ووظيفتك (نص صغير) و Row فيها أيقونة تليفون وأيقونة إيميل في الآخر.",
   "hint": "استخدم TextStyle(fontSize: 24) للاسم و MainAxisAlignment.end للـ Row.",
   "code": "Container(\n  margin: const EdgeInsets.all(16),\n  padding: const EdgeInsets.all(20),\n  decoration: BoxDecoration(\n    color: Colors.indigo,\n    borderRadius: BorderRadius.circular(16),\n  ),\n  child: Column(\n    crossAxisAlignment: CrossAxisAlignment.start,\n    children: [\n      const Text('أحمد وائل', style: TextStyle(fontSize: 24, color: Colors.white)),\n      const Text('Flutter Developer', style: TextStyle(color: Colors.white70)),\n      const SizedBox(height: 12),\n      Row(\n        mainAxisAlignment: MainAxisAlignment.end,\n        children: const [\n          Icon(Icons.phone, color: Colors.white),\n          SizedBox(width: 8),\n          Icon(Icons.email, color: Colors.white),\n        ],\n      ),\n    ],\n  ),\n)",
   "why": "الكارت ده بيجمع كل اللي اتعلمناه: Container للتنسيق، Column للرص العمودي، Row للأفقي، ومحاذاة على المحورين."
  },
  {
   "task": "عندك Column فيها 20 Text والشاشة بتقع بخطأ overflow. صلح الكود بأبسط تعديل.",
   "hint": "المشكلة إن Column مش بتعمل scroll لوحدها.",
   "code": "// قبل:\n// Column(children: [ ...20 عنصر... ])\n\n// بعد:\nSingleChildScrollView(\n  child: Column(\n    children: [ /* نفس العناصر */ ],\n  ),\n)",
   "why": "SingleChildScrollView بتخلي المحتوى كله قابل للسكرول. لاحظ: لو العناصر كتير جداً (مئات) الأفضل ListView, وده درسنا الجاي."
  }
 ]
}
);
