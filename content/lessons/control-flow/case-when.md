# جملة case/when

في الدرس السابق تعلمنا استخدام `if-elsif-else` لاتخاذ القرارات. لكن عندما يكون لدينا العديد من الحالات للمقارنة، تصبح سلسلة `elsif` طويلة ومعقدة. هنا يأتي دور `case/when`.

## ما هي جملة case/when؟

جملة `case/when` هي طريقة أنظف لمقارنة قيمة واحدة مع عدة احتمالات. بدلاً من كتابة:

```ruby
day = 1

if day == 1
  puts "السبت"
elsif day == 2
  puts "الأحد"
elsif day == 3
  puts "الإثنين"
# ... وهكذا
end
```

يمكننا كتابة:

```ruby
day = 1

case day
when 1
  puts "السبت"
when 2
  puts "الأحد"
when 3
  puts "الإثنين"
end
```

الناتج:
```
السبت
```

## البنية الأساسية

```ruby
case القيمة_المراد_فحصها
when الحالة_الأولى
  # الشيفرة إذا تحققت الحالة الأولى
when الحالة_الثانية
  # الشيفرة إذا تحققت الحالة الثانية
else
  # الشيفرة إذا لم تتحقق أي حالة
end
```

### مثال: أيام الأسبوع

```ruby
day_number = 5

day_name = case day_number
when 1
  "السبت"
when 2
  "الأحد"
when 3
  "الإثنين"
when 4
  "الثلاثاء"
when 5
  "الأربعاء"
when 6
  "الخميس"
when 7
  "الجمعة"
else
  "رقم غير صالح"
end

puts "اليوم هو: " + day_name
```

الناتج:
```
اليوم هو: الأربعاء
```

> **ملاحظة:** في روبي، `case/when` تُرجع قيمة! لذا يمكنك تعيين نتيجتها لمتغير مباشرة.

## مطابقة قيم متعددة

يمكنك مطابقة عدة قيم في سطر `when` واحد باستخدام الفاصلة:

```ruby
day_number = 7

case day_number
when 6, 7
  puts "عطلة نهاية الأسبوع!"
when 1, 2, 3, 4, 5
  puts "يوم عمل"
else
  puts "رقم غير صالح"
end
```

الناتج:
```
عطلة نهاية الأسبوع!
```

### مثال: تصنيف الحروف

```ruby
letter = "a"

case letter
when "a", "e", "i", "o", "u"
  puts "حرف متحرك (vowel)"
when "b", "c", "d", "f", "g"
  puts "حرف ساكن (consonant)"
else
  puts "حرف آخر"
end
```

الناتج:
```
حرف متحرك (vowel)
```

## مطابقة النطاقات (Ranges)

ميزة قوية في `case/when` هي القدرة على مطابقة النطاقات:

```ruby
score = 85

case score
when 90..100
  puts "ممتاز"
when 80..89
  puts "جيد جداً"
when 70..79
  puts "جيد"
when 60..69
  puts "مقبول"
when 0..59
  puts "راسب"
else
  puts "درجة غير صالحة"
end
```

الناتج:
```
جيد جداً
```

> **تذكير:** النطاق `80..89` يشمل 80 و 89، بينما `80...89` يشمل 80 لكن لا يشمل 89.

### مثال: فئات العمر

```ruby
age = 25

stage = case age
when 0..12
  "طفل"
when 13..19
  "مراهق"
when 20..59
  "بالغ"
when 60..120
  "كبير في السن"
else
  "عمر غير صالح"
end

puts "المرحلة العمرية: " + stage
```

الناتج:
```
المرحلة العمرية: بالغ
```

## مطابقة النصوص

`case/when` تعمل مع أي نوع بيانات، بما في ذلك النصوص:

```ruby
command = "start"

case command
when "start"
  puts "بدء التشغيل..."
when "stop"
  puts "إيقاف التشغيل..."
when "restart"
  puts "إعادة التشغيل..."
when "status"
  puts "النظام يعمل"
else
  puts "أمر غير معروف"
end
```

الناتج:
```
بدء التشغيل...
```

### مثال: قائمة طعام

```ruby
choice = "2"

case choice
when "1"
  puts "اخترت: برجر"
  puts "السعر: 25 ريال"
when "2"
  puts "اخترت: بيتزا"
  puts "السعر: 35 ريال"
when "3"
  puts "اخترت: سلطة"
  puts "السعر: 15 ريال"
else
  puts "اختيار غير موجود"
end
```

الناتج:
```
اخترت: بيتزا
السعر: 35 ريال
```

## مطابقة الأنماط باستخدام Regex

يمكن استخدام `case/when` مع التعبيرات المنتظمة (Regular Expressions):

```ruby
email = "user@example.com"

case email
when /gmail\.com$/
  puts "بريد جوجل"
when /yahoo\.com$/
  puts "بريد ياهو"
when /hotmail\.com$/, /outlook\.com$/
  puts "بريد مايكروسوفت"
else
  puts "بريد آخر"
end
```

الناتج:
```
بريد آخر
```

## مطابقة الأنواع (Types)

يمكن التحقق من نوع البيانات:

```ruby
value = 42

case value
when Integer
  puts "الرقم: " + value.to_s
when Float
  puts "العدد العشري: " + value.to_s
when String
  puts "النص: " + value
else
  puts "نوع غير معروف"
end
```

الناتج:
```
الرقم: 42
```

### مثال: التعامل مع أنواع مختلفة

```ruby
input = "مرحباً"

result = case input
when Integer
  input * 2
when String
  input.upcase
when Array
  input.length
else
  "غير مدعوم"
end

puts result
```

الناتج:
```
مرحباً
```

## case بدون قيمة (Case as If)

يمكن استخدام `case` بدون قيمة للمقارنة كـ `if-elsif`:

```ruby
temperature = 35

case
when temperature < 0
  puts "تجمد!"
when temperature < 15
  puts "بارد"
when temperature < 25
  puts "معتدل"
when temperature < 35
  puts "حار"
else
  puts "حار جداً!"
end
```

الناتج:
```
حار
```

> **ملاحظة:** هذا الشكل مفيد عندما تحتاج لشروط معقدة، لكن عادةً `if-elsif` تكون أوضح في هذه الحالة.

## المقارنة: case/when vs if-elsif-else

| الميزة | case/when | if-elsif-else |
|--------|-----------|---------------|
| مقارنة قيمة واحدة بعدة احتمالات | ممتاز | جيد |
| شروط معقدة (&&, \|\|) | غير مدعوم مباشرة | ممتاز |
| مطابقة نطاقات | ممتاز | يحتاج كتابة أكثر |
| القراءة | أوضح للقيم المتعددة | أوضح للشروط المعقدة |
| إرجاع قيمة | مباشر | يحتاج متغير |

## جملة then

يمكن استخدام `then` لكتابة الشيفرة في سطر واحد:

```ruby
grade = "A"

case grade
when "A" then puts "ممتاز"
when "B" then puts "جيد جداً"
when "C" then puts "جيد"
when "D" then puts "مقبول"
else puts "راسب"
end
```

الناتج:
```
ممتاز
```

## أمثلة عملية

### حاسبة بسيطة

```ruby
num1 = 10
num2 = 5
operation = "+"

result = case operation
when "+"
  num1 + num2
when "-"
  num1 - num2
when "*"
  num1 * num2
when "/"
  num2 != 0 ? num1 / num2 : "خطأ: القسمة على صفر"
else
  "عملية غير معروفة"
end

puts "النتيجة: " + result.to_s
```

الناتج:
```
النتيجة: 15
```

### نظام تسعير

```ruby
membership = :gold
base_price = 100

discount = case membership
when :platinum
  30
when :gold
  20
when :silver
  10
else
  0
end

final_price = base_price - discount
puts "سعر العضوية #{membership}: #{final_price} ريال"
```

الناتج:
```
سعر العضوية gold: 80 ريال
```

### معالجة استجابة HTTP

```ruby
status_code = 404

message = case status_code
when 200..299
  "نجاح!"
when 300..399
  "تحويل"
when 400..499
  "خطأ من العميل"
when 500..599
  "خطأ من الخادم"
else
  "شيفرة غير معروفة"
end

puts "الحالة #{status_code}: #{message}"
```

الناتج:
```
الحالة 404: خطأ من العميل
```

## نصائح مهمة

1. **استخدم case/when** عندما تقارن قيمة واحدة بعدة احتمالات
2. **استخدم if-elsif** عندما تحتاج شروطاً معقدة
3. **لا تنسَ else** لمعالجة الحالات غير المتوقعة
4. **استفد من النطاقات** لتبسيط الشروط الرقمية
5. **تذكر أن case يُرجع قيمة** - يمكنك تعيين النتيجة لمتغير

## جدول ملخص

| الصيغة | الوصف | مثال |
|--------|-------|-------|
| `case x when v` | مطابقة قيمة واحدة | `when 1` |
| `when v1, v2` | مطابقة قيم متعددة | `when 1, 2, 3` |
| `when a..b` | مطابقة نطاق | `when 1..10` |
| `when /pattern/` | مطابقة نمط | `when /^a/` |
| `when Type` | مطابقة نوع | `when String` |
| `else` | الحالة الافتراضية | `else` |

## تمرين: اسم اليوم

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
اكتب برنامجاً يحول رقم اليوم إلى اسمه بالعربية:

1. عرّف متغير `day_number = 4`
2. استخدم `case/when` لتحديد اسم اليوم:
   - 1: السبت
   - 2: الأحد
   - 3: الإثنين
   - 4: الثلاثاء
   - 5: الأربعاء
   - 6: الخميس
   - 7: الجمعة
   - أي رقم آخر: رقم غير صالح
3. اطبع اسم اليوم

الناتج المتوقع:
```
الثلاثاء
```

> **تلميح:** استخدم `case day_number` ثم `when 1` وهكذا. تذكر أن تضيف `else` للأرقام غير الصالحة!

---

> **تذكّر:** `case/when` تجعل الشيفرة أنظف وأسهل للقراءة عندما تقارن قيمة واحدة بعدة احتمالات!
