# التعامل مع الأخطاء (Error Handling)

في البرامج الحقيقية، الأخطاء أمر **حتمي**! قد يُدخل المستخدم قيمة غير صحيحة، أو قد يفشل الاتصال بالإنترنت، أو قد نحاول القسمة على صفر. بدلاً من ترك البرنامج ينهار، يمكننا **التعامل مع الأخطاء** بأناقة باستخدام نظام `begin/rescue/end` في روبي.

## ما هو الخطأ (Exception)؟

**الخطأ** هو حدث غير متوقع يقطع التنفيذ الطبيعي للبرنامج:

```ruby
# محاولة القسمة على صفر
result = 10 / 0
puts result
# ZeroDivisionError: divided by 0
```

```ruby
# محاولة استدعاء دالة على nil
name = nil
puts name.upcase
# NoMethodError: undefined method `upcase' for nil:NilClass
```

```ruby
# محاولة الوصول لمتغير غير معرف
puts unknown_variable
# NameError: undefined local variable or method `unknown_variable'
```

**بدون معالجة الأخطاء:**
- البرنامج يتوقف فوراً
- المستخدم يرى رسالة خطأ تقنية
- البيانات قد تضيع

---

## البنية الأساسية: begin/rescue/end

```ruby
begin
  # الشيفرة التي قد يسبب خطأ
  result = 10 / 0
rescue
  # الشيفرة التي يُنفذ عند حدوث خطأ
  puts "حدث خطأ!"
end
```

### مثال عملي: القسمة الآمنة

```ruby
print "أدخل الرقم الأول: "
num1 = gets.chomp.to_i

print "أدخل الرقم الثاني: "
num2 = gets.chomp.to_i

begin
  result = num1 / num2
  puts "الناتج: #{result}"
rescue
  puts "خطأ: لا يمكن القسمة على صفر!"
end

puts "البرنامج استمر في العمل"
```

**بدون معالجة:** البرنامج ينهار عند القسمة على صفر
**مع المعالجة:** يعرض رسالة ودية ويستمر

---

## التقاط نوع محدد من الأخطاء

يمكننا تحديد **نوع الخطأ** الذي نريد التقاطه:

```ruby
begin
  result = 10 / 0
rescue ZeroDivisionError
  puts "خطأ: القسمة على صفر غير مسموحة!"
end
```

### أنواع الأخطاء الشائعة

| نوع الخطأ | متى يحدث | مثال |
|-----------|---------|------|
| `ZeroDivisionError` | القسمة على صفر | `10 / 0` |
| `NoMethodError` | استدعاء دالة غير موجودة | `nil.upcase` |
| `NameError` | متغير غير معرف | `puts unknown` |
| `TypeError` | نوع بيانات خاطئ | `"hello" + 5` |
| `ArgumentError` | عدد أو نوع المعاملات خاطئ | `[1,2].first(1, 2)` |
| `RuntimeError` | خطأ عام أثناء التشغيل | `raise "خطأ!"` |

### التقاط أنواع متعددة

```ruby
begin
  # شيفرة قد يسبب أخطاء مختلفة
  number = Integer(gets.chomp)
  result = 100 / number
  puts "الناتج: #{result}"
rescue ZeroDivisionError
  puts "خطأ: لا يمكن القسمة على صفر!"
rescue ArgumentError
  puts "خطأ: أدخل رقماً صحيحاً!"
end
```

### التقاط عدة أنواع معاً

```ruby
begin
  # شيفرة خطيرة
  risky_operation
rescue ZeroDivisionError, TypeError, ArgumentError
  puts "حدث خطأ في العملية الحسابية!"
end
```

---

## الوصول لمعلومات الخطأ

استخدم `=> e` للحصول على كائن الخطأ:

```ruby
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "نوع الخطأ: #{e.class}"
  puts "الرسالة: #{e.message}"
end
# نوع الخطأ: ZeroDivisionError
# الرسالة: divided by 0
```

### مثال مفصل

```ruby
def divide(a, b)
  begin
    result = a / b
    puts "#{a} / #{b} = #{result}"
  rescue ZeroDivisionError => error
    puts "خطأ رياضي: #{error.message}"
    puts "لا يمكن قسمة #{a} على صفر!"
  rescue TypeError => error
    puts "خطأ في النوع: #{error.message}"
    puts "تأكد من أن القيم أرقام!"
  end
end

divide(10, 2)   # 10 / 2 = 5
divide(10, 0)   # خطأ رياضي: divided by 0
divide(10, "a") # خطأ في النوع: String can't be coerced into Integer
```

---

## إلقاء الأخطاء باستخدام raise

يمكننا **إلقاء** (إنشاء) أخطاء خاصة بنا:

### raise بسيط

```ruby
def withdraw(amount, balance)
  if amount > balance
    raise "الرصيد غير كافٍ!"
  end
  balance - amount
end

begin
  new_balance = withdraw(1000, 500)
  puts "الرصيد الجديد: #{new_balance}"
rescue => e
  puts "خطأ: #{e.message}"
end
# خطأ: الرصيد غير كافٍ!
```

### raise مع نوع محدد

```ruby
def set_age(age)
  if age < 0
    raise ArgumentError, "العمر لا يمكن أن يكون سالباً!"
  end
  if age > 150
    raise ArgumentError, "العمر غير واقعي!"
  end
  @age = age
end

begin
  set_age(-5)
rescue ArgumentError => e
  puts "خطأ في الإدخال: #{e.message}"
end
# خطأ في الإدخال: العمر لا يمكن أن يكون سالباً!
```

### إنشاء أنواع أخطاء مخصصة

```ruby
# تعريف نوع خطأ مخصص
class InsufficientFundsError < StandardError
  def initialize(amount, balance)
    @amount = amount
    @balance = balance
    super("محاولة سحب #{amount} ولكن الرصيد #{balance} فقط")
  end
end

class BankAccount
  attr_reader :balance

  def initialize(balance)
    @balance = balance
  end

  def withdraw(amount)
    if amount > @balance
      raise InsufficientFundsError.new(amount, @balance)
    end
    @balance -= amount
  end
end

account = BankAccount.new(500)

begin
  account.withdraw(1000)
rescue InsufficientFundsError => e
  puts "فشل السحب: #{e.message}"
end
# فشل السحب: محاولة سحب 1000 ولكن الرصيد 500 فقط
```

---

## ensure: شيفرة تُنفذ دائماً

`ensure` يُنفذ **سواء حدث خطأ أو لا** - مفيد للتنظيف:

```ruby
begin
  puts "فتح الملف..."
  # عملية قد تفشل
  result = 10 / 0
rescue ZeroDivisionError
  puts "حدث خطأ!"
ensure
  puts "إغلاق الملف... (يُنفذ دائماً)"
end

# فتح الملف...
# حدث خطأ!
# إغلاق الملف... (يُنفذ دائماً)
```

### مثال: إدارة الموارد

```ruby
def process_data
  connection = nil

  begin
    puts "فتح الاتصال..."
    connection = "connected"

    # معالجة البيانات
    puts "معالجة البيانات..."
    raise "خطأ في المعالجة!" if rand < 0.5

    puts "تم بنجاح!"
  rescue => e
    puts "خطأ: #{e.message}"
  ensure
    if connection
      puts "إغلاق الاتصال..."
      connection = nil
    end
  end
end

process_data
```

---

## else: عند نجاح الشيفرة

`else` يُنفذ **فقط إذا لم يحدث خطأ**:

```ruby
begin
  result = 10 / 2
rescue ZeroDivisionError
  puts "خطأ: قسمة على صفر!"
else
  puts "النتيجة: #{result}"
  puts "العملية نجحت!"
ensure
  puts "انتهى التنفيذ"
end

# النتيجة: 5
# العملية نجحت!
# انتهى التنفيذ
```

### البنية الكاملة

```ruby
begin
  # الشيفرة التي قد يسبب خطأ
rescue ErrorType1 => e
  # معالجة ErrorType1
rescue ErrorType2 => e
  # معالجة ErrorType2
rescue => e
  # معالجة أي خطأ آخر
else
  # يُنفذ فقط إذا لم يحدث خطأ
ensure
  # يُنفذ دائماً
end
```

---

## retry: إعادة المحاولة

`retry` يعيد تنفيذ الشيفرة من بداية `begin`:

```ruby
attempts = 0

begin
  attempts += 1
  puts "المحاولة رقم #{attempts}..."

  # محاكاة عملية قد تفشل
  if attempts < 3
    raise "فشل الاتصال!"
  end

  puts "تم الاتصال بنجاح!"
rescue => e
  puts "خطأ: #{e.message}"
  if attempts < 3
    puts "إعادة المحاولة..."
    retry
  else
    puts "فشلت جميع المحاولات!"
  end
end

# المحاولة رقم 1...
# خطأ: فشل الاتصال!
# إعادة المحاولة...
# المحاولة رقم 2...
# خطأ: فشل الاتصال!
# إعادة المحاولة...
# المحاولة رقم 3...
# تم الاتصال بنجاح!
```

**تحذير:** احذر من الحلقات اللانهائية! دائماً حدد عدد المحاولات.

---

## مثال عملي شامل: حاسبة آمنة

```ruby
def safe_calculator
  puts "=== الحاسبة الآمنة ==="

  print "أدخل الرقم الأول: "
  num1 = gets.chomp

  print "أدخل العملية (+, -, *, /): "
  operation = gets.chomp

  print "أدخل الرقم الثاني: "
  num2 = gets.chomp

  begin
    # تحويل الأرقام (قد يفشل)
    a = Integer(num1)
    b = Integer(num2)

    # تنفيذ العملية
    result = case operation
    when "+"
      a + b
    when "-"
      a - b
    when "*"
      a * b
    when "/"
      a / b
    else
      raise ArgumentError, "عملية غير معروفة: #{operation}"
    end

    puts "الناتج: #{a} #{operation} #{b} = #{result}"

  rescue ArgumentError => e
    if e.message.include?("invalid value")
      puts "خطأ: أدخل أرقاماً صحيحة!"
    else
      puts "خطأ: #{e.message}"
    end
  rescue ZeroDivisionError
    puts "خطأ: لا يمكن القسمة على صفر!"
  end
end

safe_calculator
```

---

## جدول ملخص

| الكلمة | الوظيفة | متى يُنفذ |
|--------|--------|----------|
| `begin` | بداية الشيفرة المحمي | دائماً |
| `rescue` | معالجة الخطأ | عند حدوث خطأ |
| `else` | شيفرة النجاح | عند عدم حدوث خطأ |
| `ensure` | شيفرة التنظيف | دائماً (بعد rescue أو else) |
| `raise` | إلقاء خطأ | عند استدعائه |
| `retry` | إعادة المحاولة | عند استدعائه في rescue |

---

## أفضل الممارسات

### 1. التقط أخطاء محددة

```ruby
# سيء: يلتقط كل الأخطاء
begin
  risky_code
rescue
  puts "حدث خطأ"
end

# جيد: يلتقط أخطاء محددة
begin
  risky_code
rescue ZeroDivisionError
  puts "قسمة على صفر"
rescue TypeError
  puts "نوع خاطئ"
end
```

### 2. لا تبتلع الأخطاء

```ruby
# سيء: يخفي الخطأ تماماً
begin
  risky_code
rescue
  # لا شيء!
end

# جيد: سجل الخطأ على الأقل
begin
  risky_code
rescue => e
  puts "خطأ: #{e.message}"
  # أو: log_error(e)
end
```

### 3. استخدم ensure للتنظيف

```ruby
# جيد: ضمان إغلاق الموارد
begin
  file = File.open("data.txt")
  process(file)
rescue => e
  puts "خطأ: #{e.message}"
ensure
  file&.close
end
```

---

## أخطاء شائعة

### 1. نسيان حد retry

```ruby
# خطأ: حلقة لانهائية!
begin
  raise "فشل!"
rescue
  retry  # يعيد المحاولة للأبد!
end
```

### 2. rescue واسع جداً

```ruby
# خطأ: يلتقط حتى الأخطاء البرمجية
begin
  undefined_variable  # NameError
rescue
  puts "خطأ في الإدخال"  # رسالة مضللة!
end
```

### 3. raise بدون معلومات

```ruby
# سيء
raise "خطأ"

# جيد
raise ArgumentError, "العمر يجب أن يكون موجباً، القيمة المُدخلة: #{age}"
```

---

## ملخص

| المفهوم | الوصف |
|---------|-------|
| `begin/rescue/end` | البنية الأساسية لمعالجة الأخطاء |
| `rescue ErrorType` | التقاط نوع محدد من الأخطاء |
| `rescue => e` | الوصول لكائن الخطأ |
| `raise` | إلقاء خطأ جديد |
| `ensure` | شيفرة تُنفذ دائماً للتنظيف |
| `else` | شيفرة تُنفذ عند النجاح فقط |
| `retry` | إعادة المحاولة (بحذر!) |

---

## تمرين: القسمة الآمنة

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. اكتب دالة `safe_divide(a, b)` تقوم بـ:
   - محاولة قسمة `a` على `b`
   - إذا كان `b` صفراً، تطبع رسالة خطأ وترجع `nil`
   - إذا نجحت العملية، ترجع الناتج

2. اختبر الدالة بالقيم:
   - `safe_divide(10, 2)` - يجب أن يطبع الناتج 5
   - `safe_divide(10, 0)` - يجب أن يطبع رسالة خطأ

**الناتج المتوقع:**
```
الناتج: 5
خطأ: لا يمكن القسمة على صفر!
```

**تلميحات:**
- استخدم `begin/rescue/end` داخل الدالة
- استخدم `rescue ZeroDivisionError` لالتقاط خطأ القسمة على صفر
- اطبع `"الناتج: #{result}"` عند النجاح
- اطبع `"خطأ: لا يمكن القسمة على صفر!"` عند الفشل

---

> **تذكّر:** معالجة الأخطاء تجعل برامجك أكثر **متانة** و**ودية للمستخدم**. استخدم `begin/rescue/end` للتعامل مع الحالات غير المتوقعة، و`raise` لإلقاء أخطاء ذات معنى، و`ensure` لضمان تنظيف الموارد. في الدرس القادم سنبدأ **التحديات البرمجية** لتطبيق كل ما تعلمناه!
