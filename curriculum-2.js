/* Curriculum part 2: القوائم، التنقل، الـ state، الفورمز، الثيمات، packages، المشروع الختامي */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
 "id": "lists",
 "nav": "القوائم ListView",
 "title": "عرض القوائم: ListView و ListView.builder",
 "subtitle": "إزاي تعرض قوائم طويلة بكفاءة وتبني عناصرها ديناميكياً",
 "blocks": [
  {
   "type": "p",
   "text": "تقريباً كل تطبيق فيه قايمة: رسايل، منتجات، ملاحظات، أصحاب. Flutter عندها Widget مخصصة لده اسمها `ListView`، وأهم حاجة فيها إنها بتعمل scroll لوحدها ومش بتقع بمشاكل overflow زي Column."
  },
  {
   "type": "h",
   "text": "ListView العادية: للقوائم القصيرة"
  },
  {
   "type": "code",
   "code": "ListView(\n  children: [\n    ListTile(leading: Icon(Icons.person), title: Text('علي')),\n    ListTile(leading: Icon(Icons.person), title: Text('منى')),\n    ListTile(leading: Icon(Icons.person), title: Text('سامي')),\n  ],\n)"
  },
  {
   "type": "p",
   "text": "`ListTile` هي widget جاهزة لصفوف القوائم: `leading` (أيقونة أو صورة في الأول)، `title` (العنوان الرئيسي)، `subtitle` (سطر تاني أصغر)، `trailing` (حاجة في الآخر زي سهم)، و `onTap` (اللي يحصل لما تدوس عليها)."
  },
  {
   "type": "h",
   "text": "ListView.builder: للقوائم الطويلة"
  },
  {
   "type": "p",
   "text": "لو عندك 1000 عنصر، مش هتكتبهم بإيدك، ومش صح تحملهم كلهم مرة واحدة. `ListView.builder` بتبني العنصر لما يحتاج يظهر على الشاشة بس, دي اسمها lazy loading:"
  },
  {
   "type": "code",
   "code": "final tasks = ['أذاكر Dart', 'أعمل مشروع', 'أراجع الكود', 'أنام بدري'];\n\nListView.builder(\n  itemCount: tasks.length,\n  itemBuilder: (context, index) {\n    return ListTile(\n      leading: CircleAvatar(child: Text('${index + 1}')),\n      title: Text(tasks[index]),\n    );\n  },\n)"
  },
  {
   "type": "p",
   "text": "دالة `itemBuilder` بتتنده لكل عنصر ظاهر، وبتوصلها قيمة `index`, تستخدمها عشان تجيب البيانات المناسبة من قايمتك."
  },
  {
   "type": "note",
   "text": "لاحظ السهم في `(context, index) { ... }`: دي function بتتبعت كـ parameter. اسمها callback، وهتشوفها في كل حتة في Flutter: onPressed و itemBuilder وغيرهم."
  },
  {
   "type": "h",
   "text": "قايمة ديناميكية من بيانات"
  },
  {
   "type": "p",
   "text": "في الواقع العملي، البيانات بتيجي من قايمة Dart زي اللي اتعلمناها في درس Dart. تقدر كمان تعمل class بيمثل العنصر الواحد:"
  },
  {
   "type": "code",
   "code": "class Task {\n  final String title;\n  final bool done;\n  const Task(this.title, this.done);\n}\n\nfinal tasks = [\n  Task('أذاكر Dart', true),\n  Task('أعمل مشروع', false),\n];"
  },
  {
   "type": "p",
   "text": "وبعدين في الـ itemBuilder تبني شكل مختلف حسب حالة العنصر, مثلاً نص مشطوب لو المهمة خلصت. دي الفكرة اللي هنكمل عليها في المشروع الختامي."
  }
 ],
 "quiz": [
  {
   "q": "ليه ListView.builder أحسن من ListView العادية للقوائم الطويلة؟",
   "options": [
    {
     "text": "لأنها بتبني العناصر عند الحاجة بس (اللي ظاهر على الشاشة) فبتوفر ذاكرة وأداء"
    },
    {
     "text": "لأنها شكلها أحلى وأسرع في الأنيميشن من ListView العادية، وبتدعم تأثيرات مش موجودة في العادية"
    },
    {
     "text": "لأنها الوحيدة اللي بتعمل scroll، والـ ListView العادية مبتتحركش لو القايمة طويلة"
    },
    {
     "text": "مفيش فرق بينهم في الأداء، دي مجرد طريقة تانية للكتابة بنفس الاستهلاك للذاكرة"
    }
   ],
   "answer": 0,
   "explain": "builder بتعمل lazy loading: العناصر بتتبني لما تقرب تظهر. القايمة العادية بتبني كل حاجة مرة واحدة, كارثة مع آلاف العناصر."
  },
  {
   "q": "في itemBuilder، المتغير index بيمثل إيه؟",
   "options": [
    {
     "text": "رقم العنصر اللي بيتبني دلوقتي في القايمة (من صفر)"
    },
    {
     "text": "عدد العناصر الكلي في القايمة اللي بتتعرض على الشاشة"
    },
    {
     "text": "مكان الـ widget على الشاشة بالبيكسل من الحافة العلوية"
    },
    {
     "text": "اسم الـ ListView اللي بتبني عناصرها جوه الـ itemBuilder"
    }
   ],
   "answer": 0,
   "explain": "itemBuilder بتتنده لكل عنصر مع رقمه index، وانت بتستخدمه عشان تجيب tasks[index] مثلاً."
  },
  {
   "q": "إيه الـ widget الجاهزة اللي بتديك صف قايمة فيه أيقونة وعنوان وسطر تاني وسهم؟",
   "options": [
    {
     "text": "Container",
     "mono": true
    },
    {
     "text": "ListTile",
     "mono": true
    },
    {
     "text": "Row",
     "mono": true
    },
    {
     "text": "Card",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "ListTile معمولة بالظبط لصفوف القوائم: leading و title و subtitle و trailing و onTap جاهزين."
  }
 ],
 "exercises": [
  {
   "task": "عندك قايمة أسماء 5 أصحابك. اعرضهم في ListView.builder، وكل صف فيه CircleAvatar فيها أول حرف من الاسم و ListTile فيها الاسم.",
   "hint": "أول حرف من الاسم: names[index][0].",
   "code": "final names = ['علي', 'منى', 'سامي', 'هبة', 'كريم'];\n\nListView.builder(\n  itemCount: names.length,\n  itemBuilder: (context, index) {\n    return ListTile(\n      leading: CircleAvatar(child: Text(names[index][0])),\n      title: Text(names[index]),\n    );\n  },\n)",
   "why": "دي أشهر بنية قائمة في التطبيقات الحقيقية: avatar + عنوان. لاحظ إزاي index بيربط الكود بالبيانات."
  },
  {
   "task": "ضيف سطر تحت العنوان (subtitle) يعرض \"صديق رقم N\" حيث N هو رقم الصف من 1 مش من 0.",
   "hint": "index بتبدأ من صفر، فزود 1 باستخدام interpolation.",
   "code": "itemBuilder: (context, index) {\n  return ListTile(\n    leading: CircleAvatar(child: Text(names[index][0])),\n    title: Text(names[index]),\n    subtitle: Text('صديق رقم ${index + 1}'),\n  );\n}",
   "why": "التحويل من index (من صفر) لرقم مفهوم للناس (من 1) بيتعمل بـ ${index + 1}, interpolation جوه نص زي ما اتعلمنا في Dart."
  }
 ]
},
{
 "id": "navigation",
 "nav": "التنقل بين الشاشات",
 "title": "التنقل بين الشاشات: Navigator",
 "subtitle": "push و pop وإرسال البيانات بين الشاشات واستقبال النتايج",
 "blocks": [
  {
   "type": "p",
   "text": "التطبيق الحقيقي مش شاشة واحدة: شاشة قايمة، شاشة تفاصيل، شاشة إعدادات. الانتقال بينهم في Flutter بيتعمل بـ `Navigator`، وفكرته بسيطة: شاشاتك متكومة فوق بعض زي الكروت (stack). لما تفتح شاشة جديدة بتتحط فوق (push)، ولما ترجع بتتشال (pop)."
  },
  {
   "type": "h",
   "text": "افتح شاشة جديدة: push"
  },
  {
   "type": "p",
   "text": "أول حاجة بنعمل كلاس للشاشة الجديدة, هي في الآخر widget عادية فيها Scaffold:"
  },
  {
   "type": "code",
   "code": "class DetailsScreen extends StatelessWidget {\n  const DetailsScreen({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('التفاصيل')),\n      body: const Center(child: Text('دي شاشة التفاصيل')),\n    );\n  }\n}"
  },
  {
   "type": "p",
   "text": "ومن أي زرار في الشاشة الأولى، بنفتحها كده:"
  },
  {
   "type": "code",
   "code": "onPressed: () {\n  Navigator.push(\n    context,\n    MaterialPageRoute(builder: (context) => const DetailsScreen()),\n  );\n}"
  },
  {
   "type": "p",
   "text": "بلاقي تلقائياً سهم رجوع في الـ AppBar, Flutter بتضيفه لوحدها لما تفتح شاشة بـ push. ولو عايز ترجع بالكود:"
  },
  {
   "type": "code",
   "code": "onPressed: () {\n  Navigator.pop(context);\n}"
  },
  {
   "type": "h",
   "text": "ابعت بيانات للشاشة الجديدة"
  },
  {
   "type": "p",
   "text": "أشهر طريقة: ابعت البيانات في الـ constructor بتاع الشاشة. مثلاً شاشة تفاصيل بتعرض اسم مهمة معينة:"
  },
  {
   "type": "code",
   "code": "class DetailsScreen extends StatelessWidget {\n  final String taskTitle;\n  const DetailsScreen({super.key, required this.taskTitle});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: Text(taskTitle)),\n      body: Center(child: Text('تفاصيل: $taskTitle')),\n    );\n  }\n}\n\n// ولما تفتحها:\nNavigator.push(\n  context,\n  MaterialPageRoute(\n    builder: (context) => DetailsScreen(taskTitle: tasks[index]),\n  ),\n);"
  },
  {
   "type": "h",
   "text": "ارجع بنتيجة من الشاشة: await و pop"
  },
  {
   "type": "p",
   "text": "أحياناً الشاشة الجديدة بترجع نتيجة (زي ملاحظة جديدة اتكتبت). بنستنى النتيجة بـ `await` ونرجعها من الشاشة التانية بـ `pop`:"
  },
  {
   "type": "code",
   "code": "// في الشاشة الأولى:\nfinal newNote = await Navigator.push<String>(\n  context,\n  MaterialPageRoute(builder: (context) => const AddNoteScreen()),\n);\nif (newNote != null) {\n  // ضيف الملاحظة للقايمة\n}\n\n// في شاشة الإضافة، لما المستخدم يحفظ:\nNavigator.pop(context, noteText);"
  },
  {
   "type": "note",
   "warn": true,
   "text": "`await` معناها إن الكود هيوقف هنا لحد ما الشاشة التانية تقفل بـ pop. عشان تستخدمها، الدالة اللي حواليها لازم تكون متعلمة بـ `async`. هنشوف ده شغال بالتفصيل في المشروع الختامي."
  }
 ],
 "quiz": [
  {
   "q": "فكرة Navigator الأساسية إن الشاشات:",
   "options": [
    {
     "text": "متكومة فوق بعض (stack): push بيضيف شاشة فوق و pop بيشيلها ويرجعك للي قبلها"
    },
    {
     "text": "بتتخزن في قاعدة بيانات وبتتحمل منها لما المستخدم يفتح الصفحة، وبتتحفظ بعد قفل التطبيق"
    },
    {
     "text": "بتتبدل بشكل عشوائي كل ما المستخدم يضغط على زرار جديد، فمفيش ترتيب ثابت للرجوع"
    },
    {
     "text": "بتتحمل من الإنترنت كل مرة بدل ما تتحفظ على الجهاز، وده بيخليها بطيئة"
    }
   ],
   "answer": 0,
   "explain": "زي كومة كروت: push يحط كارت فوق، pop يشيله ويرجعك للكارت اللي تحته."
  },
  {
   "q": "أسهل طريقة تبعت بيها نص من شاشة لشاشة تانية:",
   "options": [
    {
     "text": "تحفظه في ملف على الجهاز وتقراه من الشاشة التانية"
    },
    {
     "text": "تبعته كـ parameter في constructor الشاشة الجديدة"
    },
    {
     "text": "تطبعه بـ print والشاشة التانية تقراه"
    },
    {
     "text": "مش ممكن إرسال بيانات بين الشاشات"
    }
   ],
   "answer": 1,
   "explain": "الشاشة في الآخر widget عادية: بعت البيانات في الـ constructor، زي أي widget بتستقبل قيم."
  },
  {
   "q": "عايز ترجع من شاشة الإضافة بنص الملاحظة الجديدة للشاشة الأولى. تستخدم:",
   "options": [
    {
     "text": "Navigator.pop(context, noteText)",
     "mono": true
    },
    {
     "text": "Navigator.push(context, noteText)",
     "mono": true
    },
    {
     "text": "print(noteText); Navigator.pop(context)",
     "mono": true
    },
    {
     "text": "Navigator.delete(context, noteText)",
     "mono": true
    }
   ],
   "answer": 0,
   "explain": "pop بتاخد قيمة تانية اختيارية هي النتيجة، والشاشة الأولى بتستقبلها لما تستنى بـ await."
  }
 ],
 "exercises": [
  {
   "task": "اكتب كود زرار في شاشة رئيسية يفتح شاشة SettingsScreen (اعمل الكلاس بنفسك فيها AppBar ونص في النص).",
   "hint": "الشاشة الجديدة StatelessWidget فيها Scaffold، والفتح بـ Navigator.push.",
   "code": "class SettingsScreen extends StatelessWidget {\n  const SettingsScreen({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('الإعدادات')),\n      body: const Center(child: Text('هنا إعدادات التطبيق')),\n    );\n  }\n}\n\n// الزرار في الشاشة الرئيسية:\nElevatedButton(\n  onPressed: () {\n    Navigator.push(\n      context,\n      MaterialPageRoute(builder: (context) => const SettingsScreen()),\n    );\n  },\n  child: const Text('افتح الإعدادات'),\n)",
   "why": "لاحظ إنك مش محتاج تكتب زرار رجوع, AppBar بتضيفه لوحدها لما تكون الشاشة مفتوحة بـ push."
  },
  {
   "task": "عدّل شاشة التفاصيل بحيث تستقبل رقم المهمة واسمها مع بعض، واعرضهم.",
   "hint": "constructor بياخد parameterين: final int number و final String title.",
   "code": "class DetailsScreen extends StatelessWidget {\n  final int number;\n  final String title;\n  const DetailsScreen({super.key, required this.number, required this.title});\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: Text('مهمة رقم $number')),\n      body: Center(child: Text(title, style: const TextStyle(fontSize: 22))),\n    );\n  }\n}\n\n// الفتح:\nNavigator.push(\n  context,\n  MaterialPageRoute(\n    builder: (context) => DetailsScreen(number: index + 1, title: tasks[index]),\n  ),\n);",
   "why": "أي عدد من الـ parameters يتبعت في الـ constructor. دي نفس فكرة required اللي شفناها في درس الـ widgets."
  }
 ]
},
{
 "id": "state",
 "nav": "الـ State و setState",
 "title": "الحالة State: إزاي الشاشة بتتحدث",
 "subtitle": "StatefulWidget من جوه و setState وإزاي نفكر في البيانات المتغيرة",
 "blocks": [
  {
   "type": "p",
   "text": "لحد دلوقتي كل شاشاتنا كانت ثابتة. بس التطبيقات الحقيقية فيها حاجات بتتغير: عداد بيزيد، checkbox بتتعلم، قايمة بتتحدث. البيانات المتغيرة دي اسمها state (حالة)، وإدارتها هي قلب شغل Flutter."
  },
  {
   "type": "h",
   "text": "الفكرة في جملة: الواجهة = دالة من الحالة"
  },
  {
   "type": "p",
   "text": "في Flutter الواجهة بتعكس الحالة الحالية. لما الحالة تتغير، انت مش بتعدل الواجهة بإيدك, انت بتقول لـ Flutter \"الحالة اتغيرت\" وهي بتعيد بناء الواجهة لوحدها. الأمر اللي بيقول كده اسمه `setState`."
  },
  {
   "type": "h",
   "text": "StatefulWidget من جوه"
  },
  {
   "type": "p",
   "text": "الـ StatefulWidget بتتكتب في كلاسين: الأول الـ widget نفسها (ثابتة)، والتاني كلاس الـ State اللي فيه المتغيرات المتغيرة ودالة build:"
  },
  {
   "type": "code",
   "code": "class CounterScreen extends StatefulWidget {\n  const CounterScreen({super.key});\n\n  @override\n  State<CounterScreen> createState() => _CounterScreenState();\n}\n\nclass _CounterScreenState extends State<CounterScreen> {\n  int count = 0; // دي الحالة\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('العداد')),\n      body: Center(\n        child: Text('العدد: $count', style: const TextStyle(fontSize: 40)),\n      ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: () {\n          setState(() {\n            count++;\n          });\n        },\n        child: const Icon(Icons.add),\n      ),\n    );\n  }\n}"
  },
  {
   "type": "p",
   "text": "السلسلة اللي بتحصل لما تدوس الزرار: `onPressed` بتتنده → جوه `setState` بنغير `count` → Flutter بتعيد تنفيذ `build` → الشاشة بتتحدث بالرقم الجديد. كل ده في أجزاء من الثانية."
  },
  {
   "type": "note",
   "warn": true,
   "text": "أشهر غلطة: تغير المتغير من غير setState زي `count++;` لوحده. القيمة هتتغير في الذاكرة بس الشاشة مش هتتحدث أبداً. القاعدة: أي تغيير لازم الشاشة تشوفه لازم يحصل جوه setState."
  },
  {
   "type": "h",
   "text": "ليه كلاسين؟ وليه المتغيرات في State؟"
  },
  {
   "type": "p",
   "text": "الـ widget نفسها ممكن تتدمر وتتبني من جديد كتير جداً أثناء شغل التطبيق، فلو الحالة متخزنة فيها هتضيع مع كل rebuild. عشان كده Flutter بتحتفظ بكلاس الـ State منفصل وثابت، والـ widget بس بتوصف الشكل. عشان كده بتلاقي بنية الـ StatefulWidget فيها `createState` بترجع نسخة من كلاس الـ State."
  },
  {
   "type": "h",
   "text": "فين نحط الحالة؟"
  },
  {
   "type": "p",
   "text": "قاعدة عملية: حط الحالة في أقرب مكان مشترك بين كل الـ widgets اللي محتاجاها. لو عداد في شاشة واحدة، حطه في شاشتها. لو بيانات محتاجاها شاشتين، ارفعها للـ widget الأب المشترك بينهم (وده اسمه lifting state up). في التطبيقات الكبيرة في أنظمة إدارة حالة متقدمة زي Provider و Riverpod, بس دي خطوة بعد الكورس ده."
  }
 ],
 "quiz": [
  {
   "q": "غيرت قيمة متغير والشاشة ماتحدثتش. السبب الأغلب:",
   "options": [
    {
     "text": "نسيت تحط التغيير جوه setState",
     "mono": true
    },
    {
     "text": "نسخة Flutter قديمة ولازم تتحدث عشان setState تشتغل صح"
    },
    {
     "text": "لازم تضغط R للـ hot restart"
    },
    {
     "text": "المتغير مش موجود أصلاً في الكلاس وده سبب إن القيمة متغيرتش"
    }
   ],
   "answer": 0,
   "explain": "setState هي اللي بتقول لـ Flutter تعيد بناء الواجهة. تغيير المتغير لوحده بيحصل في الذاكرة بس."
  },
  {
   "q": "في StatefulWidget، المتغيرات اللي بتتغير بتتخزن فين؟",
   "options": [
    {
     "text": "في كلاس الـ widget نفسها"
    },
    {
     "text": "في كلاس الـ State المنفصل"
    },
    {
     "text": "في ملف pubspec.yaml مع باقي الإعدادات الخاصة بالمشروع كله"
    },
    {
     "text": "في دالة build نفسها وبتتعرف من أول وجديد كل مرة بتتنده"
    }
   ],
   "answer": 1,
   "explain": "الـ widget بتتدمر وتتبني كتير، فالحالة بتعيش في كلاس الـ State الثابت عشان متضيعش."
  },
  {
   "q": "إيه اللي بيحصل لما setState بتتنده؟",
   "options": [
    {
     "text": "التطبيق بيقفل ويفتح من جديد عشان يطبق القيم الجديدة كلها"
    },
    {
     "text": "Flutter بتعيد تنفيذ دالة build فالشاشة بتتحدث بالقيم الجديدة"
    },
    {
     "text": "البيانات بتتبعت للسيرفر عشان يتأكد من القيم الجديدة بتاعتك"
    },
    {
     "text": "المتغيرات بترجع لقيمها الأولى وبتتمسح التعديلات اللي عملتها"
    }
   ],
   "answer": 1,
   "explain": "setState بتحجز rebuild: دالة build بتتنفذ تاني والواجهة بتتحدث بالحالة الجديدة, ده قلب فلسفة Flutter كلها."
  }
 ],
 "exercises": [
  {
   "task": "اعمل عداد فيه زرارين: واحد يزود وواحد ينقص، مع عرض الرقم الحالي في النص.",
   "hint": "زرارين بيغيروا نفس المتغير، كل واحد جوه setState لوحده.",
   "code": "class _CounterScreenState extends State<CounterScreen> {\n  int count = 0;\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: Center(\n        child: Row(\n          mainAxisAlignment: MainAxisAlignment.center,\n          children: [\n            IconButton(\n              onPressed: () => setState(() => count--),\n              icon: const Icon(Icons.remove),\n            ),\n            Text('$count', style: const TextStyle(fontSize: 40)),\n            IconButton(\n              onPressed: () => setState(() => count++),\n              icon: const Icon(Icons.add),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}",
   "why": "لاحظ الاختصار: لما الـ callback سطر واحد نقدر نكتبه بالسهم => بدل الأقواس. والاتنين بيستخدموا setState."
  },
  {
   "task": "ضيف زرار \"تصفير\" يرجع العداد لصفر، بس اظهره بس لما العداد أكبر من صفر.",
   "hint": "استخدم if جوه children قايمة الـ widgets, دي ميزة في Dart اسمها collection if.",
   "code": "Row(\n  mainAxisAlignment: MainAxisAlignment.center,\n  children: [\n    IconButton(\n      onPressed: () => setState(() => count--),\n      icon: const Icon(Icons.remove),\n    ),\n    Text('$count', style: const TextStyle(fontSize: 40)),\n    IconButton(\n      onPressed: () => setState(() => count++),\n      icon: const Icon(Icons.add),\n    ),\n    if (count > 0)\n      TextButton(\n        onPressed: () => setState(() => count = 0),\n        child: const Text('تصفير'),\n      ),\n  ],\n)",
   "why": "if جوه قايمة children بتظهر الـ widget بشرط. دي طريقة Flutter في إظهار وإخفاء العناصر, مش display: none زي الويب."
  }
 ]
},
{
 "id": "forms",
 "nav": "الفورمز والإدخال",
 "title": "الفورمز: TextField والتحقق من المدخلات",
 "subtitle": "إزاي تاخد إدخال من المستخدم وتتأكد إنه صح قبل الاستخدام",
 "blocks": [
  {
   "type": "p",
   "text": "تسجيل الدخول، البحث، إضافة ملاحظة, كلها فورمز. في Flutter أساس التعامل مع إدخال النص هو `TextField` مع صاحبه `TextEditingController`، وفوقهم نظام `Form` للتحقق من المدخلات قبل استخدامها."
  },
  {
   "type": "h",
   "text": "TextField و Controller"
  },
  {
   "type": "code",
   "code": "class _NoteScreenState extends State<NoteScreen> {\n  final noteController = TextEditingController();\n\n  @override\n  void dispose() {\n    noteController.dispose(); // مهم: نظف الـ controller لما الشاشة تتقفل\n    super.dispose();\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      body: Padding(\n        padding: const EdgeInsets.all(16),\n        child: Column(\n          children: [\n            TextField(\n              controller: noteController,\n              decoration: const InputDecoration(\n                labelText: 'اكتب ملاحظتك',\n                border: OutlineInputBorder(),\n              ),\n            ),\n            const SizedBox(height: 12),\n            ElevatedButton(\n              onPressed: () {\n                print('المستخدم كتب: ${noteController.text}');\n              },\n              child: const Text('احفظ'),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}"
  },
  {
   "type": "p",
   "text": "الـ `TextEditingController` هو حلقة الوصل بينك وبين حقل الإدخال: تقراه بـ `controller.text` وتغيره أو تمسحه بنفس الطريقة. و `InputDecoration` بتظبط شكل الحقل: label و hint وحدود."
  },
  {
   "type": "h",
   "text": "Form و validation: متقبلش أي حاجة"
  },
  {
   "type": "p",
   "text": "لو عندك فورم فيها أكتر من حقل وعايز تتأكد إن المستخدم ماسابش حاجة فاضية، استخدم `Form` مع `TextFormField` (نسخة الـ TextField اللي فيها تحقق مدمج) و `GlobalKey` بتوصل لحالة الفورم:"
  },
  {
   "type": "code",
   "code": "final formKey = GlobalKey<FormState>();\n\nForm(\n  key: formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        decoration: const InputDecoration(labelText: 'الاسم'),\n        validator: (value) {\n          if (value == null || value.isEmpty) {\n            return 'الاسم مطلوب';\n          }\n          return null; // null يعني مفيش مشكلة\n        },\n      ),\n      ElevatedButton(\n        onPressed: () {\n          if (formKey.currentState!.validate()) {\n            // كل الحقول صح, كمل\n          }\n        },\n        child: const Text('سجل'),\n      ),\n    ],\n  ),\n)"
  },
  {
   "type": "p",
   "text": "الـ `validator` بترجع رسالة الخطأ لو في مشكلة، أو `null` لو الحقل تمام. ولما تنده `validate()` بتنفذ كل الـ validators وتقولك الفورم سليمة ولا لأ."
  },
  {
   "type": "h",
   "text": "أزرار Flutter الأساسية"
  },
  {
   "type": "table",
   "head": [
    "الزرار",
    "استخدامه"
   ],
   "rows": [
    [
     "ElevatedButton",
     "الزرار الرئيسي البارز (حفظ، تأكيد)"
    ],
    [
     "OutlinedButton",
     "زرار ثانوي بحدود (إلغاء)"
    ],
    [
     "TextButton",
     "أخف زرار، زي اللينك"
    ],
    [
     "IconButton",
     "زرار أيقونة بس"
    ],
    [
     "FloatingActionButton",
     "الزرار الدائري العائم للإجراء الأساسي"
    ]
   ]
  },
  {
   "type": "note",
   "text": "عايز تبعت للمستخدم رسالة سريعة بعد الحفظ؟ استخدم `SnackBar`: `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(\"اتحفظت!\")));`, بتظهر شريط صغير تحت ويختفي لوحده."
  }
 ],
 "quiz": [
  {
   "q": "إزاي تقرا النص اللي المستخدم كتبه في TextField؟",
   "options": [
    {
     "text": "من الـ TextEditingController المربوط بالحقل: controller.text"
    },
    {
     "text": "الحقل بيبعت النص لوحده في إيميل أول ما المستخدم يكتب فيه"
    },
    {
     "text": "من الـ AppBar"
    },
    {
     "text": "مش ممكن تقراه إلا بعد ما المستخدم يضغط زرار الإرسال ويتخزن في ملف"
    }
   ],
   "answer": 0,
   "explain": "الـ controller هو حلقة الوصل: تقراه بـ controller.text وتمسحه بنفس الطريقة بعد الحفظ مثلاً."
  },
  {
   "q": "في TextFormField، الـ validator بترجع إيه لو الحقل سليم؟",
   "options": [
    {
     "text": "true",
     "mono": true
    },
    {
     "text": "null",
     "mono": true
    },
    {
     "text": "'تمام'",
     "mono": true
    },
    {
     "text": "0",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "null معناها مفيش خطأ. أي نص بترجعه بيظهر كرسالة خطأ تحت الحقل."
  },
  {
   "q": "إيه وظيفة formKey.currentState!.validate()؟",
   "options": [
    {
     "text": "بتمسح الفورم وبترجع كل الحقول فاضية كأن المستخدم لسه مكتبش حاجة"
    },
    {
     "text": "بتنفذ كل الـ validators وترجع true لو الفورم كلها سليمة"
    },
    {
     "text": "بتقفل التطبيق وبترجع بالمستخدم للشاشة الرئيسية بعد الفحص"
    },
    {
     "text": "بتحفظ البيانات في قاعدة البيانات مباشرة من غير فحص الحقول"
    }
   ],
   "answer": 1,
   "explain": "validate() بتشغل التحقق على كل الحقول مرة واحدة, لو رجعت true تقدر تكمل حفظ أو إرسال."
  }
 ],
 "exercises": [
  {
   "task": "اعمل فورم تسجيل دخول بسيطة: حقل إيميل وحقل باسورد (مخفي)، وزرار دخول يتحقق إن الاتنين مش فاضيين.",
   "hint": "obscureText: true بتخفي الباسورد، و validator لكل حقل.",
   "code": "final formKey = GlobalKey<FormState>();\n\nForm(\n  key: formKey,\n  child: Column(\n    children: [\n      TextFormField(\n        decoration: const InputDecoration(labelText: 'الإيميل'),\n        keyboardType: TextInputType.emailAddress,\n        validator: (v) => v == null || v.isEmpty ? 'الإيميل مطلوب' : null,\n      ),\n      const SizedBox(height: 12),\n      TextFormField(\n        decoration: const InputDecoration(labelText: 'كلمة السر'),\n        obscureText: true,\n        validator: (v) => v == null || v.isEmpty ? 'كلمة السر مطلوبة' : null,\n      ),\n      const SizedBox(height: 16),\n      ElevatedButton(\n        onPressed: () {\n          if (formKey.currentState!.validate()) {\n            ScaffoldMessenger.of(context).showSnackBar(\n              const SnackBar(content: Text('جاري تسجيل الدخول...')),\n            );\n          }\n        },\n        child: const Text('دخول'),\n      ),\n    ],\n  ),\n)",
   "why": "دي أبسط فورم حقيقية: حقول بتحقق، keyboardType مناسب للإيميل، و SnackBar كرد فعل. بنية هتتكرر في كل تطبيق."
  },
  {
   "task": "ضيف شرط إضافي: كلمة السر لازم تكون 6 حروف على الأقل، واطبع رسالة مختلفة لو أقصر.",
   "hint": "افحص v.length قبل ما ترجع null.",
   "code": "validator: (v) {\n  if (v == null || v.isEmpty) {\n    return 'كلمة السر مطلوبة';\n  }\n  if (v.length < 6) {\n    return 'كلمة السر لازم تكون 6 حروف على الأقل';\n  }\n  return null;\n},",
   "why": "الـ validator بترجع أول مشكلة تلاقيها, الترتيب مهم: الأول الفحص الفاضي وبعدين الطول."
  }
 ]
},
{
 "id": "theming",
 "nav": "الثيمات والألوان",
 "title": "الثيمات: شكل موحد لتطبيقك كله",
 "subtitle": "ThemeData و ColorScheme والوضع الليلي واستخدام الثيم في أي widget",
 "blocks": [
  {
   "type": "p",
   "text": "لحد دلوقتي بنحدد الألوان والأحجام يدوي في كل widget. ده بيخلّي التطبيق مش متناسق، وأي تعديل في الهوية البصرية هيتكرر في 100 مكان. الحل: `ThemeData`, ملف واحد بيعرّف شكل تطبيقك كله من مكان واحد."
  },
  {
   "type": "h",
   "text": "ThemeData في MaterialApp"
  },
  {
   "type": "code",
   "code": "MaterialApp(\n  theme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),\n    useMaterial3: true,\n  ),\n  home: const HomeScreen(),\n)"
  },
  {
   "type": "p",
   "text": "أحلى حاجة في الموضوع: `ColorScheme.fromSeed` بتاخد لون واحد (الـ seed) وتولد منه نظام ألوان كامل متناسق, أساسي وثانوي وخلفيات, بناءً على مواصفة Material 3 بتاعة Google. مش محتاج تكون مصمم عشان تطلع بألوان حلوة."
  },
  {
   "type": "h",
   "text": "استخدم الثيم جوه الـ widgets"
  },
  {
   "type": "p",
   "text": "بدل ما تكتب لون صريح، اسأل الثيم الحالي عن اللون المناسب. كده لما تغير الثيم، كل حاجة هتتغير معاه:"
  },
  {
   "type": "code",
   "code": "Container(\n  color: Theme.of(context).colorScheme.primary,\n  child: Text(\n    'عنوان مهم',\n    style: Theme.of(context).textTheme.titleLarge,\n  ),\n)"
  },
  {
   "type": "p",
   "text": "`Theme.of(context)` بتوصلك للثيم المعرف فوق في الشجرة. استخدم `colorScheme.primary` و `colorScheme.surface` و `textTheme.titleLarge` وغيرهم بدل الألوان والأحجام الصريحة."
  },
  {
   "type": "h",
   "text": "الوضع الليلي dark mode"
  },
  {
   "type": "p",
   "text": "Flutter بيسهلها جداً: عرّف ثيم تاني لليلي وحدد إمتى يشتغل:"
  },
  {
   "type": "code",
   "code": "MaterialApp(\n  theme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),\n    useMaterial3: true,\n  ),\n  darkTheme: ThemeData(\n    colorScheme: ColorScheme.fromSeed(\n      seedColor: Colors.teal,\n      brightness: Brightness.dark,\n    ),\n    useMaterial3: true,\n  ),\n  themeMode: ThemeMode.system, // يتبع إعداد الجهاز\n  home: const HomeScreen(),\n)"
  },
  {
   "type": "note",
   "text": "لو استخدمت ألوان الثيم (زي colorScheme.primary) بدل ألوان صريحة (زي Colors.blue) في كل حتة، الوضع الليلي هيشتغل معاك من أول مرة من غير أي تعديل إضافي. دي أكبر فايدة للثيمات."
  },
  {
   "type": "h",
   "text": "الخطوط"
  },
  {
   "type": "p",
   "text": "الخط الافتراضي حلو، بس لو عايز شخصية لتطبيقك، أسهل طريقة هي package اسمها `google_fonts` بتديك مئات الخطوط (منها خطوط عربية زي Cairo اللي الموقع ده نفسه مستخدمه). هنعرف إزاي نضيف packages في الدرس الجاي."
  }
 ],
 "quiz": [
  {
   "q": "إيه فايدة ColorScheme.fromSeed؟",
   "options": [
    {
     "text": "بتولد نظام ألوان كامل متناسق من لون واحد"
    },
    {
     "text": "بتزرع بيانات تجريبية في التطبيق عشان تختبر الشاشات بسرعة"
    },
    {
     "text": "بتختار لون عشوائي كل مرة بيتفتح فيها التطبيق من جديد"
    },
    {
     "text": "بتحول الألوان لصور"
    }
   ],
   "answer": 0,
   "explain": "من لون seed واحد بتطلعلك palette كاملة حسب Material 3, أساسي وثانوي وخلفيات ودرجاتهم."
  },
  {
   "q": "ليه نستخدم Theme.of(context).colorScheme.primary بدل Colors.blue الصريح؟",
   "options": [
    {
     "text": "لأن Colors.blue أبطأ في الأداء وبيعمل lag في الشاشة لما التطبيق يكبر ويبقى فيه ألوان كتير"
    },
    {
     "text": "عشان لما الثيم يتغير (زي الوضع الليلي) كل الألوان تتحدث لوحدها من مكان واحد"
    },
    {
     "text": "لأن Colors.blue اتشالت من Flutter في النسخ الجديدة ومبقتش شغالة ولازم نستخدم الثيم"
    },
    {
     "text": "مفيش فرق بين الاتنين، ودي عادة قديمة اتبعها المبرمجين زمان ومبقاش ليها لازمة"
    }
   ],
   "answer": 1,
   "explain": "الألوان الصريحة بتكسر التناسق والوضع الليلي. ألوان الثيم بتتبع التعريف المركزي في ThemeData."
  },
  {
   "q": "عايز التطبيق يتبع الوضع الليلي بتاع إعدادات الموبايل نفسه. تكتب:",
   "options": [
    {
     "text": "themeMode: ThemeMode.system",
     "mono": true
    },
    {
     "text": "darkMode: true, autoDetect: true",
     "mono": true
    },
    {
     "text": "night: yes, follow: system",
     "mono": true
    },
    {
     "text": "brightness: auto, mode: system",
     "mono": true
    }
   ],
   "answer": 0,
   "explain": "ThemeMode.system معناها اتبع إعداد الجهاز. ومحتاج طبعاً تعرف darkTheme عشان يكون في ثيم ليلي جاهز."
  }
 ],
 "exercises": [
  {
   "task": "غيّر تطبيق العداد الافتراضي لثيم بلون seed من اختيارك (مثلاً Colors.deepPurple) وشوف إزاي الزرار والـ AppBar اتلونوا لوحدهم.",
   "hint": "عدل ThemeData في main.dart وبعدين اعمل hot reload.",
   "code": "theme: ThemeData(\n  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),\n  useMaterial3: true,\n),",
   "why": "أول ما تحفظ، الـ FloatingActionButton والـ AppBar هيتلونوا بلون الـ seed ودرجاته تلقائياً, دي قوة الثيم المركزي."
  },
  {
   "task": "ضيف darkTheme لتطبيقك بنفس الـ seed بس Brightness.dark، وجرب الوضع الليلي من إعدادات المحاكي أو المتصفح.",
   "hint": "themeMode: ThemeMode.system يخلي التطبيق يتبع الجهاز.",
   "code": "darkTheme: ThemeData(\n  colorScheme: ColorScheme.fromSeed(\n    seedColor: Colors.deepPurple,\n    brightness: Brightness.dark,\n  ),\n  useMaterial3: true,\n),\nthemeMode: ThemeMode.system,",
   "why": "لو كنت مستخدم ألوان الثيم في شاشاتك، هتلاقي كل حاجة اتظبطت لوحدها في الليلي. لو في حتة لسه فاتحة، يبقى انت كاتب لون صريح هناك, دي علامة تدور عليها وتصلحها."
  }
 ]
},
{
 "id": "packages",
 "nav": "الـ Packages",
 "title": "الـ Packages: كود الناس التانية جاهز ليك",
 "subtitle": "pub.dev و pubspec.yaml وإضافة أول package وتجربتها",
 "blocks": [
  {
   "type": "p",
   "text": "محدش بيكتب كل حاجة من الصفر. عايز تجيب بيانات من الإنترنت؟ تفتح لينك في المتصفح؟ تحفظ إعدادات على الجهاز؟ في package جاهزة لكل دول، كتبها ناس تانية واختبرها آلاف المطورين. مكتبة الـ packages الرسمية لـ Dart و Flutter اسمها `pub.dev`."
  },
  {
   "type": "h",
   "text": "أضيف أول package"
  },
  {
   "type": "p",
   "text": "التعريف بيتم في ملف `pubspec.yaml` تحت قسم `dependencies`. أسهل طريقة للإضافة أمر واحد من الترمنال:"
  },
  {
   "type": "code",
   "code": "flutter pub add http"
  },
  {
   "type": "p",
   "text": "الأمر ده بيعدل pubspec.yaml لوحده وبينزل الـ package. شوف اللي حصل في الملف:"
  },
  {
   "type": "code",
   "code": "dependencies:\n  flutter:\n    sdk: flutter\n  http: ^1.2.0   # اتضافت لوحدها"
  },
  {
   "type": "p",
   "text": "ولو عدلت الملف بإيدك، لازم بعدها تشغل `flutter pub get` عشان ينزل المكتبات الجديدة."
  },
  {
   "type": "h",
   "text": "استخدم الـ package في الكود"
  },
  {
   "type": "p",
   "text": "بعد الإضافة، اعمل import واستخدمها. مثال: جيب بيانات من API باستخدام `http`:"
  },
  {
   "type": "code",
   "code": "import 'package:http/http.dart' as http;\nimport 'dart:convert';\n\nFuture<void> loadPost() async {\n  final response = await http.get(\n    Uri.parse('https://jsonplaceholder.typicode.com/posts/1'),\n  );\n  if (response.statusCode == 200) {\n    final data = jsonDecode(response.body);\n    print(data['title']);\n  } else {\n    print('حصل خطأ: ${response.statusCode}');\n  }\n}"
  },
  {
   "type": "note",
   "text": "كلمة `Future` و `async/await` دي طريقة Dart في التعامل مع العمليات اللي بتاخد وقت (زي طلبات الإنترنت): الكود بيكمل شغال ومبيستناش النتيجة على حساب باقي التطبيق، ولما النتيجة توصل بيكمل من عند await."
  },
  {
   "type": "h",
   "text": "أشهر packages هتحتاجها"
  },
  {
   "type": "table",
   "head": [
    "الـ package",
    "بتعمل إيه"
   ],
   "rows": [
    [
     "http",
     "طلبات إنترنت (APIs)"
    ],
    [
     "shared_preferences",
     "حفظ بيانات بسيطة على الجهاز"
    ],
    [
     "url_launcher",
     "فتح لينكات وتليفون وإيميل"
    ],
    [
     "google_fonts",
     "خطوط Google (فيها خطوط عربية)"
    ],
    [
     "provider",
     "إدارة حالة متقدمة"
    ],
    [
     "image_picker",
     "اختيار صور من الجهاز"
    ]
   ]
  },
  {
   "type": "h",
   "text": "إزاي تختار package كويسة على pub.dev"
  },
  {
   "type": "list",
   "items": [
    "شوف عدد الـ likes و الـ pub points, المؤشرات دي بتقولك مدى ثقة المجتمع فيها.",
    "اتأكد إنها متعلمة Flutter Favorite لو لقيت العلامة دي.",
    "شوف آخر تحديث: package متروكة من سنين ممكن تبوظ مع نسخ Flutter الجديدة.",
    "اقرا صفحة الـ README بتاعتها, فيها مثال استخدام جاهز في أغلب الحالات."
   ]
  },
  {
   "type": "note",
   "warn": true,
   "text": "كل package بتضيفها بتكبر حجم تطبيقك وبتزود سطح المشاكل المحتملة. القاعدة: لو الحاجة بسيطة وتقدر تكتبها بنفسك في سطور قليلة، اكتبها. استخدم packages للحاجات المعقدة أو المملة فعلاً."
  }
 ],
 "quiz": [
  {
   "q": "فين بتتعرف الـ packages اللي مشروعك بيستخدمها؟",
   "options": [
    {
     "text": "في ملف lib/main.dart جوه الدالة main قبل runApp مباشرة"
    },
    {
     "text": "في pubspec.yaml تحت dependencies"
    },
    {
     "text": "في ملف README اللي بيوصف المشروع للناس اللي هتقراه"
    },
    {
     "text": "في متجر التطبيقات اللي بيبقى مربوط بحساب المطور بتاعك"
    }
   ],
   "answer": 1,
   "explain": "pubspec.yaml هو ملف إعدادات المشروع، وقسم dependencies فيه كل المكتبات الخارجية وأرقام نسخها."
  },
  {
   "q": "عدلت pubspec.yaml بإيدك وضفت package. إيه الأمر اللي ينزلها؟",
   "options": [
    {
     "text": "flutter run --release",
     "mono": true
    },
    {
     "text": "flutter pub get",
     "mono": true
    },
    {
     "text": "flutter doctor -v",
     "mono": true
    },
    {
     "text": "flutter clean && flutter run",
     "mono": true
    }
   ],
   "answer": 1,
   "explain": "flutter pub get بيقرا الملف وينزل كل المكتبات المكتوبة فيه. (flutter pub add بتعمل الاتنين مع بعض: تعدل وتنزل.)"
  },
  {
   "q": "ليه بنستخدم async و await مع http.get؟",
   "options": [
    {
     "text": "عشان الكود يبقى أسرع في التنفيذ ويخلص الطلب في وقت أقل من غير ما نستنى السيرفر"
    },
    {
     "text": "لأن طلب الإنترنت بياخد وقت، و await بتخلي الكود يستنى النتيجة من غير ما يعلق باقي التطبيق"
    },
    {
     "text": "لأن Dart مش بتدعم طلبات الإنترنت من غيرهم وهتديك error في أول سطر بتكتبه"
    },
    {
     "text": "مجرد تقليد في الكتابة عند المبرمجين وملوش معنى حقيقي في الكود ولا تأثير على التشغيل"
    }
   ],
   "answer": 1,
   "explain": "العمليات البطيئة (شبكة، ملفات، قواعد بيانات) بترجع Future، و await بتستناها بشكل غير معطل للواجهة."
  }
 ],
 "exercises": [
  {
   "task": "ضيف package الـ http لمشروع تجريبي، واكتب كود يجيب عنوان أول post من jsonplaceholder ويعرضه في print.",
   "hint": "flutter pub add http وبعدين import والكود اللي في الدرس.",
   "code": "// في الترمنال:\n// flutter pub add http\n\nimport 'package:http/http.dart' as http;\nimport 'dart:convert';\n\nFuture<void> main() async {\n  final response = await http.get(\n    Uri.parse('https://jsonplaceholder.typicode.com/posts/1'),\n  );\n  final data = jsonDecode(response.body);\n  print(data['title']);\n}",
   "why": "jsonplaceholder.typicode.com هو API تجريبي مجاني معمول بالظبط للتعلم, محفوظ في بوك مارك كل مبرمج تقريباً."
  },
  {
   "task": "من غير ما تكتب كود: افتح pub.dev وادور على package مناسبة لكل حاجة من دول: (1) فتح لينك في المتصفح (2) حفظ تفضيلات المستخدم (3) تشغيل فيديو. اكتب اسم كل package.",
   "hint": "ابحث بكلمات إنجليزية بسيطة زي open url و save settings.",
   "code": "الإجابة النموذجية:\n1. url_launcher, لفتح اللينكات\n2. shared_preferences, لحفظ الإعدادات البسيطة\n3. video_player, لتشغيل الفيديوهات\n\n(التلاتة من الحزم الرسمية بتاعة فريق Flutter نفسه)",
   "why": "مهارة \"إزاي ألاقي الـ package الصح\" أهم من حفظ أسماء المكتبات: بحث كويس + قراءة الـ README + نظرة على الـ likes."
  }
 ]
},
{
 "id": "http-apis",
 "nav": "الـ HTTP والـ APIs",
 "title": "الـ HTTP والـ APIs: اجيب داتا حقيقية من الإنترنت",
 "subtitle": "Future و async/await و jsonDecode و FutureBuilder",
 "blocks": [
  {
   "type": "p",
   "text": "لحد دلوقتي كل الداتا في تطبيقاتنا مكتوبة جوه الكود. التطبيقات الحقيقية بتجيب داتاها من الإنترنت: أخبار، أسعار، منتجات، مستخدمين. المكان ده اسمه API: خدمة على سيرفر بترد على طلبات منظمة ببيانات منظمة، وأشهر صيغة للبيانات دي هي JSON."
  },
  {
   "type": "h",
   "text": "الـ Future: نتيجة جاية في السكة"
  },
  {
   "type": "p",
   "text": "طلب الإنترنت بياخد وقت (جزء من ثانية لثواني)، وFlutter مش بيوقف التطبيق كله يستنى. عشان كده أي عملية زي دي بترجع Future: وعد بقيمة هتوصل بعدين. بنستقبل الوعد ده بـ await جوه دالة معلمة بـ async، زي ما بنعمل بالظبط مع Navigator.push اللي بيرجع نتيجة."
  },
  {
   "type": "code",
   "code": "Future<String> fetchUserName() async {\n  await Future.delayed(Duration(seconds: 2)); // محاكاة طلب شبكة\n  return 'أحمد';\n}\n\nvoid main() async {\n  print('بنحمل...');\n  final name = await fetchUserName();\n  print(name); // بتتطبع بعد ثانيتين\n}"
  },
  {
   "type": "h",
   "text": "أول طلب HTTP حقيقي بـ package الـ http"
  },
  {
   "type": "p",
   "text": "ضيف الـ package في pubspec.yaml تحت dependencies: http: ^1.2.0 وبعدين اعمل flutter pub get. وفي أندرويد لازم إذن الإنترنت: افتح android/app/src/main/AndroidManifest.xml وضيف <uses-permission android:name=\"android.permission.INTERNET\"/> فوق الـ application tag. (الـ debug build فيه الإذن جاهز، بس الـ release لأ، ودي بتنسى فخليها في دماغك)."
  },
  {
   "type": "code",
   "code": "import 'dart:convert';\nimport 'package:http/http.dart' as http;\n\nFuture<List<dynamic>> fetchPosts() async {\n  final url = Uri.parse('https://jsonplaceholder.typicode.com/posts');\n  final response = await http.get(url);\n\n  if (response.statusCode == 200) {\n    return jsonDecode(response.body); // قائمة جاهزة من الـ JSON\n  } else {\n    throw Exception('السيرفر رد بـ ${response.statusCode}');\n  }\n}"
  },
  {
   "type": "p",
   "text": "التلات خطوات اللي بيتكرروا في كل API: (1) اعمل Uri من الـ String بـ Uri.parse، (2) ابعت الطلب بـ http.get واستنى الرد، (3) فك الرد من نص JSON لقوائم وخرائط Dart بـ jsonDecode. ولاحظ: نجاح الطلب مش معناه نجاح العملية، لازم تتأكد من statusCode بنفسك، 200 معناها تمام."
  },
  {
   "type": "h",
   "text": "العرض في الشاشة: FutureBuilder"
  },
  {
   "type": "code",
   "code": "FutureBuilder<List<dynamic>>(\n  future: fetchPosts(),\n  builder: (context, snapshot) {\n    if (snapshot.connectionState == ConnectionState.waiting) {\n      return Center(child: CircularProgressIndicator());\n    }\n    if (snapshot.hasError) {\n      return Center(child: Text('حصلت مشكلة، حاول تاني'));\n    }\n    final posts = snapshot.data!;\n    return ListView.builder(\n      itemCount: posts.length,\n      itemBuilder: (context, i) => ListTile(\n        title: Text(posts[i]['title']),\n      ),\n    );\n  },\n)"
  },
  {
   "type": "p",
   "text": "FutureBuilder بيراقب الـ Future ويعيد بناء الواجهة لما حالتها تتغير: لسه بيحمل؟ اعرض دايرة تحميل. حصل خطأ؟ اعرض رسالة لائقة. الداتا وصلت؟ اعرضها في ListView.builder زي ما اتعلمنا. دي دورة حياة أي شاشة فيها داتا من إنترنت، وحفظ الفكرة دي بيوفر عليك لخبطة كتير."
  },
  {
   "type": "note",
   "text": "غلطة شهيرة: تنادي fetchPosts() جوه build مباشرة. كل إعادة بناء للشاشة هتبعت طلب جديد! خزن الـ Future في متغير (في initState مثلاً) واديه لـ FutureBuilder."
  },
  {
   "type": "h",
   "text": "من JSON لكلاس Dart (في الشغل الجاد)"
  },
  {
   "type": "p",
   "text": "الوصول المباشر زي posts[i]['title'] شغال، بس أي غلطة في اسم الحقل مش هتظهر إلا وقت التشغيل. في المشاريع الجادة بنعمل كلاس (Model) فيه factory من اسمه fromJson بيحول الـ Map لكائن له خواص مكتوبة صح. الفكرة دي هتلاقيها في أي مشروع منشور، والـ packages زي json_serializable بتكتب الكود ده عنك."
  },
  {
   "type": "h",
   "text": "قواعد الشغل مع الـ APIs"
  },
  {
   "type": "list",
   "items": [
    "افترض إن الطلب ممكن يفشل دايماً: نت فاصل، سيرفر واقع، رد بطيء. try/catch ورسالة محترمة للمستخدم مش رفاهية.",
    "ماتحطش مفاتيح APIs سرية جوه كود التطبيق اللي هيتنشر: أي حد يفك التطبيق يشوفها.",
    "اقرأ الـ documentation بتاع الـ API الأول: شكل الرد، حدود الاستخدام (rate limits)، والمصادقة المطلوبة.",
    "JSONPlaceholder اللي استخدمناه هنا API تدريبي مجاني معمول عشان التجريب، مناسب جداً لأول مرة."
   ]
  }
 ],
 "quiz": [
  {
   "q": "ليه طلبات الإنترنت في Dart بترجع Future مش القيمة مباشرة؟",
   "options": [
    {
     "text": "لأن الطلب بياخد وقت، والـ Future وعد بقيمة هتوصل من غير ما توقف التطبيق كله"
    },
    {
     "text": "لأن الـ Future أسرع في التنفيذ من القيم العادية"
    },
    {
     "text": "لأن داتا الإنترنت دايماً مشفرة ولازم تتفك الأول"
    },
    {
     "text": "لأن Dart مبتدعمش القيم العادية في الدوال"
    }
   ],
   "answer": 0,
   "explain": "الشبكة بطيئة وغير مضمونة. الـ Future بيخلي التطبيق شغال ويرد على المستخدم لحد ما الرد يوصل، وبعدين بيسلملك القيمة."
  },
  {
   "q": "await بتشتغل فين بس؟",
   "options": [
    {
     "text": "جوا دالة معلمة بـ async"
    },
    {
     "text": "في أي سطر في الملف"
    },
    {
     "text": "جوا main بس"
    },
    {
     "text": "جوا build بس"
    }
   ],
   "answer": 0,
   "explain": "من غير async في تعريف الدالة، المترجم هيرفض await. دي أول غلطة هتقابلها لو نسيتها."
  },
  {
   "q": "response.statusCode == 200 معناها إيه؟",
   "options": [
    {
     "text": "الطلب نجح والسيرفر رد باللي المفروض نستخدمه"
    },
    {
     "text": "السيرفر مش لاقي الصفحة المطلوبة"
    },
    {
     "text": "الطلب اتبعت بس مفيش رد لسه"
    },
    {
     "text": "الإنترنت فصل في نص الطلب"
    }
   ],
   "answer": 0,
   "explain": "200 هو كود النجاح في HTTP. 404 مش موجود، 500 مشكلة في السيرفر نفسه. عشان كده منتحققش من الرد قبل ما نستخدمه."
  },
  {
   "q": "jsonDecode(response.body) بتعمل إيه؟",
   "options": [
    {
     "text": "بتحول نص الـ JSON لقوائم وخرائط Dart تقدر تتعامل معاها"
    },
    {
     "text": "بتضغط حجم الرد عشان يوفر باقة النت"
    },
    {
     "text": "بتشفر البيانات قبل ما تتخزن على الجهاز"
    },
    {
     "text": "بترسل الرد تاني للسيرفر للتأكيد"
    }
   ],
   "answer": 0,
   "explain": "الرد بيوصل كنص طويل. jsonDecode بيفكه لـ List و Map، فتقدر تكتب posts[i]['title'] عادي."
  },
  {
   "q": "إيه الحالات التلاتة اللي FutureBuilder بيخليك تتعامل معاهم في أي شاشة داتا؟",
   "options": [
    {
     "text": "التحميل (waiting)، الخطأ (hasError)، ووصول الداتا (hasData)"
    },
    {
     "text": "البداية والنص والنهاية"
    },
    {
     "text": "فتح التطبيق وقفله وتحديثه"
    },
    {
     "text": "الواي فاي وباقة الموبايل ووضع الطيران"
    }
   ],
   "answer": 0,
   "explain": "أي شاشة فيها طلب شبكة ليها التلات حالات دول. FutureBuilder بيديك snapshot تفحصه وتقرر يظهر إيه في كل واحدة."
  },
  {
   "q": "ليه غلط ننادي دالة الـ fetch جوه build مباشرة؟",
   "options": [
    {
     "text": "لأن build بتتنادى كتير مع كل تحديث للشاشة، فهيبتتبعت طلبات مكررة من غير داعي"
    },
    {
     "text": "لأن build مبتقبلش دوال أصلاً"
    },
    {
     "text": "لأن الطلبات جوه build بتتنفذ على موبايل المستخدم بس"
    },
    {
     "text": "مفيش مشكلة، دي الطريقة الرسمية الموصى بيها"
    }
   ],
   "answer": 0,
   "explain": "الحل: اعمل الـ Future مرة واحدة (في initState مثلاً) وخزنه في متغير، وسلم المتغير ده لـ FutureBuilder."
  },
  {
   "q": "في أندرويد، إيه الإذن اللي لازم يتضاف عشان تطبيقك يقدر يوصل للإنترنت في نسخة الـ release؟",
   "options": [
    {
     "text": "uses-permission android.permission.INTERNET في ملف AndroidManifest.xml"
    },
    {
     "text": "uses-permission android.permission.CAMERA"
    },
    {
     "text": "مفيش إذن مطلوب أبداً للإنترنت"
    },
    {
     "text": "إذن خاص بيتاخد من جوجل بلاي بعد النشر"
    }
   ],
   "answer": 0,
   "explain": "نسخة الـ debug فيها الإذن جاهز عشان التجريب، بس الـ release لازم تضيفه بنفسك في الـ manifest وإلا الطلبات هتفشل في صمت."
  },
  {
   "q": "ليه الأفضل تعمل كلاس Model بـ fromJson بدل الوصول المباشر للـ Map؟",
   "options": [
    {
     "text": "عشان الأخطاء في أسماء الحقول تظهر وقت الكتابة مش وقت التشغيل، والكود يبقى أوضح"
    },
    {
     "text": "عشان الـ Map مبتتطبعش في الـ console"
    },
    {
     "text": "عشان الـ Model أسرع من الـ Map في الذاكرة دايماً"
    },
    {
     "text": "عشان Dart مش بتدعم الـ Map في التطبيقات المنشورة"
    }
   ],
   "answer": 0,
   "explain": "posts[i]['titel'] غلطة إملائية هتعدي عادي وتنفجر وقت التشغيل. في الـ Model، الخاصية ليها اسم ثابت والمترجم بيمسك الغلطات."
  }
 ],
 "exercises": [
  {
   "task": "افتح اللينك ده في متصفحك الأول وشوف شكل الرد بعينك: https://jsonplaceholder.typicode.com/users وبعدين اكتب دالة fetchUsers بترجع قائمة المستخدمين، واطبع اسم أول مستخدم في الـ console.",
   "hint": "الرد قائمة، كل عنصر فيها Map فيه name و email و company.",
   "code": "Future<List<dynamic>> fetchUsers() async {\n  final url = Uri.parse('https://jsonplaceholder.typicode.com/users');\n  final response = await http.get(url);\n  if (response.statusCode == 200) {\n    return jsonDecode(response.body);\n  }\n  throw Exception('فشل التحميل');\n}\n\n// في زرار أو initState:\nfinal users = await fetchUsers();\nprint(users[0]['name']);",
   "why": "شوف الرد في المتصفح الأول دي عادة مهمة: بتعرف شكل الداتا الحقيقي قبل ما تكتب سطر كود، بدل التخمين وتصحيح الأغلاط."
  },
  {
   "task": "ضيف شاشة في تطبيق الملاحظات بتاعك (أو تطبيق جديد) اسمها شاشة الأخبار، بتجيب posts من JSONPlaceholder وتعرض عناوينها في ListView مع مؤشر تحميل ورسالة خطأ.",
   "hint": "FutureBuilder + ListView.builder + CircularProgressIndicator، التلاتة اللي في الدرس.",
   "code": "// الهيكل الكامل:\n// 1. متغير future بيتعمل مرة واحدة في initState\n// 2. FutureBuilder بيفحص snapshot\n// 3. waiting -> CircularProgressIndicator\n// 4. hasError -> Text برسالة محترمة + زرار إعادة\n// 5. hasData -> ListView.builder بعناوين الـ posts",
   "why": "الشاشة دي قالب هتعيد استخدامه في أي تطبيق فيه داتا من إنترنت. نفذها مرة بإيدك وهتلاقي كل شاشة بعدها نفس الخطوات."
  }
 ]
},
{
 "id": "capstone",
 "nav": "المشروع الختامي",
 "title": "المشروع الختامي: تطبيق ملاحظات كامل",
 "subtitle": "هنبني تطبيق ملاحظات فيه شاشتين وقايمة وإضافة وحذف, بكل اللي اتعلمناه",
 "blocks": [
  {
   "type": "p",
   "text": "وصلت للنهاية! المشروع ده بيجمع كل اللي فات في تطبيق حقيقي واحد: تطبيق ملاحظات فيه شاشة رئيسية بقايمة الملاحظات (ListView.builder)، وشاشة إضافة ملاحظة (Form + TextField)، وتنقل بينهم بإرسال نتيجة (Navigator + await)، وتحديث القايمة (setState)، وثيم موحد (ThemeData)."
  },
  {
   "type": "h",
   "text": "الخطة قبل الكود"
  },
  {
   "type": "list",
   "items": [
    "موديل البيانات: كلاس `Note` فيه title.",
    "الشاشة الرئيسية `NotesScreen`: StatefulWidget فيها `List<String>` للملاحظات و ListView.builder لعرضها وحذفها.",
    "شاشة الإضافة `AddNoteScreen`: فورم فيها TextField وزرار حفظ بيرجع النص بـ pop.",
    "الفتح: زرار عائم بيعمل push ويستنى النتيجة بـ await ويضيفها للقايمة بـ setState.",
    "الثيم: seed color واحد مع دعم الوضع الليلي."
   ]
  },
  {
   "type": "h",
   "text": "الخطوة 1: نقطة البداية والثيم"
  },
  {
   "type": "code",
   "code": "import 'package:flutter/material.dart';\n\nvoid main() {\n  runApp(const NotesApp());\n}\n\nclass NotesApp extends StatelessWidget {\n  const NotesApp({super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return MaterialApp(\n      title: 'ملاحظاتي',\n      theme: ThemeData(\n        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),\n        useMaterial3: true,\n      ),\n      darkTheme: ThemeData(\n        colorScheme: ColorScheme.fromSeed(\n          seedColor: Colors.teal,\n          brightness: Brightness.dark,\n        ),\n        useMaterial3: true,\n      ),\n      home: const NotesScreen(),\n    );\n  }\n}"
  },
  {
   "type": "h",
   "text": "الخطوة 2: الشاشة الرئيسية والقايمة"
  },
  {
   "type": "code",
   "code": "class NotesScreen extends StatefulWidget {\n  const NotesScreen({super.key});\n\n  @override\n  State<NotesScreen> createState() => _NotesScreenState();\n}\n\nclass _NotesScreenState extends State<NotesScreen> {\n  final List<String> notes = [];\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('ملاحظاتي')),\n      body: notes.isEmpty\n          ? const Center(child: Text('مفيش ملاحظات لسه, دوس + وضيف أول واحدة'))\n          : ListView.builder(\n              itemCount: notes.length,\n              itemBuilder: (context, index) {\n                return ListTile(\n                  leading: CircleAvatar(child: Text('${index + 1}')),\n                  title: Text(notes[index]),\n                  trailing: IconButton(\n                    icon: const Icon(Icons.delete),\n                    onPressed: () {\n                      setState(() {\n                        notes.removeAt(index);\n                      });\n                    },\n                  ),\n                );\n              },\n            ),\n      floatingActionButton: FloatingActionButton(\n        onPressed: addNote,\n        child: const Icon(Icons.add),\n      ),\n    );\n  }\n\n  Future<void> addNote() async {\n    final newNote = await Navigator.push<String>(\n      context,\n      MaterialPageRoute(builder: (context) => const AddNoteScreen()),\n    );\n    if (newNote != null && newNote.isNotEmpty) {\n      setState(() {\n        notes.add(newNote);\n      });\n    }\n  }\n}"
  },
  {
   "type": "p",
   "text": "لاحظ تلات حاجات: (1) الشرط `notes.isEmpty` بيغير شكل الشاشة كلها حسب الحالة. (2) الحذف بـ `removeAt` جوه setState. (3) دالة `addNote` معلمة بـ async لأنها بتستنى نتيجة الشاشة التانية بـ await."
  },
  {
   "type": "h",
   "text": "الخطوة 3: شاشة الإضافة"
  },
  {
   "type": "code",
   "code": "class AddNoteScreen extends StatefulWidget {\n  const AddNoteScreen({super.key});\n\n  @override\n  State<AddNoteScreen> createState() => _AddNoteScreenState();\n}\n\nclass _AddNoteScreenState extends State<AddNoteScreen> {\n  final controller = TextEditingController();\n\n  @override\n  void dispose() {\n    controller.dispose();\n    super.dispose();\n  }\n\n  @override\n  Widget build(BuildContext context) {\n    return Scaffold(\n      appBar: AppBar(title: const Text('ملاحظة جديدة')),\n      body: Padding(\n        padding: const EdgeInsets.all(16),\n        child: Column(\n          children: [\n            TextField(\n              controller: controller,\n              autofocus: true,\n              maxLines: 4,\n              decoration: const InputDecoration(\n                hintText: 'اكتب ملاحظتك هنا...',\n                border: OutlineInputBorder(),\n              ),\n            ),\n            const SizedBox(height: 16),\n            SizedBox(\n              width: double.infinity,\n              child: ElevatedButton(\n                onPressed: () {\n                  Navigator.pop(context, controller.text);\n                },\n                child: const Text('احفظ الملاحظة'),\n              ),\n            ),\n          ],\n        ),\n      ),\n    );\n  }\n}"
  },
  {
   "type": "p",
   "text": "زرار الحفظ بيعمل `pop` وبيبعت `controller.text` معاه, والشاشة الأولى مستنياه بـ await وتضيفه للقايمة. كده الدورة كملت: إدخال ← تنقل ← نتيجة ← تحديث واجهة."
  },
  {
   "type": "h",
   "text": "شغل المشروع واختبره"
  },
  {
   "type": "list",
   "items": [
    "القايمة فاضية؟ المفروض تشوف رسالة \"مفيش ملاحظات لسه\".",
    "دوس +، اكتب ملاحظة، احفظ, المفروض تظهر في القايمة فوراً.",
    "دوس على أيقونة السلة, الملاحظة بتتمسح فوراً.",
    "فعّل الوضع الليلي من إعدادات الجهاز, التطبيق المفروض يتبعه.",
    "ضيف ملاحظات كتير أوي, القايمة المفروض تعمل scroll طبيعي (دي نعمة ListView.builder)."
   ]
  },
  {
   "type": "h",
   "text": "تحديات إضافية لو عايز تكمل"
  },
  {
   "type": "list",
   "items": [
    "احفظ الملاحظات على الجهاز بـ shared_preferences عشان متتمسحش لما تقفل التطبيق.",
    "ضيف تاريخ لكل ملاحظة (عدل كلاس البيانات لكلاس Note فيه title و date).",
    "خلّي الدوس على الملاحظة يفتح شاشة تعديل بدل الحذف المباشر.",
    "ضيف تأكيد قبل الحذف بـ AlertDialog."
   ]
  },
  {
   "type": "note",
   "text": "مبروك! لو وصلت لهنا وعملت المشروع، انت عديت من الصفر لبناء تطبيق Flutter حقيقي متعدد الشاشات. الخطوة الجاية الطبيعية: توثيق Flutter الرسمي على docs.flutter.dev وفيه codelabs عملية مجانية، وابدأ فكر في مشروع من دماغك انت, دي أسرع طريقة للاحتراف."
  }
 ],
 "quiz": [
  {
   "q": "في التطبيق، شاشة الإضافة بترجع نص الملاحظة للشاشة الرئيسية إزاي؟",
   "options": [
    {
     "text": "بـ Navigator.pop(context, controller.text) والشاشة الأولى بتستقبله بـ await"
    },
    {
     "text": "بتحفظه في ملف نصي على الموبايل والشاشة الأولى بتقراه بعد كده كل ما تفتح"
    },
    {
     "text": "بـ print والشاشة الأولى بتسمع النص من الـ console مباشرة وقت التشغيل"
    },
    {
     "text": "مش بترجعه، الشاشة الأولى بتخمنه من آخر حاجة اتكتبت في التطبيق من أي شاشة"
    }
   ],
   "answer": 0,
   "explain": "نفس فكرة درس التنقل: pop بتحمل النتيجة و await في الشاشة الأولى بيستقبلها، وبعدين setState بيضيفها للقايمة."
  },
  {
   "q": "ليه الشاشة الرئيسية StatefulWidget مش Stateless؟",
   "options": [
    {
     "text": "لأن الشاشة فيها AppBar والـ AppBar محتاج يتحدث مع كل تغيير في أي جزء من الصفحة"
    },
    {
     "text": "لأن قايمة الملاحظات بتتغير (إضافة وحذف) والواجهة لازم تتحدث معاها"
    },
    {
     "text": "لأن Stateful أسرع في الأداء من Stateless في كل الحالات وعلى كل الأجهزة"
    },
    {
     "text": "لأن أي شاشة في أي تطبيق لازم تكون Stateful بدون استثناء حسب قواعد Flutter"
    }
   ],
   "answer": 1,
   "explain": "القايمة notes بتتغير مع كل إضافة وحذف, دي state، فمحتاجين StatefulWidget و setState عشان الواجهة تتحدث."
  },
  {
   "q": "الشرط `notes.isEmpty ? ... : ListView.builder(...)` بيعمل إيه؟",
   "options": [
    {
     "text": "بيخفي التطبيق كله لما القايمة تبقى فاضية وبيرجعه لما تتملي بأول عنصر جديد"
    },
    {
     "text": "بيعرض رسالة ترشد المستخدم لما القايمة فاضية، والقايمة نفسها لما يكون فيها عناصر"
    },
    {
     "text": "بيمسح الملاحظات القديمة أوتوماتيك لما القايمة تتملي بعناصر جديدة من المستخدم"
    },
    {
     "text": "بيمنع إضافة ملاحظات جديدة طول ما القايمة فاضية أو لسه محملتش من الجهاز"
    }
   ],
   "answer": 1,
   "explain": "الواجهة بتعكس الحالة: قايمة فاضية يعني رسالة، قايمة مليانة يعني ListView. ده الـ declarative UI عملياً."
  }
 ],
 "exercises": [
  {
   "task": "نفّذ المشروع كامل من الصفر من غير ما تبص في الكود اللي فوق، وبعدين قارن نسختك بالنسخة النموذجية. المهم إن كل النقط في قايمة \"اختبره\" تعدي.",
   "hint": "ابدأ بالموديل والشاشة الرئيسية الفاضية، بعدين الإضافة، بعدين الحذف.",
   "code": "الكود النموذجي الكامل موجود في الدرس فوق (٣ أجزاء:\nmain + NotesApp، NotesScreen، AddNoteScreen).\nانسخهم بالترتيب في lib/main.dart وشغل:\nflutter run -d chrome",
   "why": "إعادة الكتابة من الذاكرة (حتى لو غلطت ورجعت بصيت) بتثبت المعلومة أضعاف النسخ المباشر."
  },
  {
   "task": "نفّذ واحد من \"التحديات الإضافية\", الأسهل هو AlertDialog للتأكيد قبل الحذف.",
   "hint": "showDialog بترجع Future زي Navigator.push بالظبط, استنى نتيجتها بـ await.",
   "code": "trailing: IconButton(\n  icon: const Icon(Icons.delete),\n  onPressed: () async {\n    final sure = await showDialog<bool>(\n      context: context,\n      builder: (context) => AlertDialog(\n        title: const Text('متأكد؟'),\n        content: const Text('الملاحظة دي هتتمسح نهائي.'),\n        actions: [\n          TextButton(\n            onPressed: () => Navigator.pop(context, false),\n            child: const Text('إلغاء'),\n          ),\n          ElevatedButton(\n            onPressed: () => Navigator.pop(context, true),\n            child: const Text('امسح'),\n          ),\n        ],\n      ),\n    );\n    if (sure == true) {\n      setState(() {\n        notes.removeAt(index);\n      });\n    }\n  },\n)",
   "why": "لاحظ إن showDialog بتشتغل بنفس منطق Navigator.push: بترجع Future فيه نتيجة pop. اللي اتعلمته في التنقل بينطبق هنا حرفياً."
  }
 ]
}
);
