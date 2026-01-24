# القيم المرجعة وعوامل Splat

في الدرس السابق تعلمنا كيفية تعريف الدوال واستدعائها. الآن سنتعلم كيف **تُرجع** الدوال قيماً، وكيف نستخدم عوامل **Splat** للتعامل مع عدد متغير من الوسائط.

## القيم المرجعة (Return Values)

كل دالة في روبي تُرجع قيمة. هذه القيمة يمكن حفظها في متغير أو استخدامها مباشرة.

### الإرجاع الضمني (Implicit Return)

في روبي، الدالة تُرجع **آخر قيمة تم حسابها** تلقائياً:

```ruby
def add(a, b)
  a + b  # هذه القيمة تُرجع تلقائياً
end

result = add(5, 3)
puts result  # 8
```

### الإرجاع الصريح (Explicit Return)

يمكن استخدام كلمة `return` للإرجاع صراحةً:

```ruby
def divide(a, b)
  return "لا يمكن القسمة على صفر!" if b == 0
  a.to_f / b
end

puts divide(10, 2)  # 5.0
puts divide(10, 0)  # لا يمكن القسمة على صفر!
```

### متى نستخدم return الصريح؟

```ruby
# 1. للخروج المبكر من الدالة
def check_age(age)
  return "عمر غير صالح" if age < 0
  return "طفل" if age < 13
  return "مراهق" if age < 18
  "بالغ"  # آخر قيمة - إرجاع ضمني
end

# 2. لإرجاع قيمة من داخل حلقة أو شرط
def find_first_even(numbers)
  numbers.each do |n|
    return n if n.even?
  end
  nil  # لم يوجد رقم زوجي
end

puts find_first_even([1, 3, 4, 5, 6])  # 4
```

### إرجاع قيم متعددة

يمكن للدالة إرجاع عدة قيم باستخدام مصفوفة:

```ruby
def min_max(numbers)
  [numbers.min, numbers.max]
end

result = min_max([5, 2, 8, 1, 9])
puts result[0]  # 1
puts result[1]  # 9

# أو باستخدام التعيين المتعدد
min, max = min_max([5, 2, 8, 1, 9])
puts "الأصغر: #{min}, الأكبر: #{max}"
```

### مثال عملي: دالة حسابية

```ruby
def calculate(a, b, operation)
  case operation
  when :add
    a + b
  when :subtract
    a - b
  when :multiply
    a * b
  when :divide
    return "خطأ: القسمة على صفر" if b == 0
    a.to_f / b
  else
    "عملية غير معروفة"
  end
end

puts calculate(10, 5, :add)       # 15
puts calculate(10, 5, :multiply)  # 50
puts calculate(10, 0, :divide)    # خطأ: القسمة على صفر
```

## عامل Splat (*args)

عامل Splat (`*`) يسمح للدالة باستقبال **عدد غير محدد** من الوسائط:

```ruby
def sum(*numbers)
  numbers.reduce(0, :+)
end

puts sum(1, 2)           # 3
puts sum(1, 2, 3, 4, 5)  # 15
puts sum(10)             # 10
puts sum                 # 0
```

### كيف يعمل Splat؟

```ruby
def show_args(*args)
  p args        # المصفوفة
  p args.class  # Array
  puts "عدد الوسائط: #{args.length}"
end

show_args("أحمد", 25, :developer)
# ["أحمد", 25, :developer]
# Array
# عدد الوسائط: 3
```

### دمج Splat مع معاملات عادية

```ruby
# معامل عادي + splat
def greet(greeting, *names)
  names.each do |name|
    puts "#{greeting} #{name}!"
  end
end

greet("مرحباً", "أحمد", "سارة", "علي")
# مرحباً أحمد!
# مرحباً سارة!
# مرحباً علي!
```

```ruby
# معامل عادي في البداية والنهاية
def announce(intro, *items, outro)
  puts intro
  items.each { |item| puts "  - #{item}" }
  puts outro
end

announce("اليوم سنتعلم:", "المتغيرات", "الشروط", "الحلقات", "هيا نبدأ!")
# اليوم سنتعلم:
#   - المتغيرات
#   - الشروط
#   - الحلقات
# هيا نبدأ!
```

### أمثلة عملية على Splat

```ruby
# حساب المتوسط
def average(*numbers)
  return 0 if numbers.empty?
  numbers.sum.to_f / numbers.length
end

puts average(80, 90, 85)  # 85.0

# إيجاد أكبر قيمة
def find_max(*values)
  values.max
end

puts find_max(5, 2, 8, 1, 9)  # 9

# دمج النصوص
def join_with(*strings, separator: ", ")
  strings.join(separator)
end

puts join_with("أحمد", "سارة", "علي")  # أحمد، سارة، علي
```

## عامل Double Splat (**kwargs)

عامل Double Splat (`**`) يستقبل **وسائط مسماة** كقاموس (Hash):

```ruby
def create_user(**options)
  p options
end

create_user(name: "أحمد", age: 25, city: "القاهرة")
# {:name=>"أحمد", :age=>25, :city=>"القاهرة"}
```

### الوصول للقيم

```ruby
def create_profile(**info)
  puts "الاسم: #{info[:name]}"
  puts "العمر: #{info[:age] || 'غير محدد'}"
  puts "المدينة: #{info[:city] || 'غير محددة'}"
end

create_profile(name: "سارة", age: 28)
# الاسم: سارة
# العمر: 28
# المدينة: غير محددة
```

### دمج معاملات عادية مع Double Splat

```ruby
def register(name, email, **details)
  puts "تسجيل: #{name}"
  puts "البريد: #{email}"
  details.each do |key, value|
    puts "#{key}: #{value}"
  end
end

register("أحمد", "ahmed@example.com", phone: "0123456789", city: "الإسكندرية")
# تسجيل: أحمد
# البريد: ahmed@example.com
# phone: 0123456789
# city: الإسكندرية
```

## الدمج الكامل: كل الأنواع معاً

```ruby
def complex_method(required, optional = "افتراضي", *args, **kwargs)
  puts "إلزامي: #{required}"
  puts "اختياري: #{optional}"
  puts "args: #{args.inspect}"
  puts "kwargs: #{kwargs.inspect}"
end

complex_method("مطلوب")
# إلزامي: مطلوب
# اختياري: افتراضي
# args: []
# kwargs: {}

complex_method("مطلوب", "مخصص", 1, 2, 3, x: 10, y: 20)
# إلزامي: مطلوب
# اختياري: مخصص
# args: [1, 2, 3]
# kwargs: {:x=>10, :y=>20}
```

### ترتيب المعاملات

الترتيب الصحيح للمعاملات في تعريف الدالة:

1. المعاملات الإلزامية
2. المعاملات ذات القيم الافتراضية
3. `*args` (Splat)
4. المعاملات المسماة (keyword arguments)
5. `**kwargs` (Double Splat)
6. `&block` (كتلة - سنتعلمها لاحقاً)

```ruby
def full_example(a, b = 2, *rest, x:, y: 10, **options)
  puts "a: #{a}, b: #{b}"
  puts "rest: #{rest}"
  puts "x: #{x}, y: #{y}"
  puts "options: #{options}"
end

full_example(1, 3, 4, 5, x: 100, z: 200)
# a: 1, b: 3
# rest: [4, 5]
# x: 100, y: 10
# options: {:z=>200}
```

## استخدام Splat عند الاستدعاء

يمكن استخدام Splat لتفكيك مصفوفة إلى وسائط:

```ruby
def add(a, b, c)
  a + b + c
end

numbers = [1, 2, 3]
puts add(*numbers)  # 6 (يُفكك المصفوفة إلى 1, 2, 3)
```

```ruby
# تفكيك قاموس إلى وسائط مسماة
def greet(name:, greeting: "مرحباً")
  puts "#{greeting} #{name}!"
end

options = { name: "أحمد", greeting: "أهلاً" }
greet(**options)  # أهلاً أحمد!
```

## جدول ملخص

| المفهوم | الصيغة | الوصف |
|---------|--------|-------|
| إرجاع ضمني | آخر سطر | يُرجع آخر قيمة محسوبة |
| إرجاع صريح | `return value` | يُرجع قيمة ويخرج من الدالة |
| إرجاع متعدد | `return [a, b]` أو `[a, b]` | يُرجع عدة قيم كمصفوفة |
| Splat | `def foo(*args)` | يستقبل عدد غير محدد من الوسائط |
| Double Splat | `def foo(**kwargs)` | يستقبل وسائط مسماة كقاموس |
| تفكيك مصفوفة | `foo(*array)` | يُحول مصفوفة إلى وسائط |
| تفكيك قاموس | `foo(**hash)` | يُحول قاموس إلى وسائط مسماة |

## أخطاء شائعة

### 1. نسيان أن آخر قيمة تُرجع

```ruby
# خطأ: puts تُرجع nil!
def wrong_add(a, b)
  puts a + b
end

result = wrong_add(5, 3)  # يطبع 8
puts result               # nil! ليس 8

# صحيح
def correct_add(a, b)
  a + b
end
```

### 2. خلط ترتيب المعاملات

```ruby
# خطأ: splat قبل المعامل الاختياري
# def bad(required, *args, optional = "x")
# end

# صحيح
def good(required, optional = "x", *args)
end
```

### 3. استخدام return في آخر سطر (غير ضروري)

```ruby
# ليس خطأ لكن غير مستحسن
def redundant(a, b)
  return a + b  # return غير ضروري هنا
end

# أفضل
def better(a, b)
  a + b
end
```

## نصائح مهمة

1. **استخدم الإرجاع الضمني** - هو أسلوب روبي المُفضل
2. **استخدم return للخروج المبكر** - عند التحقق من الأخطاء
3. **Splat للمرونة** - عندما لا تعرف عدد الوسائط مسبقاً
4. **Double Splat للخيارات** - للإعدادات والتكوينات
5. **تجنب التعقيد** - لا تستخدم كل الأنواع في دالة واحدة إلا عند الضرورة

## تمرين: دالة متعددة الوسائط

حان وقت التطبيق! في محرر الكود على اليسار:

**المطلوب:**
1. عرّف دالة `sum_all` تستقبل أي عدد من الأرقام وتُرجع مجموعها
2. عرّف دالة `describe_person` تستقبل `name` (إلزامي) ووسائط مسماة اختيارية
3. اختبر الدالتين وفق الناتج المتوقع

**تلميحات:**
- استخدم `*numbers` لاستقبال عدد متغير من الوسائط
- استخدم `**info` لاستقبال وسائط مسماة
- تذكر أن `reduce(:+)` يجمع عناصر المصفوفة

---

> **تذكّر:** الدوال في روبي تُرجع دائماً قيمة - استفد من هذا لكتابة كود أنظف!
