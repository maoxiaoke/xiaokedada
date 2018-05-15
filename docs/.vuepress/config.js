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
      
    ],
    sidebar: {
      '/JavaScript/': genSidebarJavaScript (),
      '/FirstMeet/': genSidebarFirstMeet ('Frist-Meet 系列'),
      '/CSS/': genSidebarCSS ('层叠样式')
    }
  }
}

//  JavaScript
function genSidebarJavaScript () {
  return [
    {
      title: '基础内容',
      collapsable: false,
      children: [
        'Async-Programming',
      ]
    },
    {
      title: 'ECMAScript 6',
      collapsable: false,
      children: [
        'Require-and-Import',
        'Property-Descriptors',        
        'Small-and-Chunk-Code',        
        'Async-Programming',        
        'Depth-in-ES6',
        'Depth-in-This',
        'Depth-in-Closure',
        'DOM-Operation',
        'DOM-More',
        'Coercion',
        'Prototype',
        'Map-and-Reduce',
        'AJAX',
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
        'First-Meet-Cache'
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
        'Layout',
        'Center',
        'BFC',
        'Specialty',
        'Two-or-Three-Column',
        'CSS-ProTips'
      ]
    }
  ]
}
