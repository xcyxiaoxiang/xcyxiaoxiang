import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'XCY 的技术博客',
  description: '记录日常学习笔记与技术实践',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    logo: '/logo.svg',
    nav: nav(),
    sidebar: sidebar(),
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xcyxiaoxiang' }
    ],
    editLink: {
      pattern: 'https://github.com/xcyxiaoxiang/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2025-present xcyxiaoxiang'
    },
    returnToTopLabel: '回到顶部',
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    lastUpdated: {
      text: '最后更新于'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },
  lastUpdated: true
})

function nav() {
  return [
    { text: '首页', link: '/' },
    {
      text: '学习笔记',
      items: [
        { text: 'Python', link: '/notes/python/' },
        { text: 'Java', link: '/notes/java/' },
        { text: '人工智能', link: '/notes/ai/' },
        { text: '数据库', link: '/notes/database/' },
        { text: 'Web 前端', link: '/notes/web/' },
        { text: 'DevOps', link: '/notes/devops/' }
      ]
    },
    { text: '项目实践', link: '/projects/' },
    { text: '关于', link: '/about' }
  ]
}

function sidebar() {
  return {
    '/notes/python/': [
      {
        text: 'Python',
        items: [
          { text: '概述', link: '/notes/python/' },
          { text: '开发环境搭建', link: '/notes/python/env-setup' },
          { text: '常用代码汇总', link: '/notes/python/code-snippets' },
          { text: '数据结构与算法', link: '/notes/python/data-structures' },
          { text: '公开课笔记', link: '/notes/python/course-notes/' },
          {
            text: '项目实战',
            items: [
              { text: '热榜新闻爬取', link: '/notes/python/projects/hot-news-crawler' },
              { text: 'ExcelToSQL', link: '/notes/python/projects/excel-to-sql' }
            ]
          }
        ]
      }
    ],
    '/notes/java/': [
      {
        text: 'Java',
        items: [
          { text: '概述', link: '/notes/java/' },
          {
            text: 'Java 基础',
            collapsed: true,
            items: [
              { text: 'Java 基础入门', link: '/notes/java/basics/' },
              { text: 'Java 进阶', link: '/notes/java/advanced/' },
              { text: 'Stream 流', link: '/notes/java/stream' }
            ]
          },
          {
            text: '框架',
            collapsed: true,
            items: [
              { text: 'Spring', link: '/notes/java/framework/spring' },
              { text: 'SpringMVC', link: '/notes/java/framework/springmvc' },
              { text: 'SpringBoot', link: '/notes/java/framework/springboot' },
              { text: 'MyBatis / MyBatisPlus', link: '/notes/java/framework/mybatis' },
              { text: 'SpringCloud', link: '/notes/java/framework/springcloud' }
            ]
          },
          {
            text: '中间件',
            collapsed: true,
            items: [
              { text: 'Redis', link: '/notes/java/middleware/redis' },
              { text: 'RabbitMQ', link: '/notes/java/middleware/rabbitmq' },
              { text: 'Elasticsearch', link: '/notes/java/middleware/elasticsearch' }
            ]
          },
          {
            text: '面试专题',
            collapsed: true,
            items: [
              { text: 'Java 框架面试题', link: '/notes/java/interview/framework' },
              { text: '面试经验', link: '/notes/java/interview/experience' }
            ]
          }
        ]
      }
    ],
    '/notes/ai/': [
      {
        text: '人工智能',
        items: [
          { text: '概述', link: '/notes/ai/' },
          {
            text: '大模型基础',
            collapsed: true,
            items: [
              { text: '大模型必知必会', link: '/notes/ai/llm-essentials' },
              { text: '大模型原理与实践', link: '/notes/ai/llm-practice' },
              { text: 'LLM Agent 开发', link: '/notes/ai/llm-agent' }
            ]
          },
          {
            text: 'LangChain',
            collapsed: true,
            items: [
              { text: 'LangChain 入门', link: '/notes/ai/langchain/intro' },
              { text: 'LangChain 1.0 速通', link: '/notes/ai/langchain/v1-guide' },
              { text: 'LangGraph 指南', link: '/notes/ai/langchain/langgraph' },
              { text: '多模态 RAG 实战', link: '/notes/ai/langchain/multimodal-rag' }
            ]
          },
          {
            text: 'NLP 学习路线',
            collapsed: true,
            items: [
              { text: 'NLP 基础概念', link: '/notes/ai/nlp/basics' },
              { text: 'Transformer 架构', link: '/notes/ai/nlp/transformer' },
              { text: '预训练语言模型', link: '/notes/ai/nlp/pretrained-models' },
              { text: '大语言模型', link: '/notes/ai/nlp/large-lm' },
              { text: '大模型训练实践', link: '/notes/ai/nlp/training' }
            ]
          }
        ]
      }
    ],
    '/notes/database/': [
      {
        text: '数据库',
        items: [
          { text: '概述', link: '/notes/database/' },
          { text: 'MySQL', link: '/notes/database/mysql' },
          { text: 'Oracle', link: '/notes/database/oracle' },
          { text: '达梦数据库', link: '/notes/database/dm' },
          { text: '常用 SQL', link: '/notes/database/common-sql' }
        ]
      }
    ],
    '/notes/web/': [
      {
        text: 'Web 前端',
        items: [
          { text: '概述', link: '/notes/web/' },
          { text: 'Vue 3', link: '/notes/web/vue3' },
          { text: 'Element Plus', link: '/notes/web/element-plus' },
          { text: 'Nginx', link: '/notes/web/nginx' }
        ]
      }
    ],
    '/notes/devops/': [
      {
        text: 'DevOps',
        items: [
          { text: '概述', link: '/notes/devops/' },
          { text: 'Docker', link: '/notes/devops/docker' },
          { text: 'Git', link: '/notes/devops/git' },
          { text: 'Linux', link: '/notes/devops/linux' }
        ]
      }
    ],
    '/projects/': [
      {
        text: '项目实践',
        items: [
          { text: '概述', link: '/projects/' },
          { text: 'DevEpicenter', link: '/projects/devepicenter' },
          { text: 'OAuth2 授权认证', link: '/projects/oauth2' }
        ]
      }
    ]
  }
}
