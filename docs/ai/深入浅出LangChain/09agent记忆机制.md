---
title: "09-Agent记忆机制"
date: "2026-04-28T16:07:52.892Z"
lastUpdated: "2026-04-28T16:07:52.892Z"
description: "LLM 本质上是无状态的——每次 API 调用都是一次独立的请求，模型不会记住上一次对话的内容。这意味着一个没有记忆配置的 Agent，每轮对话都像重新认识用户一样。要让 Agent 具备记忆能力，必须从外部实现状态的持久化与管理。 本章将从三个维度系统讲解 Agent 的记忆机制：短期记忆（对话上..."
---

# 09-Agent记忆机制

# Agent记忆机制

## 一、本章导学

　　　　LLM 本质上是无状态的——每次 API 调用都是一次独立的请求，模型不会记住上一次对话的内容。这意味着一个没有记忆配置的 Agent，每轮对话都像重新认识用户一样。要让 Agent 具备记忆能力，必须从外部实现状态的持久化与管理。

　　　　本章将从三个维度系统讲解 Agent 的记忆机制：短期记忆（对话上下文管理）、长期记忆（跨会话语义检索）和上下文工程（Token 预算分配与压缩）。学完本章后，你能构建出"记住用户"的智能应用，并在有限的 Token 预算内实现最优的上下文管理。

## 二、短期记忆：对话上下文

### 2.1 消息列表与状态

　　　　先看一个最直接的问题：不配置任何记忆机制时，Agent 表现如何？

```python
# -*- encoding: utf-8 -*-
'''
@File        :   memory_demo01.py
@Time        :   2026/04/27 17:28:48
@Author      :   xcy.小相 
@Version     :   1.0
@Description :   09-Agent记忆机制
'''

from langchain.chat_models import init_chat_model
from langchain.agents import create_agent
from dotenv import load_dotenv
import os

load_dotenv()

llm = init_chat_model(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
    model_provider="openai"
)

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="你是一个友好的助手，用中文回答。",
)

result1 = agent.invoke({"messages": [{"role": "user", "content": "我叫小明"}]})
print(result1["messages"][-1].content)

result2 = agent.invoke({"messages": [{"role": "user", "content": "我叫什么名字？"}]})
print(result2["messages"][-1].content)
```

　　　　输出：

```
你好小明！很高兴认识你...
你还没有告诉我你的名字。
```

　　　　第二次调用时，Agent 完全不记得第一轮对话中用户说过"我叫小明"。原因很简单：LLM 的每次调用都是独立的，没有任何状态在两次调用之间传递。

```mermaid
flowchart LR
    subgraph A["无记忆"]
        A1["每轮独立"] --- A2["无法跨轮引用"]
    end
    subgraph B["短期记忆<br/>Checkpointer"]
        B1["会话内记忆"] --- B2["thread_id 隔离"]
        B2 --- B3["消息逐轮累积"]
    end
    subgraph C["长期记忆<br/>向量数据库"]
        C1["跨会话记忆"] --- C2["语义检索"]
        C2 --- C3["个性化上下文"]
    end
    A -->|"InMemorySaver"| B
    B -->|"FAISS / Milvus"| C
```

> 图 9-1：记忆的三层架构。从无状态的独立调用，到会话内的短期记忆，再到跨会话的长期记忆，每一层都是对前一层的扩展。

### 2.2 Checkpointer 与 InMemorySaver

　　　　LangGraph 通过 `Checkpointer`​ 实现记忆。最简单的实现是 `InMemorySaver`，将对话历史存储在进程内存中：

```python
# 在上一步的基础上导入InMemorySaver
from langgraph.checkpoint.memory import InMemorySaver

……

# 创建记忆机制
check_point = InMemorySaver()
# 为agent配置checkpointer
agent = create_agent(
    model=llm,
    checkpointer=check_point,
    tools=[],
    system_prompt="你是一个友好的助手，用中文回答。",
)
……

# 用于区分不同的对话 每个thread_id都有一个独立的checkpointer
config = {"configurable": {"thread_id": "user-001"}}
result1 = agent.invoke({"messages": [{"role": "user", "content": "我叫小明"}]}, config=config)
print(result1["messages"][-1].content)

result2 = agent.invoke({"messages": [{"role": "user", "content": "我叫什么名字？"}]}, config=config)
print(result2["messages"][-1].content)

```

　　　　输出：

```
你好啊，小明！很高兴认识你。有什么我可以帮你的吗？😊
你之前告诉我你叫小明哦！不过如果你现在想改名字或者有其他称呼，也可以告诉我，我会记住的 😊 有什么需要帮助的吗？
```

　　　　`checkpointer` 是记忆功能的核心开关。没有它，Agent 就是无状态的；有了它，Agent 在同一 `thread_id` 下能记住所有历史对话。

　　　　**thread_id 与会话隔离**。不同的 `thread_id` 代表完全独立的会话，效果类似于聊天应用中点击"新建对话"：

```python
import uuid

config_a = {"configurable": {"thread_id": f"alice"}}
config_b = {"configurable": {"thread_id": f"bob"}}

agent.invoke({"messages": [{"role": "user", "content": "我叫Alice，前端工程师"}]}, config=config_a)
agent.invoke({"messages": [{"role": "user", "content": "我叫Bob，在学Python"}]}, config=config_b)

resp_a = agent.invoke({"messages": [{"role": "user", "content": "我叫什么？"}]}, config=config_a)
print(resp_a["messages"][-1].content)  # "你叫Alice，是一名前端工程师。"

resp_b = agent.invoke({"messages": [{"role": "user", "content": "我叫什么？"}]}, config=config_b)
print(resp_b["messages"][-1].content)  # "你叫Bob，在学Python。"
```

　　　　推荐采用 `{user_id}` 的格式来设计 `thread_id`，同时解决多用户隔离和同一用户多会话管理两个问题。

　　　　**记忆的工作原理**。每次调用 `agent.invoke` 时，LangGraph 在底层执行五个步骤：

1. 从 Checkpointer 加载该 `thread_id` 的历史消息
2. 将新的用户消息追加到消息列表末尾
3. 将完整的消息列表发送给 LLM
4. LLM 基于完整上下文生成回答
5. 将新消息（用户消息 + AI 回答）保存回 Checkpointer

```mermaid
stateDiagram-v2
    [*] --> 新会话: 用户发起对话
    新会话 --> 首轮对话: invoke() + thread_id
    首轮对话 --> 多轮对话: 用户继续提问
    多轮对话 --> 多轮对话: 自动加载历史 + 追加新消息
    多轮对话 --> 窗口管理: 消息超过上下文限制
    窗口管理 --> 多轮对话: trim_messages / 摘要压缩
    多轮对话 --> [*]: 会话结束
    新会话 --> [*]: 新 thread_id 隔离
```

> 图 9-2：基于 Checkpointer 的对话状态转换。每次 invoke 都经历"加载历史 → 追加消息 → 调用 LLM → 保存状态"的循环。

　　　　**持久化存储**。`InMemorySaver` 适合开发和测试，但程序重启后所有对话历史消失。生产环境推荐使用 `SqliteSaver` 或 `PostgresSaver`：

```python
from langgraph.checkpoint.sqlite import SqliteSaver

checkpointer = SqliteSaver.from_conn_string("chat_history.db")

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="你是一个助手，用中文回答。",
    checkpointer=checkpointer,
)
```

　　　　三者都实现相同的 Checkpointer 接口，切换时只需改一行初始化代码：

|方案|数据持久化|并发支持|适用场景|
| ----| --------------| --------| --------|
|`InMemorySaver`|否|单进程|开发测试|
|`SqliteSaver`|是（本地文件）|有限|小型应用|
|`PostgresSaver`|是|好|生产环境|

　　　　**SqliteSaver 的完整配置**。SQLite 是最简单的持久化方案，只需一个本地文件：

```python
# -*- encoding: utf-8 -*-
'''
@File        :   memory_demo02.py
@Time        :   2026/04/27 17:28:48
@Author      :   xcy.小相 
@Version     :   1.0
@Description :   09-Agent记忆机制
'''

from langchain.chat_models import init_chat_model
from langchain.agents import create_agent
from dotenv import load_dotenv
import os
from langgraph.checkpoint.sqlite import SqliteSaver

load_dotenv()

llm = init_chat_model(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
    model_provider="openai"
)

with SqliteSaver.from_conn_string("chat_history.db") as checkpointer:
    agent = create_agent(
        model=llm,
        checkpointer=checkpointer,
        tools=[],
        system_prompt="你是一个友好的助手，用中文回答。",
    )

    config = {"configurable": {"thread_id": "user-001"}}

    # 第一次对话
    result1 = agent.invoke({"messages": [{"role": "user", "content": "我叫小明"}]}, config=config)
    print("第一轮回复：", result1["messages"][-1].content)

    # # 重启，注释第一句，去掉注释第二句
    # result2 = agent.invoke({"messages": [{"role": "user", "content": "我叫什么名字？"}]}, config=config)
    # print("第二轮回复：", result2["messages"][-1].content)
```

　　程序重启后，`chat_history.db`​ 文件中的对话历史仍然存在，用同一个 `thread_id` 可以继续上次的对话。

```bash
> uv run .\memory_demo02.py
第一轮回复： 
小明，很高兴再次见到你！今天有什么我可以帮你的吗？ 😊

# 注释第一次对话代码，取消注释第二次对话代码

> uv run .\memory_demo02.py
第二轮回复： 
小明，很高兴再次见到你！今天有什么我可以帮你的吗？ 😊
```

　　　　**PostgresSaver 的完整配置**。生产环境推荐 PostgreSQL，支持高并发和可靠持久化：

```python
from langgraph.checkpoint.postgres import PostgresSaver
from psycopg_pool import ConnectionPool

pool = ConnectionPool(
    conninfo=os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/mydb"),
    max_size=10,
)

checkpointer = PostgresSaver(pool)
checkpointer.setup()

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="你是一个助手，用中文回答。",
    checkpointer=checkpointer,
)
```

　　　　`checkpointer.setup()` 在首次使用时创建必要的数据库表。`ConnectionPool` 管理数据库连接池，`max_size` 控制最大并发连接数。

　　　　**三种 Checkpointer 的详细对比：**

|特性|InMemorySaver|SqliteSaver|PostgresSaver|
| ----------| -------------| -----------| ---------------|
|持久化|内存|本地文件|数据库|
|重启后数据|丢失|保留|保留|
|多进程共享|不支持|文件锁限制|完全支持|
|并发写入|无|单写者|多写者|
|安装依赖|内置|`langgraph-checkpoint-sqlite`|`langgraph-checkpoint-postgres`|
|额外服务|无|无|PostgreSQL 服务|
|生产建议|仅开发|单机部署|**推荐**|

　　　　切换 Checkpointer 只需修改初始化代码，Agent 的其他代码完全不变。这种设计让从开发到生产的迁移成本极低。

### 2.3 消息裁剪策略

　　　　消息列表是逐轮累积的。第 1 轮有 2 条消息，第 50 轮就是 100 条。当消息总量超过模型的上下文窗口时，就会出问题。不同模型的上下文窗口大小差异很大：

|模型|上下文窗口|约可容纳中文字数|
| -----------------| -----------| ----------------|
|Qwen3-8B|32K tokens|~2.5 万字|
|GPT-4o-mini|128K tokens|~10 万字|
|Claude 3.5 Sonnet|200K tokens|~15 万字|

　　　　LangChain 提供了 `trim_messages` 工具，支持按 Token 数量裁剪：

```python
from langchain.messages import trim_messages

trimmed = trim_messages(
    messages=state["messages"],
    max_tokens=50000,
    strategy="last",
    token_counter=len,
    include_system=True,
    allow_partial=False,
    start_on="human",
)
```

　　　　关键参数：`strategy="last"` 保留最新消息；`include_system=True` 确保始终保留 SystemMessage（包含角色定义，不应被裁剪掉）；`start_on="human"` 确保裁剪后的消息列表以用户消息开头，避免 AI 消息出现在首位导致模型困惑。

　　　　**Token 阈值裁剪算法**。精确的 Token 级裁剪需要考虑以下要素：System Message 固定占用、每条消息的 Token 开销（角色标签 + 内容）、输出预留空间。完整的裁剪算法如下：

```
输入:
  messages: 当前消息列表
  max_tokens: 可用 Token 预算（= 总窗口 - 输出预留）
  system_overhead: System Message 的 Token 数

裁剪流程:
  1. 分离 SystemMessage 和其他消息
  2. 计算 system_overhead
  3. 从最新的非系统消息开始，向前累加 Token：
     budget = max_tokens - system_overhead
     while budget > 0 and 消息未遍历完:
       msg = 下一条更早的消息
       if count(msg) <= budget:
         保留该消息
         budget -= count(msg)
       else:
         停止（allow_partial=False 时不切割单条消息）
  4. 确保第一条保留的非系统消息是 HumanMessage
  5. 返回 [SystemMessage] + [保留的消息]
```

　　　　结合 tiktoken 可以实现精确的 Token 级裁剪：

```python
import tiktoken

def make_token_counter(model: str = "gpt-4o-mini"):
    enc = tiktoken.encoding_for_model(model)
    def counter(messages):
        return sum(len(enc.encode(m.content)) for m in messages)
    return counter

def smart_trim(messages, max_tokens: int = 8000):
    token_counter = make_token_counter()
    if token_counter(messages) <= max_tokens:
        return messages
    return trim_messages(
        messages=messages,
        max_tokens=max_tokens,
        strategy="last",
        token_counter=token_counter,
        include_system=True,
        allow_partial=False,
        start_on="human",
    )
```

　　　　以下是一个完整的 Token 阈值裁剪示例，展示从 20 条消息中裁剪到指定预算的过程：

```python
from langchain.messages import SystemMessage, HumanMessage, AIMessage, trim_messages

def count_chars(messages) -> int:
    return sum(len(m.content) for m in messages)

messages = [SystemMessage(content="你是一个技术助手，回答简洁专业。")]
for i in range(1, 11):
    messages.append(HumanMessage(content=f"第{i}个问题：解释一下Python中的装饰器、生成器、上下文管理器和元类的原理与用法"))
    messages.append(AIMessage(content=f"关于第{i}个问题：装饰器是修改函数行为的高阶函数，生成器是惰性求值的迭代器，上下文管理器通过__enter__和__exit__管理资源，元类是类的类，控制类的创建过程。"))

print(f"原始消息数: {len(messages)}, 字符数: {count_chars(messages)}")

for budget in [500, 300, 150]:
    trimmed = trim_messages(
        messages=messages,
        max_tokens=budget,
        strategy="last",
        token_counter=count_chars,
        include_system=True,
        allow_partial=False,
        start_on="human",
    )
    human_count = sum(1 for m in trimmed if m.type == "human")
    ai_count = sum(1 for m in trimmed if m.type == "ai")
    print(f"预算 {budget:>4} 字符: {len(trimmed)} 条消息 "
          f"(System=1, Human={human_count}, AI={ai_count})")
```

　　　　运行结果：

```
原始消息数: 21, 字符数: 1428
预算  500 字符: 9 条消息 (System=1, Human=4, AI=4)
预算  300 字符: 5 条消息 (System=1, Human=2, AI=2)
预算  150 字符: 3 条消息 (System=1, Human=1, AI=1)
```

　　　　随着预算缩小，较早的消息被逐步裁剪，但 System Message 始终保留，且消息列表始终以 HumanMessage 开头。

### 2.4 对话摘要

　　　　裁剪的直接问题是丢弃信息。一种更好的方案是"摘要 + 近期消息"——当消息数量超过阈值时，调用 LLM 将旧消息压缩为摘要，只保留最近几轮的完整对话：

```python
# -*- encoding: utf-8 -*-
'''
@File        :   memory_demo03.py
@Time        :   2026/04/27 18:15:09
@Author      :   xcy.小相 
@Version     :   1.0
@Description :   09-Agent记忆机制
'''

from langchain.chat_models import init_chat_model
from langchain.messages import SystemMessage, HumanMessage, AIMessage
from dotenv import load_dotenv
import os

load_dotenv()

class ConversationWithSummary:
    """
    对话摘要类，用于存储和压缩对话摘要。
    """
    def __init__(self, llm, max_recent: int = 6):
        self.llm = llm
        self.max_recent = max_recent
        self.summary = ""
        self.recent_messages = []

    def chat(self, user_input: str) -> str:
        """
        处理用户输入，返回助手回复。
        """
        print(f"  [用户] {user_input}")
        
        self.recent_messages.append(HumanMessage(content=user_input))

        # 压缩对话摘要
        if len(self.recent_messages) > self.max_recent:
            self._compress()
            
        context = []
        if self.summary:
            context.append(SystemMessage(content=f"之前的对话摘要：\n{self.summary}"))
        context.extend(self.recent_messages)

        response = self.llm.invoke(context)

        self.recent_messages.append(AIMessage(content=response.content))
        return response.content

    def _compress(self):
        """
        压缩对话摘要，保留最近 max_recent 条消息。
        """
        old_messages = self.recent_messages[:-self.max_recent]
        self.recent_messages = self.recent_messages[-self.max_recent:]

        conversation_text = "\n".join(
            f"{'用户' if m.type == 'human' else '助手'}: {m.content}"
            for m in old_messages
        )

        summary_response = self.llm.invoke([
            SystemMessage(content="总结对话关键信息，只保留重要事实和用户偏好，忽略寒暄。"),
            HumanMessage(content=conversation_text),
        ])
        print(f"  [压缩摘要] {summary_response.content}")
        self.summary = f"{self.summary}\n{summary_response.content}" if self.summary else summary_response.content
        print(f"  [摘要更新] 压缩了 {len(old_messages)} 条消息")

if __name__ == "__main__":
    llm = init_chat_model(
        model=os.getenv("MODEL_NAME"),
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
        model_provider="openai"
    )

    chat = ConversationWithSummary(llm, max_recent=6)

    for i in range(1, 12):
        response = chat.chat(f"这是第{i}条消息，我的爱好是编程和学习AI。")
        print(f"  回复 {i}: {response[:60]}...")

```

　　　　各种窗口管理策略的对比：

|策略|原理|优点|缺点|适用场景|
| --------------| --------------------| ----------------| ------------------| --------------|
|保留最近 N 条|直接丢弃旧消息|实现简单|早期重要信息丢失|短对话|
|Token 限制裁剪|按 Token 数截断|精确控制成本|可能截断关键上下文|Token 预算固定|
|对话摘要|LLM 压缩旧消息|保留关键信息|摘要有信息损失|长对话|
|**摘要 + 近期消息**|摘要 + 最近 N 条原文|平衡信息量和细节|实现稍复杂|**大多数生产场景**|

## 三、长期记忆

### 3.1 跨会话记忆

　　　　Checkpointer 解决的是"当前会话内"的记忆问题。但有些场景需要跨会话记忆——比如一个个人助手应该记住用户长期以来的偏好，而不是每次新建对话都从头开始。

　　　　向量化长期记忆的思路是：将每轮对话的关键信息转化为向量，存储到向量数据库中。下次对话时，根据当前问题的语义相似度检索历史记忆，将相关记忆注入到上下文中。

```python
# -*- encoding: utf-8 -*-
'''
@File        :   memory_demo04.py
@Time        :   2026/04/27 18:15:09
@Author      :   xcy.小相 
@Version     :   1.0
@Description :   09-Agent记忆机制 —— 基于 FAISS 向量库的长期记忆实现
'''

from langchain_openai import OpenAIEmbeddings
from langchain.chat_models import init_chat_model
from langchain_community.vectorstores import FAISS
from langchain_core.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
import os

load_dotenv()

# 硅基流动支持的 embedding 模型，用于将文本转换为向量
EMBEDDING_MODEL = "BAAI/bge-m3"

class LongTermMemory:
    """基于 FAISS 向量数据库的长期记忆管理类。

    核心思路：将每轮对话拼接后转为向量存入 FAISS，当用户提问时，
    先从向量库中检索语义最相关的历史对话片段，注入到 system prompt 中，
    再调用 LLM 生成回复，从而实现"有记忆"的对话。
    """

    def __init__(self):
        """初始化 Embedding 模型、FAISS 向量库和 LLM。"""
        # 初始化 Embedding 模型，用于将文本转为向量（调用硅基流动 API）
        self.embeddings = OpenAIEmbeddings(
            model=EMBEDDING_MODEL,
            api_key=os.getenv("OPENAI_API_KEY"),
            base_url=os.getenv("OPENAI_BASE_URL"),
        )
        # 创建空的 FAISS 向量库（先用占位文本初始化再删除，确保索引结构就绪）
        self.vector_store = FAISS.from_texts(["初始化占位"], self.embeddings)
        self.vector_store.delete([self.vector_store.index_to_docstore_id[0]])
        # 使用 init_chat_model 初始化 LLM，兼容 OpenAI API 格式（硅基流动）
        self.llm = init_chat_model(
            model=os.getenv("MODEL_NAME"),
            model_provider="openai",
            api_key=os.getenv("OPENAI_API_KEY"),
            base_url=os.getenv("OPENAI_BASE_URL"),
        )

    def save_memory(self, user_input: str, ai_response: str):
        """将一轮对话（用户输入 + AI 回复）拼接后存入向量库。

        Args:
            user_input: 用户输入文本
            ai_response: AI 回复文本
        """
        text = f"用户: {user_input}\n助手: {ai_response}"
        self.vector_store.add_texts([text], metadatas=[{"type": "conversation"}])

    def recall(self, query: str, k: int = 3) -> list[str]:
        """根据用户输入，从向量库中检索语义最相关的 k 条历史记忆。

        Args:
            query: 用户查询文本
            k: 返回的相似记忆条数，默认 3

        Returns:
            相关历史记忆文本列表
        """
        results = self.vector_store.similarity_search(query, k=k)
        return [doc.page_content for doc in results]

    def chat_with_memory(self, user_input: str) -> str:
        """带记忆的对话：先检索相关记忆，注入 prompt，再调用 LLM 生成回复。

        流程：
        1. 根据用户输入检索最相关的历史记忆
        2. 将记忆作为 SystemMessage 注入消息列表（如果有相关记忆）
        3. 追加用户当前输入作为 HumanMessage
        4. 调用 LLM 生成回复
        5. 将本轮对话存入向量库供后续检索

        Args:
            user_input: 用户输入文本

        Returns:
            LLM 生成的回复文本
        """
        relevant_memories = self.recall(user_input)

        messages = []
        # 如果有相关记忆，将其作为上下文注入 system prompt
        if relevant_memories:
            memory_text = "\n".join(f"- {m}" for m in relevant_memories)
            messages.append(
                SystemMessage(content=f"以下是相关的历史对话记忆：\n{memory_text}")
            )
        messages.append(HumanMessage(content=user_input))

        response = self.llm.invoke(messages)
        self.save_memory(user_input, response.content)
        return response.content

if __name__ == "__main__":
    import sys
    sys.stdout.reconfigure(encoding="utf-8")

    memory = LongTermMemory()

    # 预先存入一些历史对话记忆
    memory.save_memory("我的项目使用 FastAPI 框架", "好的，记住了你的项目使用 FastAPI。")
    memory.save_memory("我需要部署到 AWS 上", "了解，你的项目将部署到 AWS。")
    memory.save_memory("我的项目是电商网站", "好的，这是一个电商项目。")

    # 提问时，Agent 会自动检索相关记忆并生成回复
    response = memory.chat_with_memory("帮我推荐一个部署方案")
    print(response)

```

　　　　这种方案的核心优势在于：记忆不再是按时间线性排列的，而是按语义相关性组织的。用户问"帮我推荐部署方案"，系统能自动检索到之前提到的技术栈（FastAPI）和目标平台（AWS），即使这些信息分散在不同会话中。

### 3.2 向量存储记忆

　　　　FAISS 是 Meta 开源的向量检索库，适合本地开发和中小规模数据。生产环境可以考虑 Milvus、Pinecone 或 Weaviate 等托管方案。

　　　　`recall` 方法通过 `similarity_search` 按语义相似度检索。即使历史对话发生在很久以前，只要语义上与当前问题相关，就能被召回。这种方式特别适合以下场景：

　　　　**个性化助手**。记住用户的偏好、习惯和历史决策，提供个性化服务。

　　　　**知识积累**。将每次交互中产生的新知识存入向量库，形成组织的知识资产。

　　　　**上下文关联**。将用户在不同时间、不同话题中提到的相关信息串联起来。

### 3.3 记忆检索与融合

　　　　长期记忆检索到的内容需要与当前对话上下文融合。融合策略的要点：

　　　　**限制检索条数**。通过 `k` 参数控制检索的记忆条数（通常 3-5 条），避免注入过多无关上下文。

　　　　**标注记忆来源**。将检索到的记忆用 SystemMessage 包装并标注"历史记忆"，帮助模型区分当前对话和历史回忆。

　　　　**相关性阈值**。只注入相似度高于某个阈值的记忆，过滤掉低相关性的噪声。

```mermaid
flowchart TD
    A["用户输入"] --> B["语义相似度检索"]
    B --> C["历史记忆 Top-K"]
    C --> D{"相似度 > 阈值?"}
    D -->|"是"| E["注入上下文"]
    D -->|"否"| F["不注入"]
    E --> G["LLM 生成回答"]
    F --> G
    G --> H["保存本轮记忆"]
    H --> I["返回结果"]

    style B fill:#e3f2fd,stroke:#1565c0
    style G fill:#c8e6c9,stroke:#2e7d32
    style H fill:#fff3e0,stroke:#e65100
```

> 图 9-3：长期记忆检索与融合流程。用户输入触发语义检索，高相关性的历史记忆被注入当前上下文，回答生成后自动保存为新的记忆。

## 四、上下文工程与 Token 管理

### 4.1 Token 预算分配

　　　　上下文工程（Context Engineering）关注的是一个核心问题：**如何在有限的上下文窗口中，放入最有效的信息**。一个 Agent 的每次调用，上下文窗口中通常包含五类信息：

- **System Prompt**：角色定义、行为约束（500-2000 Token）
- **对话历史**：之前几轮的消息（动态增长）
- **检索文档**：RAG 场景中召回的相关文档
- **工具调用结果**：Agent 调用外部工具后返回的数据
- **输出预留**：为模型生成留出的空间

　　　　这五类信息共同争夺有限的 Token 预算。一个实用的预算分配方案（以 32K 窗口为例）：

```
总预算: 32,000 tokens
├── System Prompt:    2,000  (6%)
├── 对话历史:       15,000  (47%)
├── 检索文档:        8,000  (25%)
├── 工具结果预留:    4,000  (13%)
└── 输出预留:        3,000  (9%)
```

　　　　用代码表达这个预算方案：

```python
from dataclasses import dataclass

@dataclass
class TokenBudget:
    total: int = 32000
    system: int = 2000
    history_ratio: float = 0.47
    docs_ratio: float = 0.25
    tool_ratio: float = 0.13
    output_ratio: float = 0.09

    @property
    def history(self) -> int:
        return int(self.total * self.history_ratio)

    @property
    def docs(self) -> int:
        return int(self.total * self.docs_ratio)

    @property
    def tool(self) -> int:
        return int(self.total * self.tool_ratio)

    @property
    def output(self) -> int:
        return int(self.total * self.output_ratio)

    def for_simple_task(self) -> "TokenBudget":
        return TokenBudget(
            total=self.total,
            system=self.system,
            history_ratio=0.60,
            docs_ratio=0.10,
            tool_ratio=0.05,
            output_ratio=0.15,
        )

    def for_research_task(self) -> "TokenBudget":
        return TokenBudget(
            total=self.total,
            system=self.system,
            history_ratio=0.25,
            docs_ratio=0.45,
            tool_ratio=0.10,
            output_ratio=0.10,
        )

    def report(self, label: str = "默认") -> str:
        return (
            f"预算方案 [{label}] (总计 {self.total:,} tokens):\n"
            f"  System Prompt: {self.system:>6,} tokens\n"
            f"  对话历史:     {self.history:>6,} tokens ({self.history_ratio:.0%})\n"
            f"  检索文档:     {self.docs:>6,} tokens ({self.docs_ratio:.0%})\n"
            f"  工具结果:     {self.tool:>6,} tokens ({self.tool_ratio:.0%})\n"
            f"  输出预留:     {self.output:>6,} tokens ({self.output_ratio:.0%})"
        )

if __name__ == "__main__":
    budget = TokenBudget(total=32000)
    print(budget.report("默认"))
    print()
    print(budget.for_simple_task().report("简单问答"))
    print()
    print(budget.for_research_task().report("深度研究"))
```

　　　　输出：

```
预算方案 [默认] (总计 32,000 tokens):
  System Prompt:  2,000 tokens
  对话历史:     15,040 tokens (47%)
  检索文档:      8,000 tokens (25%)
  工具结果:      4,160 tokens (13%)
  输出预留:      2,880 tokens (9%)

预算方案 [简单问答] (总计 32,000 tokens):
  System Prompt:  2,000 tokens
  对话历史:     19,200 tokens (60%)
  检索文档:      3,200 tokens (10%)
  工具结果:      1,600 tokens (5%)
  输出预留:      4,800 tokens (15%)

预算方案 [深度研究] (总计 32,000 tokens):
  System Prompt:  2,000 tokens
  对话历史:      8,000 tokens (25%)
  检索文档:     14,400 tokens (45%)
  工具结果:      3,200 tokens (10%)
  输出预留:      3,200 tokens (10%)
```

### 4.2 滑动窗口压缩

　　　　滑动窗口是最直接的上下文管理方式：只保留最近 N 条消息，丢弃更早的内容。其核心算法如下：

```
输入: messages（当前消息列表）, max_tokens（Token 预算）
输出: trimmed_messages（裁剪后的消息列表）

1. 计算 messages 的总 Token 数
2. 如果总 Token 数 <= max_tokens，直接返回
3. 否则：
   a. 始终保留 SystemMessage
   b. 从最新的消息开始向前保留
   c. 确保第一条非 SystemMessage 是 HumanMessage
   d. 丢弃超出预算的旧消息
4. 返回裁剪后的消息列表
```

```python
import tiktoken
from langchain.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
    trim_messages,
)

def make_token_counter(model: str = "gpt-4o-mini"):
    enc = tiktoken.encoding_for_model(model)
    def counter(messages):
        return sum(len(enc.encode(m.content)) for m in messages)
    return counter

messages = [
    SystemMessage(content="你是一个技术助手。"),
    HumanMessage(content="Python 的 GIL 是什么？"),
    AIMessage(content="GIL 是全局解释器锁..."),
    HumanMessage(content="怎么绕过 GIL？"),
    AIMessage(content="可以用多进程..."),
    HumanMessage(content="协程算不算绕过 GIL？"),
    AIMessage(content="协程在单线程内..."),
    HumanMessage(content="那 asyncio 和 threading 怎么选？"),
]

trimmed = trim_messages(
    messages=messages,
    max_tokens=100,
    strategy="last",
    token_counter=len,
    include_system=True,
    allow_partial=False,
    start_on="human",
)

for msg in trimmed:
    print(f"  [{msg.type}] {msg.content[:50]}")
```

　　　　滑动窗口的实现简单，但缺点也很明显：早期对话中的关键信息会被直接丢弃。结合摘要压缩可以缓解这个问题。

### 4.3 RAG 上下文压缩

　　　　RAG 场景中，文档需要被分割成小块才能存入向量数据库。检索时只召回最相关的几个段落，而不是整篇文档，这就是 RAG 的上下文压缩本质：

```python
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.messages import SystemMessage, HumanMessage
from dotenv import load_dotenv
import os

load_dotenv()

class DocumentAgent:
    def __init__(self, llm, embeddings):
        self.llm = llm
        self.embeddings = embeddings
        self.vector_store = None

    def ingest(self, documents: list[str]):
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        all_chunks = []
        for doc in documents:
            chunks = splitter.split_text(doc)
            all_chunks.extend(chunks)
        self.vector_store = FAISS.from_texts(all_chunks, self.embeddings)
        print(f"  索引完成: {len(all_chunks)} 个文档块")

    def query(self, question: str, k: int = 3) -> str:
        if not self.vector_store:
            return "尚未加载任何文档。"

        docs = self.vector_store.similarity_search(question, k=k)
        context = "\n\n".join(f"[文档片段]\n{doc.page_content}" for doc in docs)

        response = self.llm.invoke([
            SystemMessage(content=f"根据以下文档片段回答问题。\n\n{context}"),
            HumanMessage(content=question),
        ])
        return response.content

if __name__ == "__main__":
    llm = ChatOpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
        model=os.getenv("MODEL_NAME", "Qwen/Qwen3-8B"),
    )
    embeddings = OpenAIEmbeddings(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
        model="BAAI/bge-m3",
    )

    agent = DocumentAgent(llm, embeddings)

    docs = [
        "FastAPI 是一个现代的 Python Web 框架，支持异步请求处理和自动 API 文档生成。"
        "它基于 Starlette 和 Pydantic 构建，性能接近 Go 和 Node.js。",
        "PostgreSQL 是一个功能强大的开源关系型数据库，支持 JSON、全文搜索和窗口函数。"
        "它适合高并发 OLTP 场景。",
        "Redis 是一个内存键值数据库，常用于缓存、会话存储和消息队列。",
    ]

    agent.ingest(docs)
    print(agent.query("FastAPI 的性能怎么样？"))
    print(agent.query("Redis 支持哪些数据结构？"))
```

　　　　按需加载的核心优势：无论文档总量有多大，每次调用 LLM 时只传入最相关的几个段落，Token 消耗恒定且可控。

### 4.4 tiktoken 计数工具

　　　　精确管理 Token 预算的第一步是能准确计数。tiktoken 是 OpenAI 提供的高性能 Token 计数库：

```python
import tiktoken
from dataclasses import dataclass, field

def count_tokens(text: str, model: str = "gpt-4o-mini") -> int:
    enc = tiktoken.encoding_for_model(model)
    return len(enc.encode(text))

@dataclass
class TokenStats:
    input_tokens: int = 0
    output_tokens: int = 0
    call_count: int = 0

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens

class TokenTracker:
    def __init__(self, model: str = "gpt-4o-mini"):
        self.model = model
        self._enc = tiktoken.encoding_for_model(model)
        self.stats = TokenStats()
        self._history: list[dict] = []

    def count_text(self, text: str) -> int:
        return len(self._enc.encode(text))

    def count_messages(self, messages: list) -> int:
        total = 0
        for msg in messages:
            content = msg.content if hasattr(msg, "content") else str(msg)
            total += self.count_text(content)
        return total

    def record(self, input_tokens: int, output_tokens: int, label: str = ""):
        self.stats.input_tokens += input_tokens
        self.stats.output_tokens += output_tokens
        self.stats.call_count += 1
        self._history.append({
            "call": self.stats.call_count,
            "input": input_tokens,
            "output": output_tokens,
            "total": input_tokens + output_tokens,
            "label": label,
        })

    def report(self) -> str:
        lines = [
            f"Token 消耗报告 ({self.model})",
            f"  调用次数: {self.stats.call_count}",
            f"  输入 Token: {self.stats.input_tokens:,}",
            f"  输出 Token: {self.stats.output_tokens:,}",
            f"  总计 Token: {self.stats.total_tokens:,}",
        ]
        if self._history:
            lines.append("\n  调用明细:")
            for entry in self._history[-5:]:
                lines.append(
                    f"    #{entry['call']} "
                    f"in={entry['input']} out={entry['output']} "
                    f"total={entry['total']} {entry['label']}"
                )
        return "\n".join(lines)
```

　　　　使用示例：

```python
from langchain_openai import ChatOpenAI
from langchain.messages import HumanMessage
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
    model=os.getenv("MODEL_NAME", "Qwen/Qwen3-8B"),
)

tracker = TokenTracker()

questions = [
    "什么是机器学习？",
    "请用三句话解释深度学习。",
    "Transformer 架构的核心是什么？",
]

for q in questions:
    response = llm.invoke([HumanMessage(content=q)])
    usage = response.usage_metadata
    if usage:
        tracker.record(usage["input_tokens"], usage["output_tokens"], label=q[:20])

print(tracker.report())
```

　　　　输出：

```
Token 消耗报告 (gpt-4o-mini)
  调用次数: 3
  输入 Token: 72
  输出 Token: 198
  总计 Token: 270

  调用明细:
    #1 in=22 out=65 total=87 什么是机器学习？
    #2 in=27 out=78 total=105 请用三句话解释深度学习。
    #3 in=23 out=55 total=78 Transformer 架构的核心是...
```

## 五、代码实战

### 5.1 多轮对话 Agent

　　　　以下是一个完整的多轮对话 Agent，集成了 Checkpointer 短期记忆和消息裁剪：

```python
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langchain.tools import tool
from langgraph.checkpoint.memory import InMemorySaver
from langchain.messages import trim_messages
import tiktoken
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
    model=os.getenv("MODEL_NAME", "Qwen/Qwen3-8B"),
    temperature=0,
)

@tool
def lookup_user(user_id: str) -> str:
    """查询用户信息。"""
    mock_db = {
        "001": "用户小明，VIP等级3，注册时间2024-01-15，累计消费12000元",
        "002": "用户小红，VIP等级1，注册时间2024-06-20，累计消费800元",
    }
    return mock_db.get(user_id, f"未找到用户 {user_id} 的信息")

memory = InMemorySaver()

agent = create_agent(
    model=llm,
    tools=[lookup_user],
    system_prompt=(
        "你是一个客服助手。用户可能会提供自己的用户ID，你可以用工具查询信息。"
        "记住用户在对话中提到的所有信息。用中文回答。"
    ),
    checkpointer=memory,
)

config = {"configurable": {"thread_id": "customer-session-001"}}

print("=== 第一轮对话 ===")
r1 = agent.invoke(
    {"messages": [{"role": "user", "content": "你好，我的用户ID是001"}]},
    config=config,
)
print(r1["messages"][-1].content)

print("\n=== 第二轮对话 ===")
r2 = agent.invoke(
    {"messages": [{"role": "user", "content": "你还记得我的用户ID吗？查一下我的信息"}]},
    config=config,
)
print(r2["messages"][-1].content)

print("\n=== 第三轮对话 ===")
r3 = agent.invoke(
    {"messages": [{"role": "user", "content": "我是VIP几级？"}]},
    config=config,
)
print(r3["messages"][-1].content)
```

### 5.2 带 Token 预算的对话管理

　　　　将 Token 计数、摘要压缩和预算管理整合为一个完整的 `TokenAwareAgent`：

```python
import tiktoken
from langchain_openai import ChatOpenAI
from langchain.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
    trim_messages,
)
from dataclasses import dataclass
from dotenv import load_dotenv
import os

load_dotenv()

@dataclass
class Budget:
    max_context: int = 16000
    system: int = 1500
    output_reserve: int = 2000

    @property
    def for_history(self) -> int:
        return self.max_context - self.system - self.output_reserve

@dataclass
class Usage:
    input_tokens: int = 0
    output_tokens: int = 0
    calls: int = 0
    trims: int = 0
    compressions: int = 0

    @property
    def total(self) -> int:
        return self.input_tokens + self.output_tokens

class TokenAwareAgent:
    def __init__(
        self,
        llm: ChatOpenAI,
        budget: Budget | None = None,
        system_prompt: str = "你是一个技术助手，回答简洁专业。",
        max_recent: int = 6,
        compress_at: int = 10,
    ):
        self.llm = llm
        self.budget = budget or Budget()
        self.system_prompt = system_prompt
        self.max_recent = max_recent
        self.compress_at = compress_at
        self.usage = Usage()
        self.summary = ""
        self.history: list = []
        self._enc = tiktoken.encoding_for_model("gpt-4o-mini")

    def _count(self, messages: list) -> int:
        return sum(len(self._enc.encode(m.content)) for m in messages)

    def _trim_if_needed(self, messages: list) -> list:
        tokens = self._count(messages)
        if tokens <= self.budget.for_history:
            return messages

        self.usage.trims += 1
        return trim_messages(
            messages=messages,
            max_tokens=self.budget.for_history,
            strategy="last",
            token_counter=lambda msgs: self._count(msgs),
            include_system=True,
            allow_partial=False,
            start_on="human",
        )

    def _compress_if_needed(self):
        if len(self.history) < self.compress_at:
            return

        self.usage.compressions += 1
        old = self.history[:-self.max_recent]
        self.history = self.history[-self.max_recent:]

        conversation_text = "\n".join(
            f"{'用户' if m.type == 'human' else '助手'}: {m.content}"
            for m in old
        )

        resp = self.llm.invoke([
            SystemMessage(content="总结对话关键信息，只保留事实和用户偏好，不超过100字。"),
            HumanMessage(content=conversation_text),
        ])

        new_part = resp.content
        self.summary = f"{self.summary}\n{new_part}" if self.summary else new_part
        print(f"  [压缩] {len(old)} 条消息 → {len(new_part)} 字符摘要")

    def chat(self, user_input: str) -> str:
        self._compress_if_needed()

        messages = [SystemMessage(content=self.system_prompt)]
        if self.summary:
            messages.append(SystemMessage(content=f"历史摘要：{self.summary}"))
        messages.extend(self.history)
        messages.append(HumanMessage(content=user_input))

        messages = self._trim_if_needed(messages)

        response = self.llm.invoke(messages)
        self.usage.calls += 1

        if response.usage_metadata:
            self.usage.input_tokens += response.usage_metadata["input_tokens"]
            self.usage.output_tokens += response.usage_metadata["output_tokens"]

        self.history.append(HumanMessage(content=user_input))
        self.history.append(AIMessage(content=response.content))

        return response.content

    def report(self) -> str:
        return (
            f"Agent 运行报告\n"
            f"  调用次数: {self.usage.calls}\n"
            f"  Token 消耗: {self.usage.total:,} "
            f"(输入 {self.usage.input_tokens:,} + 输出 {self.usage.output_tokens:,})\n"
            f"  裁剪次数: {self.usage.trims}\n"
            f"  压缩次数: {self.usage.compressions}\n"
            f"  当前历史: {len(self.history)} 条消息\n"
            f"  摘要长度: {len(self.summary)} 字符"
        )

if __name__ == "__main__":
    llm = ChatOpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url=os.getenv("OPENAI_BASE_URL"),
        model=os.getenv("MODEL_NAME", "Qwen/Qwen3-8B"),
    )

    agent = TokenAwareAgent(
        llm=llm,
        budget=Budget(max_context=16000, system=1500, output_reserve=2000),
        max_recent=6,
        compress_at=10,
    )

    inputs = [
        "我是一名后端工程师，用 Python 和 Go",
        "我的项目是电商系统，用 FastAPI 开发",
        "遇到性能瓶颈，PostgreSQL 500 万数据",
        "订单查询接口响应超过 2 秒",
        "已经加了索引但效果不明显",
        "分库分表可行吗？",
        "读写分离呢？",
        "Redis 缓存方案怎么设计？",
        "帮我列出优化优先级",
        "总结一下所有建议",
        "还有其他方案吗？",
        "好，先从缓存开始",
    ]

    for text in inputs:
        print(f"\n用户: {text}")
        resp = agent.chat(text)
        print(f"助手: {resp[:80]}...")

    print(f"\n{agent.report()}")
```

　　　　`TokenAwareAgent` 在每次调用前执行三个检查：消息是否需要压缩（超过 10 条触发摘要）、上下文是否超出预算（超出则裁剪）、System Prompt 和摘要是否保留。这种分层策略确保了 Agent 在长时间运行中不会因为上下文膨胀而崩溃。

## 六、常见陷阱与调试

　　　　**InMemorySaver 重启丢失**。开发阶段用 `InMemorySaver` 没问题，上线前必须切换到 `SqliteSaver` 或 `PostgresSaver`。

　　　　**thread_id 设计不当**。如果所有用户共用同一个 `thread_id`，会出现"A 用户的信息被 B 用户看到"的严重问题。务必为每个用户/会话分配唯一的 `thread_id`。

　　　　**摘要压缩的信息损失**。LLM 生成的摘要不可能 100% 保留原始信息。关键事实（用户名、偏好、决策）通常能保留，但细节和语气会丢失。如果业务要求零信息损失，摘要压缩不适合。

　　　　**Token 计数不精确**。tiktoken 对非 OpenAI 模型的计数结果是近似值，误差通常在 5% 以内。如果需要精确计数，应使用模型提供商自己的 Tokenizer。

　　　　**长期记忆的噪声问题**。向量检索可能返回低相关性的历史记忆。需要设置相似度阈值，过滤掉噪声。

## 七、本章小结

　　　　本章从三个维度系统讲解了 Agent 的记忆与上下文管理：

|维度|核心技术|解决的问题|
| ----------| ------------------------| -----------------------------------|
|短期记忆|Checkpointer + thread_id|会话内的多轮对话记忆|
|长期记忆|向量数据库 + 语义检索|跨会话的个性化记忆|
|上下文工程|Token 预算 + 摘要压缩|有限的 Token 窗口内放入最有效的信息|

　　　　核心原则：开发阶段用 `InMemorySaver`，上线前切换到 `SqliteSaver` 或 `PostgresSaver`。"摘要 + 近期消息"是大多数生产场景的最佳窗口管理策略。上下文工程比 Prompt 工程更重要——它关注的是在有限预算中合理分配各类信息。

## 八、扩展阅读

- [LangGraph Checkpointer 文档](https://langchain-ai.github.io/langgraph/concepts/persistence/) — LangGraph 持久化机制的官方文档
- [tiktoken 官方仓库](https://github.com/openai/tiktoken) — OpenAI 的 Token 计数工具
- [FAISS 官方文档](https://github.com/facebookresearch/faiss) — Meta 的向量检索库
- [Lost in the Middle 论文](https://arxiv.org/abs/2307.03172) — 模型对超长上下文中间部分信息关注度下降的研究
- [LangChain trim_messages 文档](https://python.langchain.com/docs/how_to/trim_messages/) — 消息裁剪的官方教程
