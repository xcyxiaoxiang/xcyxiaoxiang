---
title: "星期四 Python 流程控制"
date: 2025-05-15
---

# 星期四 Python 流程控制

![image](/python/week1/image-20250515164422-tsp6yn8.png)

## 1. 使用if和else构造分支结构

在 Python 中，要构造分支结构可以使用if、elif和else三个关键字。所谓关键字就是有特殊含义的单词，像if和else就是专门用于构造分支结构的关键字，很显然你不能够使用它作为变量名（事实上，用作其他的标识符也是不可以）。下面的例子中演示了如何构造一个分支结构。

> 需要说明的是，不同于 C、C++、Java 等编程语言，Python 中没有用花括号来构造代码块而是使用缩进的方式来表示代码的层次结构，如果if条件成立的情况下需要执行多条语句，只要保持多条语句具有相同的缩进就可以了。

```python
 # 输入用户年龄
 age = int(input('请输入你的年龄: '))
 # 检查年龄是否小于18岁
 if age < 18:
     print('你的年龄是', age)
     print('小于18岁')
 elif age == 18:
     print('你的年龄是', age)
     print('刚好是18岁')
 else:
     print('你的年龄是', age)
     print('大于18岁')
```

```
 你的年龄是 1
 小于18岁
```

> ​`elif`​是`else if`​的缩写，完全可以有多个`elif`。

## 2. 使用math和case构造分支结构

Python 3.10 中增加了一种新的构造分支结构的方式，通过使用match和case 关键字，我们可以轻松的构造出多分支结构。下面是使用match-case语法实现的代码。

```
 status_code = int(input('响应状态码: '))
 match status_code:
     case 400 | 401 | 403: description = 'Bad Request'
     case 404: description = 'Not Found'
     case 405: description = 'Method Not Allowed'
     case _: description = 'Unknown Status Code'
 print('状态码描述:', description)
```

```
 状态码描述: Unknown Status Code
```

说明：带有\_的case语句在代码中起到通配符的作用，如果前面的分支都没有匹配上，代码就会来到case \_。case \_的使用是可选的，并非每种分支结构都要给出通配符选项。如果分支中出现了case \_，它只能放在分支结构的最后面，如果它的后面还有其他的分支，那么这些分支将是不可达的。

## 3. 循环结构

Python中的循环结构共有两种，一种是for-in循环，另一种是while循环。

## 4. 循环结构之 for-in 循环

for-in循环可以遍历任何可迭代对象，如列表、元组、集合、字典以及字符串等。被for-in循环控制的代码块也是通过缩进的方式来构造，这一点跟分支结构中构造代码块的做法是一样的。我们被for-in循环控制的代码块称为循环体，通常循环体中的语句会根据循环的设定被重复执行。

```python
 # 下面的代码演示了如何通过for-in循环遍历一个列表中的元素
 for name in ['Michael', 'Bob', 'Tracy']:
     print(name)
 
 # 下面的代码演示了如何遍历1到100
 for i in range(1,101):
     print(i)
```

```
 Michael
 Bob
 Tracy
 1
 2
……
 100
```

## 5. 循环结构之 while 循环

while循环可以让我们重复执行一段代码，直到满足指定的条件为止。如果要构造循环结构但是又不能确定循环重复的次数，我们推荐使用while循环。while循环通过布尔值或能产生布尔值的表达式来控制循环，当布尔值或表达式的值为True时，循环体（while语句下方保持相同缩进的代码块）中的语句就会被重复执行，当表达式的值为False时，结束循环。while循环的语法格式如下：

```
 while 布尔表达式:
     循环体
```

其中，布尔表达式是一个能产生布尔值的表达式，循环体是一组语句，它们会被重复执行，直到布尔表达式的值为False。下面是一个简单的while循环的例子：

```python
 i = 0
 while i < 5:
     print(i)
     i=i+1
```

```
 0
 1
 2
 3
 4
```

## 6. break和continue

在 Python 中，要构造循环结构可以使用for和while关键字。如果在循环中想要提前结束循环，可以使用break关键字；如果在循环中遇到满足条件的情况，可以使用continue关键字跳过剩下的代码直接进入下一轮循环。下面是求从1到100的偶数求和的案例：

```python
 total = 0
 for i in range(1, 101):
     if i % 2 != 0:
         print("before continue i % 2 != 0:", i % 2 != 0)
         continue
         print("after continue i % 2 != 0:", i % 2 != 0)
     total += i
 print("total:",total)
```

```
 before continue i % 2 != 0: True
 before continue i % 2 != 0: True
 ……
 before continue i % 2 != 0: True
 total: 2550
```

下面的案例是依次遍历10个人名，直到名字为`momo`时截至。

```Python
 name_list = ["zhangsan", "lisi", "wangwu", "zhaoliu", "momo","tianqi", "xiaohong", "xiaoming", "xiaohua", "xiaohu"]
 for name in name_list:
     print(name)
     if name == "momo":
         print("找到了momo")
         break
```

```
zhangsan
lisi
wangwu
zhaoliu
momo
找到了momo
```

‍