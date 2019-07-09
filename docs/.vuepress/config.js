module.exports = {
  title: 'XIAOKEDADA',
  base: '/xiaokedada/',
  lang: 'zh-CN',
  // dest: '',
  description: 'Write something useful and funny',
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }],
  ],
  plugins: ['@vuepress/back-to-top'],
  // theme: 'vue',
  themeConfig: {
    repo: 'maoxiaoke/xiaokedada',
    repoLabel: 'Github',
    editLinks: true,
    sidebarDepth: 5,
    // docsDir: 'docs',
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: 'Blog', link: '/Blog/' },
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'More', link: '/FirstMeet/' },
      { text: 'CSS', link: '/CSS/' },
      { text: '读书笔记', link: '/ReadingNote/' },
      { text: 'Weekly', link: '/Weekly/' },
      { text: 'R & T', link: '/GatherAll/' },
    ],
    sidebar: {
      '/Blog/': genSidebarBlog(),
      '/JavaScript/': genSidebarJavaScript(),
      '/FirstMeet/': genSidebarFirstMeet(),
      '/CSS/': genSidebarCSS('层叠样式'),
      '/ReadingNote/': genSidebarNote('读书笔记'),
      '/Weekly/': genSidebarWeekly('Weekly'),
      '/GatherAll/': genSidebarAll('资源和前端思考')
    }
  },
  markdown: {
    // lineNumbers: true,
    toc: { includeLevel: [2, 3, 4] }
  }
}

// Blog
function genSidebarBlog () {
  return [
    {
      title: '别信',
      collapsable: false,
      children: [
        'Create-A-Website-01',
        'Create-A-Website-02',
        'No-More-Vue'
      ]
    },
    {
      title: '三人行也有我师',
      collapsable: false,
      children: [
        'Others-Own-Value',
        'Others-90-Percent',
        'Others-Jump-Out'
      ]
    },
    {
      title: '吃一堑',
      collapsable: false,
      children: [
        'Tackle-Pizza-404'
      ]
    }
  ]
}

//  JavaScript
function genSidebarJavaScript () {
  return [
    {
      title: 'Depth-in-Series',
      collapsable: false,
      children: [
        'Require-and-Import',
        'Property-Descriptors',
        'Depth-in-ES6',
        'Depth-in-This',
        'Depth-in-Closure',
        'Async-Programming',
        'Prototype'
      ]
    },
    {
      title: 'Re-learn ES6',
      collapsable: false,
      children: [
        'ES6-Let-and-Const',
        'ES6-Class',
        'ES6-Symbols',
        'ES6-Iterator-And-Iterable',
        'ES6-Async',
        'ES6-Generator'
      ]
    },
    {
      title: 'Beyond ES6',
      collapsable: false,
      children: [
        'ES-Future-Decorators'
      ]
    },
    {
      title: 'Light FP',
      collapsable: false,
      children: [
        'Light-FP-Overview',
        'Light-FP-Categries',
        'Light-FP-Compose',
        'Light-FP-Container-And-Functor'
      ]
    },
    {
      title: '基础内容',
      collapsable: false,
      children: [
        'AJAX',
        'Coercion',
        'Map-and-Reduce',
      ]
    },
    {
      title: 'Rxjs',
      collapsable: false,
      children: [
      ]
    },
    {
      title: 'DOM 相关',
      collapsable: false,
      children: [
        'DOM-Operation',
        'DOM-More',
        'DOM-History',
        'DOM-CORS'
      ]
    },
    {
      title: 'Thinking-in-JavaScript',
      collapsable: false,
      children: [
        'Small-and-Chunk-Code',
        'I-Dont-Know-JavaScript',
        'Refactor-JavaScript',
        'JavaScript-Design-Pattern'
      ]
    }
  ]
}

// First-Meet
function genSidebarFirstMeet () {
  return [
    {
      title: 'First-Meet Series',
      collapsable: false,
      children: [
        'First-Meet-JSON',
        'First-Meet-Cache',
        'First-Meet-Flux',
        'First-Meet-TypeScript',
        'First-Meet-Webpack',
        'First-Meet-JavaScript'
      ]
    },
    {
      title: 'All About Vue',
      collapsable: false,
      children: [
        'First-Meet-Vue-Communication',
        'How-To-Write-Vue',
        'Vuex-And-V-Model'
      ]
    },
    {
      title: '关于我自己学习的 Webpack',
      collapsable: false,
      children: [
        'Webpack-With-Tool',
        'Webpack-Operating-Principle',
        'Webpack-JavaScript-Module-History'
      ]
    },
    {
      title: 'Type System',
      collapsable: false,
      children: [
        'Type-System-ML'
      ]
    }
  ]
}

// CSS
function genSidebarCSS (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'Flex',
        'CSS-ProTips',
        'Layout',
        'Center',
        'BFC',
        'Specialty',
        'Two-or-Three-Column',
        'Order-CSS-Properties',
        'CSS2.2',
        'How-To-Write-CSS'
      ]
    }
  ]
}

// Reading Note
function genSidebarNote (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'Functional-JavaScript',
        'JavaScript-Promise',
        'Why-Control-Time',
        'The-Clean-Coder',
        'Real-World-Haskell'
      ]
    }
  ]
}

// Weekly
function genSidebarWeekly (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '0'
      ]
    }
  ]
}

// Gather All
function genSidebarAll (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'Reference',
        'People-In-Konw',
        'Tools-Resource',
        'Free-Book-Resources',
        'Online-Resources',
        'Libraries',
        'Summarize-Your-Career'
      ]
    }
  ]
}