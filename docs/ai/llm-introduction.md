---
title: 大语言模型入门指南
date: 2025-02-26
---

## 什么是大语言模型

大语言模型（Large Language Model，LLM）是基于 Transformer 架构，通过海量文本数据训练的深度学习模型。代表性模型包括：

- **GPT 系列** — OpenAI（GPT-4、GPT-4o）
- **Claude 系列** — Anthropic（Claude 3.5 Sonnet）
- **GLM 系列** — 智谱 AI（GLM-4）
- **Qwen 系列** — 通义千问
- **Llama 系列** — Meta（开源）

## 核心概念

### Transformer 架构

```
输入文本 → Tokenization → Embedding → Transformer 层 × N → 输出
                                        ├── Self-Attention
                                        ├── Feed Forward
                                        └── Layer Norm
```

### Tokenization

文本被切分为 token（子词单元）：

```
"Hello World" → ["Hello", " World"]
"VitePress"   → ["Vi", "te", "Press"]
```

## Prompt Engineering 技巧

1. **明确指令** — 说清楚你想要什么
2. **提供示例** — Few-shot learning 效果更好
3. **分步思考** — 让模型 "chain of thought"
4. **角色扮演** — "你是一个资深的 Java 开发工程师"

## 常用 API 调用

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.openai.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个技术助手"},
        {"role": "user", "content": "解释 Docker 和虚拟机的区别"}
    ]
)

print(response.choices[0].message.content)
```
