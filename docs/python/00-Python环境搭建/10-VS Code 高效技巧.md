---
title: VS Code 高效技巧
category: Python VSCode
---

# VS Code 高效技巧｜新建 Python 文件自动生成标准化文件头

> **痛点**：每次新建 `.py` 文件都要手动敲一遍 `# -*- coding: utf-8 -*-` 和作者信息？重复劳动既繁琐又容易遗漏。
> **方案**：利用 VS Code 的「用户代码片段（User Snippets）」功能，输入关键词即可一键插入包含文件名、时间戳、作者、版本号的标准化文档头。


## 一、效果预览

新建文件后，输入 `desc`（可自定义）并回车，即可自动生成：

```python
# -*- encoding: utf-8 -*-
'''
@File        :   data_processor.py
@Time        :   2024/01/15 14:30:45
@Author      :   xcy.小相
@Version     :   1.0
@Description :   
'''
```

光标会自动停留在 `@Description` 后，直接输入文件说明即可。

---

## 二、配置步骤

### Step 1：打开代码片段配置

点击顶部菜单栏：**文件** → **首选项** → **用户代码片段**（Windows/Linux 快捷键 `Ctrl+Shift+P` / Mac `Cmd+Shift+P`，输入 "snippets"）。

### Step 2：选择 Python 配置文件

在搜索框输入 `python`，选择 **python.json**（全局生效）或带项目名的选项（仅当前工作区生效）。

### Step 3：粘贴配置模板

将以下代码粘贴进打开的 `python.json` 文件中（注意保留外层大括号）：

```json
{
    "Python File Header": {
        "prefix": "desc",
        "body": [
            "# -*- encoding: utf-8 -*-",
            "'''",
            "@File        :   $TM_FILENAME",
            "@Time        :   $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
            "@Author      :   xcy.小相",
            "@Version     :   1.0",
            "@Description :   $0",
            "'''",
            "",
            ""
        ],
        "description": "Generate Python file header template"
    }
}
```

> **💡 配置说明**：
>
> - `prefix`: 触发关键词，建议设为 `desc`（description 缩写）或 `header`，输入后按 `Tab` 即可展开
> - `body`: 模板内容，支持 VS Code 内置变量（见下文）
> - `$0`: 最终光标停留位置（模板插入后，光标会落在这里）

**保存后立即生效**，无需重启 VS Code。

---

## 三、内置变量速查表

VS Code 提供丰富的动态变量，让文件头信息自动填充：

| 变量名 | 含义                   | 示例输出     |
| :------- | :----------------------- | :------------- |
| `$TM_FILENAME`       | 当前文件名（含扩展名） | `main.py`             |
| `$TM_FILENAME_BASE`       | 文件名（不含扩展名）   | `main`             |
| `$CURRENT_YEAR`       | 当前年份               | `2024`             |
| `$CURRENT_MONTH`       | 当前月份（补零）       | `01`             |
| `$CURRENT_DATE`       | 当前日期（补零）       | `15`             |
| `$CURRENT_HOUR`       | 当前小时（24小时制）   | `14`             |
| `$CURRENT_MINUTE`       | 当前分钟               | `30`             |
| `$CURRENT_SECOND`       | 当前秒                 | `45`             |
| `$WORKSPACE_NAME`       | 当前工作区/文件夹名称  | `MyProject`             |
| `$0`       | 最终光标位置           | 用于输入描述 |

---

## 四、使用方式

### 方式一：关键词触发（推荐）

新建 `.py` 文件 → 输入 `desc` → 看到 IntelliSense 提示后按 **`Tab`** 或 **`Enter`** → 模板自动展开，光标定位到描述行。

### 方式二：命令面板插入

按 `Ctrl+Shift+P`（Mac `Cmd+Shift+P`）→ 输入  **"插入代码片段"**  → 选择 **Python File Header**。

---

## 五、进阶玩法

### 1. 添加 Shebang 行（Linux/Mac 可执行脚本）

如需让 Python 文件可直接运行，在 `body` 数组首行添加：

```json
"#!/usr/bin/env python3",
```

### 2. 多光标快速填写

若希望按 `Tab` 键依次填写作者、版本、描述，可修改变量占位符：

```json
"@Author      :   $1",
"@Version     :   $2",
"@Description :   $3",
```

这样插入模板后，先填写作者（`$1`），按 Tab 跳转到版本（`$2`），再按 Tab 到描述（`$3`）。

### 3. 团队统一规范

将配置保存到项目根目录的 `.vscode/python.json`（工作区代码片段），提交到 Git 仓库，确保团队成员使用统一的文件头格式。

---

## 六、常见问题

**Q：输入** **`desc`** **后没有提示？** 
A：检查文件语言模式是否为 Python（看右下角是否显示 **Python**），或尝试重启 VS Code。

**Q：想修改默认的作者名？** 
A：直接在 JSON 中修改 `"@Author      :   xcy.小相"` 这一行，改为你的名字或 `$TM_FULLNAME`（读取系统用户名）。

**Q：时间格式想改成** **`2024-01-15`** **？** 
A：修改变量拼接方式，例如：`"$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE"`。

---

## 总结

通过「用户代码片段」功能，我们将重复的文件头编写过程自动化，不仅提升了编码效率，更保证了项目文档的规范性。建议配合 **Black** 或 **Ruff** 等代码格式化工具使用，打造更专业的 Python 开发环境。

**觉得有用？**  收藏本文并转发给需要的朋友，或在评论区分享你的 VS Code 效率技巧 👇