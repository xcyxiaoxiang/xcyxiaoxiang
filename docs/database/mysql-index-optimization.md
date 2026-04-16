---
title: MySQL 索引优化指南
date: 2025-01-16
---

## 索引类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| B+Tree | 默认索引类型 | 等值查询、范围查询、排序 |
| Hash | 哈希索引 | 等值查询（Memory 引擎） |
| Full-Text | 全文索引 | 文本搜索 |
| Spatial | 空间索引 | 地理位置查询 |

## 索引设计原则

### 适合建索引的列

- WHERE 条件频繁使用的列
- JOIN 关联的列
- ORDER BY / GROUP BY 的列
- 区分度高的列（唯一性高）

### 不适合建索引的列

- 数据量小的表
- 区分度低的列（如性别）
- 频繁更新的列
- 使用 `SELECT *` 的场景

## EXPLAIN 分析

```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

关键指标：

| 列 | 含义 | 理想值 |
|----|------|--------|
| type | 访问类型 | ref、range、index |
| key | 实际使用索引 | 非空 |
| rows | 预估扫描行数 | 越小越好 |
| Extra | 额外信息 | Using Index（覆盖索引） |

## 常见优化

```sql
-- 最左前缀原则：联合索引 (a, b, c)
-- ✅ WHERE a = 1
-- ✅ WHERE a = 1 AND b = 2
-- ✅ WHERE a = 1 AND b = 2 AND c = 3
-- ❌ WHERE b = 2（跳过了 a）
-- ❌ WHERE c = 3（跳过了 a, b）

-- 覆盖索引：查询列都在索引中
SELECT id, name FROM users WHERE age > 18;

-- 避免索引失效
-- ❌ 在索引列上使用函数
SELECT * FROM users WHERE YEAR(created_at) = 2025;
-- ✅ 改为范围查询
SELECT * FROM users WHERE created_at >= '2025-01-01';
```
