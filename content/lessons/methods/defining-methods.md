# تعريف الدوال (Defining Methods)

الدوال (Methods) هي كتل من الشيفرة القابلة لإعادة الاستخدام. بدلاً من كتابة نفس الشيفرة مراراً، نُعرّف دالة مرة واحدة ونستدعيها عند الحاجة.

## لماذا نستخدم الدوال؟

```ruby
# بدون دوال: تكرار الشيفرة
puts "مرحباً أحمد!"
puts "أهلاً وسهلاً بك"
puts "---"

puts "مرحباً سارة!"
puts "أهلاً وسهلاً بك"
puts "---"

# مع دالة: شيفرة منظمة وقابل لإعادة الاستخدام
def greet(name)
  puts "مرحباً #{name}!"
  puts "أهلاً وسهلاً بك"
  puts "---"
end

greet("أحمد")
greet("سارة")
```

## صيغة تعريف الدوال

تبدأ الدالة بكلمة `def` وتنتهي بـ `end`:

```ruby
def اسم_الدالة
  # الشيفرة هنا
end
```

### مثال بسيط

```ruby
def say_hello
  puts "مرحباً بالعالم!"
end

# استدعاء الدالة
# مرحباً بالعالم!
say_hello
# مرحباً بالعالم!
say_hello
```

## المعاملات (Parameters)

المعاملات هي المتغيرات التي تستقبلها الدالة:

```ruby
def greet(name)
  puts "مرحباً #{name}!"
end

# مرحباً أحمد!
greet("أحمد")
# مرحباً سارة!
greet("سارة")
```

### الفرق بين المعاملات والوسائط

- **المعاملات (Parameters)**: المتغيرات في تعريف الدالة
- **الوسائط (Arguments)**: القيم الفعلية عند استدعاء الدالة

```ruby
# name هو المعامل (parameter)
def greet(name)
  puts "مرحباً #{name}!"
end

# "أحمد" هو الوسيط (argument)
greet("أحمد")
```

## معاملات متعددة

يمكن للدالة استقبال أكثر من معامل:

```ruby
def introduce(name, age, city)
  puts "اسمي #{name}"
  puts "عمري #{age} سنة"
  puts "أسكن في #{city}"
end

introduce("أحمد", 25, "القاهرة")
```

الناتج:
```
اسمي أحمد
عمري 25 سنة
أسكن في القاهرة
```

## القيم الافتراضية للمعاملات

يمكن تحديد قيم افتراضية للمعاملات:

```ruby
def greet(name = "زائر")
  puts "مرحباً #{name}!"
end

# مرحباً أحمد!
greet("أحمد")
# مرحباً زائر!
greet
```

### عدة معاملات مع قيم افتراضية

```ruby
def create_user(name, role = "عضو", active = true)
  puts "الاسم: #{name}"
  puts "الدور: #{role}"
  puts "نشط: #{active}"
end

# يستخدم القيم الافتراضية
create_user("أحمد")
# يغير الدور فقط
create_user("سارة", "مشرف")
# يغير كل القيم
create_user("علي", "مدير", false)
```

الناتج:
```
الاسم: أحمد
الدور: عضو
نشط: true
الاسم: سارة
الدور: مشرف
نشط: true
الاسم: علي
الدور: مدير
نشط: false
```

### قاعدة مهمة

المعاملات ذات القيم الافتراضية يجب أن تأتي **بعد** المعاملات الإلزامية:

```ruby
# صحيح ✓
def greet(name, greeting = "مرحباً")
  puts "#{greeting} #{name}!"
end

# خطأ ✗
# def greet(greeting = "مرحباً", name)
#   # هذا سيسبب خطأ!
# end
```

## تسمية الدوال

روبي تتبع اتفاقية **snake_case** لأسماء الدوال:

```ruby
# صحيح ✓
def calculate_total
end

def get_user_name
end

def is_valid?
end

# غير مستحسن ✗
def calculateTotal  # camelCase
end

def GetUserName    # PascalCase
end
```

### اتفاقيات تسمية خاصة

```ruby
# دوال تنتهي بـ ? ترجع true أو false
def adult?(age)
  age >= 18
end

# دوال تنتهي بـ ! تُعدّل القيمة الأصلية (خطرة)
def shout!(text)
  text.upcase!
end
```

## الدوال داخل الدوال

يمكن استدعاء دالة من داخل دالة أخرى:

```ruby
def square(n)
  n * n
end

def sum_of_squares(a, b)
  square(a) + square(b)
end

# 25 (9 + 16)
puts sum_of_squares(3, 4)
```

## الدوال مع الشروط

```ruby
def check_age(age)
  if age >= 18
    puts "بالغ"
  elsif age >= 13
    puts "مراهق"
  else
    puts "طفل"
  end
end

# بالغ
check_age(25)
# مراهق
check_age(15)
# طفل
check_age(8)
```

## الدوال مع الحلقات

```ruby
def countdown(n)
  while n > 0
    puts n
    n -= 1
  end
  puts "انطلق!"
end

countdown(3)
```

الناتج:
```
3
2
1
انطلق!
```

## المتغيرات المحلية

المتغيرات داخل الدالة **محلية** - لا يمكن الوصول إليها من خارجها:

```ruby
def calculate
  # متغير محلي
  result = 100
  puts result
end

# 100
calculate
# خطأ! result غير معرّف هنا
# puts result
```

### نطاق المتغيرات

```ruby
# متغير خارجي
x = 10

def show_x
  # x هنا غير معرّف!
  # سيسبب خطأ
  # puts x
  # هذا متغير محلي جديد، ليس نفس x الخارجي
  x = 5
  puts x
end

# 5
show_x
# 10 (لم يتغير)
puts x
```

## أمثلة عملية

### مثال 1: حاسبة بسيطة

```ruby
def add(a, b)
  puts "#{a} + #{b} = #{a + b}"
end

def subtract(a, b)
  puts "#{a} - #{b} = #{a - b}"
end

def multiply(a, b)
  puts "#{a} × #{b} = #{a * b}"
end

add(10, 5)       # 10 + 5 = 15
subtract(10, 5)  # 10 - 5 = 5
multiply(10, 5)  # 10 × 5 = 50
```

### مثال 2: تنسيق النصوص

```ruby
def format_name(first, last, title = "السيد")
  puts "#{title} #{first} #{last}"
end

# السيد أحمد محمد
format_name("أحمد", "محمد")
# الدكتورة سارة علي
format_name("سارة", "علي", "الدكتورة")
```

### مثال 3: التحقق من البيانات

```ruby
def valid_email?(email)
  email.include?("@") && email.include?(".")
end

def valid_password?(password, min_length = 8)
  password.length >= min_length
end

puts valid_email?("test@example.com")  # true
puts valid_email?("invalid")           # false
puts valid_password?("secret123")      # true
puts valid_password?("abc")            # false
```

### مثال 4: رسائل الترحيب

```ruby
def welcome_message(name, time_of_day = "صباح")
  greeting = case time_of_day
  when "صباح" then "صباح الخير"
  when "مساء" then "مساء الخير"
  else "مرحباً"
  end

  puts "#{greeting} #{name}!"
end

# صباح الخير أحمد!
welcome_message("أحمد")
# مساء الخير سارة!
welcome_message("سارة", "مساء")
```

## جدول ملخص

| المفهوم | الوصف | المثال |
|---------|-------|--------|
| تعريف دالة | إنشاء دالة جديدة | `def greet ... end` |
| معامل | متغير في تعريف الدالة | `def greet(name)` |
| وسيط | قيمة فعلية عند الاستدعاء | `greet("أحمد")` |
| قيمة افتراضية | قيمة تُستخدم إذا لم يُمرر وسيط | `def greet(name = "زائر")` |
| متغير محلي | متغير يعمل داخل الدالة فقط | `result = 100` داخل الدالة |

## أخطاء شائعة

### 1. نسيان end

```ruby
# خطأ ✗
def greet(name)
  puts "مرحباً #{name}!"
# نسينا end!

# صحيح ✓
def greet(name)
  puts "مرحباً #{name}!"
end
```

### 2. عدد وسائط خاطئ

```ruby
def greet(name, age)
  puts "#{name} عمره #{age}"
end

# خطأ ✗
# ينقص وسيط!
# greet("أحمد")

# صحيح ✓
greet("أحمد", 25)
```

### 3. ترتيب المعاملات الافتراضية

```ruby
# خطأ ✗
# def greet(greeting = "مرحباً", name)
# end

# صحيح ✓
def greet(name, greeting = "مرحباً")
  puts "#{greeting} #{name}!"
end
```

## نصائح مهمة

1. **اختر أسماء واضحة** - اسم الدالة يجب أن يصف ما تفعله
2. **دالة واحدة = مهمة واحدة** - لا تجعل الدالة تفعل أشياء كثيرة
3. **استخدم القيم الافتراضية** - لتجعل الدوال أكثر مرونة
4. **الدوال الصغيرة أفضل** - يسهل فهمها واختبارها

## تمرين: دالة ترحيب مخصصة

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. عرّف دالة `greet` تستقبل معاملين:
   - `name` - اسم الشخص (إلزامي)
   - `greeting` - التحية (افتراضياً "مرحباً")
2. الدالة تطبع: `[التحية] [الاسم]!`
3. استدعِ الدالة:
   - مع اسم "أحمد" فقط (تستخدم التحية الافتراضية)
   - مع اسم "سارة" وتحية "أهلاً"

**تلميحات:**
- تعريف الدالة: `def greet(name, greeting = "مرحباً")`
- داخل الدالة استخدم دمج المتغيرات: `"#{greeting} #{name}!"`
- للاستدعاء: `greet("أحمد")` ثم `greet("سارة", "أهلاً")`

الناتج المتوقع:
```
مرحباً أحمد!
أهلاً سارة!
```

---

> **تذكّر:** الدوال تجعل شيفرتك منظمة وقابلة لإعادة الاستخدام!
