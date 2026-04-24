---
title: "00-LangChain系列索引"
date: "2026-04-24T18:00:15.269Z"
lastUpdated: "2026-04-24T18:00:15.269Z"
description: "本系列共 21 篇，系统讲解 LangChain 1.0 和 LangGraph 的核心概念与实战技巧。"
---



# 00-LangChain系列索引

# LangChain 1.0 学习笔记 - 系列索引

> 本系列共 21 篇，系统讲解 LangChain 1.0 和 LangGraph 的核心概念与实战技巧。

## 📚 系列概览

|Part|主题|文章数|核心内容|
| --------| ------------------| --------| -----------------------------------------------------|
|Part 1|基础速通|3 篇|LLM/Agent 概念、环境搭建、生态全景|
|Part 2|核心能力|6 篇|模型集成、Tools、Prompt、结构化输出、流式输出、记忆|
|Part 3|LangGraph 工作流|5 篇|状态图、条件边、子图、人在回路、设计模式|
|Part 4|RAG 系统|4 篇|文档加载、混合检索、多模态 RAG、服务化|
|Part 5|生产实战|3 篇|智能客服、研究助手、部署监控|

---

## 📖 文章目录

### Part 1：基础速通

|编号|标题|关键词|
| ------| -----------------------------------| ------------------------------------------|
|01|从 LLM 到 Agent：概念与演进|LLM、Agent 四大模块、LangChain 定位|
|02|第一个 AI Agent：环境搭建与初体验|uv/pip、API Key、create_agent|
|03|LangChain 1.0 生态全景与迁移指南|六大组件、0.x→1.0 迁移、init_chat_model|

### Part 2：核心能力

|编号|标题|关键词|
| ------| ---------------------------------| -------------------------------------------|
|04|模型集成：统一接口与多厂商适配|init_chat_model、BaseChatModel、硅基流动|
|05|Tools：让 Agent 拥有超能力|@tool、ReAct、Tool-Calling、MCP|
|06|Prompt 工程：从模板到角色设计|System Prompt、ChatPromptTemplate、防幻觉|
|07|结构化输出：Pydantic 与类型安全|Pydantic、with_structured_output、校验|
|08|流式输出：从 Token 到 SSE|stream()、astream()、FastAPI SSE|
|09|记忆机制：短期记忆与长期记忆|Checkpointer、InMemorySaver、Token 管理|

### Part 3：LangGraph 工作流

|编号|标题|关键词|
| ------| ------------------------------------| -------------------------------------|
|10|LangGraph 入门：状态图与节点编排|StateGraph、TypedDict、reducer|
|11|条件边与循环：让工作流动起来|条件边、Command、循环控制|
|12|子图与并行：模块化与性能|Subgraphs、Send API、并行执行|
|13|人在回路：中断、审核与恢复|interrupt()、HITL、Command(resume)|
|14|LangGraph 设计模式：四种经典工作流|提示链、路由、并行化、编排者-工作者|

### Part 4：RAG 系统

|编号|标题|关键词|
| ------| ------------------------------------| ---------------------------------------|
|15|RAG 基础：文档加载、切分与向量检索|Document Loader、Text Splitter、FAISS|
|16|RAG 进阶：混合检索与多路召回|BM25、Multi-query、HyDE、Reranking|
|17|多模态 RAG：图像、语音与文档理解|Qwen-VL、Base64、CLIP、多模态检索|
|18|RAG 服务化：FastAPI 与流式接口|RESTful API、SSE、文档上传|

### Part 5：生产实战

|编号|标题|关键词|
| ------| ----------------------------------| -----------------------------------------------------|
|19|智能客服项目：从架构到完整实现|意图识别、知识库、工单、人工转接、Gradio|
|20|研究助手项目：深度搜索与报告生成|编排者-工作者、子 Agent、Deep Agents、Markdown 报告|
|21|生产部署：测试、监控与优化|LangSmith、Docker、Prometheus、成本控制|

---

## 🎯 学习路径建议

### 零基础读者

```
01 → 02 → 03 → 04 → 05 → 06 → 10 → 15 → 19
```

### 有 0.x 经验

```
03（迁移部分）→ 04 → 05 → 08 → 10 → 14 → 19
```

### 专注 RAG

```
03 → 04 → 05 → 06 → 15 → 16 → 17 → 18
```

### 专注 Agent

```
03 → 04 → 05 → 06 → 07 → 09 → 10 → 11 → 14 → 19 → 20
```

---

## 🔗 相关资源

- [LangChain 官方文档](https://python.langchain.com/)
- [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/)
- [硅基流动](https://www.siliconflow.cn/)
- [GitHub - LangChain](https://github.com/langchain-ai/langchain)

---

## 📝 版本信息

- **LangChain 版本**: 1.0+
- **Python 版本**: 3.10+
- **最后更新**: 2026-04-23

---

*本系列由 AI 辅助创作，仅供学习交流使用。*

‍
