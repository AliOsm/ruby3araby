# القواميس (Hashes)

القواميس (تُسمى أيضاً Hash أو Dictionary) هي بنية بيانات تُخزّن أزواجاً من **المفاتيح والقيم**. بدلاً من الوصول إلى العناصر بالفهرس الرقمي كما في المصفوفات، تستخدم القواميس **مفاتيح** للوصول إلى القيم.

## ما هو القاموس؟

القاموس يشبه قاموس اللغة: لكل **كلمة** (المفتاح) يوجد **تعريف** (القيمة).

```ruby
# قاموس بسيط لمعلومات شخص
person = {
  "name" => "أحمد",
  "age" => 25,
  "city" => "القاهرة"
}

puts person["name"]  # أحمد
puts person["age"]   # 25
```

## إنشاء القواميس

### الطريقة الأساسية: الأقواس المعقوفة

```ruby
# قاموس فارغ
empty_hash = {}

# قاموس بمفاتيح نصية
student = {
  "name" => "سارة",
  "grade" => 95,
  "passed" => true
}

p student
# {"name"=>"سارة", "grade"=>95, "passed"=>true}
```

### باستخدام Hash.new

```ruby
# قاموس فارغ
hash1 = Hash.new
p hash1  # {}

# قاموس بقيمة افتراضية
hash2 = Hash.new(0)
puts hash2["nonexistent"]  # 0 (بدلاً من nil)

# مفيد للعدّادات
counter = Hash.new(0)
counter["apples"] += 1
counter["apples"] += 1
counter["oranges"] += 1
p counter  # {"apples"=>2, "oranges"=>1}
```

## المفاتيح الرمزية (Symbol Keys)

في روبي، الطريقة **الأكثر شيوعاً** هي استخدام الرموز (Symbols) كمفاتيح لأنها أسرع وأكفأ في الذاكرة.

### الصيغة القديمة: السهم الكبير

```ruby
person = {
  :name => "أحمد",
  :age => 30,
  :city => "الرياض"
}

puts person[:name]  # أحمد
```

### الصيغة الحديثة (المفضلة): النقطتين بعد المفتاح

```ruby
# صيغة JSON المشابهة - أوضح وأقصر
person = {
  name: "أحمد",
  age: 30,
  city: "الرياض"
}

puts person[:name]  # أحمد
puts person[:age]   # 30
puts person[:city]  # الرياض
```

### مقارنة الصيغتين

| الصيغة | المثال | الاستخدام |
|--------|--------|-----------|
| السهم الكبير | `:key => value` | صالحة لأي نوع من المفاتيح |
| النقطتين | `key: value` | للرموز فقط، أكثر شيوعاً |

## الوصول إلى القيم

### باستخدام الأقواس المربعة

```ruby
person = { name: "فاطمة", age: 28, job: "مهندسة" }

# الوصول بالمفتاح
puts person[:name]  # فاطمة
puts person[:age]   # 28
puts person[:job]   # مهندسة

# مفتاح غير موجود يُرجع nil
puts person[:salary]  # لا شيء (nil)
```

### باستخدام fetch (مع قيمة افتراضية)

```ruby
person = { name: "محمد", age: 35 }

# fetch تُثير خطأ إذا المفتاح غير موجود
# puts person.fetch(:salary)  # KeyError!

# يمكن تحديد قيمة افتراضية
puts person.fetch(:salary, "غير محدد")  # غير محدد
puts person.fetch(:name, "مجهول")       # محمد (موجود)
```

### باستخدام dig للقواميس المتداخلة

```ruby
data = {
  user: {
    profile: {
      name: "أحمد",
      contact: {
        email: "ahmed@example.com"
      }
    }
  }
}

# dig يتنقل بأمان عبر المستويات
puts data.dig(:user, :profile, :name)           # أحمد
puts data.dig(:user, :profile, :contact, :email) # ahmed@example.com
puts data.dig(:user, :settings, :theme)          # nil (لا خطأ)
```

## إضافة وتعديل القيم

### إضافة قيم جديدة

```ruby
person = { name: "علي" }
p person  # {:name=>"علي"}

# إضافة مفتاح جديد
person[:age] = 25
person[:city] = "دبي"
p person  # {:name=>"علي", :age=>25, :city=>"دبي"}
```

### تعديل قيم موجودة

```ruby
person = { name: "سارة", age: 22 }

# تغيير قيمة موجودة
person[:age] = 23
puts person[:age]  # 23

# التعديل يعمل بنفس طريقة الإضافة
person[:name] = "سارة محمد"
puts person[:name]  # سارة محمد
```

### باستخدام store

```ruby
person = { name: "أحمد" }

person.store(:age, 30)
person.store(:city, "القاهرة")

p person  # {:name=>"أحمد", :age=>30, :city=>"القاهرة"}
```

### دمج قواميس باستخدام merge

```ruby
defaults = { theme: "dark", language: "ar" }
user_prefs = { language: "en", font_size: 14 }

# merge يُرجع قاموساً جديداً
settings = defaults.merge(user_prefs)
p settings  # {:theme=>"dark", :language=>"en", :font_size=>14}

# القيم في القاموس الثاني تطغى على الأول
```

## حذف القيم

### delete - حذف مفتاح معين

```ruby
person = { name: "أحمد", age: 30, city: "القاهرة" }

# حذف مفتاح وإرجاع قيمته
removed = person.delete(:age)
puts removed  # 30
p person      # {:name=>"أحمد", :city=>"القاهرة"}

# حذف مفتاح غير موجود يُرجع nil
result = person.delete(:salary)
puts result  # لا شيء (nil)
```

### delete_if - حذف بشرط

```ruby
scores = { math: 85, english: 45, arabic: 90, science: 55 }

# حذف المواد الراسبة (أقل من 60)
scores.delete_if { |subject, score| score < 60 }
p scores  # {:math=>85, :arabic=>90}
```

### clear - حذف الكل

```ruby
data = { a: 1, b: 2, c: 3 }
data.clear
p data  # {}
```

## معلومات عن القاموس

```ruby
person = { name: "فاطمة", age: 28, city: "جدة" }

# عدد الأزواج
puts person.length  # 3
puts person.size    # 3 (نفس length)
puts person.count   # 3

# هل فارغ؟
puts person.empty?  # false
puts {}.empty?      # true

# هل المفتاح موجود؟
puts person.key?(:name)      # true
puts person.key?(:salary)    # false
puts person.has_key?(:age)   # true (نفس key?)
puts person.include?(:city)  # true (نفس key?)

# هل القيمة موجودة؟
puts person.value?(28)       # true
puts person.has_value?("جدة") # true
```

## الحصول على المفاتيح والقيم

```ruby
person = { name: "أحمد", age: 30, city: "القاهرة" }

# جميع المفاتيح
p person.keys    # [:name, :age, :city]

# جميع القيم
p person.values  # ["أحمد", 30, "القاهرة"]

# جميع الأزواج كمصفوفة من المصفوفات
p person.to_a   # [[:name, "أحمد"], [:age, 30], [:city, "القاهرة"]]
```

## التكرار على القواميس

### each - المفتاح والقيمة معاً

```ruby
person = { name: "سارة", age: 25, job: "طبيبة" }

person.each do |key, value|
  puts "#{key}: #{value}"
end
```

الناتج:
```
name: سارة
age: 25
job: طبيبة
```

### each_key - المفاتيح فقط

```ruby
person = { name: "أحمد", age: 30 }

person.each_key do |key|
  puts key
end
```

الناتج:
```
name
age
```

### each_value - القيم فقط

```ruby
scores = { math: 85, english: 90, arabic: 95 }

total = 0
scores.each_value do |score|
  total += score
end
puts "المجموع: #{total}"  # المجموع: 270
```

## جدول ملخص: دوال القواميس الأساسية

| الدالة | الوصف | المثال |
|--------|-------|--------|
| `[]` | الوصول للقيمة | `hash[:key]` |
| `[]=` | تعيين قيمة | `hash[:key] = value` |
| `fetch` | الوصول مع قيمة افتراضية | `hash.fetch(:key, default)` |
| `keys` | جميع المفاتيح | `hash.keys` |
| `values` | جميع القيم | `hash.values` |
| `key?` | هل المفتاح موجود؟ | `hash.key?(:key)` |
| `value?` | هل القيمة موجودة؟ | `hash.value?(val)` |
| `delete` | حذف مفتاح | `hash.delete(:key)` |
| `merge` | دمج قاموسين | `hash1.merge(hash2)` |
| `length` | عدد الأزواج | `hash.length` |
| `empty?` | هل فارغ؟ | `hash.empty?` |
| `each` | التكرار | `hash.each { \|k,v\| ... }` |

## أمثلة عملية

### مثال 1: بيانات شخص

```ruby
# إنشاء قاموس لبيانات شخص
person = {
  name: "محمد علي",
  age: 28,
  email: "mohamed@example.com",
  skills: ["Ruby", "Python", "JavaScript"]
}

puts "الاسم: #{person[:name]}"
puts "العمر: #{person[:age]}"
puts "البريد: #{person[:email]}"
puts "المهارات: #{person[:skills].join(', ')}"
```

الناتج:
```
الاسم: محمد علي
العمر: 28
البريد: mohamed@example.com
المهارات: Ruby, Python, JavaScript
```

### مثال 2: عدّاد الكلمات

```ruby
text = "روبي لغة روبي جميلة روبي سهلة"
words = text.split

# إنشاء عدّاد بقيمة افتراضية 0
counter = Hash.new(0)

words.each do |word|
  counter[word] += 1
end

puts "تكرار الكلمات:"
counter.each do |word, count|
  puts "  #{word}: #{count}"
end
```

الناتج:
```
تكرار الكلمات:
  روبي: 3
  لغة: 1
  جميلة: 1
  سهلة: 1
```

### مثال 3: قائمة الطلاب ودرجاتهم

```ruby
students = {
  "أحمد" => { math: 85, english: 78, arabic: 92 },
  "سارة" => { math: 95, english: 88, arabic: 90 },
  "محمد" => { math: 75, english: 82, arabic: 88 }
}

puts "متوسط درجات الطلاب:"
students.each do |name, grades|
  average = grades.values.sum / grades.length.to_f
  puts "  #{name}: #{average.round(1)}"
end
```

الناتج:
```
متوسط درجات الطلاب:
  أحمد: 85.0
  سارة: 91.0
  محمد: 81.7
```

### مثال 4: إعدادات التطبيق

```ruby
# الإعدادات الافتراضية
defaults = {
  theme: "light",
  language: "ar",
  notifications: true,
  font_size: 14
}

# إعدادات المستخدم
user_settings = {
  theme: "dark",
  font_size: 16
}

# دمج الإعدادات (المستخدم يطغى على الافتراضي)
settings = defaults.merge(user_settings)

puts "الإعدادات النهائية:"
settings.each do |key, value|
  puts "  #{key}: #{value}"
end
```

الناتج:
```
الإعدادات النهائية:
  theme: dark
  language: ar
  notifications: true
  font_size: 16
```

## القواميس المتداخلة

يمكن أن تحتوي قيمة القاموس على قاموس آخر:

```ruby
company = {
  name: "شركة التقنية",
  employees: {
    ceo: { name: "أحمد", salary: 50000 },
    cto: { name: "سارة", salary: 45000 }
  },
  departments: ["التطوير", "التسويق", "الموارد البشرية"]
}

# الوصول للبيانات المتداخلة
puts company[:name]                        # شركة التقنية
puts company[:employees][:ceo][:name]      # أحمد
puts company[:departments][0]              # التطوير

# باستخدام dig (أكثر أماناً)
puts company.dig(:employees, :cto, :salary)  # 45000
```

## نصائح مهمة

1. **استخدم الرموز كمفاتيح** - أسرع وأكفأ من النصوص
2. **استخدم الصيغة الحديثة** - `name: "أحمد"` بدلاً من `:name => "أحمد"`
3. **استخدم fetch للقيم الافتراضية** - بدلاً من التحقق اليدوي من nil
4. **استخدم dig للقواميس المتداخلة** - يتجنب أخطاء nil
5. **استخدم Hash.new(0) للعدّادات** - يوفر التحقق من الوجود

## الفرق بين المصفوفات والقواميس

| الخاصية | المصفوفة | القاموس |
|---------|----------|---------|
| الوصول | بالفهرس الرقمي [0, 1, 2] | بالمفتاح [:name, :age] |
| الترتيب | مرتبة دائماً | مرتبة (Ruby 1.9+) |
| الاستخدام | قوائم متجانسة | بيانات مُسمّاة |
| المثال | `[1, 2, 3]` | `{a: 1, b: 2}` |

## تمرين: إنشاء واستعلام قاموس شخص

حان وقت التطبيق! في محرر الكود على اليسار:

**المطلوب:**
1. أنشئ قاموساً `person` يحتوي على:
   - `name` بقيمة "فاطمة"
   - `age` بقيمة 30
   - `city` بقيمة "دبي"
   - `skills` بقيمة مصفوفة ["Ruby", "Python"]
2. اطبع الاسم
3. اطبع المدينة
4. أضف مفتاحاً جديداً `job` بقيمة "مبرمجة"
5. اطبع عدد المفاتيح في القاموس
6. اطبع جميع المفاتيح باستخدام p
7. تحقق هل المفتاح `:email` موجود واطبع النتيجة

**تلميحات:**
- استخدم الصيغة الحديثة: `key: value`
- للمصفوفة داخل القاموس: `skills: ["Ruby", "Python"]`
- لإضافة مفتاح جديد: `person[:job] = "مبرمجة"`
- لعدد المفاتيح: `person.length` أو `person.keys.length`

---

> **تذكّر:** القواميس مثالية لتخزين البيانات المُسمّاة، والرموز هي أفضل خيار للمفاتيح!
