# الكتل البرمجية (Blocks)

الكتل البرمجية (Blocks) هي أحد أقوى المفاهيم في روبي. الكتلة هي **قطعة من الشيفرة** يمكن تمريرها إلى دالة لتنفيذها. هذا يجعل الشيفرة أكثر مرونة وقابلية لإعادة الاستخدام.

## ما هي الكتلة؟

الكتلة هي شيفرة مُجمّعة تُمرر لدالة لتنفيذها. فكر فيها كـ"تعليمات إضافية" تُعطيها للدالة.

```ruby
# هذا استدعاء دالة each مع كتلة
[1, 2, 3].each do |number|
  puts number * 2
end
# 2
# 4
# 6
```

في هذا المثال، الشيفرة بين `do` و `end` هو الكتلة. الدالة `each` تستدعي هذه الكتلة مرة لكل عنصر في المصفوفة.

## صيغتان لكتابة الكتل

روبي تقدم صيغتين لكتابة الكتل:

### 1. صيغة do...end (للكتل الطويلة)

```ruby
[1, 2, 3].each do |n|
  doubled = n * 2
  puts "#{n} × 2 = #{doubled}"
end
# 1 × 2 = 2
# 2 × 2 = 4
# 3 × 2 = 6
```

### 2. صيغة الأقواس المعقوفة { } (للكتل القصيرة)

```ruby
[1, 2, 3].each { |n| puts n * 2 }
# 2
# 4
# 6
```

### متى نستخدم كل صيغة؟

| الصيغة | الاستخدام |
|--------|-----------|
| `do...end` | للكتل متعددة الأسطر |
| `{ }` | للكتل في سطر واحد |

```ruby
# كتلة قصيرة - استخدم { }
squares = [1, 2, 3].map { |n| n ** 2 }

# كتلة طويلة - استخدم do...end
[1, 2, 3].each do |n|
  square = n ** 2
  cube = n ** 3
  puts "#{n}: مربع=#{square}, مكعب=#{cube}"
end
```

## معاملات الكتلة (Block Parameters)

المعاملات بين `| |` هي المتغيرات التي تستقبل القيم من الدالة:

### معامل واحد

```ruby
names = ["أحمد", "سارة", "علي"]
names.each { |name| puts "مرحباً #{name}!" }
# مرحباً أحمد!
# مرحباً سارة!
# مرحباً علي!
```

### معاملان

```ruby
person = { name: "أحمد", age: 25, city: "القاهرة" }

person.each do |key, value|
  puts "#{key}: #{value}"
end
# name: أحمد
# age: 25
# city: القاهرة
```

### معامل مع فهرس

```ruby
fruits = ["تفاح", "برتقال", "موز"]

fruits.each_with_index do |fruit, index|
  puts "#{index + 1}. #{fruit}"
end
# 1. تفاح
# 2. برتقال
# 3. موز
```

## الكتل مع each

دالة `each` هي الأكثر استخداماً مع الكتل:

```ruby
# التكرار على مصفوفة
[1, 2, 3, 4, 5].each do |num|
  puts "الرقم: #{num}"
end

# التكرار على نطاق
(1..5).each { |n| print "#{n} " }
# 1 2 3 4 5

# التكرار على نص (كل حرف)
"مرحبا".each_char { |char| puts char }
# م
# ر
# ح
# ب
# ا
```

## الكتل مع map

دالة `map` تُحوّل كل عنصر وتُرجع مصفوفة جديدة:

```ruby
numbers = [1, 2, 3, 4, 5]

# مضاعفة كل رقم
doubled = numbers.map { |n| n * 2 }
# [2, 4, 6, 8, 10]
puts doubled.inspect

# تحويل لنص
strings = numbers.map { |n| "الرقم #{n}" }
# ["الرقم 1", "الرقم 2", ...]
puts strings.inspect

# مع كتلة متعددة الأسطر
grades = [85, 90, 78, 92]
results = grades.map do |grade|
  if grade >= 90
    "ممتاز"
  elsif grade >= 80
    "جيد جداً"
  else
    "جيد"
  end
end
# ["جيد جداً", "ممتاز", "جيد", "ممتاز"]
puts results.inspect
```

## الكتل مع select

دالة `select` تُرشّح العناصر بناءً على شرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية فقط
evens = numbers.select { |n| n.even? }
# [2, 4, 6, 8, 10]
puts evens.inspect

# الأرقام الأكبر من 5
big = numbers.select { |n| n > 5 }
# [6, 7, 8, 9, 10]
puts big.inspect

# مع كتلة متعددة الأسطر
words = ["تفاح", "برتقال", "موز", "عنب", "مانجو"]
long_words = words.select do |word|
  word.length > 3
end
# ["برتقال", "مانجو"]
puts long_words.inspect
```

## الكتل مع reject

دالة `reject` عكس `select` - تُزيل العناصر التي تُطابق الشرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# إزالة الأرقام الزوجية (الإبقاء على الفردية)
odds = numbers.reject { |n| n.even? }
# [1, 3, 5, 7, 9]
puts odds.inspect

# إزالة الأرقام الصغيرة
big = numbers.reject { |n| n <= 5 }
# [6, 7, 8, 9, 10]
puts big.inspect
```

## الكتل مع find

دالة `find` تُرجع أول عنصر يُطابق الشرط:

```ruby
numbers = [1, 3, 5, 4, 7, 6]

# أول رقم زوجي
first_even = numbers.find { |n| n.even? }
# 4
puts first_even

# أول رقم أكبر من 5
first_big = numbers.find { |n| n > 5 }
# 7
puts first_big

# إذا لم يوجد عنصر مطابق
not_found = numbers.find { |n| n > 100 }
# true
puts not_found.nil?
```

## الكتل مع reduce

دالة `reduce` تُجمّع كل العناصر في قيمة واحدة:

```ruby
numbers = [1, 2, 3, 4, 5]

# مجموع الأرقام
sum = numbers.reduce(0) { |total, n| total + n }
# 15
puts sum

# الحد الأقصى
max = numbers.reduce { |biggest, n| n > biggest ? n : biggest }
# 5
puts max

# ضرب كل الأرقام
product = numbers.reduce(1) { |result, n| result * n }
# 120
puts product

# صيغة مختصرة للعمليات البسيطة
# 15 (مجموع)
puts numbers.reduce(:+)
# 120 (ضرب)
puts numbers.reduce(:*)
```

## الكتل مع any? و all? و none?

دوال تُرجع `true` أو `false`:

```ruby
numbers = [2, 4, 6, 8, 10]

# هل يوجد رقم فردي؟
# false
puts numbers.any? { |n| n.odd? }

# هل كل الأرقام زوجية؟
# true
puts numbers.all? { |n| n.even? }

# هل لا يوجد رقم سالب؟
# true
puts numbers.none? { |n| n < 0 }
```

```ruby
words = ["تفاح", "برتقال", "موز"]

# هل توجد كلمة طويلة؟
# true (برتقال)
puts words.any? { |w| w.length > 5 }

# هل كل الكلمات قصيرة؟
# true
puts words.all? { |w| w.length < 10 }
```

## تسلسل الدوال مع الكتل (Method Chaining)

يمكن ربط عدة دوال معاً:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية، مضاعفة، ثم مجموعها
result = numbers
  # [2, 4, 6, 8, 10]
  .select { |n| n.even? }
  # [4, 8, 12, 16, 20]
  .map { |n| n * 2 }
  # 60
  .reduce(:+)

# 60
puts result
```

```ruby
# معالجة بيانات الطلاب
students = [
  { name: "أحمد", grade: 85 },
  { name: "سارة", grade: 92 },
  { name: "علي", grade: 78 },
  { name: "فاطمة", grade: 95 }
]

# أسماء الطلاب الناجحين (>=80) مرتبة
top_students = students
  .select { |s| s[:grade] >= 80 }
  .map { |s| s[:name] }
  .sort

# ["أحمد", "سارة", "فاطمة"]
puts top_students.inspect
```

## الكتل مع times و upto و downto

```ruby
# تكرار 5 مرات
5.times { |i| puts "المرة #{i + 1}" }
# المرة 1
# المرة 2
# ...

# العد تصاعدياً
1.upto(5) { |n| print "#{n} " }
# 1 2 3 4 5

# العد تنازلياً
5.downto(1) { |n| print "#{n} " }
# 5 4 3 2 1
```

## متغيرات الكتلة المحلية

المتغيرات المُعرّفة داخل الكتلة تكون محلية لها:

```ruby
x = 10

[1, 2, 3].each do |n|
  # y محلية للكتلة
  y = n * 2
  puts "n=#{n}, y=#{y}, x=#{x}"
end

# 10 (لم يتغير)
puts x
# خطأ! y غير معرّفة خارج الكتلة
# puts y
```

لكن الكتلة **تستطيع** الوصول للمتغيرات الخارجية:

```ruby
total = 0

[1, 2, 3, 4, 5].each do |n|
  # تعديل متغير خارجي
  total += n
end

# 15
puts total
```

## جدول ملخص

| الدالة | الوصف | مثال |
|--------|-------|------|
| `each` | تكرار على كل عنصر | `arr.each { \|x\| puts x }` |
| `map` | تحويل كل عنصر | `arr.map { \|x\| x * 2 }` |
| `select` | تصفية بشرط | `arr.select { \|x\| x > 5 }` |
| `reject` | إزالة بشرط | `arr.reject { \|x\| x < 0 }` |
| `find` | أول عنصر مطابق | `arr.find { \|x\| x.even? }` |
| `reduce` | تجميع لقيمة واحدة | `arr.reduce(:+)` |
| `any?` | هل يوجد مطابق؟ | `arr.any? { \|x\| x > 10 }` |
| `all?` | هل الكل مطابق؟ | `arr.all? { \|x\| x > 0 }` |
| `none?` | هل لا يوجد مطابق؟ | `arr.none? { \|x\| x < 0 }` |

## أمثلة عملية

### مثال 1: تحليل بيانات المبيعات

```ruby
sales = [120, 80, 200, 150, 90, 180, 220]

# حساب الإجمالي
total = sales.reduce(:+)
# 1040
puts "إجمالي المبيعات: #{total}"

# حساب المتوسط
average = total.to_f / sales.length
# 148.57
puts "متوسط المبيعات: #{average.round(2)}"

# المبيعات فوق المتوسط
above_avg = sales.select { |s| s > average }
# [200, 150, 180, 220]
puts "فوق المتوسط: #{above_avg.inspect}"
```

### مثال 2: معالجة قائمة أسماء

```ruby
names = ["  أحمد  ", "سارة", "  علي", "فاطمة  "]

# تنظيف وترتيب
cleaned = names
  # إزالة المسافات
  .map { |name| name.strip }
  # (لو كانت إنجليزية)
  .map { |name| name.upcase }
  # ترتيب
  .sort

puts cleaned.inspect
```

### مثال 3: فلترة وتحويل

```ruby
products = [
  { name: "قميص", price: 100, in_stock: true },
  { name: "بنطلون", price: 150, in_stock: false },
  { name: "حذاء", price: 200, in_stock: true },
  { name: "قبعة", price: 50, in_stock: true }
]

# المنتجات المتوفرة وأسعارها مع خصم 10%
available = products
  .select { |p| p[:in_stock] }
  .map do |p|
    {
      name: p[:name],
      discounted_price: (p[:price] * 0.9).round
    }
  end

available.each do |p|
  puts "#{p[:name]}: #{p[:discounted_price]} جنيه"
end
# قميص: 90 جنيه
# حذاء: 180 جنيه
# قبعة: 45 جنيه
```

## تمرين: استخدام الكتل

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. لديك مصفوفة أرقام: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
2. استخدم `select` لاختيار الأرقام الزوجية
3. استخدم `map` لمضاعفة كل رقم (× 2)
4. استخدم `reduce` لحساب المجموع
5. اطبع النتيجة النهائية

**الناتج المتوقع:**
```
60
```

**تلميحات:**
- ابدأ بالمصفوفة وسلسل الدوال
- `n.even?` يُرجع true للأرقام الزوجية
- `reduce(:+)` أو `reduce(0) { |sum, n| sum + n }`

---

> **تذكّر:** الكتل تجعل شيفرتك أقصر وأوضح. استخدمها مع دوال التكرار والتحويل!
