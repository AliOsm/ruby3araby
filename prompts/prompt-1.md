Load the prd skill and create a PRD for the following project:

# Ruby3araby - an Arabic language interactive course for beginners to learn Ruby

Create an interactive website that teaches beginners how to program in Ruby.

The website should show:
1. The content in Arabic language, 
2. The code examples in Ruby programming language, 
3. The interactive editor to write and run the code, 
4. The output of the code, 
5. The explanation of the code, 
6. The exercises to practice the learned concepts.

The code should run in the browser using either Opal or wasm.ruby.

For Arabic translation refrences use this website: https://wiki.hsoub.com.
It has a specific section for Ruby: https://wiki.hsoub.com/Ruby, but other sections are also helpful to translate the content in a meaningful way.

# The Content

## Getting Started

### What is Ruby and why learn it
An introduction to the Ruby programming language, its history, philosophy of developer happiness, and common use cases like web development with Rails, scripting, and automation.

### Running your first Ruby program (Hello World)
Write and execute your first Ruby code using the interactive editor. Learn how Ruby reads and runs your instructions from top to bottom.

### Using comments
Learn how to add notes to your code using single-line (#) and multi-line comments. Comments help explain what your code does without affecting how it runs.

### puts vs print vs p
Understand the three main ways to display output in Ruby. `puts` adds a new line, `print` keeps output on the same line, and `p` shows the raw data type for debugging.

---

## Fundamentals

### Variables and data types
Learn how to store information using variables and understand Ruby's basic data types: strings (text), integers (whole numbers), floats (decimals), booleans (true/false), and nil (nothing).

### Constants
Store values that should never change using constants. Constants start with a capital letter and Ruby will warn you if you try to modify them.

### Symbols
Understand symbols, which are lightweight identifiers that start with a colon (:name). Symbols are memory-efficient and commonly used as hash keys.

### Basic operators
Use arithmetic operators (+, -, *, /, %, **) for math, comparison operators (==, !=, <, >, <=, >=) to compare values, and logical operators (&&, ||, !) to combine conditions.

### Boolean logic (and, or, not)
Combine multiple conditions using boolean operators to make complex decisions. Learn the difference between && and `and`, || and `or`.

### Truthiness and falsiness
Discover that in Ruby, only `nil` and `false` are considered false. Everything else, including 0 and empty strings, is treated as true.

### String manipulation and interpolation
Insert variables and expressions directly into strings using #{} syntax. Create dynamic text output without messy concatenation.

### String concatenation vs interpolation
Compare joining strings with the + operator versus using interpolation. Learn when each approach is appropriate and why interpolation is generally preferred.

### Common string methods
Practice with frequently used string methods: `upcase`, `downcase`, `capitalize`, `reverse`, `split`, `join`, `length`, `strip`, `include?`, and `gsub`.

### Bang methods (!) and predicate methods (?)
Understand Ruby's naming conventions. Methods ending with ! modify the original object, while methods ending with ? return true or false.

### Getting user input
Capture input from users using the `gets` method. Learn how `chomp` removes the extra newline character from user input.

> **Browser environment note:** The `gets` method waits for terminal input, which does not work in browser-based editors. This lesson uses a simulated input field where you enter values before running the code. The editor injects your input when `gets` is called.

### Type conversion
Convert between data types using methods like `to_i` (to integer), `to_f` (to float), `to_s` (to string), and `to_a` (to array).

### Multiple assignment
Assign multiple variables in a single line. Learn how to swap values and unpack arrays into separate variables efficiently.

### Nil handling and safe navigation operator
Safely handle nil values to avoid errors. Use the safe navigation operator (&.) to call methods only when an object is not nil.

---

## Control Flow

### Conditionals (if, elsif, else, unless)
Make decisions in your code based on conditions. Execute different code blocks depending on whether conditions are true or false.

### Case/when statements
Handle multiple conditions cleanly using case/when instead of long if/elsif chains. Match values against patterns and execute corresponding code.

### Ternary operator
Write compact conditional expressions using the format: condition ? result_if_true : result_if_false. Useful for simple one-line decisions.

---

## Loops

### While and until loops
Repeat code while a condition is true (while) or until a condition becomes true (until). Learn to create loops that run an unknown number of times.

### For loops
Iterate through a range of numbers or a collection using for loops. Understand how Ruby's for loop differs from other languages.

### Loop control (break, next)
Control loop execution with `break` to exit a loop early and `next` to skip to the next iteration. Handle special cases within your loops.

---

## Collections

### Arrays (creating, accessing, modifying)
Store ordered lists of items in arrays. Access elements by index, add and remove items, and understand that Ruby arrays can hold mixed data types.

### Common array methods
Master essential array methods: `push`, `pop`, `shift`, `unshift`, `first`, `last`, `length`, `include?`, `sort`, `reverse`, `flatten`, and `uniq`.

### Hashes (symbols as keys)
Store data in key-value pairs using hashes. Learn why symbols are preferred as keys and how to access, add, and modify hash data.

### Ranges
Create sequences of values using ranges. Understand the difference between inclusive (..) and exclusive (...) ranges and their common uses.

### Common enumerable methods (each, map, select, find)
Process collections efficiently using Ruby's powerful enumerable methods. Transform, filter, and search through arrays and hashes with clean, readable code.

---

## Methods

### Defining and calling methods
Create reusable blocks of code with methods. Understand Ruby's method naming conventions and how to organize code into logical units.

### Parameters and arguments
Pass data into methods using parameters. Learn the difference between parameters (in the definition) and arguments (when calling).

### Default arguments
Set fallback values for parameters when no argument is provided. Make your methods more flexible and easier to use.

### Splat operators (* and **)
Accept a variable number of arguments using splat (*) for arrays and double splat (**) for hashes. Build flexible methods that handle any number of inputs.

### Return values
Understand that every Ruby method returns a value. Learn about implicit returns (last evaluated expression) and explicit returns using the `return` keyword.

---

## Blocks, Procs, and Lambdas

### Block syntax (do...end and curly braces)
Write blocks of code that can be passed to methods. Use do...end for multi-line blocks and curly braces {} for single-line blocks.

### Using blocks with iterators
Combine blocks with methods like `each`, `map`, and `select` to process collections. Understand how blocks receive values and return results.

### Yield
Create methods that accept blocks using the `yield` keyword. Build flexible methods that let callers customize behavior.

### Procs and how to use them
Store blocks as objects using Proc. Save blocks in variables, pass them to multiple methods, and call them whenever needed.

### Lambdas and differences from procs
Create stricter block objects using lambdas. Understand the key differences: lambdas check argument count and handle return statements differently.

---

## Object-Oriented Programming

### Classes and objects
Design blueprints (classes) for creating objects. Understand how objects combine data and behavior into reusable, organized structures.

### Instance variables and methods
Store object-specific data in instance variables (@variable) and define behaviors using instance methods. Each object maintains its own state.

### Accessors (attr_reader, attr_writer, attr_accessor)
Create getter and setter methods automatically using Ruby's accessor shortcuts. Control how outside code reads and modifies object data.

### Initialize method
Set up new objects using the initialize method. Define what data an object needs when it is created and set default values.

### Inheritance basics
Create new classes based on existing ones using inheritance. Share common behavior and override methods to customize child class behavior.

---

## Modules

### Creating modules
Group related methods and constants into modules. Organize code that does not fit into a class hierarchy.

### Namespacing
Prevent naming conflicts by wrapping classes and methods inside modules. Keep code organized in larger projects.

### Mixins (include and extend)
Share functionality across unrelated classes using mixins. Use `include` for instance methods and `extend` for class methods.

---

## Error Handling

### Begin, rescue, raise basics
Handle errors gracefully using begin/rescue blocks. Catch specific errors, provide fallback behavior, and raise custom errors when needed.

---

## Mini Challenges

### FizzBuzz
Classic programming challenge that tests conditionals and loops. Print numbers 1-100, but replace multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz".

### Simple calculator
Build an interactive calculator that performs basic math operations. Practice methods, conditionals, and type conversion.

> **Browser environment note:** Instead of using `gets` for user input, this exercise uses predefined variables or the simulated input field. Enter your numbers and operation before running the code.

### Number guessing game
Create a game where the computer picks a random number and the player tries to guess it. Practice loops, conditionals, and providing feedback.

> **Browser environment note:** This exercise uses the simulated input field for guesses. Enter your guess before each run, or the exercise is modified to accept multiple guesses through predefined values in an array.
