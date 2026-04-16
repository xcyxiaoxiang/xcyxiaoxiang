---
title: Python 开发环境搭建
date: 2025-01-16
---

## 安装 Python

推荐使用官方安装包或 pyenv 进行版本管理：

```bash
# macOS (Homebrew)
brew install python@3.12

# Ubuntu/Debian
sudo apt update && sudo apt install python3.12 python3-pip

# 使用 pyenv 管理多版本
curl https://pyenv.run | bash
pyenv install 3.12.0
pyenv global 3.12.0
```

## 虚拟环境

```bash
# 创建虚拟环境
python -m venv .venv

# 激活
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate     # Windows

# 退出
deactivate
```

## 包管理

```bash
# 生成依赖
pip freeze > requirements.txt

# 安装依赖
pip install -r requirements.txt
```

## IDE 推荐

- **VS Code** — 轻量、插件丰富，配合 Python 扩展体验极佳
- **PyCharm** — JetBrains 出品，功能最全面
- **Cursor** — AI 辅助编程，适合快速开发
