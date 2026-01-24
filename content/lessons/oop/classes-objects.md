# الأصناف والكائنات

حتى الآن تعلمنا كيف نستخدم أنواع البيانات المُدمجة في روبي مثل الأرقام والنصوص والمصفوفات. لكن ماذا لو أردنا إنشاء **أنواع بيانات خاصة بنا**؟ هنا تأتي **البرمجة الكائنية** (Object-Oriented Programming)!

## ما هي البرمجة الكائنية؟

البرمجة الكائنية هي أسلوب برمجي يُنظّم الشيفرة حول **الكائنات** بدلاً من الدوال فقط. الكائن يجمع بين:
- **البيانات** (الخصائص/الصفات)
- **السلوكيات** (الدوال/الأفعال)

### مثال من الحياة الواقعية

فكّر في **سيارة**:
- **الخصائص:** اللون، الماركة، السرعة القصوى، عدد الأبواب
- **السلوكيات:** تشغيل، إيقاف، تسريع، فرملة

في البرمجة الكائنية، نُنشئ "قالباً" (الصنف) يصف السيارة، ثم نُنشئ "نسخاً" (كائنات) منه.

## كل شيء في روبي كائن!

في روبي، **كل شيء** هو كائن:

```ruby
# الأرقام كائنات
puts 5.class        # Integer
puts 5.even?        # true

# النصوص كائنات
puts "مرحبا".class    # String
puts "مرحبا".length   # 5

# المصفوفات كائنات
puts [1, 2, 3].class  # Array
puts [1, 2, 3].first  # 1

# حتى true و false و nil كائنات!
puts true.class       # TrueClass
puts nil.class        # NilClass
```

## ما هو الصنف (Class)؟

**الصنف** هو قالب أو مُخطط يصف:
- ما هي البيانات التي سيحتويها الكائن
- ما هي السلوكيات التي يمكن للكائن القيام بها

فكّر في الصنف كـ **وصفة طبخ** والكائن كـ **الطبق الناتج**.

## إنشاء صنف بسيط

```ruby
class Person
  # محتوى الصنف
end
```

**ملاحظات:**
- اسم الصنف يبدأ بحرف كبير (CamelCase)
- نستخدم `class` لتعريف الصنف
- نستخدم `end` لإغلاقه

## إنشاء كائن من الصنف

```ruby
class Person
end

# إنشاء كائن باستخدام new
person1 = Person.new
person2 = Person.new

puts person1.class  # Person
puts person2.class  # Person

# كل كائن له هوية فريدة
# رقم فريد
puts person1.object_id
# رقم مختلف
puts person2.object_id
```

## متغيرات النسخة (Instance Variables)

**متغيرات النسخة** تُخزّن البيانات الخاصة بكل كائن. تبدأ بـ `@`:

```ruby
class Person
  def set_name(name)
    # متغير نسخة
    @name = name
  end

  def get_name
    @name
  end
end

person1 = Person.new
person1.set_name("أحمد")

person2 = Person.new
person2.set_name("سارة")

# أحمد
puts person1.get_name
# سارة
puts person2.get_name
```

**ملاحظات مهمة:**
- `@name` خاص بكل كائن (كل شخص له اسمه الخاص)
- متغيرات النسخة تبقى محفوظة طوال حياة الكائن
- لا يمكن الوصول لها مباشرة من خارج الكائن

## دوال النسخة (Instance Methods)

الدوال المُعرّفة داخل الصنف تُسمى **دوال النسخة**. كل كائن يمكنه استدعاءها:

```ruby
class Dog
  def set_name(name)
    @name = name
  end

  def bark
    puts "#{@name} يقول: هاو هاو!"
  end

  def description
    "كلب اسمه #{@name}"
  end
end

dog = Dog.new
dog.set_name("بوبي")
# بوبي يقول: هاو هاو!
dog.bark
# كلب اسمه بوبي
puts dog.description
```

## مثال شامل: صنف الطالب

```ruby
class Student
  # تعيين البيانات
  def set_info(name, age, grade)
    @name = name
    @age = age
    @grade = grade
  end

  # قراءة البيانات
  def get_name
    @name
  end

  def get_age
    @age
  end

  def get_grade
    @grade
  end

  # سلوكيات
  def study
    puts "#{@name} يدرس بجد!"
  end

  def introduce
    puts "مرحباً، أنا #{@name}، عمري #{@age} سنة، وأنا في الصف #{@grade}."
  end

  def pass?
    @grade >= 50
  end
end

# إنشاء طالب
student = Student.new
student.set_info("علي", 15, 85)

student.introduce
# مرحباً، أنا علي، عمري 15 سنة، وأنا في الصف 85.

student.study
# علي يدرس بجد!

puts student.pass?  # true
```

## الفرق بين الصنف والكائن

| الصنف (Class) | الكائن (Object) |
|---------------|-----------------|
| قالب/مُخطط | نسخة من القالب |
| يُعرّف الخصائص والسلوكيات | يحتوي على قيم فعلية |
| واحد فقط | يمكن إنشاء عدد غير محدود |
| لا يُخزّن بيانات | يُخزّن بياناته الخاصة |
| `class Person` | `person1 = Person.new` |

```ruby
class Car
  def set_brand(brand)
    @brand = brand
  end

  def info
    "سيارة من نوع #{@brand}"
  end
end

# الصنف واحد، لكن الكائنات متعددة
car1 = Car.new
car1.set_brand("تويوتا")

car2 = Car.new
car2.set_brand("هوندا")

car3 = Car.new
car3.set_brand("مرسيدس")

# سيارة من نوع تويوتا
puts car1.info
# سيارة من نوع هوندا
puts car2.info
# سيارة من نوع مرسيدس
puts car3.info
```

## لماذا نستخدم الأصناف؟

### 1. التنظيم
بدلاً من متغيرات منفصلة:
```ruby
# بدون أصناف (فوضوي)
student1_name = "أحمد"
student1_age = 15
student1_grade = 90

student2_name = "سارة"
student2_age = 16
student2_grade = 95
```

مع الأصناف:
```ruby
# مع أصناف (منظم)
class Student
  def set_info(name, age, grade)
    @name = name
    @age = age
    @grade = grade
  end
end

student1 = Student.new
student1.set_info("أحمد", 15, 90)

student2 = Student.new
student2.set_info("سارة", 16, 95)
```

### 2. إعادة الاستخدام
الصنف يُكتب مرة ويُستخدم عدة مرات:

```ruby
class Rectangle
  def set_dimensions(width, height)
    @width = width
    @height = height
  end

  def area
    @width * @height
  end

  def perimeter
    2 * (@width + @height)
  end
end

# استخدام الصنف عدة مرات
rect1 = Rectangle.new
rect1.set_dimensions(5, 3)

rect2 = Rectangle.new
rect2.set_dimensions(10, 7)

puts rect1.area      # 15
puts rect2.area      # 70
puts rect1.perimeter # 16
puts rect2.perimeter # 34
```

### 3. الكبسلة (Encapsulation)
إخفاء التفاصيل الداخلية:

```ruby
class BankAccount
  def set_balance(amount)
    @balance = amount
  end

  def deposit(amount)
    if amount > 0
      @balance += amount
      puts "تم إيداع #{amount}. الرصيد الجديد: #{@balance}"
    else
      puts "المبلغ غير صالح!"
    end
  end

  def withdraw(amount)
    if amount > 0 && amount <= @balance
      @balance -= amount
      puts "تم سحب #{amount}. الرصيد الجديد: #{@balance}"
    else
      puts "لا يمكن سحب هذا المبلغ!"
    end
  end

  def get_balance
    @balance
  end
end

account = BankAccount.new
account.set_balance(1000)
# تم إيداع 500. الرصيد الجديد: 1500
account.deposit(500)
# تم سحب 200. الرصيد الجديد: 1300
account.withdraw(200)
# لا يمكن سحب هذا المبلغ!
account.withdraw(2000)
```

## أمثلة عملية

### مثال 1: صنف الكتاب

```ruby
class Book
  def set_info(title, author, pages)
    @title = title
    @author = author
    @pages = pages
    @current_page = 1
  end

  def info
    "#{@title} - للكاتب #{@author} (#{@pages} صفحة)"
  end

  def read_pages(num)
    @current_page += num
    if @current_page > @pages
      @current_page = @pages
      puts "انتهيت من قراءة الكتاب!"
    else
      puts "وصلت للصفحة #{@current_page}"
    end
  end

  def progress
    percent = (@current_page.to_f / @pages * 100).round(1)
    "#{percent}% مُنجز"
  end
end

book = Book.new
book.set_info("تعلم روبي", "أحمد محمد", 200)
# تعلم روبي - للكاتب أحمد محمد (200 صفحة)
puts book.info
# وصلت للصفحة 51
book.read_pages(50)
puts book.progress  # 25.5% مُنجز
```

### مثال 2: صنف المنتج

```ruby
class Product
  def set_info(name, price, quantity)
    @name = name
    @price = price
    @quantity = quantity
  end

  def get_name
    @name
  end

  def total_value
    @price * @quantity
  end

  def sell(amount)
    if amount <= @quantity
      @quantity -= amount
      puts "تم بيع #{amount} من #{@name}"
    else
      puts "الكمية غير متوفرة!"
    end
  end

  def restock(amount)
    @quantity += amount
    puts "تم إضافة #{amount} من #{@name}. الكمية الجديدة: #{@quantity}"
  end

  def in_stock?
    @quantity > 0
  end

  def details
    "#{@name}: #{@price} ريال (متوفر: #{@quantity})"
  end
end

product = Product.new
product.set_info("هاتف ذكي", 2500, 10)
# هاتف ذكي: 2500 ريال (متوفر: 10)
puts product.details
puts product.total_value # 25000
# تم بيع 3 من هاتف ذكي
product.sell(3)
puts product.in_stock?   # true
```

### مثال 3: صنف اللاعب

```ruby
class Player
  def set_info(name, health, power)
    @name = name
    @health = health
    @max_health = health
    @power = power
    @score = 0
  end

  def attack(enemy_name)
    puts "#{@name} يهاجم #{enemy_name} بقوة #{@power}!"
  end

  def take_damage(damage)
    @health -= damage
    if @health <= 0
      @health = 0
      puts "#{@name} خسر المعركة!"
    else
      puts "#{@name} تلقى ضربة! الصحة: #{@health}/#{@max_health}"
    end
  end

  def heal(amount)
    @health += amount
    if @health > @max_health
      @health = @max_health
    end
    puts "#{@name} استعاد صحته! الصحة: #{@health}/#{@max_health}"
  end

  def add_score(points)
    @score += points
    puts "#{@name} حصل على #{points} نقطة! المجموع: #{@score}"
  end

  def alive?
    @health > 0
  end

  def status
    "#{@name} | الصحة: #{@health}/#{@max_health} | القوة: #{@power} | النقاط: #{@score}"
  end
end

player = Player.new
player.set_info("البطل", 100, 25)
# البطل | الصحة: 100/100 | القوة: 25 | النقاط: 0
puts player.status
# البطل يهاجم التنين بقوة 25!
player.attack("التنين")
# البطل تلقى ضربة! الصحة: 70/100
player.take_damage(30)
# البطل حصل على 100 نقطة! المجموع: 100
player.add_score(100)
```

## أخطاء شائعة

### 1. نسيان @ لمتغيرات النسخة

```ruby
class Wrong
  def set_name(name)
    # هذا لا يحفظ شيء!
    name = name
  end

  def get_name
    # خطأ: المتغير غير موجود
    name
  end
end

class Correct
  def set_name(name)
    # صحيح!
    @name = name
  end

  def get_name
    # صحيح!
    @name
  end
end
```

### 2. استدعاء دالة على الصنف بدل الكائن

```ruby
class Dog
  def bark
    puts "هاو هاو!"
  end
end

# خطأ
# Dog.bark  # NoMethodError

# صحيح
dog = Dog.new
dog.bark
```

### 3. نسيان new عند إنشاء الكائن

```ruby
class Cat
  def meow
    puts "مياو!"
  end
end

# خطأ
# هذا يُعيّن الصنف نفسه، ليس كائناً
# cat = Cat

# صحيح
cat = Cat.new
cat.meow
```

### 4. محاولة الوصول لمتغير النسخة مباشرة

```ruby
class Person
  def set_name(name)
    @name = name
  end
end

person = Person.new
person.set_name("أحمد")

# خطأ
# puts person.@name  # SyntaxError

# صحيح: يجب إنشاء دالة للقراءة
class Person
  def set_name(name)
    @name = name
  end

  def get_name
    @name
  end
end
```

## جدول ملخص

| المفهوم | الوصف | مثال |
|---------|-------|------|
| الصنف | قالب لإنشاء كائنات | `class Person; end` |
| الكائن | نسخة من الصنف | `person = Person.new` |
| متغير النسخة | بيانات خاصة بالكائن | `@name = "أحمد"` |
| دالة النسخة | سلوك الكائن | `def greet; end` |
| new | إنشاء كائن جديد | `Person.new` |
| class | معرفة نوع الكائن | `obj.class` |

## تمرين: إنشاء صنف Person

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ صنف `Person` يحتوي على:
   - دالة `set_info` تستقبل `name` و `age`
   - دالة `get_name` تُرجع الاسم
   - دالة `get_age` تُرجع العمر
   - دالة `introduce` تطبع: "مرحباً، أنا [الاسم] وعمري [العمر] سنة"
2. أنشئ كائناً وعيّن له اسم "فاطمة" وعمر 25
3. استدعِ دالة `introduce`

**الناتج المتوقع:**
```
مرحباً، أنا فاطمة وعمري 25 سنة
```

**تلميحات:**
- ابدأ بـ `class Person` وأغلق بـ `end`
- استخدم `@name` و `@age` لتخزين البيانات
- استخدم دمج المتغيرات في `introduce`: `puts "مرحباً، أنا #{@name} وعمري #{@age} سنة"`
- لا تنسَ `Person.new` لإنشاء الكائن

---

> **تذكّر:** الصنف هو القالب والكائن هو النسخة. متغيرات النسخة (`@`) تُخزّن بيانات كل كائن بشكل مستقل. في الدرس القادم سنتعلم طريقة أسهل لتعيين البيانات باستخدام `initialize` والموصّلات!
