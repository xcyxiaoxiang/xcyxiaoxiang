// Teek 主题配置
import { defineTeekConfig } from "vitepress-theme-teek/config";

export const teekConfig = defineTeekConfig({
  // 启用 Teek 主题
  teekTheme: true,

  // 启用博客风格首页
  teekHome: true,

  // 启用 VitePress 风格首页（两者可以共存）
  vpHome: true,

  // 首页卡片栏位置
  homeCardListPosition: "left",

  // 首页卡片排序
  homeCardSort: ["category","docAnalysis","tag"],

  // 页面尺寸
  themeSize: "default",

  // 页面加载动画
  loading: true,

  // 博主信息卡片
  blogger: {
    name: "XCY",
    avatar: "/logo.svg",
    slogan: "记录学习 · 分享实践 · 持续成长",
    // description: "一个热爱技术的全栈开发者，持续学习中。",
    // link: "https://github.com/xcyxiaoxiang",
  },

  // 公告栏
  // notice: {
  //   enabled: true,
  //   content: "欢迎来到 XCY 的技术博客！这里记录日常学习笔记与技术实践。",
  // },

  // 首页 Banner
  banner: {
    enabled: true,
    bgStyle: "pure",
    pureBgColor: "#28282d",
    textColor: "#ffffff",
    titleFontSize: "3.2rem",
    descFontSize: "1.4rem",
    descStyle: "types",
    description: [
      "记录学习 · 分享实践 · 持续成长",
      "Python / Java / AI / DevOps / 全栈开发",
    ],
    typesInTime: 200,
    typesOutTime: 100,
    typesNextTime: 800,
    typesShuffle: false,
  },

  // 文章列表配置
  post: {
    postStyle: "list",
    excerptPosition: "top",
    showMore: true,
    moreLabel: "阅读全文 >",
    emptyLabel: "暂无文章",
    showCapture: true,
    transition: true,
    listStyleTitleTagPosition: "right",
  },

  // 分页配置
  page: {
    pageSize: 20,
  },

  // 分类卡片
  category: {
    enabled: true,
  },

  // 标签卡片
  tag: {
    enabled: true,
  },

  // 标签颜色
  tagColor: [
    { bg: "#3572A520", text: "#3572A5", border: "#3572A530" },
    { bg: "#B0721920", text: "#B07219", border: "#B0721930" },
    { bg: "#FF6B6B20", text: "#FF6B6B", border: "#FF6B6B30" },
    { bg: "#41B88320", text: "#41B883", border: "#41B88330" },
    { bg: "#2496ED20", text: "#2496ED", border: "#2496ED30" },
    { bg: "#4479A120", text: "#4479A1", border: "#4479A130" },
    { bg: "#F0503220", text: "#F05032", border: "#F0503230" },
    { bg: "#FCC62420", text: "#FCC624", border: "#FCC62430" },
  ],

  // 主题增强
  themeEnhance: {
    enabled: true,
    options: {
      layout: true,
      themeColor: true,
    },
  },

  // 文章信息配置
  articleAnalyze: {
    author: true,
    date: true,
    category: true,
    tag: true,
    wordCount: true,
    readingTime: true,
  },

  // 文章页最近更新
  articleUpdate: {
    enabled: true,
    count: 5,
  },

  // 页脚配置
  footerInfo: {
    enabled: true,
    copyright: "Copyright 2025-present xseay",
  },

  // 默认作者信息
  author: {
    name: "XCY",
    link: "https://github.com/xcyxiaoxiang",
  },

  // 代码块配置
  codeBlock: {
    enabled: true,
  },
});
