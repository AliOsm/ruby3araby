# الدوال المنتهية بـ ! و ?

في روبي، هناك اصطلاحات تسمية خاصة للدوال تجعل الشيفرة أكثر وضوحاً. في هذا الدرس، سنتعلم عن نوعين مهمين من الدوال: دوال البانج (!) ودوال الاستعلام (?).

## دوال البانج (Bang Methods) - الدوال المنتهية بـ !

الدوال التي تنتهي بعلامة التعجب `!` تُعدّل القيمة الأصلية مباشرة، بدلاً من إرجاع نسخة جديدة.

### مقارنة بين upcase و upcase!

```ruby
# بدون علامة التعجب - لا تغير الأصل
name = "ahmed"
result = name.upcase
puts result  # AHMED
puts name    # ahmed (لم يتغير!)

# مع علامة التعجب - تغير الأصل
name = "ahmed"
name.upcase!
puts name    # AHMED (تغير!)
```

### أمثلة على دوال البانج

```ruby
text = "Hello World"

# downcase!
text.downcase!
puts text  # hello world

# capitalize!
text.capitalize!
puts text  # Hello world

# reverse!
text.reverse!
puts text  # dlrow olleH

# strip!
message = "   مرحبا   "
message.strip!
puts message  # مرحبا

# gsub!
sentence = "أنا أحب القهوة"
sentence.gsub!("القهوة", "الشاي")
puts sentence  # أنا أحب الشاي
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

puts names.inspect  # ["أحمد", "محمد", "فاطمة"]
```

### تحذير مهم!

دوال البانج قد تُرجع `nil` إذا لم يحدث أي تغيير:

```ruby
text = "HELLO"
result = text.upcase!  # لا يوجد تغيير لأن النص بالفعل كبير
puts result.inspect    # nil

text = "hello"
result = text.upcase!  # حدث تغيير
puts result            # HELLO
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
puts "".empty?      # true
puts text.empty?    # false

# include? - هل يحتوي على نص معين؟
puts text.include?("World")  # true
puts text.include?("Ruby")   # false

# start_with? - هل يبدأ بنص معين؟
puts text.start_with?("Hello")  # true
puts text.start_with?("World")  # false

# end_with? - هل ينتهي بنص معين؟
puts text.end_with?("World")  # true
puts text.end_with?("Hello")  # false
```

### أمثلة على دوال الاستعلام للأرقام

```ruby
num = 42

# even? - هل العدد زوجي؟
puts num.even?  # true
puts 7.even?    # false

# odd? - هل العدد فردي؟
puts num.odd?   # false
puts 7.odd?     # true

# zero? - هل العدد صفر؟
puts 0.zero?    # true
puts num.zero?  # false

# positive? - هل العدد موجب؟
puts num.positive?   # true
puts (-5).positive?  # false

# negative? - هل العدد سالب؟
puts (-5).negative?  # true
puts num.negative?   # false

# between? - هل العدد بين قيمتين؟
puts num.between?(1, 50)   # true
puts num.between?(50, 100) # false
```

### أمثلة على دوال الاستعلام للمصفوفات

```ruby
fruits = ["تفاح", "برتقال", "موز"]

# empty? - هل المصفوفة فارغة؟
puts [].empty?      # true
puts fruits.empty?  # false

# include? - هل تحتوي على عنصر؟
puts fruits.include?("تفاح")  # true
puts fruits.include?("عنب")   # false

# any? - هل تحتوي على أي عناصر؟
puts fruits.any?  # true
puts [].any?      # false
```

### أمثلة على دوال الاستعلام للقيم

```ruby
# nil? - هل القيمة nil؟
value = nil
puts value.nil?    # true
puts "hello".nil?  # false

# is_a? - هل من نوع معين؟
puts "hello".is_a?(String)   # true
puts "hello".is_a?(Integer)  # false
puts 42.is_a?(Integer)       # true
puts 42.is_a?(Numeric)       # true

# respond_to? - هل يستجيب لدالة؟
puts "hello".respond_to?(:upcase)  # true
puts "hello".respond_to?(:sort)    # false
puts [1,2,3].respond_to?(:sort)    # true
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
puts username  # ahmed123

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
