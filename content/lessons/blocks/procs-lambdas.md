# Procs و Lambdas

في الدرس السابق تعلمنا كيف نستخدم `yield` لتنفيذ الكتل المُمرَّرة للدوال. لكن ماذا لو أردنا **تخزين** كتلة برمجية واستخدامها لاحقاً؟ هنا تأتي **Procs** و **Lambdas**!

## ما هو Proc؟

`Proc` هو كائن يُمثّل كتلة برمجية. بمعنى آخر، هو طريقة لتخزين كتلة في متغير!

```ruby
# إنشاء Proc
say_hello = Proc.new { puts "مرحباً!" }

# استدعاء Proc
say_hello.call
# مرحباً!
```

### طرق إنشاء Proc

```ruby
# الطريقة 1: Proc.new
greet = Proc.new { |name| puts "أهلاً #{name}!" }

# الطريقة 2: proc (اختصار)
greet2 = proc { |name| puts "أهلاً #{name}!" }

# كلاهما متطابقان
greet.call("أحمد")   # أهلاً أحمد!
greet2.call("سارة")  # أهلاً سارة!
```

### طرق استدعاء Proc

```ruby
my_proc = Proc.new { puts "تم التنفيذ!" }

# الطريقة 1: call
my_proc.call

# الطريقة 2: []
my_proc[]

# الطريقة 3: ===
my_proc.===

# الطريقة 4: .()
my_proc.()
```

## ما هو Lambda؟

`Lambda` هو نوع خاص من Proc مع قواعد أكثر صرامة. يتصرف بشكل أقرب للدوال العادية.

```ruby
# إنشاء Lambda
say_bye = lambda { puts "مع السلامة!" }

# أو باستخدام السهم (الطريقة الحديثة)
say_bye2 = -> { puts "مع السلامة!" }

say_bye.call   # مع السلامة!
say_bye2.call  # مع السلامة!
```

### Lambda مع معاملات

```ruby
# Lambda مع معامل واحد
double = ->(n) { n * 2 }
puts double.call(5)  # 10

# Lambda مع معاملات متعددة
add = ->(a, b) { a + b }
puts add.call(3, 4)  # 7

# Lambda مع معامل افتراضي
greet = ->(name, greeting = "مرحباً") { "#{greeting} #{name}!" }
puts greet.call("أحمد")            # مرحباً أحمد!
puts greet.call("سارة", "أهلاً")   # أهلاً سارة!
```

## الفرق بين Proc و Lambda

هناك فرقان رئيسيان:

### 1. فحص عدد المعاملات

**Lambda** تتحقق من عدد المعاملات بصرامة:

```ruby
# Lambda - صارمة
my_lambda = ->(a, b) { puts "#{a}, #{b}" }
# my_lambda.call(1)      # خطأ! ArgumentError
my_lambda.call(1, 2)     # 1, 2
# my_lambda.call(1, 2, 3) # خطأ! ArgumentError

# Proc - متساهلة
my_proc = Proc.new { |a, b| puts "#{a}, #{b}" }
my_proc.call(1)          # 1,  (b = nil)
my_proc.call(1, 2)       # 1, 2
my_proc.call(1, 2, 3)    # 1, 2 (تجاهل 3)
```

### 2. سلوك return

هذا الفرق **مهم جداً**:

```ruby
def test_proc
  my_proc = Proc.new { return "من Proc" }
  my_proc.call
  puts "هذا لن يُطبع!"  # لن يصل هنا
end

def test_lambda
  my_lambda = -> { return "من Lambda" }
  my_lambda.call
  puts "هذا سيُطبع!"  # سيصل هنا
  "من الدالة"
end

puts test_proc    # من Proc
puts test_lambda  # هذا سيُطبع! \n من الدالة
```

**الفرق:**
- `return` في **Proc** يُنهي الدالة المُحيطة
- `return` في **Lambda** يُنهي Lambda فقط

### جدول المقارنة

| الميزة | Proc | Lambda |
|--------|------|--------|
| فحص المعاملات | متساهل (يقبل أي عدد) | صارم (يجب تطابق العدد) |
| سلوك return | يُنهي الدالة المُحيطة | يُنهي Lambda فقط |
| الإنشاء | `Proc.new { }` أو `proc { }` | `lambda { }` أو `-> { }` |
| التحقق من النوع | `obj.lambda?` يُرجع false | `obj.lambda?` يُرجع true |

```ruby
my_proc = Proc.new { }
my_lambda = -> { }

puts my_proc.lambda?   # false
puts my_lambda.lambda? # true
```

## تحويل الكتل إلى Procs

### استخدام & في تعريف الدالة

```ruby
def execute(&block)
  # block أصبح Proc الآن
  puts block.class  # Proc
  block.call
end

execute { puts "مرحباً!" }
# Proc
# مرحباً!
```

### استخدام & عند الاستدعاء

```ruby
my_proc = Proc.new { |n| n * 2 }

# تحويل Proc إلى كتلة باستخدام &
result = [1, 2, 3].map(&my_proc)
puts result.inspect  # [2, 4, 6]
```

### اختصار الرموز

```ruby
# بدلاً من:
[1, 2, 3].map { |n| n.to_s }

# يمكن كتابة:
[1, 2, 3].map(&:to_s)
# ["1", "2", "3"]

# هذا يعمل مع أي دالة بدون معاملات:
["hello", "world"].map(&:upcase)  # ["HELLO", "WORLD"]
[1, 2, 3].select(&:odd?)          # [1, 3]
```

## تخزين Procs وإعادة استخدامها

إحدى أهم فوائد Procs: يمكن تخزينها وتمريرها!

```ruby
# تعريف عمليات مختلفة
double = ->(n) { n * 2 }
square = ->(n) { n ** 2 }
add_ten = ->(n) { n + 10 }

# دالة تقبل Proc كمعامل
def apply_operation(numbers, operation)
  numbers.map { |n| operation.call(n) }
end

nums = [1, 2, 3, 4, 5]

puts apply_operation(nums, double).inspect  # [2, 4, 6, 8, 10]
puts apply_operation(nums, square).inspect  # [1, 4, 9, 16, 25]
puts apply_operation(nums, add_ten).inspect # [11, 12, 13, 14, 15]
```

### تخزين في Hash

```ruby
operations = {
  add: ->(a, b) { a + b },
  subtract: ->(a, b) { a - b },
  multiply: ->(a, b) { a * b },
  divide: ->(a, b) { a / b }
}

puts operations[:add].call(10, 5)      # 15
puts operations[:multiply].call(3, 4)  # 12
```

## Closures: الإغلاق

Procs و Lambdas تحتفظ بالسياق الذي أُنشئت فيه:

```ruby
def create_multiplier(factor)
  ->(n) { n * factor }  # factor محفوظ!
end

double = create_multiplier(2)
triple = create_multiplier(3)

puts double.call(5)  # 10
puts triple.call(5)  # 15
```

### مثال: عداد

```ruby
def create_counter
  count = 0
  {
    increment: -> { count += 1 },
    decrement: -> { count -= 1 },
    value: -> { count }
  }
end

counter = create_counter
counter[:increment].call
counter[:increment].call
counter[:increment].call
puts counter[:value].call  # 3
counter[:decrement].call
puts counter[:value].call  # 2
```

## أمثلة عملية

### مثال 1: نظام أحداث بسيط

```ruby
class EventEmitter
  def initialize
    @events = {}
  end

  def on(event, &callback)
    @events[event] ||= []
    @events[event] << callback
  end

  def emit(event, *args)
    return unless @events[event]
    @events[event].each { |callback| callback.call(*args) }
  end
end

emitter = EventEmitter.new

emitter.on(:greet) { |name| puts "مرحباً #{name}!" }
emitter.on(:greet) { |name| puts "أهلاً وسهلاً #{name}!" }

emitter.emit(:greet, "أحمد")
# مرحباً أحمد!
# أهلاً وسهلاً أحمد!
```

### مثال 2: تصفية مخصصة

```ruby
# مجموعة من الفلاتر
filters = {
  even: ->(n) { n.even? },
  positive: ->(n) { n > 0 },
  less_than_10: ->(n) { n < 10 }
}

def apply_filters(array, *filter_names, filters:)
  filter_names.reduce(array) do |result, name|
    result.select(&filters[name])
  end
end

numbers = [-5, -2, 0, 1, 2, 3, 8, 12, 15, 20]

result = apply_filters(numbers, :positive, :even, :less_than_10, filters: filters)
puts result.inspect  # [2, 8]
```

### مثال 3: حساب مرن

```ruby
def calculate(a, b, operation = nil, &block)
  if block_given?
    block.call(a, b)
  elsif operation
    operation.call(a, b)
  else
    a + b  # افتراضي
  end
end

# باستخدام كتلة
puts calculate(10, 5) { |a, b| a * b }  # 50

# باستخدام Lambda
power = ->(a, b) { a ** b }
puts calculate(2, 10, power)  # 1024

# بدون عملية (الافتراضي)
puts calculate(10, 5)  # 15
```

## متى تستخدم أيهما؟

| الحالة | الاختيار | السبب |
|--------|----------|-------|
| كتلة بسيطة تُمرر لدالة | الكتلة العادية `{ }` | أبسط وأوضح |
| تخزين كتلة لاستخدامها لاحقاً | Proc أو Lambda | كلاهما يعمل |
| تحتاج سلوك مشابه للدالة | Lambda | فحص صارم للمعاملات |
| تحتاج مرونة في المعاملات | Proc | يقبل أي عدد |
| return يجب أن يُنهي الدالة المُحيطة | Proc | سلوك return الخاص |
| return يجب أن يُنهي الكتلة فقط | Lambda | سلوك return العادي |

### القاعدة العامة

> **استخدم Lambda** في معظم الحالات لأنها أكثر أماناً وتتصرف كالدوال العادية.

## أخطاء شائعة

### 1. نسيان call

```ruby
my_proc = Proc.new { puts "مرحباً!" }

# خطأ: لا يُنفّذ شيء
my_proc

# صحيح
my_proc.call
```

### 2. خلط return

```ruby
def dangerous
  my_proc = Proc.new { return "خطر!" }
  my_proc.call
  puts "لن تصل هنا"
end

# الحل: استخدم Lambda
def safe
  my_lambda = -> { return "آمن!" }
  result = my_lambda.call
  puts "ستصل هنا"
  result
end
```

### 3. نسيان عدد المعاملات مع Lambda

```ruby
my_lambda = ->(a, b) { a + b }

# خطأ
# my_lambda.call(1)  # ArgumentError

# صحيح
my_lambda.call(1, 2)  # 3
```

## جدول ملخص

| المفهوم | الصياغة | مثال |
|---------|---------|------|
| إنشاء Proc | `Proc.new { }` | `p = Proc.new { puts "!" }` |
| إنشاء Proc (اختصار) | `proc { }` | `p = proc { puts "!" }` |
| إنشاء Lambda | `lambda { }` | `l = lambda { puts "!" }` |
| إنشاء Lambda (سهم) | `-> { }` | `l = -> { puts "!" }` |
| Lambda مع معاملات | `->(x) { }` | `l = ->(n) { n * 2 }` |
| استدعاء | `.call()` | `p.call(5)` |
| تحويل كتلة لـ Proc | `&block` | `def foo(&block)` |
| تحويل Proc لكتلة | `&proc` | `arr.map(&my_proc)` |
| فحص النوع | `.lambda?` | `obj.lambda?` |

## تمرين: Procs و Lambdas

حان وقت التطبيق! في محرر الكود على اليسار:

**المطلوب:**
1. أنشئ Lambda اسمه `square` يُربّع الرقم (n ** 2)
2. أنشئ Proc اسمه `greet` يطبع تحية باسم الشخص
3. استخدم `square` مع `map` لتربيع أرقام [1, 2, 3, 4, 5]
4. استدعِ `greet` مع اسم "روبي"

**الناتج المتوقع:**
```
[1, 4, 9, 16, 25]
مرحباً روبي!
```

**تلميحات:**
- Lambda: `square = ->(n) { n ** 2 }`
- Proc: `greet = Proc.new { |name| puts "مرحباً #{name}!" }`
- استخدم `&square` لتمرير Lambda لـ map
- استخدم `greet.call("روبي")` لاستدعاء Proc

---

> **تذكّر:** Procs و Lambdas تُحوّل الكتل إلى كائنات يمكن تخزينها وتمريرها. Lambda أكثر صرامة وأماناً، بينما Proc أكثر مرونة!
