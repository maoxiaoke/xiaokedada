# weekly.js 第 0 天

心血来潮想搭建一个网站，暂时定位于提供 JS 相关的一个咨询网站。技术栈如下：

+ FE: React + React-Router + Rxjs + TypeScript。函数库使用 Ramda，时间库使用 DateFns，打包工具 Webpack，代码规范 Standard。
+ BE: Node

今天的主要任务是使用 [create-react-app](https://github.com/facebook/create-react-app) 建 React 项目。

## React + Typescript

[Adding TypeScript](https://facebook.github.io/create-react-app/docs/adding-typescript) 这篇文章介绍了官方 [react-scripts]() 对 Typescript 的支持。

运行

```bash
$ npx create-react-app weekly-fe --typescript
```

为了以防未来需要对项目进行额外的配置，所以我们 [eject](https://facebook.github.io/create-react-app/docs/alternatives-to-ejecting) 这个项目，运行：

```bash
$ npm run eject
```

接下来安装 Typescript。

```bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

接下来将 `src` 文件中的 `App.js` 改成 `App.tsx`。运行程序，页面报错如下：

![tsconfig-error](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/tsconfig.jpg?raw=true)

意思就是说，在 `App.tsx` 无法识别没带 `tsx` 结尾文件，这自然是 Webpack `extensions` 这个配置项的功劳。转到 `config/webpack.config.js` 文件，找到 extensions 这个配置：

```js
...
extensions: paths.moduleFileExtensions
  .map(ext => `.${ext}`)
  .filter(ext => useTypeScript || !ext.includes('ts'))
...
```

看了下代码，好像是被 `useTypeScript` 限制了。再看下 `useTypeScript` 这个变量的定义：

```js
// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

...
appTsConfig: resolveApp('tsconfig.json')
```

这下明白了。原来是这个项目下没有生成 `tsconfig.json` 文件。为了生成 `tsconfig.json` 文件，全局安装 typescript，使用 `tsc --init` 这个命令：

```bash
$ npm install typescript -g

# 然后在项目根目录运行
$ tsc --init
```

则会在项目根目录生成一个 `tsconfig.json` 文件，内容如下：

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],                             /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "incremental": true,                   /* Enable incremental compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

可以在 [Compiler Options](http://www.typescriptlang.org/docs/handbook/compiler-options.html) 了解各个配置项的作用。

### tsc 类型检查

接下来我们需要使用 `tsc` 来运行 `.ts` 和 `.tsx` 文件的 *类型检查*。这当然会集成到 webpack 当中。`create-react-app` 使用 plugin [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) 来支持，代码如下：

```js
// TypeScript type checking
useTypeScript &&
  new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }),
    ...
    tsconfig: paths.appTsConfig,
    ...
```

最终它会使用根目录下的 `tsconfig.json` 文件的配置选项来运行类型检查。因此设计出一份简单的配置如下：

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  "exclude": [
    "node_modules",
    "config"
  ]
}
```

说明如下：

+ target 是代码最后编译支持的语法版本，**但是** 我们选择使用 babel 来转换，因此设为 `esnext`;
+ module 是何种模块(amd/commonJS/umd/cmd 等)，这里我们使用 `esnext`，因为这是未来。
+ jsx 我们设置为 `preserve`，因为我们会使用 babel 来转换。有关这个配置属性值得区别，可以参考 [TypeScript JSX](http://www.typescriptlang.org/docs/handbook/jsx.html)。

从上面可以看到，实际上 `tsc` 也可以转换 ES 代码。不过我们还是将这份工作交给更擅长的 babel 来处理。

### babel 转换 ts/tsx

在最终的代码中，`ts/tsx` 应该转换成 `js` 代码，这项工作天然归 babel 莫属。但是在 babel 7.0 之前，babel 并不支持转换 `ts/tsx`。社区的流行方案(webpack方案)通常是使用 [ts-loader](https://github.com/TypeStrong/ts-loader) 将 `ts/tsx` 转换成 `js`，再通过 [babel-loader](https://github.com/babel/babel-loader) 装换成低语法版本的 `js`。也就是这样：

```bash
TS -> ts-loader -> JS -> babel-loader -> JS
```

**但是**(卧槽，又来了个但是)，这两年 TypeScript 和 Babel 团队的合作成功是 Babel 的支持转换 `ts/tsx`。可以看看下面的几个链接：

+ [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/)

+ [webpack TypeScript](https://webpack.js.org/guides/typescript/#importing-other-assets)

**画外音**：这两年 TypeScript 在工程化方面有两个很大的进步，一是 Babel 对 TS/TSX 的支持；二是 TypeScript 完全拥抱 ESLint。

值得注意的是：**Babel 的 [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) 只转换 TS/TSX，并不会运行类型检查**。而且，在上面我们已经在 webpack 中集成了 `tsc` 命令，该命令有转换 TS/TSX 的功能，因此我们只需要安装 [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) 或官方提供的 [babel-preset-react-app](https://www.npmjs.com/package/babel-preset-react-app)。

如果某些项目不将 `tsc` 集成到 webpack 中，而是单独的 `npm scripts` 命令，比如：

```json
...
"scripts": {
  "check": "tsc"
}
...
```

为了转换 TS/TSX，我们需要 `@babel/preset-react` 和 `@babel/preset-react`。

此处，我们使用官方提供的 `babel-preset-react-app`，并且使用 package.json 配置方式，即 package.json 中：

```json
...
"babel": {
  "presets": [
    "react-app"
  ]
}
...
```

### Lint 集成到 webpack

在代码编写过程中事实运行检查是很有帮助的，社区的方案通常有[两种](../FirstMeet/First-Meet-TypeScript.md)：

1. 使用 TSLint
2. 使用 ESLint

正如上面说的，TypeScript 已经[全面拥抱 ESLint 了](https://github.com/Microsoft/TypeScript/issues/29288)。因此我们会采用第二种方案，参考文章：

+ [The future of TypeScript on ESLint](https://eslint.org/blog/2019/01/future-typescript-eslint#the-future-of-typescript-on-eslint)

+ [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

先看下 create-react-app 给我们使用了什么 ESLint 规则。查看 `webpack.config.js` 文件，找到如下配置：

```js
...
// It's important to do this before Babel processes the JS.
{
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: paths.appSrc,
},
...
```

也就是 [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app) 的内容，在其实际的配置中，可以看到对 `.ts/.tsx` 的配置。

```js
...
  overrides: {
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },

      // typescript-eslint specific options
      warnOnUnsupportedTypeScriptVersion: true,
    },
    plugins: ['@typescript-eslint'],
...
```

也就是说，这个配置文件为我们集成了对 typescript 的 Linter 配置(多此一举)。**但是**，为了支持 IDE 的 Linter，我们选择根据其 README.md 来覆盖这个配置。

安装如下包：

```bash
$ npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

新建一个 `.eslintrc` 文件，配置如下：

```json
{
  "extends": ["react-app", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"]
}
```

### Lint 集成到 IDE

对于 Visual Code，可以在 IDE 中集成 ESLint 和 TSLint 来提供智能提示的功能。分别安装 ESLint extension 和 TSLint extension。

注意，ESLint 默认是不会检查 .ts 文件的，因此需要在 setting.json 文件中添加对 TypeScript 的支持。可以详细阅读其 readme。

配置如下:

```json
...
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
    ]
...
```

TSLint extension 安装即可使用。

## standardJS 规范

个人是比较喜欢 [standardJS](https://standardjs.com/)，尤其是无分好的写法。因此会在项目中引入 standardJS 规范。步骤如下：

1. 安装 standardJS

```bash
$ npm install --save-dev standard
```

2. 集成 standardJS 到 ESLint

`.eslintrc` 文件配置如下：

```json
{
  "extends": ["react-app", "standard", "plugin:@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/indent": ["error", 2]
  }
}
```

因为当我们使用 standardJS，采用 indent 为 2 这个格式，因此使用 rules 覆盖 plugin:@typescript-eslint/recommended 的这条规则。

+ plugin:@typescript-eslint/recommended 的规则可以在这里看到：[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json)

+ standardJS 的规则在官方这里：[standardJS](https://standardjs.com/)

+ react-app 的规则在这里： [eslint-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js)

2. 忽略 Linter

好了，接下来我们要一些我们不太关心文件的的 linter 了。[参考这里](https://eslint.org/docs/user-guide/command-line-interface#ignoring-files-from-linting)。

新建一个 `.eslintignore` 文件，将想要忽略的文件或文件夹加进去：

```text
build/*
node_modules/*
config/"

src/serviceWorker.js
```

*如果你发现 IDE 还会报错，暂时忽略吧，因为 IDE ESLint Extension 并没有忽略任何文件的 Linter。*

有关上面的几步操作，有参考下面的文章：

+ [create-react-app linting setup with 'standard' style](https://gist.github.com/matthewepler/d709a503414d59a0a6c98eb5c9be5fd8)

## Recap

希望这个过程可以将 `tsc` / babel / eslint 等的区别区分开。主要辨别一下几点：

1. `tsc` 命令主要的工作是 **运行类型检查**(同时也有代码转译的功能)。通常是结合 `ts-loader` 和 [ForkTsCheckerWebpackPlugin]() 集成到 webpack 中的。

2. babel 提供代码转译(高版本转低版本)。目前也支持 TS/TSX 语法的转译，不过它只是转译，不会执行类型检查。

3. ESLint 是规范代码的 Linter，也就是说代码规范。但是代码本身有问题，不归它管。比如下面就不会告知变量 `b` 类型编译通不过：

```ts
interface IA {
  name: string;
}
const b : IA = {
  age: 14
}
```
