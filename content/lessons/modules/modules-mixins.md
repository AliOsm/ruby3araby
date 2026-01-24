# الوحدات والخلط (Modules and Mixins)

في الدرس السابق تعلمنا **الوراثة** وكيف يمكن لصنف أن يرث من صنف آخر. لكن روبي تدعم **وراثة فردية** فقط - صنف واحد يرث من صنف أب واحد. فماذا لو أردنا مشاركة سلوكيات بين أصناف **غير متعلقة**؟ هنا تأتي **الوحدات** (Modules)!

## ما هي الوحدة (Module)؟

**الوحدة** هي حاوية لمجموعة من الدوال والثوابت. تختلف عن الصنف في أنها:
- **لا يمكن إنشاء كائنات منها** (لا يوجد `Module.new`)
- **تُستخدم لتنظيم الشيفرة** أو **مشاركته** بين أصناف مختلفة

## إنشاء وحدة بسيطة

```ruby
module Greeting
  def say_hello
    puts "مرحباً!"
  end

  def say_goodbye
    puts "مع السلامة!"
  end
end
```

## استخدامات الوحدات

الوحدات لها **استخدامان رئيسيان**:

1. **التنظيم (Namespacing)**: تجميع أصناف ودوال متعلقة تحت اسم واحد
2. **الخلط (Mixins)**: مشاركة سلوكيات بين أصناف مختلفة

---

## الاستخدام الأول: التنظيم (Namespacing)

عندما يكبر المشروع، قد تتشابه أسماء الأصناف. الوحدات تحل هذه المشكلة:

### بدون Namespacing (مشكلة)

```ruby
# في ملف واحد
class User
  # مستخدم النظام
end

# في ملف آخر
class User
  # مستخدم قاعدة البيانات - تعارض!
end
```

### مع Namespacing (الحل)

```ruby
module System
  class User
    def initialize(name)
      @name = name
    end

    def info
      "مستخدم النظام: #{@name}"
    end
  end
end

module Database
  class User
    def initialize(id)
      @id = id
    end

    def info
      "سجل قاعدة البيانات: #{@id}"
    end
  end
end

# استخدام الأصناف - لا تعارض!
system_user = System::User.new("أحمد")
db_user = Database::User.new(123)

# مستخدم النظام: أحمد
puts system_user.info
# سجل قاعدة البيانات: 123
puts db_user.info
```

### الوصول باستخدام ::

نستخدم `::` للوصول لمحتويات الوحدة:

```ruby
module MyApp
  VERSION = "1.0.0"

  class Config
    def self.debug?
      true
    end
  end

  module Utils
    def self.format_date(date)
      date.strftime("%Y-%m-%d")
    end
  end
end

puts MyApp::VERSION          # 1.0.0
puts MyApp::Config.debug?    # true
puts MyApp::Utils.format_date(Time.now)  # 2024-01-15
```

---

## الاستخدام الثاني: الخلط (Mixins)

الخلط هو **القوة الحقيقية** للوحدات! يسمح بمشاركة دوال بين أصناف مختلفة.

### المشكلة: أصناف غير متعلقة تحتاج سلوكاً مشتركاً

```ruby
# الطائر يطير
class Bird
  def fly
    puts "أطير في السماء!"
  end
end

# الطائرة تطير أيضاً
class Airplane
  def fly
    # نفس الشيفرة مُكرر!
    puts "أطير في السماء!"
  end
end

# السوبرمان يطير أيضاً
class Superman
  def fly
    # تكرار آخر!
    puts "أطير في السماء!"
  end
end
```

**المشكلة:** الطائر ليس طائرة، والطائرة ليست سوبرمان - لا يمكن استخدام الوراثة!

### الحل: استخدام Mixin

```ruby
module Flyable
  def fly
    puts "أطير في السماء!"
  end

  def land
    puts "أهبط على الأرض"
  end
end

class Bird
  include Flyable

  def chirp
    puts "تغريد!"
  end
end

class Airplane
  include Flyable

  def take_off
    puts "إقلاع!"
  end
end

class Superman
  include Flyable

  def save_world
    puts "أنقذ العالم!"
  end
end

# الآن كلهم يطيرون!
bird = Bird.new
airplane = Airplane.new
superman = Superman.new

# أطير في السماء!
bird.fly
# أطير في السماء!
airplane.fly
# أطير في السماء!
superman.fly

# وكل واحد له سلوكه الخاص
# تغريد!
bird.chirp
# إقلاع!
airplane.take_off
# أنقذ العالم!
superman.save_world
```

---

## include vs extend

### include: دوال المثيل (Instance Methods)

`include` يجعل دوال الوحدة **دوال مثيل** (تُستدعى على الكائنات):

```ruby
module Greeting
  def say_hello
    puts "مرحباً!"
  end
end

class Person
  include Greeting
end

person = Person.new
# مرحباً! (على الكائن)
person.say_hello

# خطأ! ليست دالة صنف
# Person.say_hello
```

### extend: دوال الصنف (Class Methods)

`extend` يجعل دوال الوحدة **دوال صنف** (تُستدعى على الصنف نفسه):

```ruby
module Counting
  def count
    @count ||= 0
  end

  def increment
    @count = count + 1
  end

  def current_count
    puts "العدد الحالي: #{count}"
  end
end

class Counter
  extend Counting
end

Counter.increment
Counter.increment
# العدد الحالي: 2
Counter.current_count

# خطأ! ليست دالة مثيل
# counter = Counter.new
# counter.current_count
```

### استخدام كليهما معاً

```ruby
module Printable
  def print_info
    puts "معلومات: #{info}"
  end
end

module ClassInfo
  def class_name
    puts "اسم الصنف: #{name}"
  end
end

class Document
  # دوال مثيل
  include Printable
  # دوال صنف
  extend ClassInfo

  def info
    "مستند"
  end
end

# دالة صنف
# اسم الصنف: Document
Document.class_name

# دالة مثيل
doc = Document.new
# معلومات: مستند
doc.print_info
```

---

## مثال عملي: نظام الصلاحيات

```ruby
module Describable
  def describe
    puts "أنا #{self.class}: #{@name}"
  end
end

module Walkable
  def walk
    puts "#{@name} يمشي..."
  end
end

module Swimmable
  def swim
    puts "#{@name} يسبح..."
  end
end

module Flyable
  def fly
    puts "#{@name} يطير..."
  end
end

class Human
  include Describable
  include Walkable
  include Swimmable

  def initialize(name)
    @name = name
  end
end

class Fish
  include Describable
  include Swimmable

  def initialize(name)
    @name = name
  end
end

class Bird
  include Describable
  include Walkable
  include Flyable

  def initialize(name)
    @name = name
  end
end

class Duck
  include Describable
  include Walkable
  include Swimmable
  include Flyable

  def initialize(name)
    @name = name
  end
end

# إنشاء الكائنات
human = Human.new("أحمد")
fish = Fish.new("نيمو")
bird = Bird.new("تويتي")
duck = Duck.new("دونالد")

puts "--- الإنسان ---"
# أنا Human: أحمد
human.describe
# أحمد يمشي...
human.walk
# أحمد يسبح...
human.swim

puts "\n--- السمكة ---"
# أنا Fish: نيمو
fish.describe
# نيمو يسبح...
fish.swim
# خطأ! السمكة لا تمشي
# fish.walk

puts "\n--- الطائر ---"
# أنا Bird: تويتي
bird.describe
# تويتي يمشي...
bird.walk
# تويتي يطير...
bird.fly
# خطأ! هذا الطائر لا يسبح
# bird.swim

puts "\n--- البطة ---"
# أنا Duck: دونالد
duck.describe
# دونالد يمشي...
duck.walk
# دونالد يسبح...
duck.swim
# دونالد يطير...
duck.fly
```

---

## الوصول لمتغيرات المثيل

الوحدات يمكنها الوصول لمتغيرات المثيل `@` في الصنف الذي تُخلط معه:

```ruby
module Nameable
  def full_name
    "#{@first_name} #{@last_name}"
  end

  def initials
    "#{@first_name[0]}.#{@last_name[0]}."
  end
end

class Person
  include Nameable

  def initialize(first_name, last_name)
    @first_name = first_name
    @last_name = last_name
  end
end

person = Person.new("أحمد", "محمد")
# أحمد محمد
puts person.full_name
# أ.م.
puts person.initials
```

---

## استخدام self في الوحدات

```ruby
module Loggable
  def log(message)
    puts "[#{self.class}] #{message}"
  end

  def log_action(action)
    puts "[#{Time.now}] #{self.class}##{action}"
  end
end

class Order
  include Loggable

  def process
    log_action("process")
    log("جاري معالجة الطلب...")
    log("تم الانتهاء!")
  end
end

class Payment
  include Loggable

  def charge
    log_action("charge")
    log("جاري الدفع...")
  end
end

order = Order.new
order.process
# [2024-01-15 10:30:00] Order#process
# [Order] جاري معالجة الطلب...
# [Order] تم الانتهاء!

payment = Payment.new
payment.charge
# [2024-01-15 10:30:00] Payment#charge
# [Payment] جاري الدفع...
```

---

## ترتيب البحث عن الدوال (Method Lookup)

عند استدعاء دالة، روبي تبحث بهذا الترتيب:

```ruby
module A
  def hello
    puts "من A"
  end
end

module B
  def hello
    puts "من B"
  end
end

class Parent
  def hello
    puts "من Parent"
  end
end

class Child < Parent
  include A
  include B

  def hello
    puts "من Child"
  end
end

child = Child.new
# من Child
child.hello

# ترتيب البحث:
puts Child.ancestors.inspect
# [Child, B, A, Parent, Object, Kernel, BasicObject]
```

**الترتيب:**
1. الصنف نفسه (`Child`)
2. آخر وحدة مُضمّنة (`B`)
3. الوحدات السابقة بالترتيب العكسي (`A`)
4. الصنف الأب (`Parent`)
5. الأصناف الأساسية (`Object`, `Kernel`, `BasicObject`)

---

## استدعاء super في الوحدات

```ruby
module Timestamped
  def save
    puts "إضافة الوقت: #{Time.now}"
    # يستدعي save من الصنف أو الوحدة التالية
    super
  end
end

module Validated
  def save
    puts "التحقق من البيانات..."
    # يستدعي save من الوحدة أو الصنف التالي
    super
  end
end

class Record
  def save
    puts "حفظ السجل في قاعدة البيانات"
  end
end

class User < Record
  include Timestamped
  include Validated

  def save
    puts "حفظ المستخدم..."
    super
  end
end

user = User.new
user.save
# حفظ المستخدم...
# التحقق من البيانات...
# إضافة الوقت: 2024-01-15 10:30:00
# حفظ السجل في قاعدة البيانات
```

---

## الوحدات المُضمّنة في روبي

روبي توفر وحدات جاهزة مفيدة جداً:

### Comparable

```ruby
class Person
  include Comparable

  attr_reader :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  # الدالة المطلوبة: <=>
  def <=>(other)
    @age <=> other.age
  end
end

p1 = Person.new("أحمد", 25)
p2 = Person.new("سارة", 30)
p3 = Person.new("محمد", 25)

puts p1 < p2   # true
puts p1 > p2   # false
puts p1 == p3  # true (نفس العمر)
puts p1 <= p2  # true
puts p1.between?(Person.new("", 20), Person.new("", 30))  # true
```

### Enumerable

```ruby
class Library
  include Enumerable

  def initialize
    @books = []
  end

  def add(book)
    @books << book
  end

  # الدالة المطلوبة: each
  def each(&block)
    @books.each(&block)
  end
end

library = Library.new
library.add("كتاب روبي")
library.add("كتاب بايثون")
library.add("كتاب جافا")

# الآن يمكن استخدام كل دوال Enumerable!
library.each { |book| puts book }
puts library.count        # 3
# كتاب روبي
puts library.first
p library.select { |b| b.include?("روبي") }  # ["كتاب روبي"]
```

---

## جدول المقارنة

| الخاصية | include | extend |
|---------|---------|--------|
| نوع الدوال | دوال مثيل | دوال صنف |
| الاستدعاء | `object.method` | `Class.method` |
| الاستخدام الشائع | سلوكيات الكائنات | أدوات مساعدة للصنف |

| المفهوم | الوصف | مثال |
|---------|-------|------|
| Module | حاوية للدوال والثوابت | `module Utils` |
| Namespace | تنظيم الشيفرة تحت اسم | `MyApp::User` |
| Mixin | مشاركة سلوكيات | `include Flyable` |
| `::` | الوصول لمحتويات الوحدة | `Math::PI` |

---

## أخطاء شائعة

### 1. نسيان الفرق بين include و extend

```ruby
module Greeting
  def hello
    "مرحباً!"
  end
end

class Person
  # دوال مثيل
  include Greeting
end

# خطأ! hello ليست دالة صنف
# Person.hello
person = Person.new
# مرحباً! (صحيح)
puts person.hello
```

### 2. محاولة إنشاء كائن من وحدة

```ruby
module Utils
  def self.helper
    "مساعد"
  end
end

# خطأ! لا يمكن إنشاء كائن من وحدة
# obj = Utils.new
```

### 3. نسيان :: للوصول للمحتويات

```ruby
module MyApp
  class User
  end
end

# خطأ! User غير معروف
# user = User.new
# صحيح
user = MyApp::User.new
```

---

## متى نستخدم الوحدات؟

### استخدم Namespacing عندما:
- المشروع كبير ويحتاج تنظيماً
- هناك احتمال تعارض أسماء الأصناف
- تريد تجميع أصناف متعلقة

### استخدم Mixins عندما:
- أصناف **غير متعلقة** تحتاج سلوكاً مشتركاً
- لا يمكن استخدام الوراثة (ليست علاقة "is-a")
- تريد إعادة استخدام شيفرة عبر أصناف مختلفة

```ruby
# Mixin مناسب: قدرات يمكن أن تكون لأي شيء
# أي شيء يمكن طباعته
module Printable
# أي شيء يمكن البحث فيه
module Searchable
# أي شيء يمكن تخزينه مؤقتاً
module Cacheable

# وراثة مناسبة: علاقة "هو نوع من"
# الكلب هو حيوان
class Dog < Animal
# المدير هو موظف
class Manager < Employee
```

---

## ملخص

| المفهوم | الوصف |
|---------|-------|
| `module Name` | إنشاء وحدة |
| `Module::Class` | Namespacing للتنظيم |
| `include Module` | إضافة دوال مثيل (Mixin) |
| `extend Module` | إضافة دوال صنف |
| `::` | الوصول لمحتويات الوحدة |
| `ancestors` | ترتيب البحث عن الدوال |

---

## تمرين: نظام القدرات

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ وحدة `Speakable` تحتوي على:
   - دالة `speak` تطبع "أتكلم!"

2. أنشئ صنف `Robot` يتضمن الوحدة `Speakable`:
   - يحتوي على `attr_reader :name`
   - يحتوي على `initialize(name)`

3. أنشئ صنف `Animal` يتضمن الوحدة `Speakable`:
   - يحتوي على `attr_reader :name`
   - يحتوي على `initialize(name)`

4. أنشئ روبوت اسمه "روبي" وحيوان اسمه "بوبي"
5. اطبع اسم كل كائن ثم استدعِ speak

**الناتج المتوقع:**
```
روبي
أتكلم!
بوبي
أتكلم!
```

**تلميحات:**
- ابدأ بتعريف الوحدة: `module Speakable`
- استخدم `include Speakable` داخل كل صنف
- لا تنسَ `attr_reader :name` و `initialize(name)`

---

> **تذكّر:** الوحدات أداة قوية لتنظيم الشيفرة ومشاركة السلوكيات. استخدم Namespacing لتنظيم الأصناف، و Mixins لمشاركة الدوال بين أصناف غير متعلقة. `include` للدوال على الكائنات، و `extend` للدوال على الصنف نفسه. في الدرس القادم سنتعلم **معالجة الأخطاء** (Error Handling)!
