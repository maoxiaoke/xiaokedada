(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{224:function(t,e,s){"use strict";s.r(e);var r=s(0),a=Object(r.a)({},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[t._m(0),t._m(1),s("p",[t._v("HTML 的处理一般借用 "),s("a",{attrs:{href:"https://github.com/jantimon/html-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("html-webpack-plugin"),s("OutboundLink")],1),t._v(" 这个插件。有以下主要功能：")]),t._m(2),t._m(3),s("p",[t._v("涉及到 css 的工程化配置，包括预处理器、后处理器、支持 module css、支持 css-in-js、支持 sourceMap、提取 css 代码、自动加厂商前缀、压缩 css、代码 Lint、css reset。")]),s("p",[t._v("涉及到到的 loader 如下：")]),s("h3",{attrs:{id:"style-loader"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#style-loader","aria-hidden":"true"}},[t._v("#")]),s("a",{attrs:{href:"https://webpack.js.org/loaders/style-loader/#root",target:"_blank",rel:"noopener noreferrer"}},[t._v("style-loader"),s("OutboundLink")],1)]),s("p",[s("a",{attrs:{href:"https://webpack.js.org/loaders/style-loader/#root",target:"_blank",rel:"noopener noreferrer"}},[t._v("style-loader"),s("OutboundLink")],1),t._v(" 的作用是将 css 插入到 DOM 中。这一般可用在 Devlopment 环境；在 Production 中，一般将 css 资源抽取到独立的文件中（样式分离）。")]),t._m(4),s("p",[s("a",{attrs:{href:"https://webpack.js.org/loaders/css-loader/",target:"_blank",rel:"noopener noreferrer"}},[t._v("css-loader"),s("OutboundLink")],1),t._v(" 可以模块化地处理 css，有了这个插件，就可以 "),s("code",[t._v("import './xxx.css'")]),t._v(" 或 "),s("code",[t._v("import { xxx } from './xxx.css'")]),t._v(" 方便地处理 css 文件。")]),s("p",[t._v("比较重要的配置项如下。")]),s("ul",[s("li",[s("code",[t._v("modules")]),t._v(" - 支持 "),s("a",{attrs:{href:"https://github.com/css-modules/css-modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("css module"),s("OutboundLink")],1),t._v(" 的配置，支持 css-module 的 "),s("code",[t._v("scope")]),t._v(" 和 "),s("code",[t._v("composing")]),t._v(" features。\n"),t._m(5)]),t._m(6),t._m(7),t._m(8)]),t._m(9),s("p",[t._v("在将 css 文件交给 "),s("code",[t._v("css-loader")]),t._v("，可以用 "),s("code",[t._v("postcss")]),t._v(" 添加一些非常的功能，比如添加厂商前缀、代码 Lint 等。在 webpack 中通过"),s("a",{attrs:{href:"https://webpack.js.org/loaders/postcss-loader/",target:"_blank",rel:"noopener noreferrer"}},[t._v("postcss-loader"),s("OutboundLink")],1),t._v(" 来支持这些功能。")]),t._m(10),s("p",[t._v("###抽取 css + 压缩 css")]),s("p",[t._v("在生产环境，通常需要提取 + 压缩 css 文件来。可以通过 "),s("code",[t._v("postcss")]),t._v(" 的 "),s("code",[t._v("cssnano")]),t._v(" 来压缩 css。 但是 "),s("a",{attrs:{href:"https://webpack.js.org/plugins/mini-css-extract-plugin/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MiniCssExtractPlugin"),s("OutboundLink")],1),t._v(" + "),s("strong",[s("a",{attrs:{href:"https://github.com/NMFR/optimize-css-assets-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[t._v("optimize-css-assets-webpack-plugin"),s("OutboundLink")],1)]),t._v("  或许是个跟更优秀的选择。")]),t._m(11),t._m(12),s("p",[s("a",{attrs:{href:"https://www.npmjs.com/package/husky",target:"_blank",rel:"noopener noreferrer"}},[t._v("husky"),s("OutboundLink")],1),t._v(" Git hooks 的 工具，支持所有 Git Hooks。")]),s("p",[t._v("常用如下（以下是常见设计）")]),s("ol",[s("li",[s("p",[s("code",[t._v("pre-commit")]),t._v(" - 一般处理代码 Lint，社区一般选用工具是 "),s("a",{attrs:{href:"https://github.com/okonet/lint-staged",target:"_blank",rel:"noopener noreferrer"}},[t._v("lint-staged"),s("OutboundLink")],1),t._v(" 来只处理 staged 的代码。")]),t._m(13),t._m(14)]),s("li",[s("p",[s("code",[t._v("commitmsg")]),t._v(" - 处理 commit 信息的 hook，一般选用 "),s("a",{attrs:{href:"https://github.com/conventional-changelog/commitlint",target:"_blank",rel:"noopener noreferrer"}},[t._v("commitlint"),s("OutboundLink")],1),t._v(" 来设置 commit 规范。")]),t._m(15),t._m(16)])]),t._m(17),s("p",[t._v("可以通过 "),s("a",{attrs:{href:"https://github.com/conventional-changelog/standard-version",target:"_blank",rel:"noopener noreferrer"}},[t._v("standard-version"),s("OutboundLink")],1),t._v(" 自动生成  ChangeLog 或者命令行工具")]),s("blockquote",[s("p",[s("a",{attrs:{href:"https://github.com/conventional-changelog/conventional-changelog",target:"_blank",rel:"noopener noreferrer"}},[t._v("conventional-changelog"),s("OutboundLink")],1),t._v(" 是 一套根据 commit message 和 metadata 信息来生成 ChangeLog 和 Note 的辅助工具集。repo 是一个 "),s("a",{attrs:{href:"https://github.com/babel/babel/blob/master/doc/design/monorepo.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("monorepo"),s("OutboundLink")],1),t._v("。包含在这个 "),s("a",{attrs:{href:"https://github.com/conventional-changelog",target:"_blank",rel:"noopener noreferrer"}},[t._v("conventional-changelog"),s("OutboundLink")],1),t._v(" 比如有 Commit Msg Lint 工具 "),s("a",{attrs:{href:"https://github.com/conventional-changelog/commitlint",target:"_blank",rel:"noopener noreferrer"}},[t._v("commitlint"),s("OutboundLink")],1),t._v("，还有自动生成 Changelog 的 "),s("a",{attrs:{href:"https://github.com/conventional-changelog/standard-version",target:"_blank",rel:"noopener noreferrer"}},[t._v("standard-version"),s("OutboundLink")],1)])]),t._m(18),s("p",[t._v("当然，在 "),s("code",[t._v("commitmsg")]),t._v(" 的 hook 时机 Lint commit msg 是不是还是太后置了，有没有更前置的方式。那就是 "),s("a",{attrs:{href:"https://github.com/commitizen/cz-cli",target:"_blank",rel:"noopener noreferrer"}},[t._v("commitizen"),s("OutboundLink")],1),t._v("，提供交互式的方式。")]),t._m(19),t._m(20),t._m(21),t._m(22),t._m(23),t._m(24),t._m(25),s("p",[t._v("如果项目中引入或者引入的库中包含了 "),s("code",[t._v("momentjs")]),t._v("，由于这个包包含很多时区的设置，因此最终打包体积会很大，因此可借助  "),s("a",{attrs:{href:"https://webpack.js.org/plugins/ignore-plugin/#root",target:"_blank",rel:"noopener noreferrer"}},[t._v("IgnorePlugin"),s("OutboundLink")],1),t._v(" 这个 plugin 来实现，举例如下：")]),t._m(26),s("p",[t._v("不过这种方式就需要用户自己导入自己所属的时区了。")]),t._m(27),t._m(28)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"html"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html","aria-hidden":"true"}},[this._v("#")]),this._v(" HTML")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"html-webpack-plugin"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#html-webpack-plugin","aria-hidden":"true"}},[this._v("#")]),this._v(" html-webpack-plugin")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("将 webpack 生成的 bundle 资源插入到 "),e("code",[this._v("<script>")]),this._v(" 标签中；")]),e("li",[this._v("压缩 html 文件；")]),e("li",[this._v("根据模板文件生成 html 文件；")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"css"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#css","aria-hidden":"true"}},[this._v("#")]),this._v(" CSS")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"css-loader"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#css-loader","aria-hidden":"true"}},[this._v("#")]),this._v(" css-loader")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("code",[t._v("mode")]),t._v(" - 默认 "),s("code",[t._v("local")]),t._v("，意思是如果全局 css，需要添加 "),s("code",[t._v(":global")]),t._v("；")]),s("li",[s("code",[t._v("localIdentName")]),t._v(" - 用来配置 css 的唯一标识；")]),s("li",[s("code",[t._v("getLocalIdent")]),t._v(" - 函数的方式配置 css 的唯一标识；")]),s("li",[s("code",[t._v("localIdentRegExp")]),t._v(" - 正则的方式配置 css 的唯一标识。")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("code",[this._v("importLoaders")]),this._v(" - 配置在 "),e("code",[this._v("import")]),this._v(" css 资源之前，并转交给 "),e("code",[this._v("css-loader")]),this._v(" 之前还应该经过多少个  loader，通常是为 预处理器 和 后处理器配置的。")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("li",[s("code",[t._v("localsConvention")]),t._v(" - 配置 css 类型导出的 格式。默认是 "),s("code",[t._v("asIs")]),t._v("，如果设置成 "),s("code",[t._v("camelCase")]),t._v("，则 "),s("code",[t._v(".btn-name")]),t._v(" 的处理方式就是 "),s("code",[t._v("import { btnName } from './xxx.css'")]),t._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("li",[e("code",[this._v("onlyLocals")]),this._v(" - SSR相关，如果使用 "),e("code",[this._v("mini-css-extract-plugin")]),this._v("  作预渲染，应设为 "),e("code",[this._v("true")]),this._v("。默认是 "),e("code",[this._v("false")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"post-processor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#post-processor","aria-hidden":"true"}},[this._v("#")]),this._v(" Post-processor")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"pre-processor"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#pre-processor","aria-hidden":"true"}},[this._v("#")]),this._v(" Pre-Processor")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"git-hooks-changelog"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-hooks-changelog","aria-hidden":"true"}},[this._v("#")]),this._v(" Git Hooks & Changelog")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"git-hooks"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-hooks","aria-hidden":"true"}},[this._v("#")]),this._v(" Git Hooks")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("code",[this._v("js/jsx/ts/tsx")]),this._v(" 的 Lint，使用 eslint")]),e("li",[e("code",[this._v("css/less/sass")]),this._v(" 的 Lint，使用 styleLint")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("这两者需要开发团队的 Lint 规范")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("官方提供 "),e("code",[this._v("@commitlint/config-conventional")]),this._v(" 使用")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("需要开发团队的 Git Commit 规范")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"generate-changelog"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#generate-changelog","aria-hidden":"true"}},[this._v("#")]),this._v(" Generate Changelog")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"commitizen"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#commitizen","aria-hidden":"true"}},[this._v("#")]),this._v(" Commitizen")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("如果使用了 "),e("code",[this._v("prepare-commit-msg")]),this._v(" 这个 hook，则可以在每次 "),e("code",[this._v("git commit")]),this._v(" 之前唤起交互式的工具。")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[t._v("  "),s("span",{attrs:{class:"token property"}},[t._v('"husky"')]),s("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{attrs:{class:"token property"}},[t._v('"hooks"')]),s("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{attrs:{class:"token property"}},[t._v('"pre-commit"')]),s("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"lint-staged"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{attrs:{class:"token property"}},[t._v('"commit-msg"')]),s("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"commitlint -e $HUSKY_GIT_PARAMS"')]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),s("span",{attrs:{class:"token property"}},[t._v('"prepare-commit-msg"')]),s("span",{attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token string"}},[t._v('"exec < /dev/tty && npx git-cz --hook || true"')]),t._v("\n    "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("问题：如上的方式，使用 husky 怎么结合 "),e("code",[this._v("commitlint")]),this._v(" 和 "),e("code",[this._v("git-cz")]),this._v("。")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"development"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#development","aria-hidden":"true"}},[this._v("#")]),this._v(" Development")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"production"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#production","aria-hidden":"true"}},[this._v("#")]),this._v(" Production")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"打包优化"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#打包优化","aria-hidden":"true"}},[this._v("#")]),this._v(" 打包优化")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"moment"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#moment","aria-hidden":"true"}},[this._v("#")]),this._v(" moment")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{attrs:{class:"token class-name"}},[t._v("webpack"),s("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("IgnorePlugin")]),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  resourceRegExp"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token regex"}},[t._v("/^\\.\\/locale$/")]),s("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  contextRegExp"),s("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{attrs:{class:"token regex"}},[t._v("/moment$/")]),t._v("\n"),s("span",{attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"按需引入"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#按需引入","aria-hidden":"true"}},[this._v("#")]),this._v(" 按需引入")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"code-spliting"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#code-spliting","aria-hidden":"true"}},[this._v("#")]),this._v(" Code Spliting")])}],!1,null,null,null);e.default=a.exports}}]);