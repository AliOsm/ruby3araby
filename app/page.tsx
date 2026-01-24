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
                يمكنك كتابة <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">puts &quot;مرحبا&quot;</code> لطباعة
                نص على الشاشة. جرب استخدام <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-sm">Ruby</code> اليوم!
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
