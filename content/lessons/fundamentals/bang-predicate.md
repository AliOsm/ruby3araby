# الدوال المنتهية بـ ! و ?

في روبي، هناك اصطلاحات تسمية خاصة للدوال تجعل الشيفرة أكثر وضوحاً. في هذا الدرس، سنتعلم عن نوعين مهمين من الدوال: دوال البانج (!) ودوال الاستعلام (?).

## دوال البانج (Bang Methods) - الدوال المنتهية بـ !

الدوال التي تنتهي بعلامة التعجب `!` تُعدّل القيمة الأصلية مباشرة، بدلاً من إرجاع نسخة جديدة.

### مقارنة بين upcase و upcase!

```ruby
# بدون علامة التعجب - لا تغير الأصل
name = "ahmed"
result = name.upcase
# AHMED
puts result
# ahmed (لم يتغير!)
puts name

# مع علامة التعجب - تغير الأصل
name = "ahmed"
name.upcase!
# AHMED (تغير!)
puts name
```

### أمثلة على دوال البانج

```ruby
text = "Hello World"

# downcase!
text.downcase!
# hello world
puts text

# capitalize!
text.capitalize!
# Hello world
puts text

# reverse!
text.reverse!
# dlrow olleH
puts text

# strip!
message = "   مرحباً   "
message.strip!
# مرحباً
puts message

# gsub!
sentence = "أنا أحب القهوة"
sentence.gsub!("القهوة", "الشاي")
# أنا أحب الشاي
puts sentence
```

### متى تستخدم دوال البانج؟

استخدم دوال البانج عندما:
- تريد توفير الذاكرة (لا تحتاج نسختين من النص)
- لا تحتاج القيمة الأصلية
- تريد تعديل البيانات في مكانها

```ruby
# مثال: تنظيف قائمة من الأسماء
names = ["  أحمد  ", "  محمد  ", "  فاطمة  "]

names.each do |name|
  name.strip!
end

# ["أحمد", "محمد", "فاطمة"]
puts names.inspect
```

### تحذير مهم!

دوال البانج قد تُرجع `nil` إذا لم يحدث أي تغيير:

```ruby
text = "HELLO"
# لا يوجد تغيير لأن النص بالفعل كبير
result = text.upcase!
# nil
puts result.inspect

text = "hello"
# حدث تغيير
result = text.upcase!
# HELLO
puts result
```

لهذا السبب، لا تستخدم نتيجة دالة البانج في سلسلة دوال:

```ruby
# خطأ شائع - قد يسبب مشكلة!
text = "HELLO"
# text.upcase!.reverse!  # Error! لأن upcase! ترجع nil

# الطريقة الصحيحة
text.upcase!
text.reverse!
```

## دوال الاستعلام (Predicate Methods) - الدوال المنتهية بـ ?

الدوال التي تنتهي بعلامة استفهام `?` تُرجع دائماً قيمة منطقية (`true` أو `false`).

### أمثلة على دوال الاستعلام للنصوص

```ruby
text = "Hello World"

# empty? - هل النص فارغ؟
# true
puts "".empty?
# false
puts text.empty?

# include? - هل يحتوي على نص معين؟
# true
puts text.include?("World")
# false
puts text.include?("Ruby")

# start_with? - هل يبدأ بنص معين؟
# true
puts text.start_with?("Hello")
# false
puts text.start_with?("World")

# end_with? - هل ينتهي بنص معين؟
# true
puts text.end_with?("World")
# false
puts text.end_with?("Hello")
```

### أمثلة على دوال الاستعلام للأرقام

```ruby
num = 42

# even? - هل العدد زوجي؟
# true
puts num.even?
# false
puts 7.even?

# odd? - هل العدد فردي؟
# false
puts num.odd?
# true
puts 7.odd?

# zero? - هل العدد صفر؟
# true
puts 0.zero?
# false
puts num.zero?

# positive? - هل العدد موجب؟
# true
puts num.positive?
# false
puts (-5).positive?

# negative? - هل العدد سالب؟
# true
puts (-5).negative?
# false
puts num.negative?

# between? - هل العدد بين قيمتين؟
# true
puts num.between?(1, 50)
# false
puts num.between?(50, 100)
```

### أمثلة على دوال الاستعلام للمصفوفات

```ruby
fruits = ["تفاح", "برتقال", "موز"]

# empty? - هل المصفوفة فارغة؟
# true
puts [].empty?
# false
puts fruits.empty?

# include? - هل تحتوي على عنصر؟
# true
puts fruits.include?("تفاح")
# false
puts fruits.include?("عنب")

# any? - هل تحتوي على أي عناصر؟
# true
puts fruits.any?
# false
puts [].any?
```

### أمثلة على دوال الاستعلام للقيم

```ruby
# nil? - هل القيمة nil؟
value = nil
# true
puts value.nil?
# false
puts "hello".nil?

# is_a? - هل من نوع معين؟
# true
puts "hello".is_a?(String)
# false
puts "hello".is_a?(Integer)
# true
puts 42.is_a?(Integer)
# true
puts 42.is_a?(Numeric)

# respond_to? - هل يستجيب لدالة؟
# true
puts "hello".respond_to?(:upcase)
# false
puts "hello".respond_to?(:sort)
# true
puts [1,2,3].respond_to?(:sort)
```

## استخدام دوال الاستعلام مع الشروط

دوال الاستعلام مثالية للاستخدام مع `if`:

```ruby
name = "أحمد"

if name.empty?
  puts "الرجاء إدخال اسمك"
else
  puts "مرحباً #{name}!"
end
# مرحباً أحمد!

# التحقق من صحة البريد الإلكتروني البسيط
email = "ahmed@example.com"

if email.include?("@") && email.include?(".")
  puts "البريد الإلكتروني يبدو صحيحاً"
else
  puts "البريد الإلكتروني غير صحيح"
end
# البريد الإلكتروني يبدو صحيحاً
```

## جدول ملخص

### دوال البانج (!)

| الدالة | الوصف | مثال |
|--------|-------|------|
| `upcase!` | تحويل لأحرف كبيرة (تعديل) | `s.upcase!` |
| `downcase!` | تحويل لأحرف صغيرة (تعديل) | `s.downcase!` |
| `capitalize!` | تكبير الحرف الأول (تعديل) | `s.capitalize!` |
| `reverse!` | عكس النص (تعديل) | `s.reverse!` |
| `strip!` | إزالة المسافات (تعديل) | `s.strip!` |
| `gsub!` | استبدال (تعديل) | `s.gsub!("a","b")` |
| `chomp!` | إزالة سطر جديد (تعديل) | `s.chomp!` |

### دوال الاستعلام (?)

| الدالة | الوصف | مثال |
|--------|-------|------|
| `empty?` | هل فارغ؟ | `"".empty?` → `true` |
| `nil?` | هل nil؟ | `nil.nil?` → `true` |
| `include?` | هل يحتوي؟ | `"hi".include?("h")` → `true` |
| `start_with?` | هل يبدأ بـ؟ | `"hi".start_with?("h")` → `true` |
| `end_with?` | هل ينتهي بـ؟ | `"hi".end_with?("i")` → `true` |
| `even?` | هل زوجي؟ | `4.even?` → `true` |
| `odd?` | هل فردي؟ | `3.odd?` → `true` |
| `is_a?` | هل من نوع؟ | `"hi".is_a?(String)` → `true` |

## نصائح مهمة

1. **دوال البانج (!)**: تعدّل القيمة الأصلية مباشرة
2. **دوال الاستعلام (?)**: تُرجع دائماً `true` أو `false`
3. **لا تستخدم نتيجة دالة البانج** في سلسلة دوال لأنها قد ترجع `nil`
4. **استخدم دوال الاستعلام** مع `if` و `unless` لكتابة شيفرة واضحة

## مثال عملي: تنظيف والتحقق من البيانات

```ruby
# تنظيف اسم المستخدم
username = "  Ahmed123  "
username.strip!
username.downcase!
# ahmed123
puts username

# التحقق من صحة البيانات
if username.empty?
  puts "اسم المستخدم فارغ!"
elsif username.length < 3
  puts "اسم المستخدم قصير جداً!"
elsif username.include?(" ")
  puts "اسم المستخدم لا يجب أن يحتوي مسافات!"
else
  puts "اسم المستخدم صالح: #{username}"
end
# اسم المستخدم صالح: ahmed123
```

---

## التمرين

الآن حان دورك! استخدم دوال البانج والاستعلام لإكمال المهام التالية:

1. استخدم `upcase!` لتحويل المتغير `text` إلى أحرف كبيرة
2. استخدم `empty?` للتحقق من النص الفارغ
3. استخدم `even?` للتحقق من أن العدد زوجي
4. استخدم `include?` للتحقق من وجود كلمة في الجملة

الناتج المتوقع:
```
HELLO WORLD
true
true
true
```
