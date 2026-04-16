// VitePress + Teek 主题配置
import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置（defineTeekConfig 会把内容放到 themeConfig 下）
const teekConfig = defineTeekConfig({
  // === 全局配置 ===
  teekTheme: true,
  teekHome: true,
  vpHome: false,
  themeSize: "default",
  loading: true,

  // === 壁纸模式 ===
  wallpaper: {
    enabled: true,
    hideBanner: true,
  },

  // === 主题增强（配置切换面板） ===
  themeEnhance: {
    enabled: true,
    position: "top",
    // 布局切换
    layoutSwitch: {
      disabled: false,
      disableHelp: false,
      disableAnimation: false,
      defaultMode: "bothWidthAdjustable",
      defaultDocMaxWidth: 90,
      defaultPageMaxWidth: 95,
    },
    // 主题色切换（8种内置主题色）
    themeColor: {
      disabled: false,
      disableHelp: false,
      disabledInMobile: false,
      defaultSpread: false,
    },
    // 聚光灯
    spotlight: {
      disabled: false,
      defaultStyle: "aside",
      defaultValue: true,
      disableHelp: false,
    },
  },

  // === Banner 配置 ===
  banner: {
    bgStyle: "fullImg",
    imgSrc: [
      "/blog/14.jpg",
      "/blog/8.jpg",
    ],
    textColor: "#ffffff",
    descStyle: "types",
    description: [
      "记录学习 · 分享实践 · 持续成长",
      "Python / Java / AI / DevOps / 全栈开发",
    ],
  },

  // === 博主信息卡片 ===
  blogger: {
    name: "xseay",
    avatar: "/logo.png",
    shape: "circle-rotate",
    slogan: "记录学习 · 分享实践 · 持续成长",
    color: "#ffffff",
    circleBgImg: "/blog/authbackground.png",
    circleBgMask: true,
  },

  // === 文章列表配置（卡片风格） ===
  post: {
    postStyle: "card",
    excerptPosition: "bottom",
    showMore: true,
    moreLabel: "阅读全文 >",
    emptyLabel: "暂无文章",
    showCapture: true,
    transition: true,
    splitSeparator: true,
    listStyleTitleTagPosition: "right",
  },

  // === 分页配置 ===
  page: {
    pageSize: 15,
  },

  // === 卡片栏配置 ===
  homeCardListPosition: "left",
  homeCardSort: ["category", "tag", "docAnalysis", "friendLink"],
  category: { enabled: true },
  tag: { enabled: true },
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
  docAnalysis: {
    enabled: true,
    createTime: "2025-01-17",
  },

  // === 友情链接卡片 ===
  friendLink: {
    enabled: false,
    list: [
      // {
      //   name: "Teeker",
      //   desc: "朝圣的使徒，正在走向编程的至高殿堂！",
      //   avatar: "https://testingcf.jsdelivr.net/gh/Kele-Bingtang/static/user/avatar2.png",
      //   link: "http://notes.teek.top/",
      // },
      // {
      //   name: "vuepress-theme-vdoing",
      //   desc: "一款简洁高效的VuePress 知识管理&博客 主题",
      //   avatar: "https://doc.xugaoyi.com/img/logo.png",
      //   link: "https://doc.xugaoyi.com/",
      // },
      // {
      //   name: "粥里有勺糖",
      //   desc: "简约风的 VitePress 博客主题",
      //   avatar: "https://theme.sugarat.top/logo.png",
      //   link: "https://theme.sugarat.top/",
      // },
    ],
    // autoScroll: true,
  },

  // === 社交信息 ===
  social: [
    {
      icon: "mdi:github",
      name: "GitHub",
      link: "https://github.com/xcyxiaoxiang",
    },
    {
      icon: "simple-icons:gitee",
      name: "Gitee",
      link: "https://gitee.com/xcyxiaoxiang",
    },
  ],

  // === 文章配置 ===
  articleAnalyze: {
    author: true,
    date: true,
    category: true,
    tag: true,
    wordCount: true,
    readingTime: true,
  },
  articleUpdate: {
    enabled: true,
    count: 5,
  },
  articleShare: {
    enabled: true,
  },

  // === 代码块配置 ===
  codeBlock: {
    enabled: true,
  },

  // === 页脚配置 ===
  footerInfo: {
    customHtml: "<span id=\"runtime\"></span>",
    topMessage: [
      "Powered by VitePress + Teek",
    ],
    copyright: {
      show: true,
      createYear: 2025,
    },
    theme: {
      show: true,
    },
  },

  // === 默认作者信息 ===
  author: {
    name: "xseay",
    link: "https://github.com/xcyxiaoxiang",
  },

  // === 回到顶部 ===
  backTop: {
    enabled: true,
  },

  // === VitePress 原生配置 ===
  nav: [
    { text: "首页", link: "/" },
    { text: "Python专栏", link: "/python/" },
    { text: "DevOps专栏", link: "/devops/" },
    { text: "人工智能专栏", link: "/ai/" },
    { text: "Java专栏", link: "/java/" },
    { text: "数据库专栏", link: "/database/" },
    { text: "项目实践", link: "/projects/" },
    { text: "关于", link: "/about/" },
  ],

  // 侧边栏（Teek 自动生成）
  sidebar: {},

  // 搜索
  search: {
    provider: "local",
  },

  // 社交链接
  socialLinks: [
    { icon: "github", link: "https://github.com/xcyxiaoxiang" },
  ],
});

export default defineConfig({
  base:'/xcyxiaoxiang',
  title: "xseay 的技术博客",
  description: "Python / Java / AI / DevOps / 全栈开发学习笔记",
  head: [["link", { rel: "icon", type: "image/png", href: "/logo.png" }]],
  extends: teekConfig,
});
