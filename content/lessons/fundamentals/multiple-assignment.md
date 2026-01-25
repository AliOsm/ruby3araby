# التعيين المتعدد ومعالجة nil

في هذا الدرس، سنتعلم تقنيات متقدمة للتعامل مع المتغيرات في روبي: التعيين المتعدد (Parallel Assignment) والتعامل الآمن مع القيم الفارغة (nil).

## التعيين المتعدد (Parallel Assignment)

التعيين المتعدد يسمح لك بتعيين عدة قيم لعدة متغيرات في سطر واحد.

### الصيغة الأساسية

```ruby
# بدلاً من كتابة ثلاثة أسطر
a = 1
b = 2
c = 3

# يمكنك كتابة سطر واحد
a, b, c = 1, 2, 3

# 1
puts a
# 2
puts b
# 3
puts c
```

### أمثلة عملية

```ruby
# تعيين بيانات شخص
name, age, city = "أحمد", 25, "القاهرة"

# الاسم: أحمد
puts "الاسم: #{name}"
# العمر: 25
puts "العمر: #{age}"
# المدينة: القاهرة
puts "المدينة: #{city}"
```

```ruby
# تعيين إحداثيات
x, y, z = 10.5, 20.3, 5.0

puts "الموقع: (#{x}, #{y}, #{z})"
```

## تبادل القيم (Swapping)

من أقوى استخدامات التعيين المتعدد هو تبادل قيم متغيرين **بدون متغير مؤقت**:

```ruby
a = 10
b = 20

puts "قبل التبادل:"
# a = 10
puts "a = #{a}"
# b = 20
puts "b = #{b}"

# تبادل القيم في سطر واحد!
a, b = b, a

puts "بعد التبادل:"
# a = 20
puts "a = #{a}"
# b = 10
puts "b = #{b}"
```

### مقارنة مع اللغات الأخرى

في معظم اللغات البرمجية، تحتاج متغيراً مؤقتاً:

```ruby
# الطريقة التقليدية (في لغات أخرى)
temp = a
a = b
b = temp

# طريقة روبي الأنيقة
a, b = b, a
```

### تبادل ثلاثة متغيرات أو أكثر

```ruby
a, b, c = 1, 2, 3
# 1, 2, 3
puts "#{a}, #{b}, #{c}"

# دوران القيم
a, b, c = b, c, a
# 2, 3, 1
puts "#{a}, #{b}, #{c}"
```

## عدم تطابق عدد المتغيرات والقيم

### قيم أكثر من المتغيرات

القيم الزائدة تُهمل:

```ruby
a, b = 1, 2, 3, 4
# 1
puts a
# 2
puts b
# القيم 3 و 4 ضاعت
```

### متغيرات أكثر من القيم

المتغيرات الزائدة تصبح `nil`:

```ruby
a, b, c = 1, 2
# 1
puts a
# 2
puts b
# (فارغ - nil)
puts c
# true
puts c.nil?
```

## التعيين المتعدد مع المصفوفات

### تفكيك مصفوفة

```ruby
numbers = [10, 20, 30]

# تعيين عناصر المصفوفة لمتغيرات
a, b, c = numbers

# 10
puts a
# 20
puts b
# 30
puts c
```

### تجميع القيم الزائدة بـ splat (*)

```ruby
first, *rest = 1, 2, 3, 4, 5

# 1
puts first
# [2, 3, 4, 5]
puts rest.inspect
```

```ruby
# أو في الوسط
first, *middle, last = 1, 2, 3, 4, 5

# 1
puts first
# [2, 3, 4]
puts middle.inspect
# 5
puts last
```

## ما هو nil؟

`nil` هو كائن خاص في روبي يمثل "لا شيء" أو "غياب القيمة":

```ruby
empty_variable = nil

# (لا يطبع شيئاً)
puts empty_variable
# true
puts empty_variable.nil?
# NilClass
puts empty_variable.class
```

### متى نواجه nil؟

```ruby
# 1. متغير غير معيّن في التعيين المتعدد
a, b, c = 1, 2
# true
puts c.nil?

# 2. الوصول لعنصر غير موجود في مصفوفة
arr = [1, 2, 3]
# true
puts arr[10].nil?

# 3. الوصول لمفتاح غير موجود في قاموس
hash = {name: "أحمد"}
# true
puts hash[:age].nil?

# 4. دالة لا تُرجع قيمة صريحة
def say_hello
  puts "مرحباً"
  # لا يوجد return
end
result = say_hello
# true
puts result.nil?
```

## مشكلة nil

محاولة استدعاء دالة على `nil` تسبب خطأ:

```ruby
name = nil

# هذا سيسبب خطأ!
# puts name.length  # NoMethodError: undefined method `length' for nil

# هذا أيضاً سيسبب خطأ!
# puts name.upcase  # NoMethodError
```

## عامل الملاحة الآمنة (&.)

عامل الملاحة الآمنة (Safe Navigation Operator) يمنع أخطاء nil:

```ruby
name = nil

# بدون الملاحة الآمنة - خطأ!
# puts name.length

# مع الملاحة الآمنة - آمن!
# (لا يطبع شيئاً - يُرجع nil)
puts name&.length
```

### كيف يعمل &.؟

- إذا كان الكائن `nil`، يُرجع `nil` مباشرة بدون استدعاء الدالة
- إذا كان الكائن موجوداً، يستدعي الدالة بشكل طبيعي

```ruby
name = "أحمد"
# 4 (يعمل طبيعياً)
puts name&.length

name = nil
# (nil - بدون خطأ)
puts name&.length
```

### سلسلة الملاحة الآمنة

```ruby
user = nil

# سلسلة آمنة
puts user&.profile&.avatar&.url
# يُرجع nil بدون أي خطأ

# مقارنة مع الطريقة التقليدية
if user && user.profile && user.profile.avatar
  puts user.profile.avatar.url
end
```

## التحقق من nil

### باستخدام nil?

```ruby
value = nil

if value.nil?
  puts "القيمة فارغة"
else
  puts "القيمة: #{value}"
end
```

### باستخدام unless

```ruby
name = nil

unless name.nil?
  puts "مرحباً #{name}"
end
```

### القيم الافتراضية مع ||

```ruby
# إذا كانت القيمة nil أو false، استخدم القيمة الافتراضية
name = nil
display_name = name || "زائر"
# زائر
puts display_name

name = "أحمد"
display_name = name || "زائر"
# أحمد
puts display_name
```

### القيم الافتراضية مع ||=

```ruby
# تعيين قيمة فقط إذا كان المتغير nil أو false
username = nil
username ||= "مجهول"
# مجهول
puts username

# لن يتغير لأنه لم يعد nil
username ||= "أحمد"
# مجهول
puts username
```

## جدول ملخص

| التقنية | الوصف | مثال |
|---------|-------|------|
| `a, b = 1, 2` | تعيين متعدد | تعيين عدة قيم في سطر واحد |
| `a, b = b, a` | تبادل القيم | تبديل قيمتي متغيرين |
| `first, *rest = arr` | تفكيك مع splat | فصل العنصر الأول عن الباقي |
| `&.` | ملاحة آمنة | تجنب أخطاء nil |
| `value \|\| default` | قيمة افتراضية | استخدام بديل إذا كانت القيمة nil |
| `var \|\|= value` | تعيين شرطي | تعيين فقط إذا كانت القيمة nil |

## أمثلة عملية

### مثال 1: معالجة بيانات مستخدم

```ruby
# بيانات من قاعدة بيانات (قد تكون بعض القيم nil)
user_data = ["سارة", nil, "الرياض"]

name, age, city = user_data

# استخدام القيم الافتراضية
display_age = age || "غير محدد"
display_city = city || "غير محدد"

puts "الاسم: #{name}"
puts "العمر: #{display_age}"
puts "المدينة: #{display_city}"
```

### مثال 2: تبادل ترتيب عناصر

```ruby
# ترتيب الأرقام (الأصغر أولاً)
a = 50
b = 30

if a > b
  # تبادل إذا كان a أكبر
  a, b = b, a
end

# 30 < 50
puts "#{a} < #{b}"
```

### مثال 3: استخراج أول وآخر عنصر

```ruby
colors = ["أحمر", "أخضر", "أزرق", "أصفر", "بنفسجي"]

first, *middle, last = colors

# أحمر
puts "اللون الأول: #{first}"
# بنفسجي
puts "اللون الأخير: #{last}"
# أخضر, أزرق, أصفر
puts "الألوان الوسطى: #{middle.join(', ')}"
```

### مثال 4: معالجة إدخال آمنة

```ruby
def get_user_info(data)
  name = data&.fetch(:name, nil)
  email = data&.fetch(:email, nil)

  display_name = name || "مستخدم مجهول"
  display_email = email || "لا يوجد بريد"

  puts "الاسم: #{display_name}"
  puts "البريد: #{display_email}"
end

# اختبار مع بيانات كاملة
get_user_info({name: "محمد", email: "m@example.com"})

puts "---"

# اختبار مع بيانات ناقصة
get_user_info({name: "علي"})

puts "---"

# اختبار مع nil
get_user_info(nil)
```

## نصائح مهمة

1. **استخدم التعيين المتعدد** لجعل الشيفرة أكثر وضوحاً ومختصراً
2. **استخدم تبادل القيم** بدلاً من المتغيرات المؤقتة
3. **استخدم &.** عند التعامل مع قيم قد تكون nil
4. **استخدم ||** لتوفير قيم افتراضية
5. **تحقق من nil** قبل استخدام القيم في العمليات الحساسة
6. **لا تفرط في استخدام &.** - أحياناً يكون الخطأ مفيداً لاكتشاف المشاكل

---

## التمرين

اكتب برنامجاً يقوم بـ:
1. تعريف متغيرين x = 5 و y = 10 باستخدام التعيين المتعدد
2. طباعة قيمتيهما الأصليتين
3. تبادل قيمتيهما
4. طباعة قيمتيهما بعد التبادل
5. تعريف متغير name يساوي nil
6. استخدام &. لطباعة طول الاسم بشكل آمن (سيطبع سطراً فارغاً)
7. استخدام || لطباعة قيمة افتراضية "مجهول" بدلاً من nil

الناتج المتوقع:
```
قبل التبادل:
x = 5
y = 10
بعد التبادل:
x = 10
y = 5

مجهول
```
