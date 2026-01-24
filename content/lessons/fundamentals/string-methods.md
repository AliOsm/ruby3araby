# التعامل مع النصوص: الدوال الشائعة

في هذا الدرس، سنتعلم كيفية التعامل مع النصوص (Strings) باستخدام الدوال المدمجة في روبي. هذه الدوال تسهل عليك تحويل النصوص، البحث فيها، وتقسيمها.

## تحويل حالة الأحرف

### `upcase` - تحويل إلى أحرف كبيرة

```ruby
name = "ruby"
puts name.upcase  # RUBY
```

### `downcase` - تحويل إلى أحرف صغيرة

```ruby
title = "PROGRAMMING"
puts title.downcase  # programming
```

### `capitalize` - تكبير الحرف الأول فقط

```ruby
word = "hello"
puts word.capitalize  # Hello

sentence = "HELLO WORLD"
puts sentence.capitalize  # Hello world
```

لاحظ أن `capitalize` تحول الحرف الأول إلى كبير وباقي الأحرف إلى صغيرة.

### `swapcase` - عكس حالة الأحرف

```ruby
text = "Hello World"
puts text.swapcase  # hELLO wORLD
```

## معلومات عن النص

### `length` و `size` - طول النص

```ruby
greeting = "مرحبا"
puts greeting.length  # 5

message = "Hello, World!"
puts message.size  # 13 (size و length متطابقان)
```

### `empty?` - هل النص فارغ؟

```ruby
text1 = ""
text2 = "مرحبا"

puts text1.empty?  # true
puts text2.empty?  # false
```

### `include?` - هل يحتوي على نص معين؟

```ruby
sentence = "أنا أحب البرمجة بلغة روبي"

puts sentence.include?("روبي")     # true
puts sentence.include?("بايثون")   # false
```

## تنظيف النصوص

### `strip` - إزالة المسافات من الطرفين

```ruby
text = "   مرحبا بالعالم   "
puts text.strip  # "مرحبا بالعالم"
```

### `lstrip` و `rstrip` - إزالة المسافات من جانب واحد

```ruby
text = "   مرحبا   "
puts text.lstrip  # "مرحبا   " (إزالة من اليسار)
puts text.rstrip  # "   مرحبا" (إزالة من اليمين)
```

### `chomp` - إزالة سطر جديد من النهاية

```ruby
line = "مرحبا\n"
puts line.chomp  # "مرحبا"
```

هذه الدالة مفيدة جداً عند قراءة إدخال المستخدم بـ `gets`.

## عكس وتكرار النصوص

### `reverse` - عكس النص

```ruby
word = "Ruby"
puts word.reverse  # ybuR
```

### `*` - تكرار النص

```ruby
pattern = "=-"
puts pattern * 5  # =-=-=-=-=-=-=-
```

## تقسيم ودمج النصوص

### `split` - تقسيم النص إلى مصفوفة

```ruby
sentence = "أحمد ومحمد وفاطمة"
names = sentence.split(" و")
puts names.inspect  # ["أحمد", "محمد", "فاطمة"]

# التقسيم بفاصلة
data = "تفاح,برتقال,موز"
fruits = data.split(",")
puts fruits.inspect  # ["تفاح", "برتقال", "موز"]

# التقسيم بمسافة (الافتراضي)
words = "hello world ruby".split
puts words.inspect  # ["hello", "world", "ruby"]
```

### `join` - دمج مصفوفة إلى نص

```ruby
colors = ["أحمر", "أخضر", "أزرق"]

puts colors.join        # أحمرأخضرأزرق
puts colors.join(", ")  # أحمر, أخضر, أزرق
puts colors.join(" و ") # أحمر و أخضر و أزرق
```

## البحث والاستبدال

### `gsub` - استبدال كل التطابقات

```ruby
text = "أنا أحب القهوة، القهوة لذيذة"
new_text = text.gsub("القهوة", "الشاي")
puts new_text  # أنا أحب الشاي، الشاي لذيذة
```

### `sub` - استبدال أول تطابق فقط

```ruby
text = "أنا أحب القهوة، القهوة لذيذة"
new_text = text.sub("القهوة", "الشاي")
puts new_text  # أنا أحب الشاي، القهوة لذيذة
```

### `delete` - حذف أحرف معينة

```ruby
phone = "123-456-7890"
clean = phone.delete("-")
puts clean  # 1234567890
```

## الوصول لأجزاء من النص

### باستخدام الفهرس (index)

```ruby
word = "Ruby"

puts word[0]     # R (الحرف الأول)
puts word[1]     # u (الحرف الثاني)
puts word[-1]    # y (الحرف الأخير)
puts word[-2]    # b (الحرف قبل الأخير)
```

### باستخدام النطاق (range)

```ruby
text = "Hello, World!"

puts text[0..4]   # Hello (من 0 إلى 4 شاملة)
puts text[0...4]  # Hell (من 0 إلى 4 غير شاملة)
puts text[7..-1]  # World! (من 7 إلى النهاية)
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
puts result  # Hello world
```

هذا يسمى "سلسلة الدوال" ويجعل الشيفرة أكثر قابلية للقراءة.

## أمثلة عملية

### تنظيف إدخال المستخدم

```ruby
input = "   Ahmed@Email.COM   "
clean_email = input.strip.downcase
puts clean_email  # ahmed@email.com
```

### تحويل اسم ملف

```ruby
filename = "MY DOCUMENT.TXT"
safe_name = filename.downcase.gsub(" ", "_")
puts safe_name  # my_document.txt
```

### استخراج الكلمات الفريدة

```ruby
sentence = "ruby is fun and ruby is easy"
words = sentence.split(" ")
puts words.length  # 7
```

## ملاحظة مهمة

الدوال التي تعلمناها لا تغير النص الأصلي، بل تُرجع نصاً جديداً:

```ruby
name = "ahmed"
name.upcase
puts name  # ahmed (لم يتغير!)

# لتغيير المتغير، احفظ النتيجة:
name = name.upcase
puts name  # AHMED
```

في الدرس القادم، سنتعلم عن الدوال التي تنتهي بـ `!` والتي تغير النص الأصلي مباشرة.

---

## التمرين

الآن حان دورك! استخدم دوال النصوص لتحويل البيانات التالية:

1. حوّل الاسم إلى أحرف كبيرة
2. أزل المسافات الزائدة من البريد الإلكتروني وحوّله لأحرف صغيرة
3. استبدل الشرطات بمسافات في العنوان
4. اعرض طول الاسم
