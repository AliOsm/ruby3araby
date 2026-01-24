# الوراثة

في الدروس السابقة تعلمنا كيف ننشئ أصنافاً ونستخدم `initialize` والموصّلات. لكن ماذا لو أردنا إنشاء أصناف **متشابهة** تشترك في بعض الخصائص والسلوكيات؟ هل نُكرر الشيفرة في كل صنف؟ **بالطبع لا!** هنا تأتي **الوراثة** (Inheritance).

## ما هي الوراثة؟

**الوراثة** هي آلية تسمح لصنف (يُسمى **الصنف الابن**) بأن يرث خصائص وسلوكيات صنف آخر (يُسمى **الصنف الأب**).

### مثال من الحياة الواقعية

فكّر في **الحيوانات**:
- **صنف أب:** حيوان (له اسم، يأكل، ينام)
- **صنف ابن:** كلب (يرث من حيوان + يضيف النباح)
- **صنف ابن:** قط (يرث من حيوان + يضيف المواء)

الكلب والقط كلاهما حيوانات، لذا يشتركان في خصائص مثل الاسم والأكل والنوم. لكن لكل منهما سلوكه الخاص.

## صيغة الوراثة

نستخدم الرمز `<` للوراثة:

```ruby
class Child < Parent
  # محتوى الصنف الابن
end
```

## مثال بسيط: الحيوان والكلب

### بدون وراثة (الطريقة السيئة)

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def eat
    puts "#{@name} يأكل"
  end

  def sleep
    puts "#{@name} ينام"
  end
end

class Dog
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  # نفس الشيفرة مُكرر!
  def eat
    puts "#{@name} يأكل"
  end

  def sleep
    puts "#{@name} ينام"
  end

  def bark
    puts "#{@name} ينبح: هاو هاو!"
  end
end
```

**المشكلة:** شيفرة مُكررة! إذا أردنا تعديل `eat` أو `sleep`، يجب تعديلها في كل صنف.

### مع الوراثة (الطريقة الصحيحة)

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def eat
    puts "#{@name} يأكل"
  end

  def sleep
    puts "#{@name} ينام"
  end
end

# Dog يرث من Animal
class Dog < Animal
  def bark
    puts "#{@name} ينبح: هاو هاو!"
  end
end

# إنشاء كلب
dog = Dog.new("بوبي")
dog.eat    # بوبي يأكل (موروثة من Animal)
dog.sleep  # بوبي ينام (موروثة من Animal)
dog.bark   # بوبي ينبح: هاو هاو! (خاصة بـ Dog)
```

**الآن:**
- `Dog` يرث `initialize`, `eat`, `sleep`, و `name` من `Animal`
- `Dog` يضيف `bark` كسلوك خاص به
- **لا تكرار للشيفرة!**

## إضافة أصناف ابن أخرى

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def eat
    puts "#{@name} يأكل"
  end

  def sleep
    puts "#{@name} ينام"
  end
end

class Dog < Animal
  def bark
    puts "#{@name} ينبح: هاو هاو!"
  end
end

class Cat < Animal
  def meow
    puts "#{@name} يموء: مياو!"
  end
end

class Bird < Animal
  def fly
    puts "#{@name} يطير في السماء!"
  end

  def chirp
    puts "#{@name} يُغرّد: تغريد!"
  end
end

# إنشاء حيوانات
dog = Dog.new("بوبي")
cat = Cat.new("ميشو")
bird = Bird.new("تويتي")

# كل الحيوانات تأكل وتنام
dog.eat    # بوبي يأكل
cat.eat    # ميشو يأكل
bird.eat   # تويتي يأكل

# لكن كل حيوان له صوته الخاص
dog.bark   # بوبي ينبح: هاو هاو!
cat.meow   # ميشو يموء: مياو!
bird.chirp # تويتي يُغرّد: تغريد!

# والطائر يطير
bird.fly   # تويتي يطير في السماء!
```

## إعادة تعريف الدوال (Method Overriding)

يمكن للصنف الابن **إعادة تعريف** دالة موروثة لتغيير سلوكها:

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def speak
    puts "#{@name} يُصدر صوتاً"
  end
end

class Dog < Animal
  # إعادة تعريف speak
  def speak
    puts "#{@name} ينبح: هاو هاو!"
  end
end

class Cat < Animal
  # إعادة تعريف speak
  def speak
    puts "#{@name} يموء: مياو!"
  end
end

class Fish < Animal
  # إعادة تعريف speak
  def speak
    puts "#{@name} لا يُصدر صوتاً (سمكة صامتة)"
  end
end

animal = Animal.new("حيوان")
dog = Dog.new("بوبي")
cat = Cat.new("ميشو")
fish = Fish.new("نيمو")

animal.speak  # حيوان يُصدر صوتاً
dog.speak     # بوبي ينبح: هاو هاو!
cat.speak     # ميشو يموء: مياو!
fish.speak    # نيمو لا يُصدر صوتاً (سمكة صامتة)
```

## استدعاء دالة الأب بـ super

أحياناً نريد **توسيع** سلوك الأب بدلاً من استبداله كلياً. نستخدم `super` لاستدعاء دالة الأب:

```ruby
class Animal
  attr_accessor :name

  def initialize(name)
    @name = name
    @energy = 100
  end

  def eat
    @energy += 10
    puts "#{@name} يأكل. الطاقة: #{@energy}"
  end

  def info
    "الاسم: #{@name}, الطاقة: #{@energy}"
  end
end

class Dog < Animal
  attr_reader :breed

  def initialize(name, breed)
    super(name)  # يستدعي initialize من Animal
    @breed = breed
  end

  def eat
    super  # يستدعي eat من Animal
    puts "#{@name} يأكل بسرعة كبيرة!"
  end

  def info
    super + ", السلالة: #{@breed}"  # يُضيف على الناتج
  end
end

dog = Dog.new("بوبي", "جيرمن شيبرد")
puts dog.info  # الاسم: بوبي, الطاقة: 100, السلالة: جيرمن شيبرد

dog.eat
# بوبي يأكل. الطاقة: 110
# بوبي يأكل بسرعة كبيرة!
```

### أشكال super المختلفة

```ruby
class Parent
  def greet(name, greeting = "مرحباً")
    puts "#{greeting}، #{name}!"
  end
end

class Child < Parent
  # 1. super بدون أقواس - يُمرر كل المُعاملات تلقائياً
  def greet(name, greeting = "أهلاً")
    super
    puts "(من الابن)"
  end
end

# الناتج:
child = Child.new
child.greet("أحمد")
# أهلاً، أحمد!
# (من الابن)

# 2. super() بأقواس فارغة - لا يُمرر أي مُعاملات
class Child2 < Parent
  def greet(name, greeting = "أهلاً")
    super()  # خطأ! Parent.greet يحتاج name
  end
end

# 3. super مع مُعاملات محددة
class Child3 < Parent
  def greet(name, greeting = "أهلاً")
    super(name, "السلام عليكم")  # يُمرر مُعاملات مختلفة
    puts "(تحية خاصة)"
  end
end

child3 = Child3.new
child3.greet("سارة")
# السلام عليكم، سارة!
# (تحية خاصة)
```

## التحقق من الوراثة

```ruby
class Animal
  attr_accessor :name
  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  def bark
    puts "هاو!"
  end
end

dog = Dog.new("بوبي")

# is_a? - هل الكائن من هذا النوع أو وارث منه؟
puts dog.is_a?(Dog)      # true
puts dog.is_a?(Animal)   # true
puts dog.is_a?(Object)   # true (كل شيء يرث من Object)
puts dog.is_a?(String)   # false

# class - النوع المباشر فقط
puts dog.class           # Dog
puts dog.class == Dog    # true
puts dog.class == Animal # false

# superclass - الصنف الأب المباشر
puts Dog.superclass      # Animal
puts Animal.superclass   # Object

# ancestors - سلسلة الوراثة كاملة
puts Dog.ancestors.inspect
# [Dog, Animal, Object, Kernel, BasicObject]
```

## مثال عملي: نظام الموظفين

```ruby
class Employee
  attr_reader :name, :id
  attr_accessor :salary

  def initialize(name, id, salary)
    @name = name
    @id = id
    @salary = salary
  end

  def work
    puts "#{@name} يعمل"
  end

  def info
    "#{@name} (#{@id}) - الراتب: #{@salary} ريال"
  end

  def annual_salary
    @salary * 12
  end
end

class Manager < Employee
  attr_accessor :team_size

  def initialize(name, id, salary, team_size)
    super(name, id, salary)
    @team_size = team_size
  end

  def work
    super
    puts "#{@name} يدير فريقاً من #{@team_size} أشخاص"
  end

  def info
    super + " - حجم الفريق: #{@team_size}"
  end

  # المدير له بونص
  def annual_salary
    super + 5000  # بونص سنوي
  end
end

class Developer < Employee
  attr_accessor :language

  def initialize(name, id, salary, language)
    super(name, id, salary)
    @language = language
  end

  def work
    puts "#{@name} يكتب شيفرة بلغة #{@language}"
  end

  def info
    super + " - اللغة: #{@language}"
  end
end

class Designer < Employee
  attr_accessor :tool

  def initialize(name, id, salary, tool)
    super(name, id, salary)
    @tool = tool
  end

  def work
    puts "#{@name} يصمم باستخدام #{@tool}"
  end
end

# إنشاء موظفين
manager = Manager.new("أحمد", "M001", 15000, 5)
developer = Developer.new("سارة", "D001", 12000, "Ruby")
designer = Designer.new("محمد", "G001", 10000, "Figma")

# معلومات كل موظف
puts manager.info
# أحمد (M001) - الراتب: 15000 ريال - حجم الفريق: 5

puts developer.info
# سارة (D001) - الراتب: 12000 ريال - اللغة: Ruby

puts designer.info
# محمد (G001) - الراتب: 10000 ريال

# كل موظف يعمل بطريقته
puts "\n--- العمل ---"
manager.work
# أحمد يعمل
# أحمد يدير فريقاً من 5 أشخاص

developer.work
# سارة يكتب شيفرة بلغة Ruby

designer.work
# محمد يصمم باستخدام Figma

# الراتب السنوي
puts "\n--- الراتب السنوي ---"
puts "المدير: #{manager.annual_salary}"     # 185000 (مع البونص)
puts "المطور: #{developer.annual_salary}"   # 144000
puts "المصمم: #{designer.annual_salary}"    # 120000
```

## مثال عملي: أشكال هندسية

```ruby
class Shape
  attr_reader :color

  def initialize(color = "أبيض")
    @color = color
  end

  def area
    0  # سيتم إعادة تعريفها في الأبناء
  end

  def perimeter
    0  # سيتم إعادة تعريفها في الأبناء
  end

  def describe
    "شكل #{@color}"
  end
end

class Rectangle < Shape
  attr_reader :width, :height

  def initialize(width, height, color = "أبيض")
    super(color)
    @width = width
    @height = height
  end

  def area
    @width * @height
  end

  def perimeter
    2 * (@width + @height)
  end

  def describe
    "مستطيل #{@color} (#{@width}×#{@height})"
  end
end

class Square < Rectangle
  def initialize(side, color = "أبيض")
    super(side, side, color)
  end

  def describe
    "مربع #{@color} (#{@width}×#{@width})"
  end
end

class Circle < Shape
  attr_reader :radius
  PI = 3.14159

  def initialize(radius, color = "أبيض")
    super(color)
    @radius = radius
  end

  def area
    PI * @radius * @radius
  end

  def perimeter
    2 * PI * @radius
  end

  def describe
    "دائرة #{@color} (نصف القطر: #{@radius})"
  end
end

# إنشاء أشكال
rect = Rectangle.new(5, 3, "أحمر")
square = Square.new(4, "أزرق")
circle = Circle.new(7, "أخضر")

shapes = [rect, square, circle]

shapes.each do |shape|
  puts shape.describe
  puts "  المساحة: #{shape.area.round(2)}"
  puts "  المحيط: #{shape.perimeter.round(2)}"
  puts
end
```

**الناتج:**
```
مستطيل أحمر (5×3)
  المساحة: 15
  المحيط: 16

مربع أزرق (4×4)
  المساحة: 16
  المحيط: 16

دائرة أخضر (نصف القطر: 7)
  المساحة: 153.94
  المحيط: 43.98
```

## قواعد الوراثة في روبي

### 1. الوراثة الفردية فقط

روبي تدعم **وراثة فردية** فقط (صنف واحد يرث من صنف أب واحد):

```ruby
class A
end

class B < A  # صحيح
end

# class C < A, B  # خطأ! لا يمكن الوراثة من صنفين
```

**ملاحظة:** لمشاركة الشيفرة بين أصناف غير متعلقة، نستخدم **الوحدات** (Modules) - سنتعلمها في الدرس القادم.

### 2. كل الأصناف ترث من Object

```ruby
class MyClass
end

puts MyClass.superclass  # Object
puts Object.superclass   # BasicObject
puts BasicObject.superclass  # nil
```

### 3. الموصّلات موروثة أيضاً

```ruby
class Parent
  attr_accessor :name
end

class Child < Parent
  # name متاح تلقائياً
end

child = Child.new
child.name = "طفل"
puts child.name  # طفل
```

## جدول مقارنة

| المفهوم | الوصف | مثال |
|---------|-------|------|
| الصنف الأب | الصنف الذي يُورّث | `class Animal` |
| الصنف الابن | الصنف الذي يرث | `class Dog < Animal` |
| `<` | رمز الوراثة | `Child < Parent` |
| `super` | استدعاء دالة الأب | `super(args)` |
| Method Override | إعادة تعريف دالة موروثة | `def speak; "هاو!"; end` |
| `is_a?` | التحقق من النوع مع الوراثة | `dog.is_a?(Animal)` |
| `superclass` | الصنف الأب المباشر | `Dog.superclass` |

## أخطاء شائعة

### 1. نسيان super في initialize

```ruby
class Animal
  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  def initialize(name, breed)
    # نسينا super!
    @breed = breed
  end
end

dog = Dog.new("بوبي", "جيرمن")
puts dog.instance_variable_get(:@name)  # nil! لأن @name لم يُعيّن
```

**الصحيح:**
```ruby
class Dog < Animal
  def initialize(name, breed)
    super(name)  # يُعيّن @name
    @breed = breed
  end
end
```

### 2. استدعاء super بالمُعاملات الخاطئة

```ruby
class Animal
  def initialize(name)
    @name = name
  end
end

class Dog < Animal
  def initialize(name, breed)
    super  # خطأ! يُمرر (name, breed) لكن Animal.initialize يقبل name فقط
    @breed = breed
  end
end

# ArgumentError: wrong number of arguments (given 2, expected 1)
```

**الصحيح:**
```ruby
super(name)  # نُمرر فقط ما يحتاجه الأب
```

### 3. محاولة الوراثة المتعددة

```ruby
class A
end

class B
end

# خطأ!
# class C < A, B
# end

# الحل: استخدم Modules (الدرس القادم)
```

### 4. استدعاء دالة غير موجودة في الأب

```ruby
class Animal
  def eat
    puts "يأكل"
  end
end

class Dog < Animal
  def eat
    super
    puts "يأكل العظام"
  end

  def bark
    super  # خطأ! Animal ليس له bark
    puts "هاو!"
  end
end
```

## متى نستخدم الوراثة؟

### استخدم الوراثة عندما:
- يوجد علاقة "هو نوع من" (is-a relationship)
- الصنف الابن هو **تخصص** من الصنف الأب
- تريد مشاركة شيفرة بين أصناف متشابهة

```ruby
# صحيح: الكلب هو نوع من الحيوانات
class Dog < Animal
end

# صحيح: المدير هو نوع من الموظفين
class Manager < Employee
end

# صحيح: المربع هو نوع من المستطيلات
class Square < Rectangle
end
```

### لا تستخدم الوراثة عندما:
- لا يوجد علاقة "هو نوع من"
- تريد فقط مشاركة بعض الدوال (استخدم Modules)

```ruby
# خطأ: السيارة ليست نوعاً من المحركات
# class Car < Engine  # سيء!

# الأفضل: السيارة تحتوي على محرك
class Car
  def initialize
    @engine = Engine.new
  end
end
```

## ملخص

| المفهوم | الوظيفة |
|---------|---------|
| `class Child < Parent` | إنشاء صنف يرث من آخر |
| `super` | استدعاء دالة الأب |
| `super(args)` | استدعاء مع مُعاملات محددة |
| Method Override | إعادة تعريف دالة موروثة |
| `is_a?` | التحقق من الوراثة |
| `superclass` | معرفة الصنف الأب |
| `ancestors` | سلسلة الوراثة كاملة |

## تمرين: نظام الحيوانات

حان وقت التطبيق! في محرر الشيفرة على اليسار:

**المطلوب:**
1. أنشئ صنف `Animal` يحتوي على:
   - `attr_reader :name`
   - `initialize(name)`
   - `speak` تطبع "صوت غير معروف"

2. أنشئ صنف `Dog` يرث من `Animal`:
   - إعادة تعريف `speak` لتطبع "هاو هاو!"

3. أنشئ صنف `Cat` يرث من `Animal`:
   - إعادة تعريف `speak` لتطبع "مياو!"

4. أنشئ كلباً اسمه "بوبي" وقطاً اسمه "ميشو"
5. اطبع اسم كل حيوان ثم استدعِ speak

**الناتج المتوقع:**
```
بوبي
هاو هاو!
ميشو
مياو!
```

**تلميحات:**
- ابدأ بـ `class Animal` مع `attr_reader :name` و `def initialize(name)`
- الكلب والقط يرثان: `class Dog < Animal`
- استخدم `puts` داخل `speak`
- لا تنسَ استدعاء `.name` للطباعة: `puts dog.name`

---

> **تذكّر:** الوراثة تسمح بإنشاء تسلسل هرمي من الأصناف. الصنف الابن يرث كل شيء من الأب ويمكنه إضافة أو تعديل السلوكيات. استخدم `super` لاستدعاء دالة الأب عند الحاجة. في الدرس القادم سنتعلم **الوحدات والـ Mixins** لمشاركة الشيفرة بين أصناف غير متعلقة!
