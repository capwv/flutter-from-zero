/* Curriculum part 2: القوائم، التنقل، الـ state، الفورمز، الثيمات، packages، المشروع الختامي */
var CURRICULUM = window.CURRICULUM || [];
CURRICULUM.push(
{
  id: 'lists',
  nav: 'القوائم ListView',
  title: 'عرض القوائم: ListView و ListView.builder',
  subtitle: 'إزاي تعرض قوائم طويلة بكفاءة وتبني عناصرها ديناميكياً',
  blocks: [
    { type: 'p', text: 'تقريباً كل تطبيق فيه قايمة: رسايل، منتجات، ملاحظات، أصحاب. Flutter عندها Widget مخصصة لده اسمها `ListView`، وأهم حاجة فيها إنها بتعمل scroll لوحدها ومش بتقع بمشاكل overflow زي Column.' },
    { type: 'h', text: 'ListView العادية: للقوائم القصيرة' },
    { type: 'code', code: `ListView(
  children: [
    ListTile(leading: Icon(Icons.person), title: Text('علي')),
    ListTile(leading: Icon(Icons.person), title: Text('منى')),
    ListTile(leading: Icon(Icons.person), title: Text('سامي')),
  ],
)` },
    { type: 'p', text: '`ListTile` هي widget جاهزة لصفوف القوائم: `leading` (أيقونة أو صورة في الأول)، `title` (العنوان الرئيسي)، `subtitle` (سطر تاني أصغر)، `trailing` (حاجة في الآخر زي سهم)، و `onTap` (اللي يحصل لما تدوس عليها).' },
    { type: 'h', text: 'ListView.builder: للقوائم الطويلة' },
    { type: 'p', text: 'لو عندك 1000 عنصر، مش هتكتبهم بإيدك، ومش صح تحملهم كلهم مرة واحدة. `ListView.builder` بتبني العنصر لما يحتاج يظهر على الشاشة بس — دي اسمها lazy loading:' },
    { type: 'code', code: `final tasks = ['أذاكر Dart', 'أعمل مشروع', 'أراجع الكود', 'أنام بدري'];

ListView.builder(
  itemCount: tasks.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: CircleAvatar(child: Text('\${index + 1}')),
      title: Text(tasks[index]),
    );
  },
)` },
    { type: 'p', text: 'دالة `itemBuilder` بتتنده لكل عنصر ظاهر، وبتوصلها قيمة `index` — تستخدمها عشان تجيب البيانات المناسبة من قايمتك.' },
    { type: 'note', text: 'لاحظ السهم في `(context, index) { ... }`: دي function بتتبعت كـ parameter. اسمها callback، وهتشوفها في كل حتة في Flutter: onPressed و itemBuilder وغيرهم.' },
    { type: 'h', text: 'قايمة ديناميكية من بيانات' },
    { type: 'p', text: 'في الواقع العملي، البيانات بتيجي من قايمة Dart زي اللي اتعلمناها في درس Dart. تقدر كمان تعمل class بيمثل العنصر الواحد:' },
    { type: 'code', code: `class Task {
  final String title;
  final bool done;
  const Task(this.title, this.done);
}

final tasks = [
  Task('أذاكر Dart', true),
  Task('أعمل مشروع', false),
];` },
    { type: 'p', text: 'وبعدين في الـ itemBuilder تبني شكل مختلف حسب حالة العنصر — مثلاً نص مشطوب لو المهمة خلصت. دي الفكرة اللي هنكمل عليها في المشروع الختامي.' }
  ],
  quiz: [
    { q: 'ليه ListView.builder أحسن من ListView العادية للقوائم الطويلة؟', options: [
      { text: 'لأنها بتبني العناصر عند الحاجة بس (اللي ظاهر على الشاشة) فبتوفر ذاكرة وأداء' },
      { text: 'لأنها شكلها أحلى' },
      { text: 'لأنها الوحيدة اللي بتعمل scroll' },
      { text: 'مفيش فرق بينهم' }
    ], answer: 0, explain: 'builder بتعمل lazy loading: العناصر بتتبني لما تقرب تظهر. القايمة العادية بتبني كل حاجة مرة واحدة — كارثة مع آلاف العناصر.' },
    { q: 'في itemBuilder، المتغير index بيمثل إيه؟', options: [
      { text: 'رقم العنصر اللي بيتبني دلوقتي في القايمة (من صفر)' },
      { text: 'عدد العناصر الكلي' },
      { text: 'مكان الـ widget في الشاشة بالبيكسل' },
      { text: 'اسم الـ ListView' }
    ], answer: 0, explain: 'itemBuilder بتتنده لكل عنصر مع رقمه index، وانت بتستخدمه عشان تجيب tasks[index] مثلاً.' },
    { q: 'إيه الـ widget الجاهزة اللي بتديك صف قايمة فيه أيقونة وعنوان وسطر تاني وسهم؟', options: [
      { text: 'Container', mono: true },
      { text: 'ListTile', mono: true },
      { text: 'Row', mono: true },
      { text: 'Card', mono: true }
    ], answer: 1, explain: 'ListTile معمولة بالظبط لصفوف القوائم: leading و title و subtitle و trailing و onTap جاهزين.' }
  ],
  exercises: [
    { task: 'عندك قايمة أسماء 5 أصحابك. اعرضهم في ListView.builder، وكل صف فيه CircleAvatar فيها أول حرف من الاسم و ListTile فيها الاسم.', hint: 'أول حرف من الاسم: names[index][0].', code: `final names = ['علي', 'منى', 'سامي', 'هبة', 'كريم'];

ListView.builder(
  itemCount: names.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: CircleAvatar(child: Text(names[index][0])),
      title: Text(names[index]),
    );
  },
)`,
      why: 'دي أشهر بنية قائمة في التطبيقات الحقيقية: avatar + عنوان. لاحظ إزاي index بيربط الكود بالبيانات.' },
    { task: 'ضيف سطر تحت العنوان (subtitle) يعرض "صديق رقم N" حيث N هو رقم الصف من 1 مش من 0.', hint: 'index بتبدأ من صفر، فزود 1 باستخدام interpolation.', code: `itemBuilder: (context, index) {
  return ListTile(
    leading: CircleAvatar(child: Text(names[index][0])),
    title: Text(names[index]),
    subtitle: Text('صديق رقم \${index + 1}'),
  );
}`,
      why: 'التحويل من index (من صفر) لرقم مفهوم للناس (من 1) بيتعمل بـ \${index + 1} — interpolation جوه نص زي ما اتعلمنا في Dart.' }
  ]
},
{
  id: 'navigation',
  nav: 'التنقل بين الشاشات',
  title: 'التنقل بين الشاشات: Navigator',
  subtitle: 'push و pop وإرسال البيانات بين الشاشات واستقبال النتايج',
  blocks: [
    { type: 'p', text: 'التطبيق الحقيقي مش شاشة واحدة: شاشة قايمة، شاشة تفاصيل، شاشة إعدادات. الانتقال بينهم في Flutter بيتعمل بـ `Navigator`، وفكرته بسيطة: شاشاتك متكومة فوق بعض زي الكروت (stack). لما تفتح شاشة جديدة بتتحط فوق (push)، ولما ترجع بتتشال (pop).' },
    { type: 'h', text: 'افتح شاشة جديدة: push' },
    { type: 'p', text: 'أول حاجة بنعمل كلاس للشاشة الجديدة — هي في الآخر widget عادية فيها Scaffold:' },
    { type: 'code', code: `class DetailsScreen extends StatelessWidget {
  const DetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('التفاصيل')),
      body: const Center(child: Text('دي شاشة التفاصيل')),
    );
  }
}` },
    { type: 'p', text: 'ومن أي زرار في الشاشة الأولى، بنفتحها كده:' },
    { type: 'code', code: `onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const DetailsScreen()),
  );
}` },
    { type: 'p', text: 'بلاقي تلقائياً سهم رجوع في الـ AppBar — Flutter بتضيفه لوحدها لما تفتح شاشة بـ push. ولو عايز ترجع بالكود:' },
    { type: 'code', code: `onPressed: () {
  Navigator.pop(context);
}` },
    { type: 'h', text: 'ابعت بيانات للشاشة الجديدة' },
    { type: 'p', text: 'أشهر طريقة: ابعت البيانات في الـ constructor بتاع الشاشة. مثلاً شاشة تفاصيل بتعرض اسم مهمة معينة:' },
    { type: 'code', code: `class DetailsScreen extends StatelessWidget {
  final String taskTitle;
  const DetailsScreen({super.key, required this.taskTitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(taskTitle)),
      body: Center(child: Text('تفاصيل: \$taskTitle')),
    );
  }
}

// ولما تفتحها:
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailsScreen(taskTitle: tasks[index]),
  ),
);` },
    { type: 'h', text: 'ارجع بنتيجة من الشاشة: await و pop' },
    { type: 'p', text: 'أحياناً الشاشة الجديدة بترجع نتيجة (زي ملاحظة جديدة اتكتبت). بنستنى النتيجة بـ `await` ونرجعها من الشاشة التانية بـ `pop`:' },
    { type: 'code', code: `// في الشاشة الأولى:
final newNote = await Navigator.push<String>(
  context,
  MaterialPageRoute(builder: (context) => const AddNoteScreen()),
);
if (newNote != null) {
  // ضيف الملاحظة للقايمة
}

// في شاشة الإضافة، لما المستخدم يحفظ:
Navigator.pop(context, noteText);` },
    { type: 'note', warn: true, text: '`await` معناها إن الكود هيوقف هنا لحد ما الشاشة التانية تقفل بـ pop. عشان تستخدمها، الدالة اللي حواليها لازم تكون متعلمة بـ `async`. هنشوف ده شغال بالتفصيل في المشروع الختامي.' }
  ],
  quiz: [
    { q: 'فكرة Navigator الأساسية إن الشاشات:', options: [
      { text: 'متكومة فوق بعض (stack): push بيضيف شاشة فوق و pop بيشيلها ويرجعك للي قبلها' },
      { text: 'بتتخزن في قاعدة بيانات' },
      { text: 'بتتبدل بشكل عشوائي' },
      { text: 'بتتحمل من الإنترنت' }
    ], answer: 0, explain: 'زي كومة كروت: push يحط كارت فوق، pop يشيله ويرجعك للكارت اللي تحته.' },
    { q: 'أسهل طريقة تبعت بيها نص من شاشة لشاشة تانية:', options: [
      { text: 'تحفظه في ملف على الجهاز وتقراه من الشاشة التانية' },
      { text: 'تبعته كـ parameter في constructor الشاشة الجديدة' },
      { text: 'تطبعه بـ print والشاشة التانية تقراه' },
      { text: 'مش ممكن إرسال بيانات بين الشاشات' }
    ], answer: 1, explain: 'الشاشة في الآخر widget عادية: بعت البيانات في الـ constructor، زي أي widget بتستقبل قيم.' },
    { q: 'عايز ترجع من شاشة الإضافة بنص الملاحظة الجديدة للشاشة الأولى. تستخدم:', options: [
      { text: 'Navigator.pop(context, noteText)', mono: true },
      { text: 'Navigator.push(context)', mono: true },
      { text: 'print(noteText)', mono: true },
      { text: 'Navigator.delete(context)', mono: true }
    ], answer: 0, explain: 'pop بتاخد قيمة تانية اختيارية هي النتيجة، والشاشة الأولى بتستقبلها لما تستنى بـ await.' }
  ],
  exercises: [
    { task: 'اكتب كود زرار في شاشة رئيسية يفتح شاشة SettingsScreen (اعمل الكلاس بنفسك فيها AppBar ونص في النص).', hint: 'الشاشة الجديدة StatelessWidget فيها Scaffold، والفتح بـ Navigator.push.', code: `class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('الإعدادات')),
      body: const Center(child: Text('هنا إعدادات التطبيق')),
    );
  }
}

// الزرار في الشاشة الرئيسية:
ElevatedButton(
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const SettingsScreen()),
    );
  },
  child: const Text('افتح الإعدادات'),
)`,
      why: 'لاحظ إنك مش محتاج تكتب زرار رجوع — AppBar بتضيفه لوحدها لما تكون الشاشة مفتوحة بـ push.' },
    { task: 'عدّل شاشة التفاصيل بحيث تستقبل رقم المهمة واسمها مع بعض، واعرضهم.', hint: 'constructor بياخد parameterين: final int number و final String title.', code: `class DetailsScreen extends StatelessWidget {
  final int number;
  final String title;
  const DetailsScreen({super.key, required this.number, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('مهمة رقم \$number')),
      body: Center(child: Text(title, style: const TextStyle(fontSize: 22))),
    );
  }
}

// الفتح:
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailsScreen(number: index + 1, title: tasks[index]),
  ),
);`,
      why: 'أي عدد من الـ parameters يتبعت في الـ constructor. دي نفس فكرة required اللي شفناها في درس الـ widgets.' }
  ]
},
{
  id: 'state',
  nav: 'الـ State و setState',
  title: 'الحالة State: إزاي الشاشة بتتحدث',
  subtitle: 'StatefulWidget من جوه و setState وإزاي نفكر في البيانات المتغيرة',
  blocks: [
    { type: 'p', text: 'لحد دلوقتي كل شاشاتنا كانت ثابتة. بس التطبيقات الحقيقية فيها حاجات بتتغير: عداد بيزيد، checkbox بتتعلم، قايمة بتتحدث. البيانات المتغيرة دي اسمها state (حالة)، وإدارتها هي قلب شغل Flutter.' },
    { type: 'h', text: 'الفكرة في جملة: الواجهة = دالة من الحالة' },
    { type: 'p', text: 'في Flutter الواجهة بتعكس الحالة الحالية. لما الحالة تتغير، انت مش بتعدل الواجهة بإيدك — انت بتقول لـ Flutter "الحالة اتغيرت" وهي بتعيد بناء الواجهة لوحدها. الأمر اللي بيقول كده اسمه `setState`.' },
    { type: 'h', text: 'StatefulWidget من جوه' },
    { type: 'p', text: 'الـ StatefulWidget بتتكتب في كلاسين: الأول الـ widget نفسها (ثابتة)، والتاني كلاس الـ State اللي فيه المتغيرات المتغيرة ودالة build:' },
    { type: 'code', code: `class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int count = 0; // دي الحالة

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('العداد')),
      body: Center(
        child: Text('العدد: \$count', style: const TextStyle(fontSize: 40)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            count++;
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}` },
    { type: 'p', text: 'السلسلة اللي بتحصل لما تدوس الزرار: `onPressed` بتتنده → جوه `setState` بنغير `count` → Flutter بتعيد تنفيذ `build` → الشاشة بتتحدث بالرقم الجديد. كل ده في أجزاء من الثانية.' },
    { type: 'note', warn: true, text: 'أشهر غلطة: تغير المتغير من غير setState زي `count++;` لوحده. القيمة هتتغير في الذاكرة بس الشاشة مش هتتحدث أبداً. القاعدة: أي تغيير لازم الشاشة تشوفه لازم يحصل جوه setState.' },
    { type: 'h', text: 'ليه كلاسين؟ وليه المتغيرات في State؟' },
    { type: 'p', text: 'الـ widget نفسها ممكن تتدمر وتتبني من جديد كتير جداً أثناء شغل التطبيق، فلو الحالة متخزنة فيها هتضيع مع كل rebuild. عشان كده Flutter بتحتفظ بكلاس الـ State منفصل وثابت، والـ widget بس بتوصف الشكل. عشان كده بتلاقي بنية الـ StatefulWidget فيها `createState` بترجع نسخة من كلاس الـ State.' },
    { type: 'h', text: 'فين نحط الحالة؟' },
    { type: 'p', text: 'قاعدة عملية: حط الحالة في أقرب مكان مشترك بين كل الـ widgets اللي محتاجاها. لو عداد في شاشة واحدة، حطه في شاشتها. لو بيانات محتاجاها شاشتين، ارفعها للـ widget الأب المشترك بينهم (وده اسمه lifting state up). في التطبيقات الكبيرة في أنظمة إدارة حالة متقدمة زي Provider و Riverpod — بس دي خطوة بعد الكورس ده.' }
  ],
  quiz: [
    { q: 'غيرت قيمة متغير والشاشة ماتحدثتش. السبب الأغلب:', options: [
      { text: 'نسيت تحط التغيير جوه setState', mono: true },
      { text: 'نسخة Flutter قديمة' },
      { text: 'لازم تضغط R للـ hot restart' },
      { text: 'المتغير مش موجود أصلاً' }
    ], answer: 0, explain: 'setState هي اللي بتقول لـ Flutter تعيد بناء الواجهة. تغيير المتغير لوحده بيحصل في الذاكرة بس.' },
    { q: 'في StatefulWidget، المتغيرات اللي بتتغير بتتخزن فين؟', options: [
      { text: 'في كلاس الـ widget نفسها' },
      { text: 'في كلاس الـ State المنفصل' },
      { text: 'في pubspec.yaml' },
      { text: 'في دالة build' }
    ], answer: 1, explain: 'الـ widget بتتدمر وتتبني كتير، فالحالة بتعيش في كلاس الـ State الثابت عشان متضيعش.' },
    { q: 'إيه اللي بيحصل لما setState بتتنده؟', options: [
      { text: 'التطبيق بيقفل ويفتح من جديد' },
      { text: 'Flutter بتعيد تنفيذ دالة build فالشاشة بتتحدث بالقيم الجديدة' },
      { text: 'البيانات بتتبعت للسيرفر' },
      { text: 'المتغيرات بترجع لقيمها الأولى' }
    ], answer: 1, explain: 'setState بتحجز rebuild: دالة build بتتنفذ تاني والواجهة بتتحدث بالحالة الجديدة — ده قلب فلسفة Flutter كلها.' }
  ],
  exercises: [
    { task: 'اعمل عداد فيه زرارين: واحد يزود وواحد ينقص، مع عرض الرقم الحالي في النص.', hint: 'زرارين بيغيروا نفس المتغير، كل واحد جوه setState لوحده.', code: `class _CounterScreenState extends State<CounterScreen> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
              onPressed: () => setState(() => count--),
              icon: const Icon(Icons.remove),
            ),
            Text('\$count', style: const TextStyle(fontSize: 40)),
            IconButton(
              onPressed: () => setState(() => count++),
              icon: const Icon(Icons.add),
            ),
          ],
        ),
      ),
    );
  }
}`,
      why: 'لاحظ الاختصار: لما الـ callback سطر واحد نقدر نكتبه بالسهم => بدل الأقواس. والاتنين بيستخدموا setState.' },
    { task: 'ضيف زرار "تصفير" يرجع العداد لصفر، بس اظهره بس لما العداد أكبر من صفر.', hint: 'استخدم if جوه children قايمة الـ widgets — دي ميزة في Dart اسمها collection if.', code: `Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    IconButton(
      onPressed: () => setState(() => count--),
      icon: const Icon(Icons.remove),
    ),
    Text('\$count', style: const TextStyle(fontSize: 40)),
    IconButton(
      onPressed: () => setState(() => count++),
      icon: const Icon(Icons.add),
    ),
    if (count > 0)
      TextButton(
        onPressed: () => setState(() => count = 0),
        child: const Text('تصفير'),
      ),
  ],
)`,
      why: 'if جوه قايمة children بتظهر الـ widget بشرط. دي طريقة Flutter في إظهار وإخفاء العناصر — مش display: none زي الويب.' }
  ]
},
{
  id: 'forms',
  nav: 'الفورمز والإدخال',
  title: 'الفورمز: TextField والتحقق من المدخلات',
  subtitle: 'إزاي تاخد إدخال من المستخدم وتتأكد إنه صح قبل الاستخدام',
  blocks: [
    { type: 'p', text: 'تسجيل الدخول، البحث، إضافة ملاحظة — كلها فورمز. في Flutter أساس التعامل مع إدخال النص هو `TextField` مع صاحبه `TextEditingController`، وفوقهم نظام `Form` للتحقق من المدخلات قبل استخدامها.' },
    { type: 'h', text: 'TextField و Controller' },
    { type: 'code', code: `class _NoteScreenState extends State<NoteScreen> {
  final noteController = TextEditingController();

  @override
  void dispose() {
    noteController.dispose(); // مهم: نظف الـ controller لما الشاشة تتقفل
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: noteController,
              decoration: const InputDecoration(
                labelText: 'اكتب ملاحظتك',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () {
                print('المستخدم كتب: \${noteController.text}');
              },
              child: const Text('احفظ'),
            ),
          ],
        ),
      ),
    );
  }
}` },
    { type: 'p', text: 'الـ `TextEditingController` هو حلقة الوصل بينك وبين حقل الإدخال: تقراه بـ `controller.text` وتغيره أو تمسحه بنفس الطريقة. و `InputDecoration` بتظبط شكل الحقل: label و hint وحدود.' },
    { type: 'h', text: 'Form و validation: متقبلش أي حاجة' },
    { type: 'p', text: 'لو عندك فورم فيها أكتر من حقل وعايز تتأكد إن المستخدم ماسابش حاجة فاضية، استخدم `Form` مع `TextFormField` (نسخة الـ TextField اللي فيها تحقق مدمج) و `GlobalKey` بتوصل لحالة الفورم:' },
    { type: 'code', code: `final formKey = GlobalKey<FormState>();

Form(
  key: formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: const InputDecoration(labelText: 'الاسم'),
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'الاسم مطلوب';
          }
          return null; // null يعني مفيش مشكلة
        },
      ),
      ElevatedButton(
        onPressed: () {
          if (formKey.currentState!.validate()) {
            // كل الحقول صح — كمل
          }
        },
        child: const Text('سجل'),
      ),
    ],
  ),
)` },
    { type: 'p', text: 'الـ `validator` بترجع رسالة الخطأ لو في مشكلة، أو `null` لو الحقل تمام. ولما تنده `validate()` بتنفذ كل الـ validators وتقولك الفورم سليمة ولا لأ.' },
    { type: 'h', text: 'أزرار Flutter الأساسية' },
    { type: 'table', head: ['الزرار', 'استخدامه'], rows: [
      ['ElevatedButton', 'الزرار الرئيسي البارز (حفظ، تأكيد)'],
      ['OutlinedButton', 'زرار ثانوي بحدود (إلغاء)'],
      ['TextButton', 'أخف زرار، زي اللينك'],
      ['IconButton', 'زرار أيقونة بس'],
      ['FloatingActionButton', 'الزرار الدائري العائم للإجراء الأساسي']
    ] },
    { type: 'note', text: 'عايز تبعت للمستخدم رسالة سريعة بعد الحفظ؟ استخدم `SnackBar`: `ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("اتحفظت!")));` — بتظهر شريط صغير تحت ويختفي لوحده.' }
  ],
  quiz: [
    { q: 'إزاي تقرا النص اللي المستخدم كتبه في TextField؟', options: [
      { text: 'من الـ TextEditingController المربوط بالحقل: controller.text' },
      { text: 'الحقل بيبعت النص لوحده في الإيميل' },
      { text: 'من الـ AppBar' },
      { text: 'مش ممكن قرايته قبل الطباعة' }
    ], answer: 0, explain: 'الـ controller هو حلقة الوصل: تقراه بـ controller.text وتمسحه بنفس الطريقة بعد الحفظ مثلاً.' },
    { q: 'في TextFormField، الـ validator بترجع إيه لو الحقل سليم؟', options: [
      { text: 'true', mono: true },
      { text: 'null', mono: true },
      { text: "'تمام'", mono: true },
      { text: '0', mono: true }
    ], answer: 1, explain: 'null معناها مفيش خطأ. أي نص بترجعه بيظهر كرسالة خطأ تحت الحقل.' },
    { q: 'إيه وظيفة formKey.currentState!.validate()؟', options: [
      { text: 'بتمسح الفورم' },
      { text: 'بتنفذ كل الـ validators وترجع true لو الفورم كلها سليمة' },
      { text: 'بتقفل التطبيق' },
      { text: 'بتحفظ البيانات في قاعدة البيانات' }
    ], answer: 1, explain: 'validate() بتشغل التحقق على كل الحقول مرة واحدة — لو رجعت true تقدر تكمل حفظ أو إرسال.' }
  ],
  exercises: [
    { task: 'اعمل فورم تسجيل دخول بسيطة: حقل إيميل وحقل باسورد (مخفي)، وزرار دخول يتحقق إن الاتنين مش فاضيين.', hint: 'obscureText: true بتخفي الباسورد، و validator لكل حقل.', code: `final formKey = GlobalKey<FormState>();

Form(
  key: formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: const InputDecoration(labelText: 'الإيميل'),
        keyboardType: TextInputType.emailAddress,
        validator: (v) => v == null || v.isEmpty ? 'الإيميل مطلوب' : null,
      ),
      const SizedBox(height: 12),
      TextFormField(
        decoration: const InputDecoration(labelText: 'كلمة السر'),
        obscureText: true,
        validator: (v) => v == null || v.isEmpty ? 'كلمة السر مطلوبة' : null,
      ),
      const SizedBox(height: 16),
      ElevatedButton(
        onPressed: () {
          if (formKey.currentState!.validate()) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('جاري تسجيل الدخول...')),
            );
          }
        },
        child: const Text('دخول'),
      ),
    ],
  ),
)`,
      why: 'دي أبسط فورم حقيقية: حقول بتحقق، keyboardType مناسب للإيميل، و SnackBar كرد فعل. بنية هتتكرر في كل تطبيق.' },
    { task: 'ضيف شرط إضافي: كلمة السر لازم تكون 6 حروف على الأقل، واطبع رسالة مختلفة لو أقصر.', hint: 'افحص v.length قبل ما ترجع null.', code: `validator: (v) {
  if (v == null || v.isEmpty) {
    return 'كلمة السر مطلوبة';
  }
  if (v.length < 6) {
    return 'كلمة السر لازم تكون 6 حروف على الأقل';
  }
  return null;
},`,
      why: 'الـ validator بترجع أول مشكلة تلاقيها — الترتيب مهم: الأول الفحص الفاضي وبعدين الطول.' }
  ]
},
{
  id: 'theming',
  nav: 'الثيمات والألوان',
  title: 'الثيمات: شكل موحد لتطبيقك كله',
  subtitle: 'ThemeData و ColorScheme والوضع الليلي واستخدام الثيم في أي widget',
  blocks: [
    { type: 'p', text: 'لحد دلوقتي بنحدد الألوان والأحجام يدوي في كل widget. ده بيخلّي التطبيق مش متناسق، وأي تعديل في الهوية البصرية هيتكرر في 100 مكان. الحل: `ThemeData` — ملف واحد بيعرّف شكل تطبيقك كله من مكان واحد.' },
    { type: 'h', text: 'ThemeData في MaterialApp' },
    { type: 'code', code: `MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
    useMaterial3: true,
  ),
  home: const HomeScreen(),
)` },
    { type: 'p', text: 'أحلى حاجة في الموضوع: `ColorScheme.fromSeed` بتاخد لون واحد (الـ seed) وتولد منه نظام ألوان كامل متناسق — أساسي وثانوي وخلفيات — بناءً على مواصفة Material 3 بتاعة Google. مش محتاج تكون مصمم عشان تطلع بألوان حلوة.' },
    { type: 'h', text: 'استخدم الثيم جوه الـ widgets' },
    { type: 'p', text: 'بدل ما تكتب لون صريح، اسأل الثيم الحالي عن اللون المناسب. كده لما تغير الثيم، كل حاجة هتتغير معاه:' },
    { type: 'code', code: `Container(
  color: Theme.of(context).colorScheme.primary,
  child: Text(
    'عنوان مهم',
    style: Theme.of(context).textTheme.titleLarge,
  ),
)` },
    { type: 'p', text: '`Theme.of(context)` بتوصلك للثيم المعرف فوق في الشجرة. استخدم `colorScheme.primary` و `colorScheme.surface` و `textTheme.titleLarge` وغيرهم بدل الألوان والأحجام الصريحة.' },
    { type: 'h', text: 'الوضع الليلي dark mode' },
    { type: 'p', text: 'Flutter بيسهلها جداً: عرّف ثيم تاني لليلي وحدد إمتى يشتغل:' },
    { type: 'code', code: `MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
    useMaterial3: true,
  ),
  darkTheme: ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.teal,
      brightness: Brightness.dark,
    ),
    useMaterial3: true,
  ),
  themeMode: ThemeMode.system, // يتبع إعداد الجهاز
  home: const HomeScreen(),
)` },
    { type: 'note', text: 'لو استخدمت ألوان الثيم (زي colorScheme.primary) بدل ألوان صريحة (زي Colors.blue) في كل حتة، الوضع الليلي هيشتغل معاك من أول مرة من غير أي تعديل إضافي. دي أكبر فايدة للثيمات.' },
    { type: 'h', text: 'الخطوط' },
    { type: 'p', text: 'الخط الافتراضي حلو، بس لو عايز شخصية لتطبيقك، أسهل طريقة هي package اسمها `google_fonts` بتديك مئات الخطوط (منها خطوط عربية زي Cairo اللي الموقع ده نفسه مستخدمه). هنعرف إزاي نضيف packages في الدرس الجاي.' }
  ],
  quiz: [
    { q: 'إيه فايدة ColorScheme.fromSeed؟', options: [
      { text: 'بتولد نظام ألوان كامل متناسق من لون واحد' },
      { text: 'بتزرع بيانات تجريبية في التطبيق' },
      { text: 'بتختار لون عشوائي كل مرة' },
      { text: 'بتحول الألوان لصور' }
    ], answer: 0, explain: 'من لون seed واحد بتطلعلك palette كاملة حسب Material 3 — أساسي وثانوي وخلفيات ودرجاتهم.' },
    { q: 'ليه نستخدم Theme.of(context).colorScheme.primary بدل Colors.blue الصريح؟', options: [
      { text: 'لأن Colors.blue أبطأ في الأداء' },
      { text: 'عشان لما الثيم يتغير (زي الوضع الليلي) كل الألوان تتحدث لوحدها من مكان واحد' },
      { text: 'لأن Colors.blue اتشالت من Flutter' },
      { text: 'مفيش فرق، دي عادة قديمة' }
    ], answer: 1, explain: 'الألوان الصريحة بتكسر التناسق والوضع الليلي. ألوان الثيم بتتبع التعريف المركزي في ThemeData.' },
    { q: 'عايز التطبيق يتبع الوضع الليلي بتاع إعدادات الموبايل نفسه. تكتب:', options: [
      { text: 'themeMode: ThemeMode.system', mono: true },
      { text: 'darkMode: true', mono: true },
      { text: 'night: yes', mono: true },
      { text: 'brightness: auto', mono: true }
    ], answer: 0, explain: 'ThemeMode.system معناها اتبع إعداد الجهاز. ومحتاج طبعاً تعرف darkTheme عشان يكون في ثيم ليلي جاهز.' }
  ],
  exercises: [
    { task: 'غيّر تطبيق العداد الافتراضي لثيم بلون seed من اختيارك (مثلاً Colors.deepPurple) وشوف إزاي الزرار والـ AppBar اتلونوا لوحدهم.', hint: 'عدل ThemeData في main.dart وبعدين اعمل hot reload.', code: `theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
  useMaterial3: true,
),`,
      why: 'أول ما تحفظ، الـ FloatingActionButton والـ AppBar هيتلونوا بلون الـ seed ودرجاته تلقائياً — دي قوة الثيم المركزي.' },
    { task: 'ضيف darkTheme لتطبيقك بنفس الـ seed بس Brightness.dark، وجرب الوضع الليلي من إعدادات المحاكي أو المتصفح.', hint: 'themeMode: ThemeMode.system يخلي التطبيق يتبع الجهاز.', code: `darkTheme: ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.deepPurple,
    brightness: Brightness.dark,
  ),
  useMaterial3: true,
),
themeMode: ThemeMode.system,`,
      why: 'لو كنت مستخدم ألوان الثيم في شاشاتك، هتلاقي كل حاجة اتظبطت لوحدها في الليلي. لو في حتة لسه فاتحة، يبقى انت كاتب لون صريح هناك — دي علامة تدور عليها وتصلحها.' }
  ]
},
{
  id: 'packages',
  nav: 'الـ Packages',
  title: 'الـ Packages: كود الناس التانية جاهز ليك',
  subtitle: 'pub.dev و pubspec.yaml وإضافة أول package وتجربتها',
  blocks: [
    { type: 'p', text: 'محدش بيكتب كل حاجة من الصفر. عايز تجيب بيانات من الإنترنت؟ تفتح لينك في المتصفح؟ تحفظ إعدادات على الجهاز؟ في package جاهزة لكل دول، كتبها ناس تانية واختبرها آلاف المطورين. مكتبة الـ packages الرسمية لـ Dart و Flutter اسمها `pub.dev`.' },
    { type: 'h', text: 'أضيف أول package' },
    { type: 'p', text: 'التعريف بيتم في ملف `pubspec.yaml` تحت قسم `dependencies`. أسهل طريقة للإضافة أمر واحد من الترمنال:' },
    { type: 'code', code: `flutter pub add http` },
    { type: 'p', text: 'الأمر ده بيعدل pubspec.yaml لوحده وبينزل الـ package. شوف اللي حصل في الملف:' },
    { type: 'code', code: `dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0   # اتضافت لوحدها` },
    { type: 'p', text: 'ولو عدلت الملف بإيدك، لازم بعدها تشغل `flutter pub get` عشان ينزل المكتبات الجديدة.' },
    { type: 'h', text: 'استخدم الـ package في الكود' },
    { type: 'p', text: 'بعد الإضافة، اعمل import واستخدمها. مثال: جيب بيانات من API باستخدام `http`:' },
    { type: 'code', code: `import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> loadPost() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/1'),
  );
  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    print(data['title']);
  } else {
    print('حصل خطأ: \${response.statusCode}');
  }
}` },
    { type: 'note', text: 'كلمة `Future` و `async/await` دي طريقة Dart في التعامل مع العمليات اللي بتاخد وقت (زي طلبات الإنترنت): الكود بيكمل شغال ومبيستناش النتيجة على حساب باقي التطبيق، ولما النتيجة توصل بيكمل من عند await.' },
    { type: 'h', text: 'أشهر packages هتحتاجها' },
    { type: 'table', head: ['الـ package', 'بتعمل إيه'], rows: [
      ['http', 'طلبات إنترنت (APIs)'],
      ['shared_preferences', 'حفظ بيانات بسيطة على الجهاز'],
      ['url_launcher', 'فتح لينكات وتليفون وإيميل'],
      ['google_fonts', 'خطوط Google (فيها خطوط عربية)'],
      ['provider', 'إدارة حالة متقدمة'],
      ['image_picker', 'اختيار صور من الجهاز']
    ] },
    { type: 'h', text: 'إزاي تختار package كويسة على pub.dev' },
    { type: 'list', items: [
      'شوف عدد الـ likes و الـ pub points — المؤشرات دي بتقولك مدى ثقة المجتمع فيها.',
      'اتأكد إنها متعلمة Flutter Favorite لو لقيت العلامة دي.',
      'شوف آخر تحديث: package متروكة من سنين ممكن تبوظ مع نسخ Flutter الجديدة.',
      'اقرا صفحة الـ README بتاعتها — فيها مثال استخدام جاهز في أغلب الحالات.'
    ] },
    { type: 'note', warn: true, text: 'كل package بتضيفها بتكبر حجم تطبيقك وبتزود سطح المشاكل المحتملة. القاعدة: لو الحاجة بسيطة وتقدر تكتبها بنفسك في سطور قليلة، اكتبها. استخدم packages للحاجات المعقدة أو المملة فعلاً.' }
  ],
  quiz: [
    { q: 'فين بتتعرف الـ packages اللي مشروعك بيستخدمها؟', options: [
      { text: 'في lib/main.dart' },
      { text: 'في pubspec.yaml تحت dependencies' },
      { text: 'في ملف README' },
      { text: 'في متجر التطبيقات' }
    ], answer: 1, explain: 'pubspec.yaml هو ملف إعدادات المشروع، وقسم dependencies فيه كل المكتبات الخارجية وأرقام نسخها.' },
    { q: 'عدلت pubspec.yaml بإيدك وضفت package. إيه الأمر اللي ينزلها؟', options: [
      { text: 'flutter run', mono: true },
      { text: 'flutter pub get', mono: true },
      { text: 'flutter doctor', mono: true },
      { text: 'flutter clean', mono: true }
    ], answer: 1, explain: 'flutter pub get بيقرا الملف وينزل كل المكتبات المكتوبة فيه. (flutter pub add بتعمل الاتنين مع بعض: تعدل وتنزل.)' },
    { q: 'ليه بنستخدم async و await مع http.get؟', options: [
      { text: 'عشان الكود يبقى أسرع في التنفيذ' },
      { text: 'لأن طلب الإنترنت بياخد وقت، و await بتخلي الكود يستنى النتيجة من غير ما يعلق باقي التطبيق' },
      { text: 'لأن Dart مش بتدعم الإنترنت من غيرهم' },
      { text: 'مجرد تقليد في الكتابة ملوش معنى' }
    ], answer: 1, explain: 'العمليات البطيئة (شبكة، ملفات، قواعد بيانات) بترجع Future، و await بتستناها بشكل غير معطل للواجهة.' }
  ],
  exercises: [
    { task: 'ضيف package الـ http لمشروع تجريبي، واكتب كود يجيب عنوان أول post من jsonplaceholder ويعرضه في print.', hint: 'flutter pub add http وبعدين import والكود اللي في الدرس.', code: `// في الترمنال:
// flutter pub add http

import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> main() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/1'),
  );
  final data = jsonDecode(response.body);
  print(data['title']);
}`,
      why: 'jsonplaceholder.typicode.com هو API تجريبي مجاني معمول بالظبط للتعلم — محفوظ في بوك مارك كل مبرمج تقريباً.' },
    { task: 'من غير ما تكتب كود: افتح pub.dev وادور على package مناسبة لكل حاجة من دول: (1) فتح لينك في المتصفح (2) حفظ تفضيلات المستخدم (3) تشغيل فيديو. اكتب اسم كل package.', hint: 'ابحث بكلمات إنجليزية بسيطة زي open url و save settings.', code: `الإجابة النموذجية:
1. url_launcher — لفتح اللينكات
2. shared_preferences — لحفظ الإعدادات البسيطة
3. video_player — لتشغيل الفيديوهات

(التلاتة من الحزم الرسمية بتاعة فريق Flutter نفسه)`,
      why: 'مهارة "إزاي ألاقي الـ package الصح" أهم من حفظ أسماء المكتبات: بحث كويس + قراءة الـ README + نظرة على الـ likes.' }
  ]
},
{
  id: 'capstone',
  nav: 'المشروع الختامي',
  title: 'المشروع الختامي: تطبيق ملاحظات كامل',
  subtitle: 'هنبني تطبيق ملاحظات فيه شاشتين وقايمة وإضافة وحذف — بكل اللي اتعلمناه',
  blocks: [
    { type: 'p', text: 'وصلت للنهاية! المشروع ده بيجمع كل اللي فات في تطبيق حقيقي واحد: تطبيق ملاحظات فيه شاشة رئيسية بقايمة الملاحظات (ListView.builder)، وشاشة إضافة ملاحظة (Form + TextField)، وتنقل بينهم بإرسال نتيجة (Navigator + await)، وتحديث القايمة (setState)، وثيم موحد (ThemeData).' },
    { type: 'h', text: 'الخطة قبل الكود' },
    { type: 'list', items: [
      'موديل البيانات: كلاس `Note` فيه title.',
      'الشاشة الرئيسية `NotesScreen`: StatefulWidget فيها `List<String>` للملاحظات و ListView.builder لعرضها وحذفها.',
      'شاشة الإضافة `AddNoteScreen`: فورم فيها TextField وزرار حفظ بيرجع النص بـ pop.',
      'الفتح: زرار عائم بيعمل push ويستنى النتيجة بـ await ويضيفها للقايمة بـ setState.',
      'الثيم: seed color واحد مع دعم الوضع الليلي.'
    ] },
    { type: 'h', text: 'الخطوة 1: نقطة البداية والثيم' },
    { type: 'code', code: `import 'package:flutter/material.dart';

void main() {
  runApp(const NotesApp());
}

class NotesApp extends StatelessWidget {
  const NotesApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ملاحظاتي',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.teal,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const NotesScreen(),
    );
  }
}` },
    { type: 'h', text: 'الخطوة 2: الشاشة الرئيسية والقايمة' },
    { type: 'code', code: `class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  final List<String> notes = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ملاحظاتي')),
      body: notes.isEmpty
          ? const Center(child: Text('مفيش ملاحظات لسه — دوس + وضيف أول واحدة'))
          : ListView.builder(
              itemCount: notes.length,
              itemBuilder: (context, index) {
                return ListTile(
                  leading: CircleAvatar(child: Text('\${index + 1}')),
                  title: Text(notes[index]),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () {
                      setState(() {
                        notes.removeAt(index);
                      });
                    },
                  ),
                );
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: addNote,
        child: const Icon(Icons.add),
      ),
    );
  }

  Future<void> addNote() async {
    final newNote = await Navigator.push<String>(
      context,
      MaterialPageRoute(builder: (context) => const AddNoteScreen()),
    );
    if (newNote != null && newNote.isNotEmpty) {
      setState(() {
        notes.add(newNote);
      });
    }
  }
}` },
    { type: 'p', text: 'لاحظ تلات حاجات: (1) الشرط `notes.isEmpty` بيغير شكل الشاشة كلها حسب الحالة. (2) الحذف بـ `removeAt` جوه setState. (3) دالة `addNote` معلمة بـ async لأنها بتستنى نتيجة الشاشة التانية بـ await.' },
    { type: 'h', text: 'الخطوة 3: شاشة الإضافة' },
    { type: 'code', code: `class AddNoteScreen extends StatefulWidget {
  const AddNoteScreen({super.key});

  @override
  State<AddNoteScreen> createState() => _AddNoteScreenState();
}

class _AddNoteScreenState extends State<AddNoteScreen> {
  final controller = TextEditingController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ملاحظة جديدة')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: controller,
              autofocus: true,
              maxLines: 4,
              decoration: const InputDecoration(
                hintText: 'اكتب ملاحظتك هنا...',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context, controller.text);
                },
                child: const Text('احفظ الملاحظة'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}` },
    { type: 'p', text: 'زرار الحفظ بيعمل `pop` وبيبعت `controller.text` معاه — والشاشة الأولى مستنياه بـ await وتضيفه للقايمة. كده الدورة كملت: إدخال ← تنقل ← نتيجة ← تحديث واجهة.' },
    { type: 'h', text: 'شغل المشروع واختبره' },
    { type: 'list', items: [
      'القايمة فاضية؟ المفروض تشوف رسالة "مفيش ملاحظات لسه".',
      'دوس +، اكتب ملاحظة، احفظ — المفروض تظهر في القايمة فوراً.',
      'دوس على أيقونة السلة — الملاحظة بتتمسح فوراً.',
      'فعّل الوضع الليلي من إعدادات الجهاز — التطبيق المفروض يتبعه.',
      'ضيف ملاحظات كتير أوي — القايمة المفروض تعمل scroll طبيعي (دي نعمة ListView.builder).'
    ] },
    { type: 'h', text: 'تحديات إضافية لو عايز تكمل' },
    { type: 'list', items: [
      'احفظ الملاحظات على الجهاز بـ shared_preferences عشان متتمسحش لما تقفل التطبيق.',
      'ضيف تاريخ لكل ملاحظة (عدل كلاس البيانات لكلاس Note فيه title و date).',
      'خلّي الدوس على الملاحظة يفتح شاشة تعديل بدل الحذف المباشر.',
      'ضيف تأكيد قبل الحذف بـ AlertDialog.'
    ] },
    { type: 'note', text: 'مبروك! لو وصلت لهنا وعملت المشروع، انت عديت من الصفر لبناء تطبيق Flutter حقيقي متعدد الشاشات. الخطوة الجاية الطبيعية: توثيق Flutter الرسمي على docs.flutter.dev وفيه codelabs عملية مجانية، وابدأ فكر في مشروع من دماغك انت — دي أسرع طريقة للاحتراف.' }
  ],
  quiz: [
    { q: 'في التطبيق، شاشة الإضافة بترجع نص الملاحظة للشاشة الرئيسية إزاي؟', options: [
      { text: 'بـ Navigator.pop(context, controller.text) والشاشة الأولى بتستقبله بـ await' },
      { text: 'بتحفظه في ملف نصي والشاشة الأولى بتقراه' },
      { text: 'بـ print والشاشة الأولى بتسمعه' },
      { text: 'مش بترجعه، الشاشة الأولى بتخمنه' }
    ], answer: 0, explain: 'نفس فكرة درس التنقل: pop بتحمل النتيجة و await في الشاشة الأولى بيستقبلها، وبعدين setState بيضيفها للقايمة.' },
    { q: 'ليه الشاشة الرئيسية StatefulWidget مش Stateless؟', options: [
      { text: 'لأن فيها AppBar' },
      { text: 'لأن قايمة الملاحظات بتتغير (إضافة وحذف) والواجهة لازم تتحدث معاها' },
      { text: 'لأن Stateful أسرع في الأداء' },
      { text: 'أي شاشة لازم تكون Stateful' }
    ], answer: 1, explain: 'القايمة notes بتتغير مع كل إضافة وحذف — دي state، فمحتاجين StatefulWidget و setState عشان الواجهة تتحدث.' },
    { q: 'الشرط `notes.isEmpty ? ... : ListView.builder(...)` بيعمل إيه؟', options: [
      { text: 'بيخفي التطبيق لما القايمة فاضية' },
      { text: 'بيعرض رسالة ترشد المستخدم لما القايمة فاضية، والقايمة نفسها لما يكون فيها عناصر' },
      { text: 'بيمسح الملاحظات القديمة' },
      { text: 'بيمنع إضافة ملاحظات جديدة' }
    ], answer: 1, explain: 'الواجهة بتعكس الحالة: قايمة فاضية يعني رسالة، قايمة مليانة يعني ListView. ده الـ declarative UI عملياً.' }
  ],
  exercises: [
    { task: 'نفّذ المشروع كامل من الصفر من غير ما تبص في الكود اللي فوق، وبعدين قارن نسختك بالنسخة النموذجية. المهم إن كل النقط في قايمة "اختبره" تعدي.', hint: 'ابدأ بالموديل والشاشة الرئيسية الفاضية، بعدين الإضافة، بعدين الحذف.', code: `الكود النموذجي الكامل موجود في الدرس فوق (٣ أجزاء:
main + NotesApp، NotesScreen، AddNoteScreen).
انسخهم بالترتيب في lib/main.dart وشغل:
flutter run -d chrome`,
      why: 'إعادة الكتابة من الذاكرة (حتى لو غلطت ورجعت بصيت) بتثبت المعلومة أضعاف النسخ المباشر.' },
    { task: 'نفّذ واحد من "التحديات الإضافية" — الأسهل هو AlertDialog للتأكيد قبل الحذف.', hint: 'showDialog بترجع Future زي Navigator.push بالظبط — استنى نتيجتها بـ await.', code: `trailing: IconButton(
  icon: const Icon(Icons.delete),
  onPressed: () async {
    final sure = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('متأكد؟'),
        content: const Text('الملاحظة دي هتتمسح نهائي.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('إلغاء'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('امسح'),
          ),
        ],
      ),
    );
    if (sure == true) {
      setState(() {
        notes.removeAt(index);
      });
    }
  },
)`,
      why: 'لاحظ إن showDialog بتشتغل بنفس منطق Navigator.push: بترجع Future فيه نتيجة pop. اللي اتعلمته في التنقل بينطبق هنا حرفياً.' }
  ]
}
);
