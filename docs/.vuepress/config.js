module.exports = {
  title: 'XIAOKEDADA',
  // base: '/dist/',
  lang: 'zh-CN',
  // dest: '',
  description: 'Write something useful and funny',
  serviceWorker: true,
  head: [
    ['link', { rel: 'icon', href: `/favicon.png` }],
  ],
  // theme: 'vue',
  themeConfig: {
    repo: 'maoxiaoke/xiaokedada',
    repoLabel: 'Github',
    editLinks: true,
    // docsDir: 'docs',
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'FirstMeet系列', link: '/FirstMeet/' },
      { text: 'CSS', link: '/CSS/' },
      { text: '读书笔记', link: '/ReadingNote/' },
      { text: 'R & T', link: '/GatherAll/' },
    ],
    sidebar: {
      '/JavaScript/': genSidebarJavaScript (),
      '/FirstMeet/': genSidebarFirstMeet ('Frist-Meet 系列'),
      '/CSS/': genSidebarCSS ('层叠样式'),
      '/ReadingNote/': genSidebarNote('读书笔记'),
      '/GatherAll/': genSidebarAll('资源和前端思考')
    }
  }
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
      title: '基础内容',
      collapsable: false,
      children: [
        'AJAX',
        'Coercion',
        'Map-and-Reduce',
      ]
    },
    {
      title: 'DOM 相关',
      collapsable: false,
      children: [
        'DOM-Operation',
        'DOM-More',
      ]
    },
    {
      title: 'Thinking-in-JavaScript',
      collapsable: false,
      children: [
        'Small-and-Chunk-Code',
        'I-Dont-Know-JavaScript'
      ]
    }
  ]
}

// First-Meet
function genSidebarFirstMeet (title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        'First-Meet-JSON',
        'First-Meet-Cache',
        'First-Meet-Vue-Communication',
        'First-Meet-Flux',
        'First-Meet-JavaScript'
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
        'CSS2.2'
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
        'JavaScript-Promise'
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
        'Summarize-Your-Career'
      ]
    }
  ]
}