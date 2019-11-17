## HTML

### html-webpack-plugin

HTML 的处理一般借用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 这个插件。有以下主要功能：

+ 将 webpack 生成的 bundle 资源插入到 `<script>` 标签中；
+ 压缩 html 文件；
+ 根据模板文件生成 html 文件；

## CSS

涉及到 css 的工程化配置，包括预处理器、后处理器、支持 module css、支持 css-in-js、支持 sourceMap、提取 css 代码、自动加厂商前缀、压缩 css、代码 Lint、css reset。

涉及到到的 loader 如下：

###  [style-loader](https://webpack.js.org/loaders/style-loader/#root) 

[style-loader](https://webpack.js.org/loaders/style-loader/#root) 的作用是将 css 插入到 DOM 中。这一般可用在 Devlopment 环境；在 Production 中，一般将 css 资源抽取到独立的文件中（样式分离）。

### css-loader

[css-loader](https://webpack.js.org/loaders/css-loader/) 可以模块化地处理 css，有了这个插件，就可以 `import './xxx.css'` 或 `import { xxx } from './xxx.css'` 方便地处理 css 文件。

比较重要的配置项如下。

+ `modules` - 支持 [css module](https://github.com/css-modules/css-modules) 的配置，支持 css-module 的 `scope` 和 `composing` features。
  + `mode` - 默认 `local`，意思是如果全局 css，需要添加 `:global`；
  + `localIdentName` - 用来配置 css 的唯一标识；
  + `getLocalIdent` - 函数的方式配置 css 的唯一标识；
  + `localIdentRegExp` - 正则的方式配置 css 的唯一标识。
+ `importLoaders` - 配置在 `import` css 资源之前，并转交给 `css-loader` 之前还应该经过多少个  loader，通常是为 预处理器 和 后处理器配置的。
+ `localsConvention` - 配置 css 类型导出的 格式。默认是 `asIs`，如果设置成 `camelCase`，则 `.btn-name` 的处理方式就是 `import { btnName } from './xxx.css'`。
+ `onlyLocals` - SSR相关，如果使用 `mini-css-extract-plugin`  作预渲染，应设为 `true`。默认是 `false`

###  Post-processor

在将 css 文件交给 `css-loader`，可以用 `postcss` 添加一些非常的功能，比如添加厂商前缀、代码 Lint 等。在 webpack 中通过[postcss-loader](https://webpack.js.org/loaders/postcss-loader/) 来支持这些功能。

### Pre-Processor



###抽取 css + 压缩 css 

在生产环境，通常需要提取 + 压缩 css 文件来。可以通过 `postcss` 的 `cssnano` 来压缩 css。 但是 [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/) + **[optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)**  或许是个跟更优秀的选择。

##  Git Hooks & Changelog

### Git Hooks

[husky](https://www.npmjs.com/package/husky) Git hooks 的 工具，支持所有 Git Hooks。

常用如下（以下是常见设计）

1. `pre-commit ` - 一般处理代码 Lint，社区一般选用工具是 [lint-staged](https://github.com/okonet/lint-staged) 来只处理 staged 的代码。

   + `js/jsx/ts/tsx` 的 Lint，使用 eslint
   + `css/less/sass` 的 Lint，使用 styleLint

   **这两者需要开发团队的 Lint 规范**

2. `commitmsg` - 处理 commit 信息的 hook，一般选用 [commitlint](https://github.com/conventional-changelog/commitlint) 来设置 commit 规范。

   + 官方提供 `@commitlint/config-conventional` 使用

   **需要开发团队的 Git Commit 规范**



###  Generate Changelog

可以通过 [standard-version](https://github.com/conventional-changelog/standard-version) 自动生成  ChangeLog 或者命令行工具 



> [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) 是 一套根据 commit message 和 metadata 信息来生成 ChangeLog 和 Note 的辅助工具集。repo 是一个 [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)。包含在这个 [conventional-changelog](https://github.com/conventional-changelog) 比如有 Commit Msg Lint 工具 [commitlint](https://github.com/conventional-changelog/commitlint)，还有自动生成 Changelog 的 [standard-version](https://github.com/conventional-changelog/standard-version)

### Commitizen

当然，在 `commitmsg` 的 hook 时机 Lint commit msg 是不是还是太后置了，有没有更前置的方式。那就是 [commitizen](https://github.com/commitizen/cz-cli)，提供交互式的方式。

如果使用了 `prepare-commit-msg` 这个 hook，则可以在每次 `git commit` 之前唤起交互式的工具。

```json
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
      "prepare-commit-msg": "exec < /dev/tty && npx git-cz --hook || true"
    }
  }
```



问题：如上的方式，使用 husky 怎么结合 `commitlint` 和 `git-cz`。


##  Development

## Production



##  打包优化

### moment

如果项目中引入或者引入的库中包含了 `momentjs`，由于这个包包含很多时区的设置，因此最终打包体积会很大，因此可借助  [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/#root) 这个 plugin 来实现，举例如下：

```js
new webpack.IgnorePlugin({
  resourceRegExp: /^\.\/locale$/,
  contextRegExp: /moment$/
});
```

不过这种方式就需要用户自己导入自己所属的时区了。

### 按需引入

### Code Spliting


