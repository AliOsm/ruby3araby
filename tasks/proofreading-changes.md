# تقرير التغييرات - مراجعة المحتوى
# Proofreading Changes Report

**تاريخ الإنشاء / Created**: 2026-01-26
**المشروع / Project**: Ruby3araby

---

## ملخص تنفيذي / Executive Summary

| المقياس / Metric | القيمة / Value |
|------------------|----------------|
| إجمالي التصحيحات / Total Corrections | 55 |
| الملفات المُعدَّلة / Files Modified | 22 |
| تصحيحات الاتساق / Consistency Fixes | 34 |
| تصحيحات الترقيم / Punctuation Fixes | 16 |
| توحيد المصطلحات / Terminology Standardization | 5 |

---

## توزيع التغييرات حسب النوع / Changes by Category

### 1. تصحيحات الاتساق (34 تصحيحاً) / Consistency Fixes (34 corrections)

معظم هذه التصحيحات تتعلق باستخدام التنوين - تحويل "مرحبا" إلى "مرحباً"

Most of these corrections relate to tanween (Arabic diacritic) usage - changing "مرحبا" to "مرحباً"

### 2. تصحيحات الترقيم (16 تصحيحاً) / Punctuation Fixes (16 corrections)

- تحويل علامات التعجب غير الضرورية إلى نقاط
- إصلاح موضع علامات الحذف (...)

- Converting unnecessary exclamation marks to periods
- Fixing ellipsis placement (...)

### 3. توحيد المصطلحات (5 تصحيحات) / Terminology Standardization (5 corrections)

توحيد مصطلح "Mixin" من "الخلط" إلى "المزيج" (حسب القاموس)

Standardizing "Mixin" term from "الخلط" to "المزيج" (per glossary)

---

## التغييرات حسب الملف / Changes by File

### content/lessons/getting-started/what-is-ruby.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-001 | `"مرحبا".length` | `"مرحباً".length` | consistency |
| CH-002 | `هذه الشيفرة تطبع "مرحباً!" خمس مرات - واضح وبسيط!` | `هذه الشيفرة تطبع "مرحباً!" خمس مرات - واضح وبسيط.` | punctuation |

### content/lessons/getting-started/hello-world.md (4 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-003 | `# مرحبا بالعالم` | `# مرحباً بالعالم` | consistency |
| CH-004 | `برنامج "مرحبا بالعالم"` | `برنامج "مرحباً بالعالم"` | consistency |
| CH-005 | `مرحبا بالعالم` | `مرحباً بالعالم` | consistency |
| CH-006 | `مرحبا بالعالم` | `مرحباً بالعالم` | consistency |

### content/lessons/getting-started/comments.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-007 | `puts "مرحبا"` | `puts "مرحباً"` | consistency |
| CH-008 | `مرحبا` | `مرحباً` | consistency |

### content/lessons/getting-started/output-methods.md (5 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-009 | `p "مرحبا"` | `p "مرحباً"` | consistency |
| CH-010 | `puts "مرحبا"` | `puts "مرحباً"` | consistency |
| CH-011 | `"مرحبا"` | `"مرحباً"` | consistency |
| CH-012 | `مرحبا` | `مرحباً` | consistency |
| CH-013 | `لاحظ أن p يُظهر علامات الاقتباس، بينما puts لا يُظهرها!` | `لاحظ أن p يُظهر علامات الاقتباس، بينما puts لا يُظهرها.` | punctuation |

### content/lessons/fundamentals/variables-types.md (3 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-014 | `روبي تكتشفه تلقائياً!` | `روبي تكتشفه تلقائياً.` | punctuation |
| CH-015 | `لاحظ أن 1_000_000 تساوي مليون - الشرطة السفلية للقراءة فقط ولا تؤثر على القيمة!` | `لاحظ أن 1_000_000 تساوي مليون - الشرطة السفلية للقراءة فقط ولا تؤثر على القيمة.` | punctuation |
| CH-016 | `"مرحبا"` | `"مرحباً"` | consistency |

### content/lessons/fundamentals/string-methods.md (3 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-017 | `greeting = "مرحبا"` | `greeting = "مرحباً"` | consistency |
| CH-018 | `text = "   مرحبا بالعالم   "` | `text = "   مرحباً بالعالم   "` | consistency |
| CH-019 | `# "مرحبا بالعالم"` | `# "مرحباً بالعالم"` | consistency |

### content/lessons/fundamentals/bang-predicate.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-020 | `message = "   مرحبا   "` | `message = "   مرحباً   "` | consistency |
| CH-021 | `# مرحبا` | `# مرحباً` | consistency |

### content/lessons/fundamentals/truthiness.md (5 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-022 | `value = "مرحبا"` | `value = "مرحباً"` | consistency |
| CH-023 | `puts "الصفر صادق في روبي!"` | `puts "الصفر صادق في روبي."` | punctuation |
| CH-024 | `puts "النص الفارغ صادق في روبي!"` | `puts "النص الفارغ صادق في روبي."` | punctuation |
| CH-025 | `puts "المصفوفة الفارغة صادقة في روبي!"` | `puts "المصفوفة الفارغة صادقة في روبي."` | punctuation |
| CH-026 | `puts "القاموس الفارغ صادق في روبي!"` | `puts "القاموس الفارغ صادق في روبي."` | punctuation |

### content/lessons/control-flow/case-when.md (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-027 | `هنا يأتي دور case/when!` | `هنا يأتي دور case/when.` | punctuation |

### content/lessons/control-flow/ternary.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-028 | `هنا يأتي دور **العامل الثلاثي** (Ternary Operator)!` | `هنا يأتي دور **العامل الثلاثي** (Ternary Operator).` | punctuation |
| CH-029 | `كلا الطريقتين تعطي نفس النتيجة، لكن العامل الثلاثي أقصر بكثير!` | `كلا الطريقتين تعطي نفس النتيجة، لكن العامل الثلاثي أقصر بكثير.` | punctuation |

### content/lessons/collections/arrays.md (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-030 | `mixed = [42, "مرحبا", true, 3.14, nil]` | `mixed = [42, "مرحباً", true, 3.14, nil]` | consistency |

### content/lessons/collections/ranges-enumerables.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-031 | `text = "مرحبا بالعالم"` | `text = "مرحباً بالعالم"` | consistency |
| CH-032 | `# مرحبا` | `# مرحباً` | consistency |

### content/lessons/blocks/block-syntax.md (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-033 | `"مرحبا".each_char { \|char\| puts char }` | `"مرحباً".each_char { \|char\| puts char }` | consistency |

### content/lessons/oop/classes-objects.md (2 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-034 | `puts "مرحبا".class    # String` | `puts "مرحباً".class    # String` | consistency |
| CH-035 | `puts "مرحبا".length   # 5` | `puts "مرحباً".length   # 5` | consistency |

### content/lessons/modules/modules-mixins.md (5 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-036 | `هنا تأتي **الوحدات** (Modules)!` | `هنا تأتي **الوحدات** (Modules).` | punctuation |
| CH-051 | `# الوحدات والخلط (Modules and Mixins)` | `# الوحدات والمزيج (Modules and Mixins)` | terminology |
| CH-052 | `2. **الخلط (Mixins)**: مشاركة سلوكيات بين أصناف مختلفة` | `2. **المزيج (Mixins)**: مشاركة سلوكيات بين أصناف مختلفة` | terminology |
| CH-053 | `## الاستخدام الثاني: الخلط (Mixins)` | `## الاستخدام الثاني: المزيج (Mixins)` | terminology |
| CH-054 | `الخلط هو **القوة الحقيقية** للوحدات!` | `المزيج هو **القوة الحقيقية** للوحدات!` | terminology |

### content/lessons/errors/error-handling.md (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-037 | `الأخطاء أمر **حتمي**!` | `الأخطاء أمر **حتمي**.` | punctuation |

### content/glossary.json (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-038 | `عامل شرطي مختصر: شرط ? قيمة_صحيح : قيمة_خطأ` | `عامل شرطي مختصر: شرط ? قيمة_صحيح : قيمة_خطأ.` | punctuation |

### public/course.json (7 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-039 | `مرحبا بالعالم` (lesson title) | `مرحباً بالعالم` | consistency |
| CH-040 | `# اكتب شيفرة تطبع: مرحبا بالعالم` | `# اكتب شيفرة تطبع: مرحباً بالعالم` | consistency |
| CH-041 | `مرحبا بالعالم` (expectedOutput) | `مرحباً بالعالم` | consistency |
| CH-042 | `ضع النص داخل علامات اقتباس: puts "مرحبا بالعالم"` | `ضع النص داخل علامات اقتباس: puts "مرحباً بالعالم"` | consistency |
| CH-043 | `تأكد من كتابة النص بالضبط: مرحبا بالعالم (بدون علامة تعجب)` | `تأكد من كتابة النص بالضبط: مرحباً بالعالم (بدون علامة تعجب)` | consistency |
| CH-044 | `الصفر والنص الفارغ والمصفوفة الفارغة كلها صادقة!` | `الصفر والنص الفارغ والمصفوفة الفارغة كلها صادقة.` | punctuation |
| CH-055 | `الوحدات والخلط` (lesson title) | `الوحدات والمزيج` | terminology |

### components/CodePlayground.tsx (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-045 | `puts "مرحبا بالعالم!"` | `puts "مرحباً بالعالم!"` | consistency |

### components/CodeEditor.tsx (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-046 | `...جارٍ تحميل المحرر` | `جارٍ تحميل المحرر...` | punctuation |

### app/page.tsx (3 تغييرات / changes)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-047 | `# مرحبا بك في روبي!` | `# مرحباً بك في روبي!` | consistency |
| CH-048 | `puts "مرحبا يا #{name}!"` | `puts "مرحباً يا #{name}!"` | consistency |
| CH-049 | `مرحبا يا أحمد!` | `مرحباً يا أحمد!` | consistency |

### app/lessons/[section]/[lesson]/LessonPlayground.tsx (1 تغيير / change)

| # | قبل / Before | بعد / After | النوع / Type |
|---|--------------|-------------|--------------|
| CH-050 | `puts "مرحبا بالعالم!"` | `puts "مرحباً بالعالم!"` | consistency |

---

## ملخص التحقق من الترجمات / Translation Verification Summary

| المقياس / Metric | القيمة / Value |
|------------------|----------------|
| المصطلحات المُتحقق منها / Terms Verified | 67 |
| المشاكل التي تتطلب تغييرات / Issues Requiring Changes | 0 |
| الاقتراحات المُلاحظة / Suggestions Noted | 2 |
| تحديثات القاموس المُطبقة / Glossary Updates Applied | 0 |

### الاقتراحات المُلاحظة / Suggestions Noted

1. **hash** (قاموس): البديل المقترح "جدول تجزئة" - تم الاحتفاظ بالترجمة الحالية لأنها أكثر سهولة للمبتدئين
2. **method** (دالة): البديل المقترح "تابع" - تم الاحتفاظ بالترجمة الحالية لتبسيط المصطلحات للمبتدئين

---

## الملفات النظيفة (بدون مشاكل) / Clean Files (No Issues)

The following lesson files required no corrections:
- content/lessons/fundamentals/numbers.md
- content/lessons/fundamentals/symbols.md
- content/lessons/fundamentals/operators.md
- content/lessons/fundamentals/interpolation.md
- content/lessons/fundamentals/nil.md
- content/lessons/fundamentals/constants.md
- content/lessons/loops/while-loop.md
- content/lessons/loops/for-each.md
- content/lessons/methods/defining-methods.md
- content/lessons/methods/arguments.md
- content/lessons/blocks/yield.md
- content/lessons/blocks/procs-lambdas.md
- content/lessons/oop/initialize-accessors.md
- content/lessons/oop/inheritance.md
- content/lessons/challenges/fizzbuzz.md
- content/lessons/challenges/calculator.md
- content/lessons/challenges/guessing-game.md

---

## القصص المُكتملة / Completed Stories

| القصة / Story | الوصف / Description | التغييرات / Changes |
|---------------|---------------------|---------------------|
| US-016 | Fix grammar issues in getting-started lessons | 13 |
| US-017 | Fix grammar issues in fundamentals lessons | 13 |
| US-018 | Fix grammar issues in control-flow, loops, collections, methods | 6 |
| US-019 | Fix grammar issues in blocks, oop, modules, errors, challenges | 5 |
| US-020 | Fix grammar issues in glossary.json | 1 |
| US-021 | Fix grammar issues in course.json | 6 |
| US-022 | Fix grammar issues in UI components and app pages | 6 |
| US-023 | Update glossary with verified translations | 0 (verified, no changes needed) |
| US-024 | Standardize terminology across lesson files | 4 |
| US-025 | Standardize terminology in course.json and UI files | 1 |

---

## الخلاصة / Conclusion

تم تطبيق **55 تصحيحاً** على **22 ملفاً** عبر محتوى الدورة. كانت معظم التصحيحات (62%) تتعلق بالاتساق في استخدام التنوين، يليها تصحيحات الترقيم (29%)، ثم توحيد المصطلحات (9%).

**55 corrections** were applied across **22 files** throughout the course content. Most corrections (62%) were consistency fixes related to tanween usage, followed by punctuation fixes (29%), and terminology standardization (9%).

جميع التصحيحات موثقة في `tasks/changes-log.json` مع تتبع كامل للتغييرات.

All corrections are documented in `tasks/changes-log.json` with full change tracking.
