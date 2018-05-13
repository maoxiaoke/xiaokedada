module.exports = {
  title: 'XIAOKEDADA',
  base: '/xiaokedada/',
  lang: 'zh-CN',
  dest: 'dist',
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
    docsDir: 'docs',
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'FirstMeet系列', link: '/FirstMeet/' }
    ],
    sidebar: {
      '/JavaScript/': genSidebarJavaScript (),
      '/FirstMeet/': genSidebarFirstMeet ('Frist-Meet 系列')
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
        'Deep-in-ES6',
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
      ]
    }
  ]
}
