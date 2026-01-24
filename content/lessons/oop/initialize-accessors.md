# المُهيّئ والموصّلات

في الدرس السابق تعلمنا كيف ننشئ أصنافاً ونستخدم دوال مثل `set_name` و `get_name` لتعيين وقراءة البيانات. لكن كتابة هذه الدوال لكل متغير **أمر متعب ومُكرر**! في هذا الدرس سنتعلم طريقتين أفضل:

1. **`initialize`** - لتعيين البيانات عند إنشاء الكائن
2. **الموصّلات** (`attr_reader`, `attr_writer`, `attr_accessor`) - لإنشاء دوال القراءة والكتابة تلقائياً

## دالة المُهيّئ (initialize)

### المشكلة بدون initialize

```ruby
class Person
  def set_name(name)
    @name = name
  end

  def set_age(age)
    @age = age
  end

  def introduce
    puts "أنا #{@name}، عمري #{@age} سنة"
  end
end

person = Person.new
person.set_name("أحمد")
person.set_age(25)
person.introduce
```

هذا يتطلب **خطوتين إضافيتين** بعد إنشاء الكائن!

### الحل: استخدام initialize

**`initialize`** هي دالة خاصة تُستدعى **تلقائياً** عند إنشاء كائن جديد بـ `new`:

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def introduce
    puts "أنا #{@name}، عمري #{@age} سنة"
  end
end

# الآن نُمرر البيانات مباشرة عند الإنشاء
person = Person.new("أحمد", 25)
# أنا أحمد، عمري 25 سنة
person.introduce
```

**أفضل بكثير!** نُمرر كل البيانات دفعة واحدة.

## قواعد المُهيّئ

### 1. الاسم ثابت

يجب أن يكون الاسم بالضبط `initialize` (بدون اختصار أو تغيير):

```ruby
class Book
  # صحيح
  def initialize(title, author)
    @title = title
    @author = author
  end
end

# خطأ - لن يُستدعى تلقائياً
# def init(title, author)
# def Initialize(title, author)
```

### 2. المُعاملات الافتراضية

يمكنك تحديد قيم افتراضية للمُعاملات:

```ruby
class Student
  def initialize(name, grade = 0, school = "غير محدد")
    @name = name
    @grade = grade
    @school = school
  end

  def info
    "#{@name} - الدرجة: #{@grade} - المدرسة: #{@school}"
  end
end

# استخدام كل المُعاملات
s1 = Student.new("سارة", 95, "مدرسة النور")
# سارة - الدرجة: 95 - المدرسة: مدرسة النور
puts s1.info

# استخدام القيم الافتراضية
s2 = Student.new("علي")
# علي - الدرجة: 0 - المدرسة: غير محدد
puts s2.info

s3 = Student.new("مريم", 88)
# مريم - الدرجة: 88 - المدرسة: غير محدد
puts s3.info
```

### 3. المُهيّئ لا يُرجع قيمة

لا تستخدم `return` في المُهيّئ - روبي تتجاهله وتُرجع الكائن الجديد:

```ruby
class Test
  def initialize(value)
    @value = value
    # يُتجاهل تماماً
    return 100
  end
end

result = Test.new(5)
# Test (وليس Integer)
puts result.class
```

### 4. استدعاء دوال أخرى في المُهيّئ

يمكنك استدعاء دوال أخرى داخل المُهيّئ:

```ruby
class Circle
  def initialize(radius)
    @radius = radius
    calculate_area
  end

  def calculate_area
    @area = 3.14159 * @radius * @radius
  end

  def info
    "دائرة نصف قطرها #{@radius}، مساحتها #{@area.round(2)}"
  end
end

circle = Circle.new(5)
# دائرة نصف قطرها 5، مساحتها 78.54
puts circle.info
```

## مشكلة القراءة والكتابة

حتى مع `initialize`، ما زلنا نحتاج لكتابة دوال للقراءة والكتابة:

```ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  # دالة قراءة (getter)
  def name
    @name
  end

  # دالة قراءة أخرى
  def age
    @age
  end

  # دالة كتابة (setter)
  def name=(new_name)
    @name = new_name
  end

  # دالة كتابة أخرى
  def age=(new_age)
    @age = new_age
  end
end

person = Person.new("أحمد", 25)
# أحمد (قراءة)
puts person.name
# محمد (كتابة)
person.name = "محمد"
# محمد
puts person.name
```

هذا **كثير من الشيفرة المتكرر**! هنا تأتي الموصّلات.

## الموصّلات (Attribute Accessors)

الموصّلات هي اختصارات تُنشئ دوال القراءة والكتابة تلقائياً.

### attr_reader - للقراءة فقط

تُنشئ دالة قراءة (getter) للمتغير:

```ruby
class Person
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

person = Person.new("سارة", 30)
# سارة (يعمل!)
puts person.name
puts person.age   # 30 (يعمل!)

# خطأ! لا يمكن الكتابة
# person.name = "مريم"
```

`attr_reader :name` تُنشئ هذه الدالة تلقائياً:
```ruby
def name
  @name
end
```

### attr_writer - للكتابة فقط

تُنشئ دالة كتابة (setter) للمتغير:

```ruby
class Settings
  attr_writer :theme, :language

  def initialize
    @theme = "light"
    @language = "ar"
  end

  def show
    puts "الثيم: #{@theme}، اللغة: #{@language}"
  end
end

settings = Settings.new
# يعمل!
settings.theme = "dark"
# يعمل!
settings.language = "en"
# الثيم: dark، اللغة: en
settings.show

# خطأ! لا يمكن القراءة
# puts settings.theme
```

`attr_writer :theme` تُنشئ هذه الدالة تلقائياً:
```ruby
def theme=(value)
  @theme = value
end
```

### attr_accessor - للقراءة والكتابة معاً

تُنشئ دالتي القراءة والكتابة معاً:

```ruby
class Product
  attr_accessor :name, :price, :quantity

  def initialize(name, price, quantity)
    @name = name
    @price = price
    @quantity = quantity
  end

  def total_value
    @price * @quantity
  end
end

product = Product.new("هاتف", 2500, 10)

# قراءة
# هاتف
puts product.name
puts product.price     # 2500
puts product.quantity  # 10

# كتابة
product.price = 2000
product.quantity = 15

puts product.total_value  # 30000
```

`attr_accessor :name` تُنشئ هاتين الدالتين تلقائياً:
```ruby
def name
  @name
end

def name=(value)
  @name = value
end
```

## متى نستخدم كلاً منها؟

| الموصّل | الاستخدام | مثال |
|---------|-----------|------|
| `attr_reader` | بيانات لا تتغير | id, created_at, email |
| `attr_writer` | بيانات تُكتب فقط (نادر) | password, secret_key |
| `attr_accessor` | بيانات تُقرأ وتُكتب | name, age, status |

### مثال عملي: حساب المستخدم

```ruby
class User
  # القراءة فقط - لا يجب أن تتغير
  attr_reader :id, :created_at

  # القراءة والكتابة - يمكن تعديلها
  attr_accessor :name, :email, :status

  # الكتابة فقط - لأسباب أمنية
  attr_writer :password

  def initialize(id, name, email)
    @id = id
    @name = name
    @email = email
    @created_at = Time.now
    @status = "active"
    @password = nil
  end

  def authenticate(password)
    @password == password
  end

  def info
    "#{@name} (#{@email}) - #{@status}"
  end
end

user = User.new(1, "أحمد", "ahmed@example.com")
puts user.id          # 1
# أحمد
puts user.name
# أحمد (ahmed@example.com) - active
puts user.info

user.name = "أحمد محمد"
user.password = "secret123"
user.status = "premium"

# أحمد محمد
puts user.name
puts user.authenticate("secret123")  # true
puts user.authenticate("wrong")      # false

# خطأ! لا يمكن تغيير الـ id
# user.id = 100
# خطأ! لا يمكن قراءة كلمة المرور
# puts user.password
```

## الجمع بين الموصّلات والدوال المُخصصة

أحياناً تحتاج لتحقق أو معالجة قبل تعيين القيمة. في هذه الحالة، اكتب دالتك الخاصة:

```ruby
class BankAccount
  attr_reader :balance, :owner

  def initialize(owner, initial_balance = 0)
    @owner = owner
    @balance = initial_balance
  end

  # دالة كتابة مُخصصة مع تحقق
  def balance=(amount)
    if amount < 0
      puts "خطأ: الرصيد لا يمكن أن يكون سالباً!"
    else
      @balance = amount
    end
  end

  def deposit(amount)
    if amount > 0
      @balance += amount
      puts "تم إيداع #{amount}. الرصيد: #{@balance}"
    end
  end

  def withdraw(amount)
    if amount > 0 && amount <= @balance
      @balance -= amount
      puts "تم سحب #{amount}. الرصيد: #{@balance}"
    else
      puts "عملية غير صالحة!"
    end
  end
end

account = BankAccount.new("سارة", 1000)
puts account.balance   # 1000

# يعمل
account.balance = 500
puts account.balance   # 500

# خطأ: الرصيد لا يمكن أن يكون سالباً!
account.balance = -100
puts account.balance   # 500 (لم يتغير)
```

## مثال شامل: صنف السيارة

```ruby
class Car
  # القراءة فقط - لا تتغير
  attr_reader :brand, :model, :year

  # القراءة والكتابة
  attr_accessor :color, :owner

  def initialize(brand, model, year, color)
    @brand = brand
    @model = model
    @year = year
    @color = color
    @owner = nil
    @mileage = 0
  end

  # دالة قراءة مُخصصة
  def mileage
    "#{@mileage} كم"
  end

  # دالة كتابة مُخصصة مع تحقق
  def mileage=(km)
    if km >= @mileage
      @mileage = km
    else
      puts "خطأ: المسافة لا يمكن أن تنقص!"
    end
  end

  def drive(km)
    @mileage += km
    puts "قُدت #{km} كم. المسافة الكلية: #{mileage}"
  end

  def info
    owner_text = @owner ? @owner : "بدون مالك"
    "#{@year} #{@brand} #{@model} - #{@color} - #{owner_text} - #{mileage}"
  end

  def age
    Time.now.year - @year
  end
end

car = Car.new("تويوتا", "كامري", 2020, "أبيض")
puts car.info  # 2020 تويوتا كامري - أبيض - بدون مالك - 0 كم

car.owner = "محمد"
car.color = "أسود"
# قُدت 150 كم. المسافة الكلية: 150 كم
car.drive(150)

puts car.info   # 2020 تويوتا كامري - أسود - محمد - 150 كم
puts car.age    # 6 (أو العمر الفعلي)

# محاولة تغيير الماركة
# خطأ! attr_reader لا يسمح بالكتابة
# car.brand = "هوندا"
```

## جدول مقارنة

| الطريقة | قبل | بعد |
|---------|-----|-----|
| الإنشاء | `p = Person.new` ثم `p.set_name("أحمد")` | `p = Person.new("أحمد")` |
| القراءة | كتابة `def name; @name; end` | `attr_reader :name` |
| الكتابة | كتابة `def name=(v); @name = v; end` | `attr_writer :name` |
| كلاهما | كتابة دالتين | `attr_accessor :name` |

## أخطاء شائعة

### 1. نسيان الرمز : قبل اسم المتغير

```ruby
# خطأ
attr_reader name

# صحيح
attr_reader :name
```

### 2. استخدام @ مع الموصّلات

```ruby
# خطأ
attr_reader :@name

# صحيح
attr_reader :name
```

### 3. استدعاء الموصّل داخل الصنف بدون self

داخل الصنف، استخدم `@variable` مباشرة أو `self.variable`:

```ruby
class Example
  attr_accessor :value

  def initialize(v)
    # صحيح - استخدام @ مباشرة
    @value = v
  end

  def double
    # استخدم @ داخلياً
    @value * 2
  end

  def update_with_self
    # يعمل - يستدعي دالة الكتابة
    self.value = 100
  end
end
```

### 4. محاولة الكتابة مع attr_reader

```ruby
class ReadOnly
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

obj = ReadOnly.new("اختبار")
# obj.name = "جديد"  # NoMethodError: undefined method `name='
```

## ملخص

| المفهوم | الوظيفة | مثال |
|---------|---------|------|
| `initialize` | تهيئة الكائن عند الإنشاء | `def initialize(name); @name = name; end` |
| `attr_reader` | إنشاء دالة قراءة | `attr_reader :name` → `def name; @name; end` |
| `attr_writer` | إنشاء دالة كتابة | `attr_writer :name` → `def name=(v); @name = v; end` |
| `attr_accessor` | قراءة + كتابة | `attr_accessor :name` → كلا الدالتين |

## تمرين: صنف Book مع المُهيّئ والموصّلات

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ صنف `Book` يحتوي على:
   - `attr_reader :title, :author` (العنوان والكاتب لا يتغيران)
   - `attr_accessor :pages_read` (الصفحات المقروءة تتغير)
   - دالة `initialize` تستقبل `title`, `author`, `total_pages`
   - دالة `progress` تُرجع نسبة الإنجاز كنص

2. أنشئ كتاباً بعنوان "تعلم روبي"، للكاتب "أحمد"، وعدد صفحاته 200
3. اقرأ 50 صفحة (عيّن `pages_read = 50`)
4. اطبع العنوان والكاتب ونسبة الإنجاز

**الناتج المتوقع:**
```
تعلم روبي
أحمد
25%
```

**تلميحات:**
- استخدم `@total_pages` لتخزين عدد الصفحات الكلي (لا تحتاج موصّل له)
- نسبة الإنجاز = `(@pages_read.to_f / @total_pages * 100).to_i`
- لا تنسَ تعيين `@pages_read = 0` في المُهيّئ كقيمة أولية

---

> **تذكّر:** `initialize` تُسهّل إنشاء الكائنات بتمرير البيانات مباشرة. الموصّلات (`attr_reader`, `attr_writer`, `attr_accessor`) تُوفّر الوقت بإنشاء دوال القراءة والكتابة تلقائياً. في الدرس القادم سنتعلم **الوراثة** لإنشاء أصناف ترث خصائص وسلوكيات من أصناف أخرى!
