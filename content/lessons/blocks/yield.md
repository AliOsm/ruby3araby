# yield وإنشاء دوال مخصصة

في الدرس السابق تعلمنا كيف نستخدم الكتل مع دوال مثل `each` و `map` و `select`. الآن حان الوقت لنتعلم كيف **نُنشئ دوالنا الخاصة** التي تقبل كتل برمجية!

## ما هو yield؟

`yield` هي كلمة مفتاحية في روبي تعني **"نفّذ الكتلة المُمرَّرة"**. عندما تكتب `yield` داخل دالة، روبي تُوقف تنفيذ الدالة مؤقتاً وتُنفّذ الكتلة التي مرَّرها المستدعي.

```ruby
def say_hello
  puts "قبل yield"
  yield
  puts "بعد yield"
end

say_hello { puts "أنا داخل الكتلة!" }
# قبل yield
# أنا داخل الكتلة!
# بعد yield
```

في هذا المثال:
1. الدالة تطبع "قبل yield"
2. `yield` يُنفّذ الكتلة `{ puts "أنا داخل الكتلة!" }`
3. الدالة تستمر وتطبع "بعد yield"

## تمرير قيم إلى الكتلة

يمكن تمرير قيم من الدالة إلى الكتلة:

```ruby
def greet
  yield("أحمد")
  yield("سارة")
end

greet { |name| puts "مرحباً #{name}!" }
# مرحباً أحمد!
# مرحباً سارة!
```

القيمة المُمرَّرة لـ `yield` تصبح معامل الكتلة (`|name|`).

### تمرير قيم متعددة

```ruby
def process_numbers
  yield(10, 20)
  yield(30, 40)
end

process_numbers do |a, b|
  puts "#{a} + #{b} = #{a + b}"
end
# 10 + 20 = 30
# 30 + 40 = 70
```

## استقبال قيمة من الكتلة

الكتلة تُرجع قيمة (آخر تعبير فيها)، ويمكن للدالة استخدامها:

```ruby
def calculate
  result = yield(5)
  puts "النتيجة: #{result}"
end

# النتيجة: 10
calculate { |n| n * 2 }
# النتيجة: 25
calculate { |n| n ** 2 }
```

## yield المتعدد

يمكن استدعاء `yield` عدة مرات:

```ruby
def repeat_three_times
  yield
  yield
  yield
end

counter = 0
repeat_three_times { counter += 1 }
# 3
puts counter
```

### مثال: مكرر مخصص

```ruby
def my_times(n)
  i = 0
  while i < n
    yield(i)
    i += 1
  end
end

my_times(3) { |i| puts "المرة #{i + 1}" }
# المرة 1
# المرة 2
# المرة 3
```

## التحقق من وجود كتلة

ماذا لو استدعى شخص الدالة بدون كتلة؟ استخدم `block_given?`:

```ruby
def maybe_yield
  if block_given?
    puts "وجدت كتلة!"
    yield
  else
    puts "لا توجد كتلة"
  end
end

maybe_yield { puts "مرحباً!" }
# وجدت كتلة!
# مرحباً!

maybe_yield
# لا توجد كتلة
```

### مثال عملي: دالة مع قيمة افتراضية

```ruby
def fetch_data
  if block_given?
    yield
  else
    "بيانات افتراضية"
  end
end

# بيانات مخصصة
puts fetch_data { "بيانات مخصصة" }
# بيانات افتراضية
puts fetch_data
```

## إنشاء مكررات مخصصة

### مثال 1: each للأرقام الزوجية

```ruby
def each_even(numbers)
  numbers.each do |n|
    yield(n) if n.even?
  end
end

each_even([1, 2, 3, 4, 5, 6]) { |n| puts n }
# 2
# 4
# 6
```

### مثال 2: each مع فهرس مخصص

```ruby
def each_numbered(array, start_at: 1)
  index = start_at
  array.each do |item|
    yield(index, item)
    index += 1
  end
end

each_numbered(["تفاح", "برتقال", "موز"]) do |num, fruit|
  puts "#{num}. #{fruit}"
end
# 1. تفاح
# 2. برتقال
# 3. موز
```

### مثال 3: مكرر مع تصفية

```ruby
def select_if(array)
  result = []
  array.each do |item|
    result << item if yield(item)
  end
  result
end

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = select_if(numbers) { |n| n.even? }
# [2, 4, 6, 8, 10]
puts evens.inspect
```

## yield مع إرجاع قيمة

الدالة يمكنها إرجاع نتيجة بناءً على yield:

```ruby
def transform_all(array)
  result = []
  array.each do |item|
    result << yield(item)
  end
  result
end

numbers = [1, 2, 3]
doubled = transform_all(numbers) { |n| n * 2 }
# [2, 4, 6]
puts doubled.inspect
```

## أنماط شائعة مع yield

### نمط 1: Wrapper (التغليف)

```ruby
def with_timing
  start_time = Time.now
  result = yield
  end_time = Time.now
  puts "استغرق التنفيذ: #{end_time - start_time} ثانية"
  result
end

with_timing { sleep(1); "تم!" }
# استغرق التنفيذ: 1.0... ثانية
```

### نمط 2: Setup/Teardown

```ruby
def with_database_connection
  puts "فتح الاتصال..."
  connection = "اتصال نشط"
  yield(connection)
  puts "إغلاق الاتصال..."
end

with_database_connection do |conn|
  puts "استخدام #{conn}"
end
# فتح الاتصال...
# استخدام اتصال نشط
# إغلاق الاتصال...
```

### نمط 3: التكرار المشروط

```ruby
def repeat_until_success(max_attempts)
  attempts = 0
  loop do
    attempts += 1
    result = yield
    return result if result
    break if attempts >= max_attempts
  end
  nil
end

# محاكاة نجاح بعد 3 محاولات
attempt = 0
result = repeat_until_success(5) do
  attempt += 1
  puts "المحاولة #{attempt}"
  # ينجح في المحاولة الثالثة
  attempt >= 3
end
# المحاولة 1
# المحاولة 2
# المحاولة 3
```

## الفرق بين yield و call

سنتعرف على Procs في الدرس القادم، لكن للمقارنة السريعة:

| yield | Proc.call |
|-------|-----------|
| ينفذ الكتلة المُمرَّرة ضمنياً | ينفذ كائن Proc صريحاً |
| أبسط في الكتابة | أكثر مرونة |
| لا يمكن تخزين الكتلة | يمكن تخزين Proc وتمريره |

## جدول ملخص

| المفهوم | الوصف | مثال |
|---------|-------|------|
| `yield` | تنفيذ الكتلة | `yield` |
| `yield(value)` | تمرير قيمة للكتلة | `yield(5)` |
| `block_given?` | التحقق من وجود كتلة | `if block_given?` |
| قيمة yield | استقبال قيمة من الكتلة | `result = yield` |

## أمثلة عملية

### مثال 1: معالجة قائمة مهام

```ruby
def process_tasks(tasks)
  completed = 0
  tasks.each do |task|
    puts "جاري: #{task}..."
    success = yield(task)
    if success
      completed += 1
      puts "✓ تم!"
    else
      puts "✗ فشل"
    end
  end
  puts "---"
  puts "اكتمل: #{completed}/#{tasks.length}"
end

tasks = ["تحميل البيانات", "معالجة الصور", "إرسال التقرير"]
process_tasks(tasks) do |task|
  task.include?("البيانات") || task.include?("الصور")
end
# جاري: تحميل البيانات...
# ✓ تم!
# جاري: معالجة الصور...
# ✓ تم!
# جاري: إرسال التقرير...
# ✗ فشل
# ---
# اكتمل: 2/3
```

### مثال 2: بناء HTML بسيط

```ruby
def html_tag(tag)
  puts "<#{tag}>"
  yield if block_given?
  puts "</#{tag}>"
end

html_tag("div") do
  html_tag("p") { puts "مرحباً بالعالم!" }
end
# <div>
# <p>
# مرحباً بالعالم!
# </p>
# </div>
```

### مثال 3: مكرر للأعداد الأولية

```ruby
def each_prime(max)
  (2..max).each do |n|
    is_prime = true
    (2..Math.sqrt(n)).each do |i|
      if n % i == 0
        is_prime = false
        break
      end
    end
    yield(n) if is_prime
  end
end

each_prime(20) { |prime| print "#{prime} " }
# 2 3 5 7 11 13 17 19
```

## أخطاء شائعة

### 1. استدعاء yield بدون كتلة

```ruby
def bad_yield
  # خطأ إذا لم تُمرر كتلة!
  yield
end

# LocalJumpError: no block given
# bad_yield

# الحل: استخدم block_given?
def safe_yield
  yield if block_given?
end
```

### 2. نسيان قيمة yield

```ruby
# خطأ: نسيان إرجاع نتيجة yield
def bad_map(array)
  result = []
  array.each do |item|
    # النتيجة ضائعة!
    yield(item)
  end
  # مصفوفة فارغة دائماً
  result
end

# صحيح
def good_map(array)
  result = []
  array.each do |item|
    # حفظ النتيجة
    result << yield(item)
  end
  result
end
```

## تمرين: إنشاء مكرر مخصص

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ دالة `each_word` تستقبل نصاً
2. الدالة تُقسّم النص إلى كلمات وتُمرر كل كلمة للكتلة
3. استخدم الدالة لطباعة كل كلمة من جملة "روبي لغة برمجة رائعة"

**الناتج المتوقع:**
```
روبي
لغة
برمجة
رائعة
```

**تلميحات:**
- استخدم `split` لتقسيم النص إلى مصفوفة كلمات
- استخدم `each` للتكرار على الكلمات
- داخل التكرار، استخدم `yield(word)` لتمرير الكلمة للكتلة

---

> **تذكّر:** `yield` تجعل دوالك أكثر مرونة! بدلاً من تحديد ما تفعله الدالة بالضبط، يمكنك ترك القرار للمستدعي عبر الكتلة.
