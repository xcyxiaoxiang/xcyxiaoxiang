---
title: Java 基础 — 集合框架
date: 2025-01-17
---

## Collection 体系

Java 集合框架的顶层接口：

```
Collection
├── List（有序、可重复）
│   ├── ArrayList  — 动态数组，查询快
│   ├── LinkedList — 双向链表，增删快
│   └── Vector     — 线程安全的动态数组
├── Set（无序、不可重复）
│   ├── HashSet    — 基于哈希表
│   ├── TreeSet    — 基于红黑树，有序
│   └── LinkedHashSet — 保持插入顺序
└── Queue（队列）
    ├── LinkedList
    └── PriorityQueue — 优先队列

Map
├── HashMap     — 键值对，允许 null
├── TreeMap     — 基于红黑树，按键排序
├── LinkedHashMap — 保持插入顺序
└── ConcurrentHashMap — 线程安全
```

## ArrayList vs LinkedList

| 特性 | ArrayList | LinkedList |
|------|-----------|------------|
| 底层结构 | 动态数组 | 双向链表 |
| 随机访问 | O(1) | O(n) |
| 头部插入 | O(n) | O(1) |
| 内存占用 | 较小 | 较大（指针） |

## 常用技巧

```java
// 不可变集合 (Java 9+)
List<String> list = List.of("a", "b", "c");
Map<String, Integer> map = Map.of("one", 1, "two", 2);

// Stream 操作
list.stream()
    .filter(s -> s.length() > 1)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```
