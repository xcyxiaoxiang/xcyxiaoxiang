---
title: "星期五 Python 数据类型"
date: 2025-05-15
---

# 星期五 Python 数据类型

Python 中有六个标准的数据类型：

- Number（数字）
- String（字符串）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）

Python3 的六个标准数据类型中：

- 不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
- 可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。

可变数据和不可变数据==是相对于引用地址来说的。==

不可变数据类型不允许变量的值发生变化，如果改变了的变量的值，相当于新建了一个对象，而对于相同的值的对象，内部会有一个引用计数来记录有多少个变量引用了这个对象。

可变数据类型允许变量的值发生变化。对变量进行修改操作只会改变变量的值，不会新建对象，变量引用的地址也不会发生变化，不过对于相同的值的不同对象，在内存中则会存在不同的对象，即每个对象都有自己的地址，相当于内存中对于同值的对象保存了多份，这里不存在引用计数，是实实在在的对象。

简单地讲，可变数据和不可变数据的“变”是相对于引用地址来说的，不是不能改变其数据，而是改变数据的时候会不会改变变量的引用地址。

## Python 数据类型 之 列表

### 1. 列表简介

在 Python 中，列表是由一系元素按特定顺序构成的数据序列，这就意味着如果我们定义一个列表类型的变量，可以用它来保存多个数据。Python 中的列表底层是一个可以动态扩容的数组，列表元素在计算机内存中是连续存储的，所以可以实现随机访问（通过一个有效的索引获取对应的元素且操作时间与列表元素个数无关）。在 python 中，可以使用[]字面量语法来定义列表，列表中的多个元素用逗号进行分隔，代码如下所示。除此以外，还可以通过 Python 内置的list函数将其他序列变成列表。

```
 items1 = [35, 12, 99, 68, 55, 35, 87]
 items2 = ['Python', 'Java', 'Go', 'Kotlin']
 items3 = [100, 12.3, 'Python', True]
 items4 = list(range(1, 10))
 items5 = list('hello')
 print(items1)  # [35, 12, 99, 68, 55, 35, 87]
 print(items2)  # ['Python', 'Java', 'Go', 'Kotlin']
 print(items3)  # [100, 12.3, 'Python', True]
 print(items4)  # [1, 2, 3, 4, 5, 6, 7, 8, 9
 print(items5)  # ['h', 'e', 'l', 'l', 'o']
```

```
 [35, 12, 99, 68, 55, 35, 87]
 ['Python', 'Java', 'Go', 'Kotlin']
 [100, 12.3, 'Python', True]
 [1, 2, 3, 4, 5, 6, 7, 8, 9]
 ['h', 'e', 'l', 'l', 'o']
```

在Python中，列表中可以有重复数据（如item1），且类型可以不同(如items3)。

### 2. 列表的运算之拼接列表

我们可以使用`+运算符`​或函数`list1.extend(list2)`实现两个列表的拼接，拼接运算会将两个列表中的元素连接起来放到一个列表中，代码如下所示。

```
 items5 = [35, 12, 99, 45, 66]
 items7 = ['Python', 'Java', 'JavaScript']
 print(items5 + items7)  # [35, 12, 99, 45, 66, 'Python', 'Java', 'JavaScript']
 items5.extend(items7)
 print(items5)           # [35, 12, 99, 45, 66, 'Python', 'Java', 'JavaScript']
 
```

```
 [35, 12, 99, 45, 66, 'Python', 'Java', 'JavaScript']
 [35, 12, 99, 45, 66, 'Python', 'Java', 'JavaScript']
```

### 3. 列表的运算之重复预算

我们可以使用`*`​运算符实现列表的重复运算，`*`运算符会将列表元素重复指定的次数，我们在上面的代码中增加两行，如下所示。

```
 items5 = [35, 12, 99, 45, 66]
 items7 = ['Python', 'Java', 'JavaScript']
 print(items5 * 3)  # [35, 12, 99, 45, 66, 35, 12, 99, 45, 66, 35, 12, 99, 45, 66]
 print(items7 * 2)  # ['Python', 'Java', 'JavaScript', 'Python', 'Java', 'JavaScript']
```

```
 [35, 12, 99, 45, 66, 35, 12, 99, 45, 66, 35, 12, 99, 45, 66]
 ['Python', 'Java', 'JavaScript', 'Python', 'Java', 'JavaScript']
```

### 4. 列表的运算之存在性判断

我们可以使用`in`​或`not in`运算符判断一个元素在不在列表中，我们在上面的代码代码中再增加两行，如下所示。

```
 items5 = [35, 12, 99, 45, 66]
 items7 = ['Python', 'Java', 'JavaScript']
 print(65 in items5)         # False
 print("GO" not in items7)   # True
```

```
 False
 True
```

### 5.列表的运算之元素的访问

由于列表中有多个元素，而且元素是按照特定顺序放在列表中的，所以当我们想操作列表中的某个元素时，可以使用[]运算符，通过在[]中指定元素的位置来访问该元素，这种运算称为索引运算。需要说明的是，[]的元素位置可以是0到N - 1的整数，也可以是-1到-N的整数，分别称为正向索引和反向索引，其中N代表列表元素的个数。对于正向索引，[0]可以访问列表中的第一个元素，[N - 1]可以访问最后一个元素；对于反向索引，[-1]可以访问列表中的最后一个元素，[-N]可以访问第一个元素，代码如下所示。

```
items8 = ['apple', 'waxberry', 'pitaya', 'peach', 'watermelon']
print(items8[0])   # apple
print(items8[2])   # pitaya
print(items8[4])   # watermelon
items8[2] = 'durian'
print(items8)      # ['apple', 'waxberry', 'durian', 'peach', 'watermelon']
print(items8[-5])  # 'apple'
print(items8[-4])  # 'waxberry'
print(items8[-1])  # watermelon
items8[-4] = 'strawberry'
print(items8)      # ['apple', 'strawberry', 'durian', 'peach', 'watermelon']
```

```
apple
pitaya
watermelon
['apple', 'waxberry', 'durian', 'peach', 'watermelon']
apple
waxberry
watermelon
['apple', 'strawberry', 'durian', 'peach', 'watermelon']
```

### 6. 列表的运算之列表切片

如果希望一次性访问列表中的多个元素，我们可以使用切片运算。切片运算是形如`[startstride]`​的运算符，其中`start`​代表访问列表元素的起始位置，`end`​代表访问列表元素的终止位置（终止位置的元素无法访问），而`stride`​则代表了跨度，简单的说就是位置的增量，比如我们访问的第一个元素在start位置，那么第二个元素就在`start + stride`​位置，当然`start + stride`​要小于`end`。我们给上面的代码增加下面的语句，来使用切片运算符访问列表元素。

```
items8 = ['apple', 'waxberry', 'pitaya', 'peach', 'watermelon']

print(items8[1:3:1])     # ['waxberry', 'pitaya']
print(items8[0:3:1])     # ['apple', 'waxberry', 'pitaya']
print(items8[0:5:2])     # ['apple', 'pitaya', 'watermelon']
print(items8[-4:-2:1])   # ['waxberry', 'pitaya']
print(items8[-2:-6:-1])  # ['peach', 'pitaya', 'waxberry', 'apple']
```

```
['waxberry', 'pitaya']
['apple', 'waxberry', 'pitaya']
['apple', 'pitaya', 'watermelon']
['waxberry', 'pitaya']
['peach', 'pitaya', 'waxberry', 'apple']
```

如果start值等于0，那么在使用切片运算符时可以将其省略；如果end值等于N，N代表列表元素的个数，那么在使用切片运算符时可以将其省略；如果stride值等于1，那么在使用切片运算符时也可以将其省略。所以，下面的代码跟上面的代码作用完全相同。

```
items8 = ['apple', 'waxberry', 'pitaya', 'peach', 'watermelon']
print(items8[1:3])     # ['waxberry', 'pitaya']
print(items8[:3:1])    # ['apple', 'waxberry', 'pitaya']
print(items8[::2])     # ['apple', 'pitaya', 'watermelon']
print(items8[-4:-2])   # ['waxberry', 'pitaya']
print(items8[-2::-1])  # ['peach', 'pitaya', 'waxberry', 'apple']
```

```
['waxberry', 'pitaya']
['apple', 'waxberry', 'pitaya']
['apple', 'pitaya', 'watermelon']
['waxberry', 'pitaya']
['peach', 'pitaya', 'waxberry', 'apple']
```

### 7. 列表的运算之遍历列表

如果想逐个取出列表中的元素，可以使用for-in循环的，有以下两种做法。

- 直接遍历列表

```
for item in [10, 20, 'Python']:
    print(item)
```

```
10
20
Python
```

- 通过索引遍历列表

```
for index in range(len([10, 20, 'Python'])):
    print([10, 20, 'Python'][index])
```

```
10
20
Python
```

### 8. 列表的方法之添加和删除元素

列表是一种可变容器，可变容器指的是我们可以向容器中添加元素、可以从容器移除元素，也可以修改现有容器中的元素。我们可以使用列表的`append`​方法向列表中追加元素，即将元素添加到列表的末尾；也可以使用`insert`方法向列表指定的位置插入元素。

```
languages = ['Python', 'Java', 'C++']
languages.append('JavaScript')
print(languages)  # ['Python', 'Java', 'C++', 'JavaScript']
languages.insert(0, 'SQL')
print(languages)  # ['SQL', 'Python', 'Java', 'C++', 'JavaScript']
```

```
['Python', 'Java', 'C++', 'JavaScript']
['SQL', 'Python', 'Java', 'C++', 'JavaScript']
```

我们可以用列表的`remove`​方法从列表中删除指定元素的值，当要删除的元素并不在列表中，会引发`ValueError`​错误导致程序崩溃。我们还可以使用`pop`​方法从列表中删除指定索引位置的元素默，pop方法默认删除列表中的最后一个元素，并返回被删除的元素。在使用pop方法删除元素时，如果索引的值超出了范围，会引发IndexError异常，导致程序崩溃。除此之外，列表还有一个`clear`方法，可以清空列表中的元素，代码如下所示。

```
languages = ['Python', 'SQL', 'Java', 'C++', 'JavaScript']
if 'Java' in languages:
    languages.remove('Java')
if 'Swift' in languages:
    languages.remove('Swift')
print(languages)         # ['Python', 'SQL', C++', 'JavaScript']

languages.pop()
print(languages)         # ['Python', 'SQL', 'C++']

temp = languages.pop(1)
print(temp)              # SQL
languages.append(temp)
print(languages)         # ['Python', C++', 'SQL']
languages.clear()
print(languages)         # []
```

```
['Python', 'SQL', 'C++', 'JavaScript']
['Python', 'SQL', 'C++']
SQL
['Python', 'C++', 'SQL']
[]
```

当列表中含有重复数据时，使用remove方法删除指定数据时，只会删除第一个出现的数据。

```
languages = ['Python','SQL','SQL','Java', 'C++', 'JavaScript']
languages.remove("SQL")
print(languages)
```

```
['Python', 'SQL', 'Java', 'C++', 'JavaScript']
```

此外，还可以使用python关键字`del`来删除列表元素。

```
languages = ['Python','SQL','Java', 'C++', 'JavaScript']
del languages[0]
print(languages)
```

```
['SQL', 'Java', 'C++', 'JavaScript']
```

### 9. 列表的方法之元素位置和频次

列表的`index`​方法可以查找某个元素在列表中的索引位置，如果找不到指定的元素，index方法会引发ValueError错误；列表的`count`方法可以统计一个元素在列表中出现的次数，代码如下所示。

```
items = ['Python', 'Java', 'Java', 'C++', 'Kotlin', 'Python']
print(items.index('Python'))     # 0
# 从索引位置1开始查找'Python'
print(items.index('Python', 1))  # 5
print(items.count('Python'))     # 2
print(items.count('Kotlin'))     # 1
print(items.count('Swfit'))      # 0
# 从索引位置3开始查找'Java'
print(items.index('Java', 3))    # ValueError: 'Java' is not in list
```

### 10. 列表的方法之元素排序和反转

|函数名称|特点|参数|
| ----------| ----------------------------------------------------| ---------------------------------------------|
|sort()|不返回值，即列表本身进行排序，也称永久性排序|reverse\=True 降序，False 升序（默认值）|
|sorted()|有返回值，不对原列表进行任何操作，又称为临时性排序|reverse\=True 降序，False 升序（默认值）|

​`sort`函数是 python3 内置的列表方法，用于对列表中的元素进行指定行为的排序。sort()函数具有以下特点：不返回值，即列表本身进行排序，也称永久性排序。

```
a = [1,4,3,5,6,8,2,9,0,7]
print(a.sort())
print(a)
```

```
None
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

也可通过传入参数进行执行排序。参数 reverse\=True 时为降序，False时为升序（默认值）。

```
a = [1,4,3,5,6,8,2,9,0,7]
a.sort(reverse=True)
print("reverse=True  降序:",a)
b = [1,4,3,5,6,8,2,9,0,7]
b.sort(reverse=False)
print("reverse=False 升序:",b)
c = [1,4,3,5,6,8,2,9,0,7]
c.sort()
print("  默认值      升序:",c)
```

```
reverse=True  降序: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
reverse=False 升序: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  默认值      升序: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

与 sort()函数不同，sorted()是 python 的内置函数，作用范围较 sort()大一些。它具有以下特点：

1. 对所有可迭代的对象进行排序操作。
2. 返回的是一个新的 list，而不是在原来的基础上进行的操作。
3. 可对所有可迭代的对象进行排序操作，包括 list、dict、str 等。
4. 语法：sorted(iterable, key\=None, reverse\=False)参数说明：iterable -- 可迭代对象。key -- 主要是用来进行比较的元素，只有一个参数，具体的函数的参数就是取自于可迭代对象中，指定可迭代对象中的一个元素来进行排序。reverse -- 排序规则，reverse \= True 降序 ， reverse \= False 升序（默认）。

```
a = [1,4,3,5,6,8,2,9,0,7]
b = sorted(a)
print("b:",b)
print("a:",a)

a = [1,4,3,5,6,8,2,9,0,7]
b = sorted(a,reverse=True)
print("b 降序:",b)
c = sorted(a,reverse=False)
print("a 升序:",c)
```

```
b: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
a: [1, 4, 3, 5, 6, 8, 2, 9, 0, 7]
b 降序: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
a 升序: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 11.列表高级用法之列表生成式

在 Python 中，列表还可以通过一种特殊的字面量语法来创建，这种语法叫做生成式。下面，我们通过例子来说明使用列表生成式创建列表到底有什么好处。假设我们要创建一个列表，列表元素为 1 到 10 的平方，我们可以通过 for 循环来实现：

```
squares = []
for x in range(1, 11):
    squares.append(x**2)
print(squares)
```

```
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

上面的代码中，我们首先创建了一个空列表 squares，然后使用 for 循环遍历 1 到 10 的数字，将每个数字的平方添加到 squares 列表中。但是，我们也可以使用列表生成式来创建这个列表，代码如下：

```
squares = [x**2 for x in range(1, 11)]
print(squares)  
```

```
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

上面的代码中，我们使用了列表生成式来创建一个列表，列表元素为 1 到 10 的平方。列表生成式的语法为：

```
[expression for item in iterable]
```

其中，`expression`​ 为表达式，`item`​ 为可迭代对象中的元素，`iterable`​ 为可迭代对象。在上面的例子中，expression 为 `x**2`​，item 为 `x`​，iterable 为 `range(1, 11)`。使用列表生成式创建列表的好处是，代码更加简洁，而且执行效率更高。下面，我们来看一个例子，假设有一个列表，列表元素为 1 到 10 的数字，我们要创建一个新列表，新列表元素为原列表中所有偶数的平方。我们可以使用列表生成式来实现，代码如下：

```
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)
```

```
[4, 16, 36, 64, 100]
```

上面的代码中，我们使用了列表生成式来创建一个新列表，新列表元素为原列表中所有偶数的平方。列表生成式的语法为：

```
[expression for item in iterable if condition]
```

其中，expression 为表达式，item 为可迭代对象中的元素，iterable 为可迭代对象，condition 为条件。在上面的例子中，expression 为 x\*\*2，item 为 x，iterable 为 numbers，condition 为 x % 2 \=\= 0。使用列表生成式创建列表的好处是，代码更加简洁，而且执行效率更高。

‍

‍

## Python 数据类型 之 元组

### 1. 元组的定义和运算

在 Python 语言中，元组也是多个元素按照一定顺序构成的序列。元组和列表的不同之处在于，**元组是不可变类型**。这就意味着元组类型的变量一旦定义，其中的元素不能再添加或删除，而且元素的值也不能修改。如果试图修改元组中的元素，将引发TypeError错误，导致程序崩溃。定义元组通常使用形如(x, y, z)的字面量语法，元组类型支持的运算符跟列表是一样的，我们可以看看下面的代码。

```
 # 定义一个三元组
 t1 = (35, 12, 98)
 # 定义一个四元组
 t2 = ('Java','Python','C++','C++')
 
 # 查看变量的类型
 print(type(t1))  # <class 'tuple'>
 print(type(t2))  # <class 'tuple'>
 
 # 查看元组中元素的数量
 print(len(t1))  # 3
 print(len(t2))  # 4
 
 # 索引运算
 print(t1[0])    # 35
 print(t1[2])    # 98
 print(t2[-1])   # C++
 
 # 切片运算
 print(t2[:2])   # ('Java', 'Python')
 print(t2[::3])  # ('Java', 'C++')
 
 # 循环遍历元组中的元素
 for elem in t1:
     print(elem)
 
 # 成员运算
 print(12 in t1)         # True
 print(99 in t1)         # False
 print('Hao' not in t2)  # True
 
 # 拼接运算
 t3 = t1 + t2
 print(t3)  # (35, 12, 98, 'Java', 'Python', 'C++', 'C++')
 
 # 比较运算
 print(t1 == t3)            # False
 print(t1 >= t3)            # False
 print(t1 <= (35, 11, 99))  # False
```

```
 <class 'tuple'>
 <class 'tuple'>
 3
 4
 35
 98
 C++
 ('Java', 'Python')
 ('Java', 'C++')
 35
 12
 98
 True
 False
 True
 (35, 12, 98, 'Java', 'Python', 'C++', 'C++')
 False
 False
 False
```

需要提醒大家注意的是，()表示空元组，但是如果元组中只有一个元素，需要加上一个逗号，否则()就不是代表元组的字面量语法，而是改变运算优先级的圆括号。

```
 a = ()
 print(type(a))  # <class 'tuple'>
 b = ('hello')
 print(type(b))  # <class 'str'>
 d = ('hello', )
 print(type(d))  # <class 'tuple'>
```

```
 <class 'tuple'>
 <class 'str'>
 <class 'tuple'>
```

### 2. 元组的打包和解包

当我们把多个用逗号分隔的值赋给一个变量时，多个值会打包成一个元组类型；当我们把一个元组赋值给多个变量时，元组会解包成多个值然后分别赋给对应的变量，如下面的代码所示。

```
 # 打包操作
 a = 1, 10, 100
 print(type(a))  # <class 'tuple'>
 print(a)        # (1, 10, 100)
 # 解包操作
 i, j, k = a
 print(i, j, k)  # 1 10 100
```

```
 <class 'tuple'>
 (1, 10, 100)
 1 10 100
```

在解包过程中，如果不需要中间元素的话，也可以使用`*`来让一个变量接收多个元素。需要注意的是，用星号表达式修饰的变量会变成一个列表，列表中有0个或多个元素；其次，在解包语法中，星号表达式只能出现一次。

```
 # 打包操作
 a = 1, 10, 100,1000
 print(type(a))  # <class 'tuple'>
 print(a)        # (1, 10, 100, 1000)
 # 解包操作
 i, *j, k = a
 print(i, j, k)  # 1 [10, 100] 1000
```

```
 <class 'tuple'>
 (1, 10, 100, 1000)
 1 [10, 100] 1000
```

### 3. 交换变量的值

交换变量的值是写代码时经常用到的一个操作，但是在很多编程语言中，交换两个变量的值都需要借助一个中间变量才能做到，如果不用中间变量就需要使用比较晦涩的位运算来实现。在 Python 中，交换两个变量a和b的值只需要使用如下所示的代码。

```
a= 1
b= 2
c= 3
a, b, c = b, c, a
print(a, b, c)
```

```
2 3 1
```

需要说明的是，上面的操作并没有用到打包和解包语法，Python 的字节码指令中有ROT\_TWO和ROT\_THREE这样的指令可以直接实现这个操作，效率是非常高的。但是如果有多于三个变量的值要依次互换，这个时候是没有直接可用的字节码指令的，需要通过打包解包的方式来完成变量之间值的交换。

```
## 4. 元组和列表的相互转换
infos = (1, 10, 100, 1000)
# 将元组转换成列表
print(list(infos))  # [1, 10, 100, 1000]

frts = ['apple', 'banana', 'orange']
# 将列表转换成元组
print(tuple(frts))  # ('apple', 'banana', 'orange')
```

```
[1, 10, 100, 1000]
('apple', 'banana', 'orange')
```

### 4. 元组小总结

**列表和元组都是容器型的数据类型**，即一个变量可以保存多个数据，而且它们都是按一定顺序组织元素的有序容器。**列表是可变数据类型**，**元组是不可变数据类型**，所以列表可以添加元素、删除元素、清空元素、排序反转，但这些操作对元组来说是不成立的。列表和元组都可以支持**拼接运算**、**成员运算**、**索引运算**、**切片运算**等操作，后面我们要讲到的字符串类型也支持这些运算，因为字符串就是字符按一定顺序构成的序列，在这一点上三者并没有什么区别。我们**推荐大家使用列表的生成式语法来创建列表**，它不仅好用而且效率很高，是 Python 语言中非常有特色的语法。

‍

## Python 类型 之 集合

### 1. 什么是集合？

集合是一种无序且不重复的数据结构，它可以存储任意类型的数据。在数学课本上就有这个概念。如果我们把一定范围的、确定的、可以区别的事物当作一个整体来看待，那么这个整体就是集合，集合中的各个事物称为集合的元素。通常，集合需要满足以下特性：

1. **无序性**：一个集合中，每个元素的地位都是相同的，元素之间是无序的。
2. **互异性**：一个集合中，任何两个元素都是不相同的，即元素在集合中只能出现一次。
3. **确定性**：给定一个集合和一个任意元素，该元素要么属这个集合，要么不属于这个集合，二者必居其一，不允许有模棱两可的情况出现。Python 程序中的集合跟数学上的集合没有什么本质区别，需要强调的是上面所说的无序性和互异性。无序性说明集合中的元素并不像列中的元素那样存在某种次序，可以通过索引运算就能访问任意元素，集合并不支持索引运算。另外，集合的互异性决定了集合中不能有重复元素，这一点也是集合区别于列表的地方，我们无法将重复的元素添加到一个集合中。集合类型必然是支持in和not in成员运算的，这样就可以确定一个元素是否属于集合，也就是上面所说的集合的确定性。集合的成员运算在性能上要优于列表的成员运算，这是集合的底层存储特性决定的。

### 2. 集合的创建

在 Python 中，创建集合可以使用{}字面量语法，{}中需要至少有一个元素，因为没有元素的{}并不是空集合而是一个空字典。也可以使用 Python 内置函数`set`来创建一个集合。可通过下面的案例来体会下集合的无序性和元素的唯一性。

```
 set1 = {1, 2, 3, 3, 3, 2}
 print(set1) # {1, 2, 3}
 
 set2 = {'banana', 'pitaya', 'apple', 'apple', 'banana', 'grape'}
 print(set2) # {'grape', 'pitaya', 'apple', 'banana'}
 
 set3 = set('hello')
 print(set3) # {'e', 'o', 'l', 'h'}
 
 set4 = set([1, 2, 2, 3, 3, 3, 2, 1])
 print(set4) # {1, 2, 3}
 
 set5 = {num for num in range(1, 20) if num % 3 == 0 or num % 7 == 0}
 print(set5) # {3, 6, 7, 9, 12, 14, 15, 18}
```

```
 {1, 2, 3}
 {'grape', 'pitaya', 'apple', 'banana'}
 {'e', 'o', 'l', 'h'}
 {1, 2, 3}
 {3, 6, 7, 9, 12, 14, 15, 18}
```

### 3. 集合的遍历

同列表和元组类似，集合也可以使用`for in`循环进行遍历。

```
 set1 = {'banana', 'pitaya', 'apple', 'apple', 'banana', 'grape'}
 for item in set1:
     print(item)
```

```
 grape
 pitaya
 apple
 banana
```

### 4. 集合的运算之成员运算

可以通过成员运算`in`​和`not in` 检查元素是否在集合中，代码如下所示。

```
 set2 = {'Python', 'Java', 'C++', 'Swift'}
 print('Ruby' in set2)  # False
 print('Java' in set2)  # True
```

```
 False
 True
```

### 5. 集合的运算之二元运算

集合的二元运算主要指集合的交集、并集、差集、对称差等运算，这些运算可以通过运算符来实现，也可以通过集合类型的方法来实现，代码如下所示。

![image](/python/week1/image-20250515173943-2vg2i7p.png)

```
 set1 = {1, 2, 3, 4, 5, 6, 7}
 set2 = {2, 4, 6, 8, 10}
 
 # 交集
 print(set1 & set2)                      # {2, 4, 6}
 print(set1.intersection(set2))          # {2, 4, 6}
 
 # 并集
 print(set1 | set2)                      # {1, 2, 3, 4, 5, 6, 7, 8, 10}
 print(set1.union(set2))                 # {1, 2, 3, 4, 5, 6, 7, 8, 10}
 
 # 差集
 print(set1 - set2)                      # {1, 3, 5, 7}
 print(set1.difference(set2))            # {1, 3, 5, 7}
 
 # 对称差
 print(set1 ^ set2)                      # {1, 3, 5, 7, 8, 10}
 print(set1.symmetric_difference(set2))  # {1, 3, 5, 7, 8, 10}
```

```
 {2, 4, 6}
 {2, 4, 6}
 {1, 2, 3, 4, 5, 6, 7, 8, 10}
 {1, 2, 3, 4, 5, 6, 7, 8, 10}
 {1, 3, 5, 7}
 {1, 3, 5, 7}
 {1, 3, 5, 7, 8, 10}
 {1, 3, 5, 7, 8, 10}
```

### 6. 集合的运算之比较运算

两个集合可以用==和!=进行相等性判断，如果两个集合中的元素完全相同，那么==比较的结果就是True，否则就是False。Python 为集合类型提供了判断子集和超集的运算符，其实就是我们非常熟悉的\<、\<\=、\>、\>\=这些运算符。当然，我们也可以通过集合类型的方法issubset和issuperset来判断集合之间的关系。

> 如果集合A的任意一个元素都是集合B的元素，那么集合A称为集合B的子集，即对于∀a∈A，均有a∈B，则A⊆B，A是B的子集，反过来也可以称B是A的超集。如果A是B的子集且A不等于B，那么A就是B的真子集。

```
 set1 = {1, 3, 5}
 set2 = {1, 2, 3, 4, 5}
 set3 = {5, 4, 3, 2, 1}
 
 print(set1 < set2)            # True
 print(set1 <= set2)           # True
 print(set2 < set3)            # False
 print(set2 <= set3)           # True
 print(set2 > set1)            # True
 print(set2 == set3)           # True
 
 print(set1.issubset(set2))    # True
 print(set2.issuperset(set1))  # True
```

```
 True
 True
 False
 True
 True
 True
 True
 True
```

### 7. 集合的方法之添加和删除元素

Python 中的集合是可变类型，我们可以通过集合类型的方法`add`​向集合添加元素，或通集合方法`remove`​或`pop`​或`discard`​从集合中删除元素，此外还可以通过集合方法`clear`来清空集合。

- ​`add`方法用于向集合添加元素，语法格式如下：

```
 集合名.add(元素)
```

- ​`remove`方法用于从集合中删除指定元素，语法格式如下：

```
 集合名.remove(元素)
```

- ​`pop`方法用于随机删除并返回集合中的一个元素，语法格式如下：

```
 集合名.pop()
```

- ​`discard`方法用于删除集合中的指定元素，语法格式如下：

```
 集合名.discard(元素)
```

- ​`clear`方法用于清空集合，语法格式如下：

```
 集合名.clear()
```

下面我们通过一个案例来演示集合的方法之添加和删除元素的用法。

```
 set1 = {1, 10, 100}
 
 # 添加元素
 set1.add(1000)
 set1.add(10000)
 print(set1)  # {1, 100, 1000, 10, 10000}
 
 # 删除元素
 set1.discard(10)
 if 100 in set1:
     set1.remove(100)
 print(set1)  # {1, 1000, 10000}
 
 # 清空元素
 set1.clear()
 print(set1)  # set()
```

```
 {1, 100, 1000, 10, 10000}
 {1, 1000, 10000}
 set()
```

集合类型还有一个名为isdisjoint的方法可以判断两个集合有没有相同的元素，如果没有相同元素，该方法返回True，否则该方法返回False，代码如下所示。

```
 set1 = {'Java', 'Python', 'C++', 'Kotlin'}
 set2 = {'Kotlin', 'Swift', 'Java', 'Dart'}
 set3 = {'HTML', 'CSS', 'JavaScript'}
 print(set1.isdisjoint(set2))  # False
 print(set1.isdisjoint(set3))  # True
```

### 8. 不可变集合

Python 中还有一种不可变类型的集合，名字叫`frozenset`​。`set`​跟`frozenset`​的区别就如同`list`​跟`tuple`​的区别，`frozenset`​由于是不可变类型，能够计算出哈希码，因此它可以作为`set`​中的元素。除了不能添加和删除元素，`frozenset`​在其他方面跟`set`是一样的。

### 9. 集合小总结

Python 中的**集合类型是一种无序容器**，**不允许有重复运算**，由于底层使用了哈希存储，集合中的元素必须是`hashable`​类型。集合与列表最大的区别在于**集合中的元素没有顺序**、所以**不能够通过索引运算访问元素**、但是集合可以执行交集、并集、差集等二元运算，也可以通过关系运算符检查两个集合是否存在超集、子集等关系。

‍

## Python 数据类型之 字符串

### 1. 字符串的定义

 Python 程序中，我们把单个或多个字符用单引号或者双引号包围起来，就可以表示一个字符串。字符串中的字符可以是特殊符号、英文字母、中文字符、日文的平假名或片假名、希腊字母、Emoji 字符（如：💩、🐷、🀄️）等。单行字符串使用单引号或双引号包裹。多行字符串使用三个单引号或三个双引号包裹。

```python
 s1 = 'hello, world!'
 s2 = "你好，世界！❤️"
 s3 = '''hello,
 wonderful
 world!'''
 print(s1)
 print(s2)
 print(s3)
```

```
 hello, world!
 你好，世界！❤️
 hello,
 wonderful
 world!
```

### 2. 转义字符串

在 Python 编程中有些符号具有特殊的含义，比如 '' 和 "" 用来标识一个字符串，还有一些字符则不便手动输入，如换行符，制表符等。为了在字符串中写入这些特殊字符，我们引入了转义字符。转义字符是 Python 中具有特殊含义的字符，以 `\` 开头。下面总结了常用的转义字符。

|转义字符|描述|
| ----------| --------------|
|​`\n`|换行符|
|​`\t`|制表符|
|​`\'`|单引号|
|​`\"`|双引号|
|​`\\`|反斜杠|
|​`\b`|退格符|
|​`\r`|回车符|
|​`\f`|换页符|
|​`\v`|垂直制表符|
|​`\u`|Unicode 字符|
|​`\U`|Unicode 字符|
|​`\x`|十六进制字符|
|​`\o`|八进制字符|

如果想要使用原始字符串，则可以在引号前添加`r`​，标识原始字符串。意思是字符串中的每个字符都是它本来的含义，没有所谓的转义字符。例如，在字符串'hello\\n'中，\\n表示换行；而在r'hello\\n'中，\\n不再表示换行，就是字符\\和字符n。

```python
 s1 = '\it \is \time \to \read \now'
 s2 = r'\it \is \time \to \read \now'
 print(s1)
 print(s2)
```

```
 ead \is     ime     o 
 ow
 \it \is \time \to \read \now
```

### 3. 字符串的运算之拼接和重复

类似列表中的拼接和重复，我们同样可以使用`+`​运算符实现字符串的拼接，当有多个字符串需要拼接时，可以使用join()方法，`*`运算符会将字符串重复指定的次数，案例如下所示。

```python
 str1 = "hello"
 str2 = "world"
 print(str1 + str2) # hello world 
 print(str1 * 3)    # hello hello hello 
 list1 = [str1,str2]
 print ("~".join(list1))
```

```
 helloworld
 hellohellohello
 hello~world
```

### 4. 字符串的运算之比较运算

对于两个字符串类型的变量，可以直接使用**比较运算符**来判断两个字符串的相等性或比较大小。因为字符串在计算机内存中也是以二进制形式存在的，那么字符串的大小比较比的是每个字符对应的编码的大小。例如A的编码是65， 而a的编码是97，所以'A' \< 'a'的结果相当于就是65 \< 97的结果，这里很显然是True；而'boy' \< 'bad'，因为第一个字符都是'b'比不出大小，所以实际比较的是第二个字符的大小，显然'o' \< 'a'的结果是False，所以'boy' \< 'bad'的结果是False。如果不清楚某个**字符**对应的编码到底是多少，可以使用`ord`函数来获得。下面的代码展示了字符串的比较运算：

```
 s1 = 'liming'
 s2 = 'lihua'
 print(s1 == s2)             # False
 print(s1 > s2)              # True
 
 print(s1 == 'hello world')  # False
 print(s2 == 'lihua')        # True
 print(s2 != 'liming')       # True
 
```

```
 False
 True
 False
 True
 True
```

### 5. 字符串的运算之存在性判断

和列表相同，我们可以使用`in`​或`not in`运算符来判断字符串中是否包含另外一个字符或字符串，结果会返回布尔值True或False。

```python
s1 = 'hello, world'
s2 = 'goodbye, world'
print('wo' in s1)      # True
print('wo' not in s2)  # False
print(s2 in s1)        # False
```

```
True
False
False
```

### 6. 字符串的运算之长度计算

我们可以使用`len()`​函数计算字符串的长度，`len()`函数会返回字符串中字符的个数，这和列表相同。

```python
s = 'hello, world'
print(len(s))                 # 12
print(len('goodbye, world'))  # 14
```

```
12
14
```

### 7. 字符串的运算之字符串切片

字符串的索引和切片操作跟列表几乎区别，因为字符串也是一种有序序列，可以通过正向或反向的整数索引访问其中的元素。但是有一点需要注意，因为字符串是不可变类型，所以不能通过索引运算修改字符串中的字符。

```python
s = 'abc123456'
n = len(s)
print(s[0], s[-n])    # a a
print(s[n-1], s[-1])  # 6 6
print(s[2], s[-7])    # c c
print(s[5], s[-4])    # 3 3
print(s[2:5])         # c12
print(s[-7:-4])       # c12
print(s[2:])          # c123456
print(s[:2])          # ab
print(s[::2])         # ac246
print(s[::-1])        # 654321cba
```

```python
a a
6 6
c c
3 3
c12
c12
c123456
ab
ac246
654321cba
```

### 8. 字符串的运算之查找和遍历

我们可以通过字符串的索引来获取对应位置的值，反过来也可以通过`index`​或`find`​方法来通过值查找对应的索引。此外，可以通过`for in`循环来遍历字符串。

```python
s = "hello world"

print(s.index("l"))   # 2
print(s.find("l",3))  # 3 (指定从索引位置开始向后查找)
print(s.find("w"))    # 6

for index in range(len(s)):
    print(s[index])

for i in s:
    print(i)
```

### 9. 字符串的方法之大小写转换

由于字符串是不可变类型，使用字符串的方法对字符串进行操作会产生新的字符串，但是原来变量的值并没有发生变化。字符串的方法有很多，其中大小写转换的方法有：

- ​`upper()`：将字符串中的小写字母转换为大写字母。
- ​`lower()`：将字符串中的大写字母转换为小写字母。
- ​`swapcase()`：将字符串中的大写字母转换为小写字母，将字符串中的小写字母转换为大写字母。
- ​`title()`：将字符串中的每个单词的首字母转换为大写字母，其余字母转换为小写字母。
- ​`capitalize()`：将字符串中的第一个单词的首字母转换为大写字母，其余字母转换为小写字母。
- ​`casefold()`：将字符串中的所有字母转换为小写字母。

```python
# 定义一个字符串
s = "Hello, World!"
# 将字符串中的小写字母转换为大写字母
print("upper():",s.upper())           # upper(): HELLO, WORLD!
# 将字符串中的大写字母转换为小写字母
print("lower():",s.lower())           # lower(): hello, world!
# 将字符串中的大写字母转换为小写字母，将字符串中的小写字母转换为大写字母
print("swapcase():",s.swapcase())     # swapcase(): hELLO, wORLD!
# 将字符串中的每个单词的首字母转换为大写字母，其余字母转换为小写字母
print("title():",s.title())           # title(): Hello, World!
# 将字符串中的第一个单词的首字母转换为大写字母，其余字母转换为小写字母
print("capitalize():",s.capitalize()) # capitalize(): Hello, world!
# 将字符串中的所有字母转换为小写字母
print("casefold():",s.casefold())     # casefold(): hello, world!
```

```
upper(): HELLO, WORLD!
lower(): hello, world!
swapcase(): hELLO, wORLD!
title(): Hello, World!
capitalize(): Hello, world!
casefold(): hello, world!
```

### 10. 字符串的方法之性质判断

可以通过字符串的startswith、endswith来判断字符串是否以某个字符串开头和结尾；还可以用is开头的方法判断字符串的特征，这些方法都返回布尔值，代码如下所示。

```python
s1 = 'hello, world!'
print(s1.startswith('He'))   # False
print(s1.startswith('hel'))  # True
print(s1.endswith('!'))      # True
s2 = 'abc123456'
print(s2.isdigit())  # False 判断字符串是不是完全由数字构成
print(s2.isalpha())  # False 判断字符串是不是完全由字母构成
print(s2.isalnum())  # True  判断字符串是不是由字母和数字构成
```

```
False
True
True
False
False
True
```

### 11. 字符串的方法之格式化字符串

在 Python 中，字符串类型可以通过center、ljust、rjust方法做居中、左对齐和右对齐的处理。如果要在字符串的左侧补零，也可以使用zfill方法。

```python
s = 'hello, world'
print(s.center(20, '*'))  # ****hello, world****
print(s.rjust(20))        #         hello, world
print(s.ljust(20, '~'))   # hello, world~~~~~~~~
print('33'.zfill(5))      # 00033
print('-33'.zfill(5))     # -0033
```

```
****hello, world****
        hello, world
hello, world~~~~~~~~
00033
-0033
```

我们可以用字符串的format方法来完成字符串的格式，代码如下所示。

```python
a = 321
b = 123
print('{0} * {1} = {2}'.format(a, b, a * b))
```

```
321 * 123 = 39483
```

从 Python 3.6 开始，格式化字符串还有更为简洁的书写方式，就是在字符串前加上f来格式化字符串，在这种以f打头的字符串中，{变量名}是一个占位符，会被变量对应的值将其替换掉，代码如下所示。

```python
a = 321
b = 123
print(f'{a} * {b} = {a * b}')
```

```
321 * 123 = 39483
```

如果需要进一步控制格式化语法中变量值的形式，可以参照下面的表格来进行字符串格式化操作。

|变量值|占位符|格式化结果|说明|
| --------| --------| ------------| ------------------------|
|​`3.1415926`|​`{:.2f}`|​`'3.14'`|保留小数点后两位|
|​`3.1415926`|​`{:+.2f}`|​`'+3.14'`|带符号保留小数点后两位|
|​`-1`|​`{:+.2f}`|​`'-1.00'`|带符号保留小数点后两位|
|​`3.1415926`|​`{:.0f}`|​`'3'`|不带小数|
|​`123`|​`{:0>10d}`|​`'0000000123'`|左边补`0`，补够10位|
|​`123`|​`{:x<10d}`|​`'123xxxxxxx'`|右边补`x`，补够10位|
|​`123`|​`{:>10d}`|​`'       123'`|左边补空格，补够10位|
|​`123`|​`{:<10d}`|​`'123       '`|右边补空格，补够10位|
|​`123456789`|​`{:,}`|​`'123,456,789'`|逗号分隔格式|
|​`0.123`|​`{:.2%}`|​`'12.30%'`|百分比格式|
|​`123456789`|​`{:.2e}`|​`'1.23e+08'`|科学计数法格式|

### 12. 字符串的方法之修剪和替换

字符串的`strip`​方法可以帮我们获得将原字符串修剪掉左右两端指定字符之后的字符串，默认是修剪空格字符。这个方法非常有实用价值，可以用来将用户输入时不小心键入的头尾空格等去掉，strip方法还有`lstrip`​和`rstrip`两个版本，分别用于只修剪左边/右边执行的字符串。

```python
s1 = '  hello world   '
print(s1.strip())      # jackfrued@126.com
s2 = '~你好，世界~'
print(s2.lstrip('~'))  # 你好，世界~
print(s2.rstrip('~'))  # ~你好，世界
```

```
hello world
你好，世界~
~你好，世界
```

如果希望用新的内容替换字符串中指定的内容，可以使用replace方法，代码如下所示。replace方法的第一个参数是被替换的内容，第二个参数是替换后的内容，还可以通过第三个参数指定替换的次数。

```python
s = 'hello, good world'
print(s.replace('o', '@'))     # hell@, g@@d w@rld
print(s.replace('o', '@', 1))  # hell@, good world
```

```
hell@, g@@d w@rld
hell@, good world
```

### 13. 字符串的方法之编码和解码

Python 中除了字符串str类型外，还有一种表示二进制数据的字节串类型（bytes）。所谓字节串，就是由零个或多个字节组成的有限序列。通过字符串的encode方法，我们可以按照某种编码方式将字符串编码为字节串，我们也可以使用字节串的decode方法，将字节串解码为字符串，代码如下所示。

```python
a = '你好世界'
b = a.encode('utf-8')
c = a.encode('gbk')
print(b)                  # b'\xe4\xbd\xa0\xe5\xa5\xbd\xe4\xb8\x96\xe7\x95\x8c'
print(c)                  # b'\xc4\xe3\xba\xc3\xca\xc0\xbd\xe7'
print(b.decode('utf-8'))  # 你好世界
print(c.decode('gbk'))    # 你好世界
```

```
b'\xe4\xbd\xa0\xe5\xa5\xbd\xe4\xb8\x96\xe7\x95\x8c'
b'\xc4\xe3\xba\xc3\xca\xc0\xbd\xe7'
你好世界
你好世界
```

## Python 数据类型 之 字典

### 1. 什么是字典？

Python 程序中的字典跟现实生活中的字典(dict)很像，它以键值对（键和值的组合）的方式把数据组织到一起，我们可以通过键找到与之对应的值并进行操作。就像《新华字典》中，每个字（键）都有与它对应的解释（值）一样，每个字和它的解释合在一起就是字典中的一个条目，而字典中通常包含了很多个这样的条目。

### 2. 创建和使用字典

Python 中创建字典可以使用{}字面量语法，这一点跟上一节课讲的集合是一样的。但是字典的{}中的元素是以键值对的形式存在的，每个元素由:分隔的两个值构成，:前面是键，:后面是值，代码如下所示。同样可以使用dict字典构造器来生成字典，代码如下。

```
 person1 = {
     'name':'xcyxiaoxiang',
     'age': 18,
     'height':180,
     'gender': '男'
 }
 
 print(person1)
 print(type(person1))
 
 person2 = dict(
     name='xcyxiaoxiang',
     age=18,
     height=180,
     gender='男'
 )
 
 print(person2)
 print(type(person2))
```

```
 {'name': 'xcyxiaoxiang', 'age': 18, 'height': 180, 'gender': '男'}
 <class 'dict'>
 {'name': 'xcyxiaoxiang', 'age': 18, 'height': 180, 'gender': '男'}
 <class 'dict'>
```

需要特别提醒大家注意的是，字典中的键必须是不可变类型，例如整数（int）、浮点数（float）、字符串（str）、元组（tuple）等类型，这一点跟集合类型对元素的要求是一样的；很显然，之前我们讲的列表（list）和集合（set）不能作为字典中的键，字典类型本身也不能再作为字典中的键，因为字典也是可变类型，但是字典可以作为字典中的值。

### 3. 字典的方法之数据获取

典类型的方法基本上都跟字典的键值对操作相关，其中`get`方法可以通过键来获取对应的值。跟索引运算不同的是，get方法在字典中没有指定的键时不会产生异常，而是返回None或指定的默认值，代码如下所示。

```
 person = {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
 print(person.get('name'))       # 王大锤
 print(person.get('sex'))        # None
 print(person.get('sex', True))  # True
```

```
 王大锤
 None
 True
```

如果需要获取字典中所有的键，可以使用`keys`​方法；如果需要获取字典中所有的值，可以使用`values`​方法。字典还有一个名为`items`的方法，它会将键和值组装成二元组，通过该方法来遍历字典中的元素也是非常方便的。

```
 person = {'name': '王大锤', 'age': 25, 'height': 178}
 print(person.keys())    # dict_keys(['name', 'age', 'height'])
 print(person.values())  # dict_values(['王大锤', 25, 178])
 print(person.items())   # dict_items([('name', '王大锤'), ('age', 25), ('height', 178)])
 for key, value in person.items():
     print(f'{key}:\t{value}')
```

```
 dict_keys(['name', 'age', 'height'])
 dict_values(['王大锤', 25, 178])
 dict_items([('name', '王大锤'), ('age', 25), ('height', 178)])
 name:   王大锤
 age:    25
 height: 178
```

### 4. 字典的方法之数据更新

字典的update方法会用一个字典更新另一个字典中的键值对。例如，有两个字典x和y，当执行x.update(y)操作时，x跟y相同的键对应的值会y中的值被更新，而y中有但x中没有的键值对会直接添加到x中，代码如下所示。

```
 person1 = {'name': '王大锤', 'age': 55, 'height': 178}
 print("更新前：",person1)  # 更新前： {'name': '王大锤', 'age': 55, 'height': 178}
 person2 = {'age': 25, 'addr': '成都市武侯区科华北路62号1栋101'}
 person1.update(person2)
 print("更新后：",person1)  # 更新后： {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
```

```
 更新前： {'name': '王大锤', 'age': 55, 'height': 178}
 更新后： {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
```

可以通过`pop`​或`popitem`​方法从字典中删除元素，前者会返回键对应的值，但是如果字典中不存在指定的键，会引发KeyError错误；后者会删除并返回字典中最后插入的键值对。此方法遵循后进先出（LIFO）原则。字典的clear方法 或 pyhton关键字 `del`会清空字典中所有的键值对，代码如下所示。

```
person = {'name': '王大锤', 'age': 25, 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
print(person.pop('age'))  # 25
print(person)             # {'name': '王大锤', 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
print(person.popitem())   # ('addr', '成都市武侯区科华北路62号1栋101')
print(person.popitem())   # ('addr', '成都市武侯区科华北路62号1栋101')
print(person)             # {'name': '王大锤', 'height': 178}
person.clear()
print(person)             # {}
```

```
25
{'name': '王大锤', 'height': 178, 'addr': '成都市武侯区科华北路62号1栋101'}
('addr', '成都市武侯区科华北路62号1栋101')
{'name': '王大锤', 'height': 178}
{}
```

### 5. 字典小总结

Python 程序中的字典跟现实生活中字典非常像，允许我们**以键值对的形式保存数据**，再**通过键索引对应的值**。这是一种非常**有利于数据检索**的数据类型。再次提醒大家注意，**字典中的键必须是不可变类型**，字典中的值可以是任意类型。

‍