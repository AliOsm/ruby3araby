"use client";

import CodePlayground from "@/components/CodePlayground";

const sampleCode = `# مرحبا بك في روبي بالعربي!
# Welcome to Ruby3araby!

# طباعة نص على الشاشة
puts "مرحبا بالعالم"
puts "Hello, World!"

# المتغيرات
name = "أحمد"
age = 25

# طباعة باستخدام التضمين
puts "اسمي #{name} وعمري #{age} سنة"

# حلقة بسيطة
3.times do |i|
  puts "العد: #{i + 1}"
end
`;

// Sample code demonstrating gets (user input)
const inputDemoCode = `# مثال على استخدام gets لقراءة المدخلات
# Example of using gets to read user input

puts "ما اسمك؟"
name = gets.chomp

puts "كم عمرك؟"
age = gets.chomp.to_i

puts "مرحبا يا #{name}!"
puts "عمرك #{age} سنة"

if age >= 18
  puts "أنت بالغ 🎉"
else
  puts "أنت قاصر"
end
`;

const defaultInputValues = `أحمد
25`;

// Exercise validation demo
const exerciseCode = `# تمرين: اطبع الأرقام من 1 إلى 5
# Exercise: Print numbers from 1 to 5

# اكتب الكود هنا:
`;

const exerciseExpectedOutput = `1
2
3
4
5`;

const exerciseHints = [
  "استخدم حلقة times أو each مع نطاق (range)",
  "جرب: 5.times { |i| puts i + 1 }",
  "أو جرب: (1..5).each { |n| puts n }",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-foreground">
            روبي بالعربي
          </h1>
          <p className="mb-8 text-xl text-foreground/80">
            منصة تفاعلية لتعلم لغة البرمجة روبي باللغة العربية
          </p>
          <button className="rounded-lg bg-foreground px-8 py-3 text-lg font-medium text-background transition-opacity hover:opacity-90">
            ابدأ التعلم
          </button>
        </section>

        {/* Code Playground Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">جرب البرمجة الآن</h2>
          <p className="mb-4 text-foreground/80">
            اكتب كود روبي في المحرر التفاعلي أدناه واضغط على &quot;تشغيل&quot;
            لرؤية النتيجة:
          </p>
          <CodePlayground starterCode={sampleCode} editorHeight="350px" />
        </section>

        {/* Exercise Validation Demo Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            🎯 تمرين تفاعلي - التحقق من الإجابة
          </h2>
          <p className="mb-4 text-foreground/80">
            اكتب كود لطباعة الأرقام من 1 إلى 5، كل رقم في سطر جديد. اضغط على
            &quot;تحقق من الإجابة&quot; للتحقق من صحة الحل. إذا كانت الإجابة
            خاطئة، ستحصل على تلميحات لمساعدتك!
          </p>
          <CodePlayground
            starterCode={exerciseCode}
            editorHeight="200px"
            expectedOutput={exerciseExpectedOutput}
            hints={exerciseHints}
          />
        </section>

        {/* Input Demo Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            المدخلات المحاكاة - استخدام gets
          </h2>
          <p className="mb-4 text-foreground/80">
            في المتصفح، لا يمكننا استخدام{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
              gets
            </code>{" "}
            بشكل تفاعلي. بدلاً من ذلك، أدخل القيم مسبقاً في حقل
            &quot;المدخلات المحاكاة&quot; أعلاه. كل سطر يمثل قيمة إدخال واحدة
            ستُستخدم عند كل استدعاء لـ{" "}
            <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
              gets
            </code>
            .
          </p>
          <CodePlayground
            starterCode={inputDemoCode}
            editorHeight="300px"
            defaultInput={defaultInputValues}
            showInputPanel={true}
          />
        </section>

        {/* RTL Test Section */}
        <section className="mb-12 rounded-xl border border-foreground/10 bg-foreground/5 p-8">
          <h2 className="mb-6 text-2xl font-semibold">
            اختبار اتجاه النص من اليمين إلى اليسار
          </h2>

          <div className="space-y-6">
            {/* Paragraph Test */}
            <div>
              <h3 className="mb-2 text-lg font-medium">فقرة نصية:</h3>
              <p className="leading-relaxed text-foreground/80">
                لغة روبي هي لغة برمجة ديناميكية مفتوحة المصدر تركز على البساطة
                والإنتاجية. لها قواعد نحوية أنيقة تجعل قراءتها وكتابتها سهلة
                وممتعة. صُممت في اليابان بواسطة يوكيهيرو ماتسوموتو، وتجمع بين أجزاء
                من لغات البرمجة المفضلة لديه.
              </p>
            </div>

            {/* List Test */}
            <div>
              <h3 className="mb-2 text-lg font-medium">قائمة المميزات:</h3>
              <ul className="list-inside list-disc space-y-2 text-foreground/80">
                <li>سهولة التعلم للمبتدئين</li>
                <li>قواعد نحوية واضحة ومقروءة</li>
                <li>مجتمع نشط وداعم</li>
                <li>إطار عمل Rails الشهير لتطوير الويب</li>
              </ul>
            </div>

            {/* Mixed Content Test */}
            <div>
              <h3 className="mb-2 text-lg font-medium">
                نص مختلط (عربي وإنجليزي):
              </h3>
              <p className="leading-relaxed text-foreground/80">
                يمكنك كتابة{" "}
                <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
                  puts &quot;مرحبا&quot;
                </code>{" "}
                لطباعة نص على الشاشة. جرب استخدام{" "}
                <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">
                  Ruby
                </code>{" "}
                اليوم!
              </p>
            </div>

            {/* Card Grid Test */}
            <div>
              <h3 className="mb-4 text-lg font-medium">بطاقات تعليمية:</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-foreground/10 p-4">
                  <h4 className="mb-2 font-semibold">الأساسيات</h4>
                  <p className="text-sm text-foreground/70">
                    تعلم أساسيات البرمجة بلغة روبي
                  </p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-4">
                  <h4 className="mb-2 font-semibold">المتغيرات</h4>
                  <p className="text-sm text-foreground/70">
                    كيفية تخزين البيانات واستخدامها
                  </p>
                </div>
                <div className="rounded-lg border border-foreground/10 p-4">
                  <h4 className="mb-2 font-semibold">الحلقات</h4>
                  <p className="text-sm text-foreground/70">
                    تكرار الأوامر وإنشاء البرامج
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-foreground/60">
          <p>صفحة اختبار RTL - روبي بالعربي © 2026</p>
        </footer>
      </main>
    </div>
  );
}
