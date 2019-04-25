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