---
title: "星期二 Python 环境搭建"
date: 2025-05-14
---

![image](/python/week1/《30 Days For Python》封面设计-20250514173909-dwp2h9r.png)

# 星期二 Python 环境搭建

工欲善其事，必先利其器。在开启Python编程世界的探索之旅前，搭建完善的开发环境是每位开发者必经的奠基仪式。作为现代编程领域的瑞士军刀，Python的官方解释器CPython（由C语言编写的高效核心）将成为您征服代码世界的最佳利器。请跟随以下精心编排的环境部署指南，逐步构建属于您的编程方舟。

首先，我们需要从官方网站的[下载页面](https://www.python.org/downloads/)找到下载链接，点击“Download”按钮进入下载页面后，需要根据自己的操作系统选择合适的 Python 3安装包程序，如下图所示。

![image](/python/week1/image-20250514175135-zn02muy.png)

## Windows安装

下面我们以 Windows 11为例，讲解如何在 Windows 操作系统上安装 Python 环境。双击运行从官网下载的安装程序，会打开一个安装向导，如下图所示。

![](/python/week1/install_python_1-20250211155625-anta70y.png)

首先，一定要记得==勾选“Add python.exe to PATH”选项==，它会帮助我们将 Python 解释器添加到 Windows 系统的 PATH 环境变量中（不理解没关系，勾上就对了）；其次，“Use admin privileges when installing py.exe”是为了在安装过程中获得管理员权限，建议勾选。然后，我们选择“Customize Installation”，使用自定义安装的模式，这是专业人士的选择，而你就（假装）是那个专业人士，不建议使用“Install Now”（默认安装）。

接下来，安装向导会提示你勾选需要的“Optional Features”（可选特性），这里咱们可以直接全选。值得一提的是其中的第2项，它是 Python 的包管理工具 pip，可以帮助我们安装三方库和三方工具，所以一定要记得勾选它，然后点击“Next”进入下一环节。

![](/python/week1/install_python_2-20250211155625-xvdevea.png)

接下来是对“Advanced Options”（高级选项）的选择，这里我们建议大家只勾选“Add Python to environment variables”和“Precompile standard library”这两个选项，前者会帮助我们自动配置好环境变量，后者会预编译标准库（生成`.pyc`​文件），这样在使用时就无需临时编译了。还是那句话，不理解没关系，勾上就对了。下面的“Customize install location”（自定义安装路径）**强烈建议**修改为自定义的路径，这个路径中不应该包含中文、空格或其他特殊字符，注意这一点会为你将来减少很多不必要的麻烦。设置完成后，点击“Install”开始安装。

![](/python/week1/install_python_3-20250211155625-0nncom0.png)

安装成功会出现如下图所示的画面，安装成功的关键词是“successful”，如果安装失败，这里的单词会变成“failed”。

![](/python/week1/install_python_4-20250211155625-6ahemtj.png)

安装完成后可以打开 Windows 的“命令行提示符”或 PowerShell，然后输入`python --version`​或`python -V`​来检查安装是否成功，这个命令是查看 Python 解释器的版本号。如果看到如下所示的画面，那么恭喜你，Python 环境已经安装成功了。这里我们建议再检查一下 Python 的包管理工具 pip 是否可用，对应的命令是`pip --version`​或`pip -V`。

![](/python/week1/install_python_5-20250211155625-mmszyuc.png)

## macOS安装

macOS 安装 Python 环境相较于 Windows 系统更为简单，我们从官方下载的安装包是一个`pkg`文件，双击运行之后不断的点击“继续”就安装成功了，几乎不用做任何的设置和勾选，如下图所示。

![](/python/week1/install_python_6-20250211155625-r1w9p3k.png)

安装完成后，可以在 macOS 的“终端”工具中输入`python3 --version`​命令来检查是否安装成功，注意这里的==命令是==​==​`python3`​==​不是`python`​！！！然后我们再检查一下包管理工具，输入命令`pip3 --version`，如下图所示。

![](/python/week1/install_python_7-20250211155625-pang5pi.png)

## Linux安装

如果你正在使用Linux，那我可以假定你有Linux系统管理经验，自行安装Python 3应该没有问题，否则，请换回Windows系统。

> 💡小提示
>
> 主流的Linux发行版本都会默认安装Python。可以在终端输入命令`Python --version`，查看当前系统的Python版本。

## Anaconda方式安装

也可以直接安装 [Anaconda](https://www.anaconda.com/download/success)，因为 Anaconda 会帮助我们安装 Python 解释器以及一些常用的三方库，除此之外还提供了一些便捷的工具，特别适合萌新小白。

> **小提示**
>
> Python在Linux/macOS的命令是python3，在Windows下的命令是python，后续请自行根据操作系统选择合适的命令。

## Hello，World

按照行业惯例，我们学习任何一门编程语言写的第一个程序都是输出`hello, world`​，因为这段代码是伟大的丹尼斯·里奇（C 语言之父，和肯·汤普森一起开发了 Unix 操作系统）和布莱恩·柯尼汉（awk 语言的发明者）在他们的不朽著作《*The C Programming Language*》中写的第一段代码。下面我们会以Linux/windows系统作为使用系统，执行我们的第一段Python代码。

打开Linux终端 或者是 window PowerShell，输入Python3（Linux系统）或Python（window系统）进入Python交互界面，输入`print("hello, world")`​，回车执行。所谓交互式环境，就是我们输入一行代码并按下`Enter`键，代码马上会被执行，如果代码有产出结果，那么结果会被显示在窗口中；输入exit()后窗口会直接关闭。如下所示。

```python
(base) ➜  ~ python3        
Python 3.11.10 (main, Oct  3 2024, 07:29:13) [GCC 11.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello world")
hello world
>>> exit()
(base) ➜  ~ 
```

## 编写代码的工具

以上运行`hello world`​的方式很简洁，但却不能保存，下次执行时需要重新输入。python代码文件以`.py`​结尾，通过命令`python3 file_name.py`来执行Python文件。当Python文件过多时，我们就需要一个集成开发工具来进行持续开发了。下面我们为大家讲解几种可以编写和运行 Python 代码的工具，大家可以根据自己的需求来选择合适的工具。

### Visual Studio Code - 文本编辑神器

Visual Studio Code 是由微软开发能够在 Windows、 Linux 和 macOS 等操作系统上运行的代码编辑神器。它支持语法高亮、自动补全、多点编辑、运行调试等一系列便捷功能，而且能够支持多种编程语言。如果大家要选择一款高级文本编辑工具，强烈推荐 Visual Studio Code，关于它的[下载](https://code.visualstudio.com/)、安装和使用，有兴趣的读者可以自行研究。

![image](/python/week1/image-20250514211059-7hiqca7.png)

### PyCharm - 集成开发环境

PyCharm 是由 JetBrains 打造的一款专业的 Python IDE，支持 macOS、 Windows、 Linux 系统。

官方提供了两个 PyCharm 的版本，一个是免费的社区版（Community Edition），功能相对弱小，但对于初学者来说是完全够用的；另一个是付费的专业版（Professional Edition），功能非常强大，但需要按年或按月支付费用。PyCharm 的安装没有任何难度，运行下载的安装程序，几乎全部使用默认设置进行安装就可以了。

![image](/python/week1/image-20250514210739-oaoy2gt.png)