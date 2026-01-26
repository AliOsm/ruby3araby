# النطاقات والتعداد (Ranges & Enumerables)

النطاقات (Ranges) هي طريقة أنيقة لتمثيل تسلسل من القيم، والتعداد (Enumerables) هي مجموعة قوية من الدوال للتعامل مع المجموعات. معاً، تُشكّل أدوات أساسية لمعالجة البيانات في روبي.

## ما هو النطاق؟

النطاق يُمثّل تسلسلاً متتابعاً من القيم، من قيمة بداية إلى قيمة نهاية.

```ruby
# نطاق من 1 إلى 5
range = 1..5
puts range.to_a.inspect  # [1, 2, 3, 4, 5]

# النطاق يمكن تحويله لمصفوفة
numbers = (1..10).to_a
puts numbers.inspect  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## أنواع النطاقات

### النطاق الشامل (Inclusive): نقطتان `..`

يشمل القيمة الأولى **والأخيرة**:

```ruby
# من 1 إلى 5 (يشمل 5)
inclusive = 1..5
puts inclusive.to_a.inspect  # [1, 2, 3, 4, 5]

# من 'a' إلى 'e' (يشمل 'e')
letters = 'a'..'e'
puts letters.to_a.inspect  # ["a", "b", "c", "d", "e"]
```

### النطاق الحصري (Exclusive): ثلاث نقاط `...`

يشمل القيمة الأولى **بدون الأخيرة**:

```ruby
# من 1 إلى 5 (لا يشمل 5)
exclusive = 1...5
puts exclusive.to_a.inspect  # [1, 2, 3, 4]

# من 'a' إلى 'e' (لا يشمل 'e')
letters = 'a'...'e'
puts letters.to_a.inspect  # ["a", "b", "c", "d"]
```

### جدول مقارنة النطاقات

| النوع | الرمز | المثال | النتيجة |
|-------|-------|--------|---------|
| شامل | `..` | `1..5` | 1, 2, 3, 4, 5 |
| حصري | `...` | `1...5` | 1, 2, 3, 4 |

## استخدامات النطاقات

### التكرار باستخدام each

```ruby
# طباعة الأرقام من 1 إلى 5
(1..5).each do |n|
  puts n
end
```

الناتج:
```
1
2
3
4
5
```

### التحقق من الانتماء (include?)

```ruby
age_range = 18..65

puts age_range.include?(25)  # true
puts age_range.include?(10)  # false
puts age_range.include?(65)  # true

# يمكن استخدام cover? أيضاً (أسرع)
puts age_range.cover?(30)    # true
```

### نطاقات الحروف

```ruby
# الحروف الصغيرة
lowercase = 'a'..'z'
puts lowercase.to_a.join(", ")

# الحروف الكبيرة
uppercase = 'A'..'Z'
puts uppercase.to_a.first(5).inspect  # ["A", "B", "C", "D", "E"]
```

### النطاقات في case/when

```ruby
grade = 85

result = case grade
when 90..100 then "ممتاز"
when 80..89  then "جيد جداً"
when 70..79  then "جيد"
when 60..69  then "مقبول"
else "راسب"
end

# جيد جداً
puts result
```

### قطع النصوص والمصفوفات

```ruby
text = "مرحباً بالعالم"
# مرحباً
puts text[0..5]

numbers = [10, 20, 30, 40, 50]
puts numbers[1..3].inspect  # [20, 30, 40]
puts numbers[2..-1].inspect # [30, 40, 50] (من الفهرس 2 إلى النهاية)
```

## معلومات عن النطاق

```ruby
range = 1..10

puts range.first    # 1
puts range.last     # 10
puts range.min      # 1
puts range.max      # 10
puts range.size     # 10
puts range.count    # 10
```

## التعداد (Enumerables)

التعداد (Enumerable) هو وحدة (module) تُضاف للمصفوفات والقواميس والنطاقات، وتوفر دوال قوية لمعالجة المجموعات.

## الدوال الأساسية للتعداد

### each - التكرار الأساسي

```ruby
fruits = ["تفاح", "موز", "برتقال"]

fruits.each do |fruit|
  puts "أحب #{fruit}"
end
```

الناتج:
```
أحب تفاح
أحب موز
أحب برتقال
```

### each_with_index - التكرار مع الفهرس

```ruby
fruits = ["تفاح", "موز", "برتقال"]

fruits.each_with_index do |fruit, index|
  puts "#{index + 1}. #{fruit}"
end
```

الناتج:
```
1. تفاح
2. موز
3. برتقال
```

### map (أو collect) - التحويل

تُطبّق عملية على كل عنصر وتُرجع مصفوفة جديدة:

```ruby
numbers = [1, 2, 3, 4, 5]

# ضرب كل رقم في 2
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect  # [2, 4, 6, 8, 10]

# تحويل الأرقام لنصوص
words = numbers.map { |n| "الرقم #{n}" }
puts words.inspect  # ["الرقم 1", "الرقم 2", "الرقم 3", "الرقم 4", "الرقم 5"]

# الأصل لا يتغير
puts numbers.inspect  # [1, 2, 3, 4, 5]
```

### select (أو find_all) - التصفية

تُرجع العناصر التي تُحقق شرطاً معيناً:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية فقط
evens = numbers.select { |n| n.even? }
puts evens.inspect  # [2, 4, 6, 8, 10]

# الأرقام الأكبر من 5
big = numbers.select { |n| n > 5 }
puts big.inspect  # [6, 7, 8, 9, 10]
```

### reject - عكس select

تُرجع العناصر التي **لا** تُحقق الشرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# استبعاد الأرقام الزوجية (إرجاع الفردية)
odds = numbers.reject { |n| n.even? }
puts odds.inspect  # [1, 3, 5, 7, 9]
```

### find (أو detect) - البحث عن أول عنصر

تُرجع **أول** عنصر يُحقق الشرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6]

# أول رقم زوجي
first_even = numbers.find { |n| n.even? }
puts first_even  # 2

# أول رقم أكبر من 10 (غير موجود)
result = numbers.find { |n| n > 10 }
puts result.inspect  # nil
```

### find_all vs find

```ruby
numbers = [1, 2, 3, 4, 5, 6]

# find_all تُرجع كل العناصر المطابقة (مصفوفة)
all_evens = numbers.find_all { |n| n.even? }
puts all_evens.inspect  # [2, 4, 6]

# find تُرجع أول عنصر مطابق فقط
first_even = numbers.find { |n| n.even? }
puts first_even  # 2
```

### reduce (أو inject) - التجميع

تُجمّع كل العناصر في قيمة واحدة:

```ruby
numbers = [1, 2, 3, 4, 5]

# مجموع الأرقام
sum = numbers.reduce(0) { |total, n| total + n }
puts sum  # 15

# الصيغة المختصرة للعمليات الشائعة
puts numbers.reduce(:+)  # 15 (الجمع)
puts numbers.reduce(:*)  # 120 (الضرب)

# أكبر رقم
max = numbers.reduce { |biggest, n| n > biggest ? n : biggest }
puts max  # 5
```

### any? و all? و none?

```ruby
numbers = [2, 4, 6, 8, 10]

# هل يوجد رقم فردي؟
puts numbers.any? { |n| n.odd? }   # false

# هل كل الأرقام زوجية؟
puts numbers.all? { |n| n.even? }  # true

# هل لا يوجد أي رقم سالب؟
puts numbers.none? { |n| n < 0 }   # true

# بدون شرط (تحقق من وجود عناصر)
puts numbers.any?   # true (المصفوفة ليست فارغة)
puts [].any?        # false (المصفوفة فارغة)
```

### count - العدّ بشرط

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# عدد الأرقام الزوجية
puts numbers.count { |n| n.even? }  # 5

# عدد الأرقام الأكبر من 5
puts numbers.count { |n| n > 5 }    # 5

# عدد كل العناصر
puts numbers.count  # 10
```

### take و drop

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# أخذ أول 3 عناصر
puts numbers.take(3).inspect  # [1, 2, 3]

# تجاهل أول 3 عناصر
puts numbers.drop(3).inspect  # [4, 5, 6, 7, 8, 9, 10]
```

### partition - التقسيم

تُقسّم المجموعة إلى مصفوفتين بناءً على شرط:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# تقسيم إلى زوجي وفردي
evens, odds = numbers.partition { |n| n.even? }
puts evens.inspect  # [2, 4, 6, 8, 10]
puts odds.inspect   # [1, 3, 5, 7, 9]
```

### group_by - التجميع

```ruby
words = ["تفاح", "موز", "برتقال", "عنب", "كمثرى", "ليمون"]

# تجميع حسب الطول
by_length = words.group_by { |w| w.length }
puts by_length.inspect
# {4=>["تفاح", "ليمون"], 3=>["موز", "عنب"], 6=>["برتقال", "كمثرى"]}
```

## جدول ملخص: دوال التعداد الأساسية

| الدالة | الوصف | نوع الناتج |
|--------|-------|------------|
| `each` | التكرار على كل عنصر | المصفوفة الأصلية |
| `map` | تحويل كل عنصر | مصفوفة جديدة |
| `select` | تصفية العناصر المطابقة | مصفوفة جديدة |
| `reject` | تصفية العناصر غير المطابقة | مصفوفة جديدة |
| `find` | البحث عن أول عنصر مطابق | عنصر واحد أو nil |
| `reduce` | تجميع في قيمة واحدة | قيمة واحدة |
| `any?` | هل يوجد عنصر مطابق؟ | true/false |
| `all?` | هل كل العناصر مطابقة؟ | true/false |
| `none?` | هل لا يوجد عنصر مطابق؟ | true/false |
| `count` | عدد العناصر (المطابقة) | رقم |

## سلسلة الدوال (Method Chaining)

يمكن ربط عدة دوال معاً للحصول على نتائج معقدة:

```ruby
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# الأرقام الزوجية مضروبة في 10، مجموعها
result = numbers.select { |n| n.even? }
                .map { |n| n * 10 }
                .reduce(:+)
puts result  # 300 (20+40+60+80+100)
```

## أمثلة عملية

### مثال 1: تصفية وتحويل بيانات الطلاب

```ruby
students = [
  { name: "أحمد", grade: 85 },
  { name: "سارة", grade: 92 },
  { name: "محمد", grade: 78 },
  { name: "فاطمة", grade: 95 },
  { name: "علي", grade: 65 }
]

# أسماء الناجحين (70+) مرتبة أبجدياً
passing_names = students
  .select { |s| s[:grade] >= 70 }
  .map { |s| s[:name] }
  .sort

puts passing_names.inspect  # ["أحمد", "سارة", "فاطمة", "محمد"]
```

### مثال 2: معالجة قائمة أسعار

```ruby
prices = [100, 250, 50, 300, 150, 75]

# المنتجات بين 100 و 200 مع خصم 10%
discounted = prices
  .select { |p| p >= 100 && p <= 200 }
  .map { |p| (p * 0.9).round }

puts "الأسعار بعد الخصم: #{discounted.inspect}"  # [90, 135]
puts "المجموع: #{discounted.sum}"  # 225
```

### مثال 3: تحليل النص

```ruby
text = "روبي لغة برمجة رائعة روبي سهلة التعلم روبي ممتعة"
words = text.split

# عدد تكرار كل كلمة
word_counts = words.group_by { |w| w }
                   .transform_values { |v| v.count }

puts "تكرار الكلمات:"
word_counts.each do |word, count|
  puts "  #{word}: #{count}"
end
```

الناتج:
```
تكرار الكلمات:
  روبي: 3
  لغة: 1
  برمجة: 1
  رائعة: 1
  سهلة: 1
  التعلم: 1
  ممتعة: 1
```

### مثال 4: التحقق من بيانات

```ruby
ages = [25, 30, 17, 45, 15, 35, 22]

# التحقق من صلاحية كل الأعمار
all_adults = ages.all? { |age| age >= 18 }
puts "كل الأعمار بالغين: #{all_adults}"  # false

# هل يوجد قاصر؟
has_minor = ages.any? { |age| age < 18 }
puts "يوجد قاصر: #{has_minor}"  # true

# عدد البالغين
adult_count = ages.count { |age| age >= 18 }
puts "عدد البالغين: #{adult_count}"  # 5
```

## الفرق بين each و map

```ruby
numbers = [1, 2, 3]

# each: للتكرار فقط (لا تُرجع قيمة مفيدة)
result1 = numbers.each { |n| puts n * 2 }
puts result1.inspect  # [1, 2, 3] (المصفوفة الأصلية)

# map: للتحويل (تُرجع مصفوفة جديدة)
result2 = numbers.map { |n| n * 2 }
puts result2.inspect  # [2, 4, 6]
```

## نصائح مهمة

1. **استخدم map للتحويل** - عندما تريد تغيير كل عنصر
2. **استخدم select للتصفية** - عندما تريد اختيار عناصر معينة
3. **استخدم find للبحث** - عندما تريد أول عنصر مطابق فقط
4. **استخدم reduce للتجميع** - عندما تريد قيمة واحدة من مجموعة
5. **سلسل الدوال** - للحصول على شيفرة أنظف وأوضح
6. **`..` شامل، `...` حصري** - تذكر الفرق بين نوعي النطاق

## تمرين: تصفية وتحويل البيانات

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ مصفوفة `numbers` تحتوي على الأرقام من 1 إلى 20 باستخدام النطاق
2. استخدم `select` لاختيار الأرقام الزوجية فقط
3. استخدم `map` لضرب كل رقم في 3
4. استخدم `reduce` لحساب مجموع النتائج
5. اطبع النتائج بهذا الترتيب:
   - المصفوفة الأصلية (الأرقام من 1-20)
   - الأرقام الزوجية
   - الأرقام مضروبة في 3
   - المجموع النهائي

**تلميحات:**
- لإنشاء المصفوفة من نطاق: `numbers = (1..20).to_a`
- للتصفية: `evens = numbers.select { |n| n.even? }`
- للتحويل: `tripled = evens.map { |n| n * 3 }`
- للمجموع: `sum = tripled.reduce(:+)` أو `tripled.sum`
- استخدم `p` لطباعة المصفوفات

الناتج المتوقع:
```
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
[6, 12, 18, 24, 30, 36, 42, 48, 54, 60]
330
```

---

> **تذكّر:** النطاقات والتعداد أدوات قوية تجعل شيفرتك أكثر إيجازاً وقراءة!
