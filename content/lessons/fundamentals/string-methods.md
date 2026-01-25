# التعامل مع النصوص: الدوال الشائعة

في هذا الدرس، سنتعلم كيفية التعامل مع النصوص (Strings) باستخدام الدوال المدمجة في روبي. هذه الدوال تسهل عليك تحويل النصوص، البحث فيها، وتقسيمها.

## تحويل حالة الأحرف

### `upcase` - تحويل إلى أحرف كبيرة

```ruby
name = "ruby"
# RUBY
puts name.upcase
```

### `downcase` - تحويل إلى أحرف صغيرة

```ruby
title = "PROGRAMMING"
# programming
puts title.downcase
```

### `capitalize` - تكبير الحرف الأول فقط

```ruby
word = "hello"
# Hello
puts word.capitalize

sentence = "HELLO WORLD"
# Hello world
puts sentence.capitalize
```

لاحظ أن `capitalize` تحول الحرف الأول إلى كبير وباقي الأحرف إلى صغيرة.

### `swapcase` - عكس حالة الأحرف

```ruby
text = "Hello World"
# hELLO wORLD
puts text.swapcase
```

## معلومات عن النص

### `length` و `size` - طول النص

```ruby
greeting = "مرحبا"
# 5
puts greeting.length

message = "Hello, World!"
# 13 (size و length متطابقان)
puts message.size
```

### `empty?` - هل النص فارغ؟

```ruby
text1 = ""
text2 = "مرحبا"

# true
puts text1.empty?
# false
puts text2.empty?
```

### `include?` - هل يحتوي على نص معين؟

```ruby
sentence = "أنا أحب البرمجة بلغة روبي"

# true
puts sentence.include?("روبي")
# false
puts sentence.include?("بايثون")
```

## تنظيف النصوص

### `strip` - إزالة المسافات من الطرفين

```ruby
text = "   مرحبا بالعالم   "
# "مرحبا بالعالم"
puts text.strip
```

### `lstrip` و `rstrip` - إزالة المسافات من جانب واحد

```ruby
text = "   مرحبا   "
# "مرحبا   " (إزالة من اليسار)
puts text.lstrip
# "   مرحبا" (إزالة من اليمين)
puts text.rstrip
```

### `chomp` - إزالة سطر جديد من النهاية

```ruby
line = "مرحبا\n"
# "مرحبا"
puts line.chomp
```

هذه الدالة مفيدة جداً عند قراءة إدخال المستخدم بـ `gets`.

## عكس وتكرار النصوص

### `reverse` - عكس النص

```ruby
word = "Ruby"
# ybuR
puts word.reverse
```

### `*` - تكرار النص

```ruby
pattern = "=-"
# =-=-=-=-=-=-=-
puts pattern * 5
```

## تقسيم ودمج النصوص

### `split` - تقسيم النص إلى مصفوفة

```ruby
sentence = "أحمد ومحمد وفاطمة"
names = sentence.split(" و")
# ["أحمد", "محمد", "فاطمة"]
puts names.inspect

# التقسيم بفاصلة
data = "تفاح,برتقال,موز"
fruits = data.split(",")
# ["تفاح", "برتقال", "موز"]
puts fruits.inspect

# التقسيم بمسافة (الافتراضي)
words = "hello world ruby".split
# ["hello", "world", "ruby"]
puts words.inspect
```

### `join` - دمج مصفوفة إلى نص

```ruby
colors = ["أحمر", "أخضر", "أزرق"]

# أحمرأخضرأزرق
puts colors.join
# أحمر, أخضر, أزرق
puts colors.join(", ")
# أحمر و أخضر و أزرق
puts colors.join(" و ")
```

## البحث والاستبدال

### `gsub` - استبدال كل التطابقات

```ruby
text = "أنا أحب القهوة، القهوة لذيذة"
new_text = text.gsub("القهوة", "الشاي")
# أنا أحب الشاي، الشاي لذيذة
puts new_text
```

### `sub` - استبدال أول تطابق فقط

```ruby
text = "أنا أحب القهوة، القهوة لذيذة"
new_text = text.sub("القهوة", "الشاي")
# أنا أحب الشاي، القهوة لذيذة
puts new_text
```

### `delete` - حذف أحرف معينة

```ruby
phone = "123-456-7890"
clean = phone.delete("-")
# 1234567890
puts clean
```

## الوصول لأجزاء من النص

### باستخدام الفهرس (index)

```ruby
word = "Ruby"

# R (الحرف الأول)
puts word[0]
# u (الحرف الثاني)
puts word[1]
# y (الحرف الأخير)
puts word[-1]
# b (الحرف قبل الأخير)
puts word[-2]
```

### باستخدام النطاق (range)

```ruby
text = "Hello, World!"

# Hello (من 0 إلى 4 شاملة)
puts text[0..4]
# Hell (من 0 إلى 4 غير شاملة)
puts text[0...4]
# World! (من 7 إلى النهاية)
puts text[7..-1]
```

## جدول ملخص الدوال

| الدالة | الوصف | مثال |
|--------|-------|------|
| `upcase` | تحويل لأحرف كبيرة | `"hi".upcase` → `"HI"` |
| `downcase` | تحويل لأحرف صغيرة | `"HI".downcase` → `"hi"` |
| `capitalize` | تكبير الحرف الأول | `"hi".capitalize` → `"Hi"` |
| `reverse` | عكس النص | `"hi".reverse` → `"ih"` |
| `length` | طول النص | `"hi".length` → `2` |
| `strip` | إزالة المسافات | `" hi ".strip` → `"hi"` |
| `split` | تقسيم لمصفوفة | `"a,b".split(",")` → `["a","b"]` |
| `join` | دمج مصفوفة | `["a","b"].join("-")` → `"a-b"` |
| `include?` | البحث عن نص | `"hi".include?("h")` → `true` |
| `gsub` | استبدال الكل | `"aa".gsub("a","b")` → `"bb"` |

## سلسلة الدوال (Method Chaining)

يمكنك استدعاء عدة دوال متتالية على نفس النص:

```ruby
text = "   HELLO world   "

result = text.strip.downcase.capitalize
# Hello world
puts result
```

هذا يسمى "سلسلة الدوال" ويجعل الشيفرة أكثر قابلية للقراءة.

## أمثلة عملية

### تنظيف إدخال المستخدم

```ruby
input = "   Ahmed@Email.COM   "
clean_email = input.strip.downcase
# ahmed@email.com
puts clean_email
```

### تحويل اسم ملف

```ruby
filename = "MY DOCUMENT.TXT"
safe_name = filename.downcase.gsub(" ", "_")
# my_document.txt
puts safe_name
```

### استخراج الكلمات الفريدة

```ruby
sentence = "ruby is fun and ruby is easy"
words = sentence.split(" ")
# 7
puts words.length
```

## ملاحظة مهمة

الدوال التي تعلمناها لا تغير النص الأصلي، بل تُرجع نصاً جديداً:

```ruby
name = "ahmed"
name.upcase
# ahmed (لم يتغير!)
puts name

# لتغيير المتغير، احفظ النتيجة:
name = name.upcase
# AHMED
puts name
```

في الدرس القادم، سنتعلم عن الدوال التي تنتهي بـ `!` والتي تغير النص الأصلي مباشرة.

---

## التمرين

الآن حان دورك! استخدم دوال النصوص لتحويل البيانات التالية:

1. حوّل الاسم إلى أحرف كبيرة
2. أزل المسافات الزائدة من البريد الإلكتروني وحوّله لأحرف صغيرة
3. استبدل الشرطات بمسافات في العنوان
4. اعرض طول الاسم

الناتج المتوقع:
```
RUBY PROGRAMMER
ahmed@email.com
Cairo Egypt Africa
21
```
