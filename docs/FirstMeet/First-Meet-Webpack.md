# 新学 Webpack

## 构建工具的需求点

从产品的角度来设计一个构建工具，应该具有一下要求：

1. 依赖管理，识别依赖和管理依赖关系
2. 资源加载管理
3. 效率和优化

## 名词解释

[Terminology from Webpack](https://webpack.js.org/glossary) or [Glossary from Webpack Book](https://survivejs.com/webpack/appendices/glossary/)。

1. Module

Webpack 扩充了 module 在 JavaScript/NodeJS 中含义：在 Webpack 的世界中，任何资源比如一张图片、字体资源、css 文件都是 module，而这些资源都有一个功能的特点：入口资源。

+ ES6 import
+ CommonJS require
+ css/sass 的 import
+ 样式文件中的 url('.../')
+ 等

都可以看做是 module 的标志。

2. Chunk

Chunk 更难理解一点，理解为 代码 chunk (一大块代码)。这个 chunk 会是对多个 module 及其依赖的一个管理者，管理 module 及其依赖的打包过程。

3. Bundle

Bundle 是由一个或多个 chunks 组成的最终结果的输出文件，供浏览器加载。而且可以有多个 bundle。

## 开启代码压缩

**为什么：**webpack 提供多种 mode，倘若在 production 模式，会自动开启代码压缩。

### 关闭代码压缩

倘若我们需要在开发环境，有时候就需要关闭代码压缩，开启 source map，这时候我们将 mode 设置为 development。

## source map 支持

+ 建议在 development 中开启

**为什么：**为提高性能，通常会压缩 JavaScript 文件和 CSS 文件，这样就会产生调试困难的问题。source map 能提供源代码位置到压缩代码的映射。[参考](https://blog.teamtreehouse.com/introduction-source-maps)

**方案：**Webpack 中提供 Devtool 和 SourceMapDevToolPlugin 来支持。

配置如下：

```js
//webpack.config.js
...
devtool: 'source-map'
...
```

最后编译的文件会出一个 `.map` 文件。

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/source-map01.jpg?raw=true)

如果设置为：

```js
//webpack.config.js
...
devtool: 'inline-source-map'
...
```

则添加 source map 的 dataUrl 到编译文件的末尾。

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/source-map02.jpg?raw=true)

还有很多其他很多配置，编译后的代码也分为 bundled code、generated code、transformed code、	original source 等多种。[官方文档](https://webpack.js.org/configuration/devtool/)

## Dev Server

### 热替换



