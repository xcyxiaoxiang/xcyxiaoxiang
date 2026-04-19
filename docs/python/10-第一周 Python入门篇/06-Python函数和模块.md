---
title: "星期六 Python函数和模块"
date: 2025-05-15
---

# 星期六 Python函数和模块

## Python中的函数

### 1. 函数的定义

数学上的函数通常形如`y=f(x)`​或者`z=g(x,y)`​这样的形式，在`y=f(x)`​中，`f`​是函数的名字，`x`​是函数的自变量，`y`​是函数的因变量；而在`z=g(x,y)`​中，g是函数名，x和y是函数的自变量，z是函数的因变量。Python 中的函数跟这个结构是一致的，每个函数都有自己的名字、自变量和因变量。==我们通常把 Python 函数的自变量称为函数的参数，而因变量称为函数的返回值。==

Python 中可以使用`def`​关键字来定义函数，和变量一样每个函数也应该有一个漂亮的名字，命名规则跟变量的命名规则是一样的。在函数名后面的圆括号中可以设置函数的参数，也就是我们刚才说的函数的自变量，而函数执行完成后，我们会通过`return`​关键字来返回函数的执行结果，这就是我们刚才说的函数的因变量。如果函数中没有`return`​语句，那么函数会返回代表空值的`None`​。另外，函数也可以没有自变量（参数），但是函数名后面的圆括号是必须有的。一个函数要做的事情（要执行的代码），是通过==代码缩进==的方式放到函数定义行之后，跟之前分支和循环结构的代码块类似。

使用函数可以帮助我们将功能上相对独立且会被重复使用的代码封装起来，当我们需要这些的代码，不是把重复的代码再编写一遍，而是通过调用函数实现对既有代码的复用。

![image](/python/week1/image-20250515180209-g7lzxd8.png)

我们来写一个函数，根据给出的三条边的长度判断是否可以构成三角形，如果可以构成三角形则返回True，否则返回False，代码如下所示。

```python
 def make_judgement(a, b, c):
     """判断三条边的长度能否构成三角形"""
     return a + b > c and b + c > a and a + c > b
```

### 2. 函数的参数

上面make\_judgement函数有三个参数，这种参数叫做位置参数，在调用函数时通常按照从左到右的顺序依次传入，而且传入参数的数量必须和定义函数时参数的数量相同，如下所示。

```python
 print(make_judgement(1, 2, 3))  # False
 print(make_judgement(4, 5, 6))  # True
```

```
 False
 True
```

如果不想按照从左到右的顺序依次给出a、b、c 三个参数的值，也可以使用关键字参数，通过“参数名\=参数值”的形式为函数传入参数，如下所示。

```python
 print(make_judgement(b=2, c=3, a=1))  # False
 print(make_judgement(c=6, b=4, a=5))  # True
```

```
 False
 True
```

在Python3.8中引入了两个新特性：强制位置参数和关键字参数。这个特性可以让函数的调用更加清晰和明确，避免了使用位置参数时可能出现的混淆。

- 在定义函数时，我们可以在参数列表中用`/`设置强制位置参数（positional-only arguments。所谓强制位置参数，就是调用函数时只能按照参数位置来接收参数值的参数；
- 用`*`​设置命名关键字参数,而命名关键字参数只能通过“参数名\=参数值”的方式来传递和接收参数，大家可以看看下面的例子。

```python
 # /前面的参数是强制位置参数
 def make_judgement(a, b, c, /):
     """判断三条边的长度能否构成三角形"""
     return a + b > c and b + c > a and a + c > b
 
 
 # 下面的代码会产生TypeError错误，错误信息提示“强制位置参数是不允许给出参数名的”
 # TypeError: make_judgement() got some positional-only arguments passed as keyword arguments
 # print(make_judgement(b=2, c=3, a=1))
 
 
 # *后面的参数是命名关键字参数
 def make_judgement(*, a, b, c):
     """判断三条边的长度能否构成三角形"""
     return a + b > c and b + c > a and a + c > b
 
 
 # 下面的代码会产生TypeError错误，错误信息提示“函数没有位置参数但却给了3个位置参数”
 # TypeError: make_judgement() takes 0 positional arguments but 3 were given
 # print(make_judgement(1, 2, 3))
  
```

Python 中允许函数的参数拥有默认值，指定了默认值以后，如果用户传递了参数则默认值不会生效。如果用户没有传递，则默认值就会生效。需要注意的是，带默认值的参数必须放在不带默认值的参数之后，否则将产生SyntaxError错误。

```python
 def make_judgement(a, b=4, c=3):
     """判断三条边的长度能否构成三角形"""
     return a + b > c and b + c > a and a + c > b
 
 print(make_judgement(5))  # True
```

```
 True
```

Python 语言中可以通过星号表达式语法让函数支持==可变参数==。所谓可变参数指的是在调用函数时，可以向函数传入0个或任意多个参数。将来我们以团队协作的方式开发商业项目时，很有可能要设计函数给其他人使用，但有的时候我们并不知道函数的调用者会向该函数传入多少个参数，这个时候可变参数就能派上用场。

下面的代码演示了如何使用可变位置参数实现对任意多个数求和的add函数，调用函数时传入的参数会保存到一个元组，通过对该元组的遍历，可以获取传入函数的参数。

```python
# 用星号表达式来表示args可以接收0个或任意多个参数
# 调用函数时传入的n个参数会组装成一个n元组赋给args
# 如果一个参数都没有传入，那么args会是一个空元组
def add(*args):
    total = 0
    # 对保存可变参数的元组进行循环遍历
    for val in args:
        # 对参数进行了类型检查（数值型的才能求和）
        if type(val) in (int, float):
            total += val
    return total


# 在调用add函数时可以传入0个或任意多个参数
print(add())         # 0
print(add(1))        # 1
print(add(1, 2, 3))  # 6
print(add(1, 2, 'hello', 3.45, 6))  # 12.45
```

```
0
1
6
12.45
```

如果我们希望通过“参数名\=参数值”的形式传入==若干个关键字参数==，具体有多少个参数也是不确定的，我们还可以给函数添加可变关键字参数，把传入的关键字参数组装到一个字典中，代码如下所示。

```python
# 参数列表中的**kwargs可以接收0个或任意多个关键字参数
# 调用函数时传入的关键字参数会组装成一个字典（参数名是字典中的键，参数值是字典中的值）
# 如果一个关键字参数都没有传入，那么kwargs会是一个空字典
def foo(*args, **kwargs):
    print(args)
    print(kwargs)


foo(3, 2.1, True, name='zhangsan', age=43, gpa=4.95)
```

```
(3, 2.1, True)
{'name': 'zhangsan', 'age': 43, 'gpa': 4.95}
```

### 3. 高阶函数

不同于其它语言，Python中的函数是“一等公民”，所谓“一等公民”指的就是函数可以赋值给变量，函数可以作为参数或返回值进行传递。==把一个函数作为其他函数的参数或返回值的用法，我们通常称之为“高阶函数”。==我们来看下面一个例子。设计一个函数，传入任意多个参数，对其中int类型或float类型的元素实现求和操作。

```python
 def calc(*args, **kwargs):
     items = list(args) + list(kwargs.values())
     result = 0
     for item in items:
         if type(item) in (int, float):
             result += item
     return result
```

上面的代码只能进行加法操作，那如果我们想要通过这个方法实现多种运算应该怎么做呢？可以为该方法增加一个函数参数，运算函数传入到函数中，然后在函数中调用传入的运算函数。当调用函数时需要在函数名后面跟上圆括号，而把函数作为参数传入或返回时只需要函数名即可。下面的函数增加了两个参数，其中init\_value代表运算的初始值，op\_func代表二元运算函数。

```python
 def calc(init_value, op_func, *args, **kwargs):
     items = list(args) + list(kwargs.values())
     result = init_value
     for item in items:
         if type(item) in (int, float):
             result = op_func(result, item)
     return result
```

如此，我们就可以通过自定义运算逻辑，来实现多种运算了。

```python
 def add(x, y):
     return x + y
 
 
 def mul(x, y):
     return x * y
 
 def calc(init_value, op_func, *args, **kwargs):
     items = list(args) + list(kwargs.values())
     result = init_value
     for item in items:
         if type(item) in (int, float):
             result = op_func(result, item)
     return result
 
 # 加法运算
 print(calc(0, add, 1, 2, 3, 4, 5))  # 15
 print(calc(10, add, 1, 2, 3, 4, 5))  # 25
 
 # 乘法运算
 print(calc(1, mul, 2, 3, 4, 5))  # 120
 print(calc(10, mul, 2, 3, 4, 5))  # 3000
```

```
 15
 25
 120
 1200
```

### 4. 高阶函数的应用之filter

Python 内置函数中有不少高阶函数，例如最常用的`filter`​就是高阶函数，`filter()`函数用于过滤序列，过滤掉不符合条件的元素，返回由符合条件元素组成的新迭代器对象。例如我们要去掉一个整数列表中的奇数，就可以直接使用这个函数来做到。

该接收两个参数，第一个为函数，第二个为序列，序列的每个元素作为参数传递给函数进行判断，然后返回 True 或 False，最后将返回 True 的元素放到新列表中。

```python
 filter(function, iterable)
```

```python
 def filter_even(num):
     """筛选出偶数"""
     return num % 2 == 0
 
 
 old_nums = [35, 12, 8, 99, 60, 52]
 new_nums = filter(filter_even,old_nums)
 print(new_nums)         # <filter object at 0x7f501ae0d0c0>
 print(list(new_nums))   # [12, 8, 60, 52]
```

```
 <filter object at 0x7f501ae0d0c0>
 [12, 8, 60, 52]
```

### 5. 高阶函数的应用之map

​`map()`函数同样是Python中一个内置的高阶函数，map() 会根据提供的函数对指定序列做映射。   第一个参数 function 以参数序列中的每一个元素调用 function 函数，返回包含每次 function 函数返回值的新数据。最后将所有结果组成一个新的迭代器返回。语法：

```python
 map(function, iterable, ...)
```

```python
def square(num):
    """求平方"""
    return num **2

old_nums = [35, 12, 8, 99, 60, 52]
new_nums = map(square,old_nums)
print(new_nums)        # <map object at 0x7f501ae0c550>
print(list(new_nums))  # [1225, 144, 64, 9801, 3600, 2704]
```

```
<map object at 0x7f501ae0c550>
[1225, 144, 64, 9801, 3600, 2704]
```

### 6. 高阶函数的应用之装饰器

Python 语言中，==装饰器是“用一个函数装饰另外一个函数并为其提供额外的能力”的语法现象==。装饰器本身是一个函数，它的参数是被装饰的函数，它的返回值是一个带有装饰功能的函数。Python装饰器最大的作用及就是：在不改变原有功能代码的基础上,在函数执行前后，添加额外的功能，这里的添加额外的功能，可以是在被装饰函数执行前执行一些其它操作，也可以对被装饰函数的参数进行处理；也可以在被装饰函数执行后对返回值进行处理等等。如现有一个函数 download()，该函数的功能是下载文件，现需要在下载文件前，先检查网络是否正常，如果网络正常，再执行下载操作，如果网络不正常，提示网络异常。

```python
import time
def check_network(func):
    def wrapper(*args, **kwargs):
        print("检查网络...")
        time.sleep(1)
        if True:
            print("网络正常，开始下载...")
            # 指定被装饰的函数
            result = func(*args, **kwargs)
            # 返回被装饰函数的返回值
            return result
        else:
            print("网络异常，下载失败！")
    return wrapper



@check_network
def download(filename):
    print(f"正在下载文件：{filename}")
    time.sleep(2)
    print("下载完成！")
    

download("example.txt")
```

```python
检查网络...
网络正常，开始下载...
正在下载文件：example.txt
下载完成！
```

如果在代码的某些地方，我们想去掉装饰器的作用，转而执行原函数，那么在定义装饰器函数的时候，需要做一点点额外的工作。Python 标准库functools模块的wraps函数也是一个装饰器，我们将它放在wrapper函数上，这个装饰器可以帮我们保留被装饰之前的函数，以及该函数的结构（如doc、name等）。，这样在需要取消装饰器时，可以通过被装饰函数的**wrapped**属性获得被装饰之前的函数。

```python
import time
from functools import wraps 
def check_network(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("检查网络...")
        time.sleep(1)
        if True:
            print("网络正常，开始下载...")
            # 执行被装饰的函数
            result = func(*args, **kwargs)
            # 返回被装饰函数的返回值
            return result
        else:
            print("网络异常，下载失败！")
    return wrapper



@check_network
def download(filename):
    print(f"正在下载文件：{filename}")
    time.sleep(2)
    print("下载完成！")
    

download("example.txt")
print("执行原函数----------------------------：")
download.__wrapped__("example.txt")
```

```
检查网络...
网络正常，开始下载...
正在下载文件：example.txt
下载完成！
执行原函数----------------------------：
正在下载文件：example.txt
下载完成！
```

‍

### 7. Lambda函数

使用高阶函数的时候，如果作为参数或者返回值的函数本身非常简单，一行代码就能够完成，也不需要考虑对函数的复用，那么我们可以使用 lambda 函数。Python 中的 lambda 函数是没有的名字函数，所以很多人也把它叫做匿名函数，lambda 函数只能有一行代码，代码中的表达式产生的运算结果就是这个匿名函数的返回值。如上filter和map的两个示例，我们可以使用lambda函数来简化代码。

定义 lambda 函数的关键字是lambda，后面跟函数的参数，如果有多个参数用逗号进行分隔；冒号后面的部分就是函数的执行体，通常是一个表达式，表达式的运算结果就是 lambda 函数的返回值，不需要写return 关键字。

```python
old_nums = [35, 12, 8, 99, 60, 52]
new_nums = filter(lambda x: x%2==0,old_nums)
print(new_nums)         # <filter object at 0x7f501ae0d0c0>
print(list(new_nums))   # [12, 8, 60, 52]


old_nums = [35, 12, 8, 99, 60, 52]
new_nums = map(lambda x: x**2,old_nums)
print(new_nums)        # <map object at 0x7f501ae0c550>
print(list(new_nums))  # [1225, 144, 64, 9801, 3600, 2704]
```

```
<filter object at 0x7f78701eae30>
[12, 8, 60, 52]
<map object at 0x7f78701e99f0>
[1225, 144, 64, 9801, 3600, 2704]
```

### 8. 偏函数

偏函数是指固定函数的某些参数，生成一个新的函数，这样就无需在每次调用函数时都传递相同的参数。在 Python 语言中，我们可以使用functools模块的partial函数来创建偏函数。

partial函数的第一个参数和返回值都是函数，它将传入的函数处理成一个新的函数返回。通过构造偏函数，我们可以结合实际的使用场景将原函数变成使用起来更为便捷的新函数。

例如，int函数在默认情况下可以将字符串视为十进制整数进行类型转换，如果我们修修改它的base参数，就可以定义出三个新函数，分别用于将二进制、八进制、十六进制字符串转换为整数，代码如下所示。

```python
import functools

int2 = functools.partial(int, base=2)
int8 = functools.partial(int, base=8)
int16 = functools.partial(int, base=16)

print(int('1001'))    # 1001

print(int2('1001'))   # 9
print(int8('1001'))   # 513
print(int16('1001'))  # 4097
```

```
1001
9
513
4097
```

## [P]()ython的模块化

### 1. 模块的定义

在计算机程序的开发过程中，随着程序代码越写越多，在一个文件里代码就会越来越长，越来越不容易维护。于时，为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。

==Python 中每个文件就代表了一个模块==（module），我们在不同的模块中可以有同名的函数，能够避免函数名和变量名冲突。在使用函数的时候，我们通过import关键字导入指定的模块再使用完全限定名（模块名.函数名）的调用方式。同时可以通过 `as` 对导入的函数命名别名。

### 2. 导入模块

可以通过如下几种方式来导入Python模块:

方式一：标准导入`import time`​，通过`time.xxx`来调用模块的内容；

方式二：选择性导入`from time import xxx`​ ，通过`xxx`直接调用；

方式三：别名导入`from time import xxx as zzz`​ ,通过`zzz`直接调用；

方式四：通配符导入`from time import *` ,也称全量导入，调用方式同方式二；

方式五：动态导入`math_mod = __import__(module_name)`，常用于插件开发时，动态导入模块

### 3. \_\_name\_\_属性

一个模块被另一个程序第一次引入时，其主程序将运行。如果我们想在模块被引入时，模块中的某一程序块不执行，我们可以用`__name__`​属性来使该程序块仅在该模块自身运行时执行。在Python中，每个模块都有一个 `__name__`属性，当其值是 '__main__' 时，表明该模块自身在运行，否则是被引入。最常见的就是运行测试。

```python
if __name__ == '__main__':
    print('程序自身在运行')
else:
    print('我来自另一模块')
```

运行输出如下：

```bash
# 运行模块本身
$ python using_name.py
程序自身在运行

# 导入模块
$ python
>>> import using_name
我来自另一模块
>>>
```

### 4. 加速模块加载

为了加快模块的加载速度，Python 会将每个模块的编译版本（如\*.pyc）会缓存在`__pycache__`​下的目录中。生成编译文件pyc的详细过程，可以参考文档[PEP 3147](https://www.python.org/dev/peps/pep-3147/)。

Python 会根据编译版本检查源代码的修改日期，以查看它是否已过期并需要重新编译。

### 5. Python中的包

当模块文件过多时，我们可以将多个模块放到一个文件夹中，而这个文件夹就称为**包**。包是一个分层次的文件目录结构，它定义了一个由模块及子包，和子包下的子包等组成的 Python 的应用环境。

简单来说，包就是文件夹，但该文件夹下必须存在 \_\_init\_\_.py 文件, 该文件的内容可以为空。 **__init__.py** 用于标识当前文件夹是一个包。**例如，A.B指定的是在命名为B的包中命名为A的子模块。**

```bash
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              ...
```

​`__init__.py`​ 必须有这个文件，才能使 Python 将包含该文件的目录视为包（Package）。`__init__.py`​可以是一个空文件，也可以执行包的初始化代码或设置__all__变量。`formats/ `​、`effects/`​ 、`filters/ `​是次一级的子包（Subpackage），每个子包中也有`__init__.py `​文件。`echo.py`等文件是子包中的模块（Module），模块中可能包含函数、类或变量。

> **利用__all__提供包的显式索引**  
> 当我们直接采用`from sound.effects import * `时，可能会引用一些不需要的内容，或者导致加载速度过慢。
>
> 这时我们可以通过在__init__.py中定义一个`_all__`​列表，来指定用 `* `时应导入的模块名称列表：
>
> ```bash
> __all__ = ["echo", "surround", "reverse"]
> ```
>
> 这样我们就可以维护在import * 时需要导入的模块列表，在发布不同版本的包时很有用。

## 标准库中的模块和函数

Python 标准库中提供了大量的模块和函数来简化我们的开发工作，我们之前用过的`random`​模块就为我们提供了生成随机数和进行随机抽样的函数；而`time`​模块则提供了和时间操作相关的函数；我们之前用到过的`math`模块中还包括了计算正弦、余弦、指数、对数等一系列的数学函数。随着我们深入学习 Python 语言，我们还会用到更多的模块和函数。

Python 标准库中还有一类函数是不需要`import`​就能够直接使用的，我们将其称之为**内置函数**，这些内置函数不仅有用而且还很常用，下面的表格列出了一部分的内置函数。

|函数|说明|
| ------| --------------------------------------------------------------|
|​`abs`|返回一个数的绝对值，例如：`abs(-1.3)`​会返回`1.3`。|
|​`bin`|把一个整数转换成以`'0b'`​开头的二进制字符串，例如：`bin(123)`​会返回`'0b1111011'`。|
|​`chr`|将Unicode编码转换成对应的字符，例如：`chr(8364)`​会返回`'€'`。|
|​`hex`|将一个整数转换成以`'0x'`​开头的十六进制字符串，例如：`hex(123)`​会返回`'0x7b'`。|
|​`input`|从输入中读取一行，返回读到的字符串。|
|​`len`|获取字符串、列表等的长度。|
|​`max`|返回多个参数或一个可迭代对象中的最大值，例如：`max(12, 95, 37)`​会返回`95`。|
|​`min`|返回多个参数或一个可迭代对象中的最小值，例如：`min(12, 95, 37)`​会返回`12`。|
|​`oct`|把一个整数转换成以`'0o'`​开头的八进制字符串，例如：`oct(123)`​会返回`'0o173'`。|
|​`open`|打开一个文件并返回文件对象。|
|​`ord`|将字符转换成对应的Unicode编码，例如：`ord('€')`​会返回`8364`。|
|​`pow`|求幂运算，例如：`pow(2, 3)`​会返回`8`​；`pow(2, 0.5)`​会返回`1.4142135623730951`。|
|​`print`|打印输出。|
|​`range`|构造一个范围序列，例如：`range(100)`​会产生`0`​到`99`的整数序列。|
|​`round`|按照指定的精度对数值进行四舍五入，例如：`round(1.23456, 4)`​会返回`1.2346`。|
|​`sum`|对一个序列中的项从左到右进行求和运算，例如：`sum(range(1, 101))`​会返回`5050`。|
|​`type`|返回对象的类型，例如：`type(10)`​会返回`int`​；而`type('hello')`​会返回`str`。|