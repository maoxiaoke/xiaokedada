# Webpack 可视化工具

借助可视化工具，我们可以：

+ 更直观地理解 module/bundle/chunk 等术语
+ 为 webpack 优化提供可视化的思考途径

## 获取 --profile json 文件

[`webpack --profile`](https://webpack.js.org/api/cli/#profiling) 指令能捕获在编译的每个步骤的定时信息。

执行以下指令：

```bash
$ webpack --profile --json > stats.json
```

这个指令最终在目录下生成一个 `stats.json` 文件，记录了编译过程中的依赖关系图和其他的构建信息。

[这是我生成的一个例子](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/files/stats.json)，其中字段的含义在[文档Stats Data](https://webpack.js.org/api/stats) 有比较详细的介绍。

::: tip
目前，cli 操作 和 webpack 包解耦开了，因此需要下载单独的 webpack-cli 包。有可能出现下面的问题：

```bash
One CLI for webpack must be installed. These are recommended choices, delivered as separatepackages:
 - webpack-cli (https://github.com/webpack/webpack-cli)
   The original webpack full-featured CLI.
 - webpack-command (https://github.com/webpack-contrib/webpack-command)
   A lightweight, opinionated webpack CLI.
We will use "npm" to install the CLI via "npm install -D".
Which one do you like to install (webpack-cli/webpack-command):
```

问题是，按照提示的操作，依旧如此。社区很多的 [webpack keeps asking if I want to install webpack-cli](https://github.com/webpack/webpack/issues/7197)。而我的解决方式是在 root 身份下把问题解决的。仅供参考。
:::

**HELP ME**：在 json 文件中，type 有 harmony side effect evaluation 和 harmony import specifier 两个枚举值，还不是表达什么意思。

## Webpack Analyzer

[Webpack Analyzer](https://webpack.github.io/analyse/) 是 webpack 官方提供的一个分析工具。

## Webpack Visualizer

[Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/)

## source-map-explorer

[source-map-explorer](https://github.com/danvk/source-map-explorer)

## webpack-bundle-analyzer

[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)

这个工具还是很赞的。

使用方式如下：

```bash
npm install --save-dev webpack-bundle-analyzer
```

作为 loader 加入到 webpack 的配置中：

```js
// webpack.config.js
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// ...
plugins: [new BundleAnalyzerPlugin()]
// ...
```

参考

1. [Optimising your application bundle size with webpack](https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579)

2. [Three simple ways to inspect a Webpack bundle](https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d)