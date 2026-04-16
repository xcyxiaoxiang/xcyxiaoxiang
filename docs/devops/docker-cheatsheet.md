---
title: Docker 常用命令速查
date: 2025-03-23
---

## 镜像操作

```bash
# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx:latest

# 构建镜像
docker build -t myapp:v1 .
```

## 容器操作

```bash
# 运行容器
docker run -d --name mynginx -p 80:80 nginx

# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 停止 / 启动 / 重启
docker stop mynginx
docker start mynginx
docker restart mynginx

# 进入容器
docker exec -it mynginx /bin/bash

# 查看日志
docker logs -f mynginx

# 删除容器
docker rm mynginx
```

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: 123456
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

```bash
# 启动
docker-compose up -d

# 停止
docker-compose down

# 查看日志
docker-compose logs -f web
```

## 清理

```bash
# 清理未使用的资源
docker system prune -a

# 清理未使用的镜像
docker image prune -a
```
