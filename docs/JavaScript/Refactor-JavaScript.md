# 有关代码重构和整洁之道

TODO:

- [ ] 补充 class、prototype 等相关的
- [ ] 差错控制

## 代码层面的整洁之道

扩展：

+ [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)
+ [nodebestpractices](https://github.com/i0natan/nodebestpractices)

🍑 <span style="font-size: 18px;font-weight: 700">基本</span>

### 使用 const 而不是 let

当声明变量的时候，`const` 是**首要选择**，而不是 `let`。而对于 Object、Array、Set、Map、函数表达式、类表达式等，除需要进行赋值操作之外，选用 `const`。

`for...of` 中的循环变变量，使用 `const`。

```js
// 反例
let order = {}
order.id = '123456'

// 正例
const order = {}
order.id = '123456'
```

### 采用易于理解的名称来表示常量

是代码拥有良好的可读性非常重要。一般，我们会用大写名称来定义一些常量。

```js
// 反例
function timeLevel (exception) {
  // 11 是什么
  return [...new Array(11)].map((item, index) => {
    return {
      label: `${parseInt(index) + exception} 分钟`,
      value: parseInt(index) + exception
    }
}

// 正例
const TIME_LEVEL = 11
function timeLevel (exception) {
  return [...new Array(TIME_LEVEL)].map((item, index) => {
    return {
      label: `${parseInt(index) + exception} 分钟`,
      value: parseInt(index) + exception
    }
}
```

### 遵循一种命名规范

社区约定的使用 *大驼峰*、*小驼峰* 命名当然是毋庸置疑的。然而，对变量、函数名、类名等如何「取名字」，并没有较好的社区方案。只有一些建议：

1. 准确、精简

「取名字」尽量有准确的单词或短语。比如 `addOrder` 并不是很好的命名，*添加* 操作可以是 *插入* 或 *附加*，也就是说使用 `insertOrder` 或 `appendOrder` 是更为准确的。

「取名字」应当尽量精简。太长的名字阅读起来特别费力，当你遇到这种不得不起很长名字时候，是不是应该多思考一下。

2. 功能明确

函数应该功能明确，通过函数名就能够准确获得函数信息和返回值信息。比如 `isEmpty()` 清晰地告诉我们，该函数检查 something 是否为空，并返回 boolean 值。

3. 统一标准

统一函数的「名字」，如果选择 `fetchUserInfo` 来表达获取来自后端返回的数据，你就不应该在其他地方选择 `getCustomerType` 作为函数名。

对于，对于「取名字」这件事，「It depends」。

下面是我对自己的一些约定。

1. 变量名应该是 「名词或者名词短语」，函数名应该是 「动词或动词短语」。
2. 常量应该全部大写。
3. 能用「缩略词」明确表达含义的，尽量使用「缩略词」。
4. 函数名尽可能使用一些常见的约定。

| 动词 | 含义 |
| :-----: | :-----: |
| fetch | 获取 API 数据 |
| is    | 判断某一条件 |
| can   | 表达某种能力 |
| set   | 赋值        |
| register | 在某处注册函数 |
| dispatch | 分发某一操作 |

5. 需要为 `this` 更名的地方，使用 `context`，而不是 `that` 或 `_this`<sup>1</sup>。

### 显式优于隐式

不要绕太多弯子。

```js
// 反例
function fetchNewOrder () {
  return fetch('xxx')
         .then(res => {
           // xxx
         })
}

// 正例
function fetchNewOrder () {
  return fetch('xxx')
         .then(order => {
           // xxx
         })
}
```

🍎 <span style="font-size: 18px;font-weight: 700">函数相关</span>

### 限制参数个数

限制函数参数很有必要，这样做使得在测试函数的时更加轻松。

应避免三个以上参数的函数，通常情况下，参数超过两个意味着函数功能过于复杂，这个时候，应该做的事重新优化你的函数。

如果确实需要很多参数，可以考虑将这些参数封装成一个对象。

```js
// 反例
fuction printOrder (order, autoConfirm, alreadyInDB) {
  ...
}

//正例
const orderAttr = Object.assign({}, order, autoConfirm: false, alreadyInDB: false)
function printOrder (orderAttr) {
  ...
}
```

### 使用携带默认参数的函数

尽可能地使用 ES6 语法。使用携带默认参数的函数替代 `||` 运算符。

> `||` 运算符的[怪异性](https://xiaoke.faas.ele.me/JavaScript/Depth-in-ES6.html#%E5%87%BD%E6%95%B0%E7%9A%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

```js
// 反例
function printOrder (order, autoConfirm) {
  order = order || { id: '123456', city: 'NanKing' }
  autoConfirm = autoConfirm || false
}

//正例
const defalutOrder = {
  id: '123456',
  city: 'NanKing'
}
function printOrder (order = defalutOrder, autoConfirm = false) {
  ...
}
```

### 使用 rest 参数而不是 arguments

arguments 在非严格模式下，具有[怪异性](https://xiaoke.faas.ele.me/JavaScript/Depth-in-ES6.html#%E5%87%BD%E6%95%B0%E7%9A%84%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

尽可能地使用 rest 参数替代 arguments。

```js
// 反例
function sum () {
  const first = arguments[0]
  const second = arguments[1]
  const third = arguments[2]
  return first + second + third
}
sum(1, 2, 3)

//正例
function sum (...arg) {
  const [ first, second, third ] = [ ...arg ]
  return first + second + third
}
sum(1, 2, 3)
```

### 函数的单一职责

功能不单一的函数将难以重构、测试和理解。

### 函数应该只做一层抽象

当函数的需要的抽象多于一层时，通常意味着函数功能过于复杂，需将其进行分解以提高其可重用性和可测试性。

### 移除重复和多余的代码

一定要移除项目中重复和多余的代码。尤其是在任何循环下有重复的代码。

### 不要使用标记作为函数参数

这通常意味着函数的单一职责已经被破坏了。这个时候，应当考虑对函数进行再次划分。

### 避免副作用

函数式编程具有更干净和便于测试的特点。

🍊 <span style="font-size: 18px;font-weight: 700">Control Flow 相关</span>

### 使用 Lookup Table 取代 switch

可以使用 Lookup Table 取代冗长的 `switch` 表达式。为了实现一个 Lookup Table，可以选择 `Object` 或 `Map`。

```js
// 反例
function queryPolling (type) {
  switch (type) {
    case: '2m'
      pollingFor2Min()
      break
    case: '5m'
      pollingFor5Min()
      break
    case: '9m'
      pollingFor9Min()
      break
    defalut
      break
  }
}

// 正例
const lookupTable = {
  '2m': pollingFor2Min,
  '5m': pollingFor5Min,
  '9m': pollingFor9Min
}

const queryPolling = type => {
  lookupTable[type].call(this)
}

// 正例
const lookupTable = new Map([
  ['2m', pollingFor2Min],
  ['5m', pollingFor5Min],
  ['9m', pollingFor9Min]
])
const queryPolling = type => {
  lookupTable.get(`${type}`).call(this)
}
```

值得注意的是，当代码中引入了 `this`，有时候会需要使用 `call()` 或 `apply()` 绑定上下文。

### 条件判断中提前 return 似乎是可取的

当我们的 `if` 判断中存在大量的代码，或者有大量的 `if` 嵌套，提前 `return` 似乎是一个不错的选择。

```js
// 反例
function queryOrder (existence) {
  if (existence) {
    // a large piece of code, more than 3 ~ 4 lines
  }
  else {
    // just a line of code
  }
}

// 正例
function queryOrder (existence) {
  cosnt notExistence = !!existence
  if (notExistence) {
    // just a line of code
  }
  // a large piece of code, more than 3 ~ 4 lines
}
```

当然，有批评认为：“当你的 if 语句中有一大段代码，这说明你最应该先做的是根据函数的单一性原则，将函数抽成更下的函数”。

另有批评赞同了「提前 return」，同时也补充：“在函数最外层最开始提前 return 是可取的，但在一个复杂的函数中间 return。当你重构你的代码时，你会感到很痛苦。”<sup>2</sup>

所以在 「条件判断中提前 return」的说法中，你应该有所取舍，「It depends!」

### 条件判断中使用 *短路* 运算符似乎是可取的

当只需要 `if` 用于条件判断时，可以使用 *短路* 运算符减少代码行数。

`if` 条件为真，利用 `&&` 运算符；`if` 条件为假，利用 `||` 运算符。

```js
// 反例
function queryOrder (existence) {
  if (existence) {
    deleteExistOrder()
  }
}

// 正例
function queryOrder (existence) {
  existence && deleteExistOrder()
}
```

实际上，如果是不习惯使用 *短路* 运算符的用户，上述的代码也并非清晰明了 - 这是一种有争论的做法。

因此，有些批评认为，**显式优于隐式**：“完整 `if...else` 很有必要，哪怕 `else` 中什么也不做，你也应该说明”。

```js
// 反例
function queryOrder (existence) {
  if (existence) {
    deleteExistOrder()
  }
}

// 正例
function queryOrder (existence) {
  if (existence) {
    deleteExistOrder()
  } else {
    // Do nothing
  }
}
```

还是那句话，「It depends」。

### 处理 if...else if...else

情况一，当存在 `if...else if...else` 三级条件判断的时候。提前 `return` 可以减少条件语句的嵌套。

```js
// 反例
function rateStatus (level) {
  if (level >= 95) {
    return 'EXCELLENT',
  } else if ( level >= 90 || level < 95 ) {
    return 'GOOD'
  } else {
    return 'COME ON'
  }
}

// 正例
function rateStatus (level) {
  if (level >= 95) {
    return 'EXCELLENT',
  }
  if ( level >= 90 || level < 95 ) {
    return 'GOOD'
  }
  return 'COME ON'
}
```

### 封装判断条件

### 不要省略 {}

### 避免无意义的条件判断

有些情况，需要根据条件将变量赋值为 `boolean` 值。可以避免使用 `if` 来作为条件判断。

```js
// 反例
const showLocalDeadline = null
if (val === 'equal') {
  showLocalDeadline = false
} else {
  showLocalDeadline = true
}

// 正例
const showLocalDeadline = val !== 'equal'
```

> 这是一种会被认为压根不用考虑的情形，而实际上(尤其是"疲劳"编码的时候)，往往会写出这样的代码。

### 避免“否定”情况的判断

要尽力避免“否定”情况的判断。否定情况的判断，会让代码的阅读性降低，也容易出错。

```js
// 反例
function isPlainObject (obj) {
  ...
}
if (!isPlainObject(data)) {
  ...
}

// 正例
function isPlainObject (obj) {
  ...
}
if (isPlainObject(data)) {
  ...
}
```

### 避免纯粹的 for 循环

尽量使用更加语义化的 `map`、`forEach` 替代 `for` 循环，我们一直强调：让代码易读非常重要！(哪怕 `for` 循环在性能表现上稍微好一点，但是 Leave This To Compilers)。

🍒  <span style="font-size: 18px;font-weight: 700">代码层面</span>

### 避免修改原对象

避免修改对象，采用更为 immutable 的实现。

```js
// 反例
const order = {
  id: 'xxx'
}
function (order) {
  order.shopId = 'xxx'
  ...
}

// 正例
const order = {
  id: 'xxx'
}
function (order) {
  const newOrder = { ...order, shopId: 'xxx' }
  ...
}
```

若是多层级嵌套的对象，更方便的方式是使用 Lodash 的 [`cloneDeep`](https://lodash.com/docs/4.17.10#cloneDeep)。

### 避免过度优化

保证代码的可读性非常重要。除了特别的情况<sup>3</sup>，完全可以将优化交给浏览器来处理。

```js
// 反例
const TIME_LEVEL = 11
function timeLevel (exception) {
  const emptyArr = []
  for (const i = 0; i < timeLevelArr.length; ++i) {
    emptyArr.push({
      label: `${parseInt(i) + exception} 分钟`,
      value: parseInt(i) + exception
    })
  }
}

// 正例
const TIME_LEVEL = 11
function timeLevel (exception) {
  return [...new Array(TIME_LEVEL)].map((item, index) => {
    return {
      label: `${parseInt(index) + exception} 分钟`,
      value: parseInt(index) + exception
    }
}
```


🥝 <span style="font-size: 18px;font-weight: 700">异步控制</span>

### 原理 callback hell

### 避免嵌套 Promise

避免嵌套 Promise。嵌套的 Promise 会导致代码混乱。

```js
// 反例
function printOrder () {
  return getGlobalSettings().then(settings => {
    getCurrentProfile(settings).then(profile => {
      ...
    })
  })
}

// 正例
function printOrder () {
  return getGlobalSettings().then(settings => {
    return getCurrentProfile(settings)
  })
  .then(profile) {
    ...
  }
}
```

### 返回 Promise 链的 “尾巴”

对于 Promise 链，“千万” 不要返回链的 “第一个”。对于每一个 `then` 链，尽量返回 “一些什么”，以避免返回的 `[[Promise.value]]` 为 `undefined`。

```js
// 反例
function printOrder () {
  const promise = haveAvailablePrinters()
  promise.then(printer => {
    ...
  })
  return promise
}

// 正例
function printOrder () {
  return haveAvailablePrinters().then(printer => {
    ...
    return something
  })
}
```

🍊 <span style="font-size: 18px;font-weight: 700">差错控制</span>

### 使用 Error 对象

使用 *字符串* 或 *简单对象* 作为异常信息没有太多价值<sup>4</sup>。不妨使用 JavaScript 的 `Error` 对象。

```js
// 反例
function printOrder () {
  return new Promise((resolve, reject) => {
    ...
    reject({ error: { message: '请检查打印机相关设置' } })
  })
}

// 正例
function printOrder () {
  return new Promise((resolve, reject) => {
    ...
    reject(new Error({ error: { message: '请检查打印机相关设置' } }))
  })
}
```

## 改变观念成为专业人士

1. 让别人读懂你的代码很重要

2. 「如果有坑，别挖」

3. 「“无情” 重构」


[1] https://gist.github.com/cjohansen/4135065

[2] http://blog.timoxley.com/post/47041269194/avoid-else-return-early

[3] https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

[4] https://www.bennadel.com/blog/2828-creating-custom-error-objects-in-node-js-with-error-capturestacktrace.htm