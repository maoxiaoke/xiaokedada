# Webpack基本配置

> 来源：[Webpack基本配置](https://yuque.antfin-inc.com/kejun/xdnio4/tmllzq)

## 章节简介
[Webpack](https://webpack.js.org/) 是目前最为流行的前端构建工具。同时在前端工程化中，Webpack在开发/编译/构建中都起到了最关键的作用。所以在当下阶段，webpack的基本配置，是每一个前端程序员应当掌握的基本技能。

2014年2月，Webpack发布了第一个正式版，而如今已经到了Webpack@4。Webpack版本变更似乎是参考了同行的一些功能。[Rollup](https://rollupjs.org/guide/en) 推出后，Webpack2通过UglifyJs实现了tree-shaking，Webpack3实现了作用域提升(scope-hosting)。而在[Parcel](https://parceljs.org/) 推出后，Webpack4也开始降低配置化。在这之前，用户需要引入大量插件来做构建优化，开发环境与生产环境还需要做不同配置。而Webpack4通过设置模式（mode），可以减少开发与生产环境的插件引入与相应逻辑。

所以鉴于此，本章节立足当下，主要介绍Webpack@4的基本配置。根据开发构建的不同流程环节与构建的不同需求，我将webpack基本配置分为如下几块介绍：

1. 基本配置

2. 开发配置

3. 构建配置

4. 库开发相关


由于搭建webpack工程，会涉及多个维度的相关配置。但分散的配置介绍又显得凌乱，故而我选择系统的介绍相关配置，方便大家阅读后上手。我会从最基础的开始讲，尽量让一个webpack小白，看完文章以后，能利用webpack搭建基本的前端工程。但是具体详细的配置，我不会穷举，因为无论文章怎么写，必定不如官方文档详实与及时。我不指望一篇文章会成为一本工具书，只希望本文可以告诉入门用户webpack的大致套路与某些场景下的配置情况。建议实际操作需要查阅配置时，还是要查阅此时官网的相应文档。

<a name="w5nzno"></a>
## 配置前言
介绍配置之前，我们应该对webpack有个初始认识，不然对配置会缺乏一些基本概念。[官网](https://webpack.js.org/)对自身有着明确定义：

> webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何资源(resource or asset)。


在开发web应用时，假如我们没有任何构建工具。我们一开始会编写一个index.html 、index.js、index.less。随着功能的增多，我们的代码开始变的复杂、甚至可能会引用一些开源的库或者框架，这不可避免的要将代码拆分成模块，然后模块之间可能会有依赖。怎么管理不同模块的依赖引入、又如何打包和输出就成了一个大问题。

但不管模块如何多，开发人员总要先编写一个最初始的js文件。webpack就以这个初始js文件为「入口」，根据代码中声明的模块引用来加载其他资源文件，根据webpack配置来对加载的模块进行编译、打包，最终「输出」开发人员期望的打包结果。

（不同于webpack，另一款打包工具[Parcel](https://parceljs.org/)更倾向于用html作为打包的入口文件）。

<a name="e6cduw"></a>
## 基本配置
<a name="tl3qzg"></a>
### 入口[entry]
从上节中，我们明白了「入口」的意义。一个webpack工程，首先至少要有一个入口，配置也很简单，官网有介绍：
```javascript
module.exports = {
  entry: './index.js'
};
```

当然，因为工程可能是多个HTML页面的，每个页面都希望有各自的入口，那可能就是这样：
```javascript
module.exports = {
  entry: {
    pageA: './pageA.js',
    pageB: './pageB.js'
  }
};
```

entry也可以为数组，如：
```javascript
module.exports = {
  entry: ['./fileA.js', './fileB.js']
};
// 也可以这样：
module.exports = {
  entry: {
    main: ['./fileA.js', './fileB.js']
  }
};
```

这样配置后会将多个js文件，最终打包成一个入口。数组型的入口，在工程开发中使用较少。某些插件可能会利用此特性来实现一些功能，如往入口中注入热更新相关代码以实现热更新[HMR]。

<a name="ieehgm"></a>
### 出口[output]
我们所定义的「入口」是开发时的程序入口，最终编译构建后，真正被浏览器加载的资源文件则是「出口」文件。「出口」的相关配置定义了输出文件的路径与文件名。最基本的配置为：

```javascript
module.exports = {
  output: {
    filename: 'output.js', // 文件名
    path: __dirname + '/dist' // 文件输出路径，必须为系统绝对路径
  }
};
```

由于「入口」会存在多个，同样的「出口」文件也会有多个，多出口的定义如下：

```javascript
module.exports = {
  entry: {
    pageA: './a.js',
    pageB: './b.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
```

这样配置后，将会输出 `/dist/pageA.js` 与 `/dist/pageB.js` 。占位符 `[name]` 为 `chunkName` ，在此处则即是 entry 中多入口配置对象的key值，即pageA 与 pageB。

<a name="q5sstl"></a>
#### chunk
在这里又引入了一个 `chunk` 的概念。`chunk` 的中文意思是“块”，在这里即是代码块。我们可以将一个webpack打包出的一个js文件认为是一个chunk 。如果我们不做任何的拆包处理，那我们的每一个entry就会输出一个chunk。output的filename的配置中，占位符即代表了chunk的一些属性。如[id]代表chunkId，[chunkhash]代表chunk文件的内容哈希值。当然 `filename` 也可以配置为函数，函数入参则为包含chunk信息的对象。

<a name="x98oue"></a>
#### path与publicPath
`path` 配置决定了最终打包后输出资源的文件路径，且它必须要求为系统绝对路径（这不等同于html中最终引入的路径）。如果使用了html插件（这在后续章节会讲到），那webpack会智能的判断生成的html与chunk的相对路径，再以script方式引入。

有时候我们html与静态资源并非分发到同一个地方。如html为服务端渲染输出、亦或者发至专门的html输出服务器以便方便控制版本，而js/css等静态资源则专门分发到cdn。这样就需要html中引入资源时以完整路径引入。这时就需要用使用 `publicPath` ，如：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    pageA: './a.js',
    pageB: './b.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    publicPath: 'https://cdn.antfin.com'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

这样，html中引用的js资源从 `pageA.js`  变为 `https://cdn.antfin.com/pageA.js` 。

还有一种常见的情况是“按需加载”。这时js资源会异步的去加载，而不是直接以script资源方式构建在html文件中。这种情况下，webpack无法判断js与html的相对路径（因为这是在js文件中执行脚本引入的，这个js文件也可能被不同的页面引入，不确定此时具体的html文件与其路径）。所以，需要配置 `publicPath` 固化此 `异步chunk` 的地址。

<a name="9crgbd"></a>
#### 其他
`output` 还有个很重要的配置属性是 `library` ，这个属性决定了webpack构建出来的包是做什么用途的，能被以何种方式引用、加载执行。但对于日常工程构建来说，可以默认不配置。后续在 **「库开发相关」**这一章节中，我会再具体介绍。

除此外，output还有非常多的配置，但都比较偏门，同学们可以在输出文件遇到问题时，查询官方文档。

<a name="8hyefb"></a>
### 模式[mode]
模式是webpack@4新增的配置属性，目的是为了简化webpack繁琐的配置。上两节中我们介绍了文件的入口与输出。在一个工程化的项目中：生产环境下，我们希望输出的文件是经过压缩、混淆（丑化）的。而开发环境时由于调试需要，我们希望文件是未压缩与混淆的。

在webpack@4以前，我们往往通过执行不同的npm script命令，从而设置不同的process.env.NODE_ENV，进而在webpack配置文件中判断此时环境变量，加载不同的webpack插件，输出不同的配置。

由于大部分工程项目的开发环境与生产环境有着较为统一的需求，因此webpack@4+通过配置不同模式[mode]，来默认执行该模式下的一些通用操作。如生产模式时，默认引入代码压缩混淆插件 `UglifyJsPlugin` 与作用域提升的插件 `ModuleConcatenationPlugin` 。

目前已有的模式有：`production` 、`development` 、`none` ，默认为`production`。设置为 `production` 与 `development` 时会同时默认设置process.env.NODE_ENV为production或development。 设置 `none` 时，webpack不做任何附加操作。

<a name="pud9ql"></a>
### 模块[module]
我们知道webpack 是一个模块打包器，它不仅仅能处理js文件，还能处理css、图片。而且也能将ES6的代码、甚至是TypeScript的代码引用并打包输出成当下可执行的js文件。而webpack自身不可能穷举处理所有的相关文件。于是就采用了 `loader` 方式。

> loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "加载" 模块时预处理文件。


不同的文件类型可能需要匹配不同的loader，做不同的文件转化。而有的模块可能需要处理，有的模块可能需要忽略，这一切相关的配置就在 `module`** **中。

<a name="l7emso"></a>
#### rules
`module` 的主要配置项为 `rules` 。这是一个数组配置，rules中的每一项rule即配置了如何去处理一个模块。比如我们希望将ES6代码转成ES5代码，这需要引用 `babel-loader` 。它的rule配置即为：

```javascript
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader'
      }
    ]
  }
};
```

其中 `test` 可以为一个正则，其匹配的对象是 引用模块的绝对路径，我们通过配置上述配置将所有引入的js文件都通过babel-loader来转化。

作为loader，可能需要一些额外的配置，比如 `babel-loader` 可能需要做一些编译配置，来设置最终转化后的结果。这需要 `use` 属性值为对象，不可简写为字符串，如：

```javascript
{
  test: /\.(js)$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'] // 根据目标浏览器自动转换为相应es5代码
    } 
  }
}
// ps: babel的配置我们更多是以.babelrc配置文件的方式存在项目根目录
```

一般来说，node_modules中我们加载的外部库文件已经被babel编译成es5代码，因此是不需要再进行一次babel编译的。为了节省开发、构建性能，我们会通过配置 `exclude` 或 `include` 来过滤或者指定需要执行loader的文件目录。如：

```javascript
{
  test: /\.(js)$/,
  use: 'babel-loader',
  exclude: path.resolve(process.cwd(), './node_modules'), // 过滤node_modules目录
  include: path.resolve(process.cwd(), './src') // 只匹配src目录
}
```

有时候，我们一个模块文件需要转化多次，需要多个loader。比如一个css文件，先通过 `css-loader` 解释css文件内的 `@import` 和 `url()` ， 最后通过 `style-loader` 将css以<style>标签插入至dom中。这时，`use` 配置可以为一个数组。如：

```javascript
{
  test: /\.(css|less)$/,
  use: [
    'style-loader',
    'css-loader'
  ]
}
```

如果某些loader需要增加配置，也可以：

```javascript
{
  test: /\.(css|less)$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true // 启用sourceMap
      }
    }
  ]
}
```

除此外，`rule` 还有一些较少用的配置如 `oneOf` 等，可自行查阅官网文档。

<a name="ovxfbh"></a>
#### noParse
这个配置其实用的比较少。但鉴于 `module` 也仅有 `noParse` 与 `rule` 两个子配置，那我也介绍一下。

我们经常会在模块代码文件中又 import/require 其他模块。这就需要webpack去解析文件，判断内部是否有模块导入。但某些库文件可能内部并无 import/require ，比如 `jquery` 的npm包。再去解析这些文件无疑是浪费性能。故可以配置noParse字段，过滤某些你确定不需要递归解析模块加载的包。如：

```javascript
module.exports = {
  //...
  module: {
    noParse: /jquery/, // 可以为正则
    noParse: function(content) { // 亦可以为函数
      return /jquery/.test(content);
    }
  }
};
```

<a name="y5uppf"></a>
### 解析[resolve]
这个配置决定如何去解析模块。（这不是去编译转化文件，不能与上述loader所做的事混淆）如：是否需要缓存此模块；是否自动识别扩展文件名等。不过我们最常用的配置只有一个 `alias` : 创建 `import` 或 `require` 的别名，借此来简写某些模块文件的路径。最常见的如：

```javascript
module.exports = {
  //...
  resolve: {
    alias: {
      '#': path.resolve(process.cwd(), './src');
    }
  }
};
```

这样在某些需要相对路径比较深的模块引入时，可以从这样：<br />`import utils from '../../../utils'` <br />变为这样：<br />`import utils from '#/utils'` 

PS: 这样有一个坏处就是编辑器没办法自动匹配文件路径了，不过可以在vscode中配置 `jsconfig.json` 或 `tsconfig.json` ，如下：

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "#/*": ["src/*"]
    }
  }
}
```

<a name="c081gg"></a>
### 统计信息[stats]
当我们执行webpack命令时，终端中会打印非常多的信息。有时候有些信息并不是很重要，有时候我们只在意出错的信息，这时候 `stats` 配置就派上了用场。

如果是开发环境，启动了webpack-dev-server，那这个配置需要 `devServer` 对象中。关于webpack-dev-server的配置，将会在下一节-开发配置 中谈及。

`stats` 对应的配置有四十多个，选项非常精细，所以webpack提供一些预设选项，只要配置一个预设值，就对应了一系列配置。具体如下：

| Preset          | Alternative | Description                       |
| --------------- | ----------- | --------------------------------- |
| `"errors-only"` | none        | 只在发生错误时输出                |
| `"minimal"`     | none        | 只在发生错误 或是 新的编译时输出  |
| `"none"`        | `false`     | 没有输出                          |
| `"normal"`      | `true`      | 标准输出                          |
| `"detailed"`    | none        | 详细输出（从 webpack 3.0.0 开始） |
| `"verbose"`     | none        | 全部输出                          |

但是在实际使用中，可能还是有些局限，不一定满足自身定制化的需求，所幸大部分配置都是默认开启，实际需求中只要关闭几个不必要的配置即可。笔者的日常配置如下： `devServer`  中配置 `stats` 为 `errors-only` 。在生产环境时：
```json
stats: {
  warnings: false, // 取消警告信息
  children: false, // 取消子级信息
  modules: false, // 取消模块构建信息
  entrypoints: false // 不显示入口起点
}
```


<a name="t4bcbq"></a>
## loader与plugin
上一节，主要介绍了入口文件从解析到编译输出的一些基本配置。但webpack强大的功能主要还是依赖于 `loader` 与 `plugin` 机制。本节将简单介绍日常配置中，基本必须的一些loader与plugin。

<a name="4q4xgc"></a>
### 必备loader
关于 `loader` 的概念，上节的 `module` 配置中已有简单介绍，此处不重复了。

<a name="6q57yf"></a>
#### babel-loader
利用[babel](https://babeljs.io/) 将最新标准的代码转成当下浏览器可执行的js代码。`babel-loader` 的配置即是 `babel` 的配置，其主要是以 `.babelrc` 配置文件的方式存在项目根目录。如配置有特殊逻辑处理，可以在 `module.rules` 中引用<br />`babel-loader` 处做配置覆盖。

<a name="6gkwvh"></a>
#### css相关loaders

- less-loader/sass-loader:** **现代工程基本基本已离不开 `less/sass` 预处理。

- postcss-loader: css样式后处理工具。css压缩、合并、自动兼容浏览器等功能利器。

- css-loader: 解释css文件内的 `@import` 和 `url()` ；可开启 `css-module` 。

- style-loader: 将css以 `style` 标签插入dom中。

- css-hot-loader: css热更新loader，**线上环境时勿加，会引起js文件contentHash每次都不同**。


<a name="xyrvnu"></a>
#### file-loader
对于图片这样的静态资源，我们在代码中引入时，常以当前文件为基准，引入其相对路径下的图片。而当我们访问html时，这个相对路径其实是基于html此时的路径的，故而会导致引入路径错误。 `file-loader` 主要解决这个问题。可以自动的识别webpack配置，打包资源图片，修复引入路径，进而保证资源引入正确。同时也支持修改输出后文件的路径与文件名、携带hash值等功能。

<a name="b96hif"></a>
#### url-loader
基本功能同 `file-loader` ，在它基础上，可以设置一个 `limit` 配置项，意义为文件的体积大小，单位为字节。对于小于此大小的文件，会转化成 base64 的数据，替换url引入。对于小图片等资源常用这样的操作，好处是减少资源的请求次数；或者在某些场景下，保证图片在html加载或渲染时就能展示，不需要再发起请求。

<a name="q4vspa"></a>
### 必备plugin
有些新手同学一开始可能会混淆 `plugin` 与 `loader` 。关于loader上面已经阐述多次，也能较为清晰的明白，   `loader` 主要负责对于某些文件的处理与转化。

但构建过程中的很多场景，并非都是针对单个文件去做处理的。比如我需要把最终编译后的js文件压缩混淆一下。如果单个文件去压缩，有些全局变量或上下文关系处理起来就很麻烦。比如我想在编译期定义几个全局常量，如定义_DEV_为当前编译环境。这个跟某些文件并没有关系。而这些都需要相应的 `plugin` 来支持。

我们能大致的感受到，`plugin` 是作用于webpack命令执行的整个生命周期的。在webpack编译的生命周期中，会暴露出对应的一系列生命周期钩子，以便于 `plugin` 调用与执行相应的行为。其具体的原理与深入的了解在下一章《深入了解webpack》中会继续讲到。本节主要介绍几个日常使用必不可少的几个插件。

<a name="dl7bpl"></a>
#### html-webpack-plugin
只要是web应用的工程，必须要有html文件或者其他html模板文件。那么 `html-webpack-plugin` 就必不可少。这个插件在上述中也有使用过，主要功能就是可以根据项目中的html模板（没有也行），生成想要的html文件，并插入我们构建出来的js与css等资源。

有一个需要注意的点是，对于构建多页应用来说，每需要一个html文件，就需增加一个 `html-webpack-plugin` <br />，并引入相应的chunk。配置举例如下：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    pageA: './a.js',
    pageB: './b.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'pageA.html',
      chunks: ['pageA']
    }),
    new HtmlWebpackPlugin({
      filename: 'pageB.html',
      chunks: ['pageB']
    })
  ]
};
```

该插件配置非常丰富，包括修改html标题、注入meta标签、向html模板中注入某些自定义变量等。具体可参考其[github文档](https://github.com/jantimon/html-webpack-plugin) 。

<a name="x9kuzf"></a>
#### mini-css-extract-plugin
之前我们介绍的配置，一直没有谈及如何抽离css文件。我们的css一直是以 `style` 标签的形式插入至dom中的。这明显不是我们想要的结果。`mini-css-extract-plugin` 就是干这样的活的。需要注意的是，如果引入了本插件，那么就需要在css文件的相关 `loaders` 中需要使用 `MiniCssExtractPlugin.loader` 替换<br />`style-loader` 。<br />配置举例如下：

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  //...
  plugins: [
    new MiniCssExtractPlugin({
      fileName: '[name].css' // 生产环境需要hash可配置为 [name].[contenthash].css
    })
  ],
  modules: {
    rules: [
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    ]
  }
}
```

<a name="uee0zg"></a>
#### HotModuleReplacementPlugin
HMR在上文中有多次提到，webpack官网中的介绍也非常清晰：

> 模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除[模块](https://webpack.docschina.org/concepts/modules/)，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度:

> - 保留在完全重新加载页面时丢失的应用程序状态。

> - 只更新变更内容，以节省宝贵的开发时间。

> - 调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。



从介绍中我们明白，热替换是以模块为维度的，HMR是可选的，也只会影响包含 HMR 代码的模块。而模块的加载与处理可能会经过 `loader` ，这就需要相应的 `loader` 去实现HMR接口。基于此，我们有一些注意点

1. webpack-dev-server 中需要设置 `hot` 为 `true` 。

2. `style-loader` 支持热替换，但是上小节中为了抽离css文件引入的 `MiniCssExtractPlugin.loader` 暂时未支持热替换，故而需要开发环境时采用 `style-loader` ，或者引入 `css-hot-loader` 。

3. react工程需要实现组件热替换的话，需引入 `react-hot-loader` 。`vue-loader` 已经实现了HMR，无需要增加其他loader。


<a name="m4ggsk"></a>
#### uglifyjs-webpack-plugin
这个插件已经耳熟能详了，就是要来实现代码压缩、混淆、tree-shaking的。过于常用，故而webpack也已内置。

<a name="ew9upg"></a>
#### commons-chunk-plugin
这个插件用来抽离多个入口chunk内的公共代码，这在webpack@4以前很常用。在webpack@4中，已使用<br />`optimization.splitChunks` 来实现这样的功能，其内部实现基于内置的 `SplitChunksPlugin` 。具体详细介绍会在「构建配置」一章中再阐述。

<a name="lis3uo"></a>

#### webpack-bundle-analyzer
提供可视化的界面，以用来分析webpack构建后的打包情况。建议工程项目都可以添加，才能清晰掌握自己工程项目具体加载了哪些代码，进而做相应的打包优化。

<a name="kqmwgm"></a>
## 开发配置
至此我们对webpack的大致配置与需要的额外插件与loader已基本清楚。但是实际开发中还存在一些问题，如：构建出的web应用本地如何预览？如何实时构建编译？如何不刷新页面加载最新代码？

在上古时代时，开发人员会引入一些工具检测文件变化（如nodemon），进而执行重编译。然后本地再搭建一个静态server预览构建出来的html，(往往是用express)。这不免太过麻烦，后续webpack便出了 [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 、[webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) 等中间件方便用户快速的实现页面预览，热加载等功能。 

但是中间件的引入方式还是有些麻烦，在webpack@4中，更进一步，推出 `webpack-dev-server` 。设置webpack的 `devServer` 配置项，在开发环境时，以`webpack-dev-server`替换 `webpack` 来执行webpack配置文件，便能按照配置满足自己的开发需要。

我们明白 `devServer` 主要就是启动了一个静态服务，让开发者可以方便的预览自己工程构建的webApp。其配置项也主要是围绕服务器。

<a name="zph7uv"></a>
### devServer
<a name="dtzixq"></a>
#### host[string]
服务的host，默认为 `localhost` ，如果有需要非本机访问的需求（如想通过手机访问页面），可配成 `0.0.0.0` 

<a name="nyuwqw"></a>
#### port[number]
服务端口号。不配置时，默认为8080，如若端口不可用，会自增寻找可用端口。但手动配置且端口号不可用时，不会自动寻找其他端口号。

<a name="4sffsg"></a>
#### disableHostCheck[boolean]
默认为 `false` 。如果有绑定域名访问的需要的话，需设置为 `true` 。

<a name="29y9tu"></a>
#### allowedHosts[array]
如果你觉得 `disableHostCheck` 直接设为true 存在一些安全隐患，那可以自己配置允许的hosts白名单。将指定的域名添加至配置项中，即可通过该域名访问本服务。

<a name="708gqy"></a>
#### contentBase[boolean|string|array]
可以理解为静态服务器的内容目录地址。或者说，就是访问服务器的ip/域名时，对应访问的工程里的文件夹。举个例子，假设配置如下：

```javascript
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
}
```

那么访问 `http://localhost:8080` 则会 访问工程目录下的 `dist` 文件夹，域名的多级路径，也会映射成文件夹内的多级目录。（webpack-dev-server 访问的是内存中文件，此时文件并未真正输出到 `dist` 目录下）

如果是 `contentBase` 配置项为数组，如：<br />
```javascript
devServer: {
  contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'www')]
}
```

那么，`dist` 与 `www` 目录下的文件都能通过 `http://localhost:8080`访问。

也可以设置为false，则会禁用 `contentBase` 。

<a name="gc49gy"></a>
#### index[string] 
配置完 `contentBase` 后，我们访问 `http://localhost:8080` 时，会自动加载设置的内部目录下的<br />`index.html` 文件。当然某些特殊情况下，我们的主页文件名并非 `index.html` ，比如是叫 `home.html` 。那么我们可以改变index配置来实现这样的效果，如：

```javascript
devServer: {
  index: 'home.html'
}
```

<a name="v4xeyc"></a>
#### hot[boolean]
启动webpack的模块热替换。即不需要刷新页面则更新代码。不过这需要插入热更新插件，这回会在本节后续讲到。

<a name="slstgp"></a>
#### clientLogLevel[string]
默认为 `info` ，可选为 `none`, `error`, `warning` 。默认开启时会在浏览器命令台输出很多信息。不利于开发调试，如无必要，可以设置为 `none` 或 `error` 。

<a name="w945xw"></a>
#### stats
这里的 `stats` 配置同 上一大节中的 **统计信息[stats]** 配置一模一样。上文也讲到，如果是开发环境，启动了webpack-dev-server，那关于统计信息的输出，将以 `devServer` 中的 `stats` 为准。

`devServer` 的其他配置场景较少，不再穷举。

<a name="qgs3ez"></a>
## 构建配置
上小节我们讲到开发环境下的特殊配置，那么在生产环境时，我们也有特殊的构建需求。而生产环境的主要矛盾就是日益增长的工程代码量同用户落后的网速之间的矛盾。在webpack这一层，主要的解决方法就是尽量减小构建包的体积。这在下一章节中会详细的介绍如何优化构建。在本章中，先简单的介绍下设计的配置项。

<a name="vd1upr"></a>
### optimization
在webpack@4以前，想做构建优化，需要引入不少插件。webpack@4中尽量将这些插件内置，并将其配置化，主要收敛在 `optimization` 这个配置项中。其主要配置有：

<a name="590muo"></a>
#### minimize
当 `mode` 配置为 `production` 时，`minimize` 值为true。若设为false时取消引入 `uglifyjs-webpack-plugin` 。

<a name="exrebl"></a>
#### minimizer
配置执行代码压缩的工具，默认为 `uglifyjs-webpack-plugin` ，如果需要替换成其他的或者增加新的<br />代码压缩插件的话，可以手动覆盖，如：

```javascript
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true, // 多进程压缩
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // 优化压缩css
    ],
  }
}
```

<a name="8lsmpd"></a>
#### splitChunks
该配置项的配置即是 `SplitChunkPlugin` 的配置，其用处是可以按一定规则将工程中代码提取一部分到一个新的chunk文件。常见的场景有：

- 把不同页面公共的代码抽离到一个 `commonChunk` 。

- 把外部依赖包单独抽离到一个 `vendor` 。

- 把React/Vue 等项目必引的库单独抽离成 `dll` 。


其基本配置如下：

- name: 分离出的chunk名字，默认为true，chunk name会自动生成。

- maxInitialRequests: 最大可分割出来的chunk数。

- maxAsyncRequests: 最大可分割出来的异步chunk数（按需加载时使用）。

- cacheGroups: 这个配置项是分割代码的核心配置，这是一个对象，key为chunk的唯一识别key，value为chunk的具体分割规则配置，如下：

  - name: 分离出的chunk的名字，若未设置且 `splitChunks.name` 为true时，以chunk的key为name。 

  - minChunks: 抽离公共代码时，该公共代码最少被几个chunk引用了。

  - test: 模块匹配的规则

  - priority: 分离规则优先级。有时候一个模块可能被多个规则匹配到，设置优先级可以让某个规则分离的chunk具有更高匹配模块的优先级。

<a name="rd8msc"></a>
#### runtimeChunk
webpack打包代码后，为了控制模块的依赖与加载，必不可少的需要往工程项目中加入webpack提供的相应执行代码。这部分代码会因模块的增删改变化而变化。故而可以通过配置 `runtimeChunk` ，将这部分运行时代码抽离出来。 `runtimeChunk` 默认为false，可以配置为 `{ name: 'manifest' }` ，设为对象，指定name即可。

<a name="nf5qzf"></a>
## 库开发相关
上述所说主要是针对web应用工程项目的配置。但有时候我们利用webpack是想构建一个函数工具库/组件库，并非是一个web应用。不需要html，也往往不需要什么按需加载，最主要的就是考虑外部如何去引用本库。

对于web应用而言，webpack构建的是一堆chunk文件。在html中引入它们或者在js脚本中再执行按需引入。而对于库而言则不是。一个工具库往往是暴露出一个或多个函数、类、值等。这同web应用有明显区别，这相关的配置主要也是在**出口[output]** 的配置项中。

<a name="qschsf"></a>
### output
<a name="i14fru"></a>
#### library
设置该配置为一个字符串，当此库加载完成时，即会将其返回值分配给一个变量，变量名即为 `library` 设置的值。若通过script标签引入本库，在全局环境下声明此变量，则其就会挂载到全局对象上。

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'your-library.js'
    library: 'yourLibrary'
  }
};
```

<a name="4uxezh"></a>
#### libraryTarget
如果只是暴露出一个变量，通过script标签引入，那也太不优雅了。我们自然是希望自己构建的库可以通过 `require` 或 `import` 去加载。或者最粗暴的，什么样的加载方式都能支持。这就需要 `libraryTarget` 这个配置。它的值为字符串，存在如下几种情况

- **var**:  默认配置。会在当前作用域通过 `var` 声明一个变量，值为库的返回值，变量名为 `library` 配置的值，如果为空，则无法赋值。

- **assign**: 不通过 `var` 声明。直接在 变量上赋值。如果本作用域内之前未声明该变量，则会由于作用域提升而挂载在全局作用域。**危险操作，不建议使用本配置值。**

- **this/window/global**: 将变量挂载在当前作用域的 `this/window/global` 对象下。

- **commonjs**: 以 `commonjs` 的模块规范导出模块。其值分配给 `exports[library]` 。

- **commonjs2**: 以 `commonjs` 的模块规范导出模块。其值分配给 `export` 。

- **amd**: 以amd的模块规范导出模块（用的越来越少了）。

- **umd**: 所有的模块定义下都可运行。


还有一些特殊的情况，比如构建的模块是专门给 `node` 环境或者 `electron` 下使用的。这样的场景需要修改 **构建目标[targets]，**但这跟 `output.libraryTarget` 是完全两个概念，解决的也不是同维度的问题。

<a name="zng8rn"></a>
## 小结
// todo