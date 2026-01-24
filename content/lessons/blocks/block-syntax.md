# الكتل البرمجية (Blocks)

الكتل البرمجية (Blocks) هي أحد أقوى المفاهيم في روبي. الكتلة هي **قطعة من الكود** يمكن تمريرها إلى دالة لتنفيذها. هذا يجعل الكود أكثر مرونة وقابلية لإعادة الاستخدام.

## ما هي الكتلة؟

الكتلة هي كود مُجمّع يُمرر لدالة لتنفيذه. فكر فيها كـ"تعليمات إضافية" تُعطيها للدالة.

```ruby
# هذا استدعاء دالة each مع كتلة
[1, 2, 3].each do |number|
  puts number * 2
end
# 2
# 4
# 6
```

في هذا المثال، الكود بين `do` و `end` هو الكتلة. الدالة `each` تستدعي هذه الكتلة مرة لكل عنصر في المصفوفة.

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
puts doubled.inspect  # [2, 4, 6, 8, 10]

# تحويل لنص
strings = numbers.map { |n| "الرقم #{n}" }
puts strings.inspect  # ["الرقم 1", "الرقم 2", ...]

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
puts results.inspect  # ["جيد جداً", "ممتاز", "جيد", "ممتاز"]
```

## الكتل مع select

دالة `select` تُرشّح العناصر بناءً على شرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية فقط
evens = numbers.select { |n| n.even? }
puts evens.inspect  # [2, 4, 6, 8, 10]

# الأرقام الأكبر من 5
big = numbers.select { |n| n > 5 }
puts big.inspect  # [6, 7, 8, 9, 10]

# مع كتلة متعددة الأسطر
words = ["تفاح", "برتقال", "موز", "عنب", "مانجو"]
long_words = words.select do |word|
  word.length > 3
end
puts long_words.inspect  # ["برتقال", "مانجو"]
```

## الكتل مع reject

دالة `reject` عكس `select` - تُزيل العناصر التي تُطابق الشرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# إزالة الأرقام الزوجية (الإبقاء على الفردية)
odds = numbers.reject { |n| n.even? }
puts odds.inspect  # [1, 3, 5, 7, 9]

# إزالة الأرقام الصغيرة
big = numbers.reject { |n| n <= 5 }
puts big.inspect  # [6, 7, 8, 9, 10]
```

## الكتل مع find

دالة `find` تُرجع أول عنصر يُطابق الشرط:

```ruby
numbers = [1, 3, 5, 4, 7, 6]

# أول رقم زوجي
first_even = numbers.find { |n| n.even? }
puts first_even  # 4

# أول رقم أكبر من 5
first_big = numbers.find { |n| n > 5 }
puts first_big  # 7

# إذا لم يوجد عنصر مطابق
not_found = numbers.find { |n| n > 100 }
puts not_found.nil?  # true
```

## الكتل مع reduce

دالة `reduce` تُجمّع كل العناصر في قيمة واحدة:

```ruby
numbers = [1, 2, 3, 4, 5]

# مجموع الأرقام
sum = numbers.reduce(0) { |total, n| total + n }
puts sum  # 15

# الحد الأقصى
max = numbers.reduce { |biggest, n| n > biggest ? n : biggest }
puts max  # 5

# ضرب كل الأرقام
product = numbers.reduce(1) { |result, n| result * n }
puts product  # 120

# صيغة مختصرة للعمليات البسيطة
puts numbers.reduce(:+)  # 15 (مجموع)
puts numbers.reduce(:*)  # 120 (ضرب)
```

## الكتل مع any? و all? و none?

دوال تُرجع `true` أو `false`:

```ruby
numbers = [2, 4, 6, 8, 10]

# هل يوجد رقم فردي؟
puts numbers.any? { |n| n.odd? }   # false

# هل كل الأرقام زوجية؟
puts numbers.all? { |n| n.even? }  # true

# هل لا يوجد رقم سالب؟
puts numbers.none? { |n| n < 0 }   # true
```

```ruby
words = ["تفاح", "برتقال", "موز"]

# هل توجد كلمة طويلة؟
puts words.any? { |w| w.length > 5 }   # true (برتقال)

# هل كل الكلمات قصيرة؟
puts words.all? { |w| w.length < 10 }  # true
```

## تسلسل الدوال مع الكتل (Method Chaining)

يمكن ربط عدة دوال معاً:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية، مضاعفة، ثم مجموعها
result = numbers
  .select { |n| n.even? }      # [2, 4, 6, 8, 10]
  .map { |n| n * 2 }           # [4, 8, 12, 16, 20]
  .reduce(:+)                  # 60

puts result  # 60
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

puts top_students.inspect  # ["أحمد", "سارة", "فاطمة"]
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
  y = n * 2  # y محلية للكتلة
  puts "n=#{n}, y=#{y}, x=#{x}"
end

puts x  # 10 (لم يتغير)
# puts y  # خطأ! y غير معرّفة خارج الكتلة
```

لكن الكتلة **تستطيع** الوصول للمتغيرات الخارجية:

```ruby
total = 0

[1, 2, 3, 4, 5].each do |n|
  total += n  # تعديل متغير خارجي
end

puts total  # 15
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
puts "إجمالي المبيعات: #{total}"  # 1040

# حساب المتوسط
average = total.to_f / sales.length
puts "متوسط المبيعات: #{average.round(2)}"  # 148.57

# المبيعات فوق المتوسط
above_avg = sales.select { |s| s > average }
puts "فوق المتوسط: #{above_avg.inspect}"  # [200, 150, 180, 220]
```

### مثال 2: معالجة قائمة أسماء

```ruby
names = ["  أحمد  ", "سارة", "  علي", "فاطمة  "]

# تنظيف وترتيب
cleaned = names
  .map { |name| name.strip }      # إزالة المسافات
  .map { |name| name.upcase }     # (لو كانت إنجليزية)
  .sort                           # ترتيب

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

حان وقت التطبيق! في محرر الكود على اليسار:

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

> **تذكّر:** الكتل تجعل كودك أقصر وأوضح. استخدمها مع دوال التكرار والتحويل!
