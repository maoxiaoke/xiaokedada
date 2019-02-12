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

### 遵循一种命名规范

社区约定的使用 *大驼峰*、*小驼峰* 命名当然是毋庸置疑的。然而，对变量、函数名、类名等如何「取名字」，并没有较好的社区方案。只有一些建议：

1. 准确、精简

「取名字」尽量有准确的单词或短语。比如 `addOrder` 并不是很好的命名，*添加* 操作可以是 *插入* 或 *附加*，也就是说使用 `insertOrder` 或 `appendOrder` 是更为准确的。

「取名字」应当尽量精简。太长的名字阅读起来特别费力，当你遇到这种不得不起很长名字时候，是不是应该多思考一下。

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

| 动词 | 含义 | 举例  |
| :-----: | :-----: | :-----: |
| fetch | 获取 API 数据 |
| is    | 判断某一条件 |
| can   | 表达某种能力 |
| set   | 赋值        |
| edit  | 编辑        | editPanleVisible |
| register | 在某处注册函数 |
| dispatch | 分发某一操作 |
| pick   | 从什么之中选择某项   |
| omit   | 从什么之中忽略某项 |
| exclude | 从什么之中排除某项 |
| extract | 从什么之中抽取某项 |
| alter  | 更改、改变 |
| trigger | 触发器，通常指通过动作触发开关 |
| hidden  | 隐藏      | hiddenPanle |
| gotIt   | 知道了    |

不用泛泛的词，记录下的使用规范：

(1) 不用 `change`，change 的意思太宽泛了。若表达更改(同一类事物)，用 `alter`；表达替代(某一类替换成另一类)，用 `replace`；表达彻底改变，用 `transform`；表达转换，用 `switch`；表达修改，用 `modify`。

(2) 不用 `stop`。若表达暂停，用 `pause`；表达停止用 `kill`。

(3) 不用 `find`。若表达搜索，用 `search`；表达抽离，用 `exclude`

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
fuction printOrder (order, orderState, orderTips) {
  ...
}

//正例
function printOrder ({ ...order, orderState, orderTips }) {
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

TODO:

- [ ] 如何定义单一职责(即，只做一件事)

<!-- ### 函数应该只做一层抽象

当函数的需要的抽象多于一层时，通常意味着函数功能过于复杂，需将其进行分解以提高其可重用性和可测试性。 -->

### 移除重复和多余的代码

一定要移除项目中重复和多余的代码。

### 不要使用标记作为函数参数

这通常意味着函数的单一职责已经被破坏了。这个时候，应当考虑对函数进行再次划分。

```js
// 反例
function genIdentifier (comment, isArray) {
  if (isArray) {
    return comment.map(item => `${item.id}` + `${item.type}`)
  } else {
    return `${comment.id}` + `${comment.type}`
  }
}

// 正例
function genIdentifier (comment) {
  return `${comment.id}` + `${comment.type}`
}
function genIdentifierList (commentList) {
  return commentList.map(comment => `${comment.id}` + `${comment.type}`)
}
```

当然，这有争论。我们当然希望一个函数能够提供完整的功能，这虽然不能覆盖所有的情形，但对于 “小” 函数而言，应该是可取的。

在 [非侵入性地改造函数](### 非侵入性地改造函数) 从业务的角度避免传入一个用于「判断」的 token。

### 避免副作用 - 纯函数

函数式编程具有更干净和便于测试的特点。纯函数有以下属性<sup>8</sup>：

+ 其结果只能从它的参数的值来计算
+ 不能改变外部状态
+ 不能依赖于能被外部操作改变的数据

### 非侵入性地改造函数

当我们试图向函数传入一个用于「判断」的 token 时，我们应当注意，函数已经违背了 *只做一件事*。

比如，当我们需要为 `userInfo` 添加一道缓存：即如果再次请求同一个用户的信息，就不用重新向服务器发送请求，而直接使用第一次请求的数据返回<sup>5</sup>。

```js
const renderUser = (userInfo) => {
  // User representation
}

// 反例
const userInfoCache = {}
const fetchUserInfo = (userId, renderUser) => {
  if (userInfoCache[userId]) {
    renderUser(userInfoCache[userId])
  } else {
    fetch(`https://api.github.com/users/${ userId }`).then(info => {
      renderUser(info)
    })
  }
}

// 正例
const fetchUserInfo = (userId, renderUser) => {
  fetch(`https://api.github.com/users/${ userId }`).then(info => {
    renderUser(info)
  })
}

const memorizeThunk = (func, reducer) => {
  const cache = {}
  return (userId, callback) => {
    const key = reducer(userId)
    if (cache[key]) {
      callback(cache[key])
    } else {
      func(key, res => {
        cache[key] = res
        callback(res)
      })
    }
  }
}
const fetchUserInfoCache = memorizeThunk(fetchUserInfo, (userId) => userId)
fetchUserInfoCache('maoxiaoke', renderUser)
```

实际原理还是将函数拆解为更小的「功能单一」的函数。

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

`if` 条件为真，利用 `&&` 运算符；`if` 条件为假，利用 `||` 运算符。

```js
// 反例
function queryOrder (existence) {
  if (existence) {
    deleteExistOrder()
  }
}

// 正例
function queryOrder (existence) {
  existence && deleteExistOrder()
}
```

实际上，如果是不习惯使用 *短路* 运算符的用户，上述的代码也并非清晰明了 - 这是一种有争论的做法。

因此，有些批评认为，**显式优于隐式**：“完整 `if...else` 很有必要，哪怕 `else` 中什么也不做，你也应该说明”。

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
  } else {
    // Do nothing
  }
}
```

还是那句话，「It depends」。

### 当判断条件包含 > 或 <

<!-- ```js
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
``` -->

### 封装判断条件

会遇到很多情况，需要 `if` 判断中加入多个判断条件。可以将多个判断条件封装起来 - 尤其是拥有超过 2 个判断条件的情况。

```js
// 反例
import { isEmpty } from 'lodash'
if (order.state === 'CANCEL' && !isEmpty(unprocessedOrderList)) {
  // Do something
}

// 正例
import { isEmpty } from 'lodash'
const canActivateTone = (order, unprocessedOrderList) => {
  return order.state === 'CANCEL' && !isEmpty(unprocessedOrderList)
}
if (canActivateTone(order, unprocessedOrderList)) {
  // Do something
}
```

以下情形并不考虑在「封装判断条件」之内：

```js
if (order && order.id) {
  // Do something
}
```

已经有一个提案<sup>6</sup>来支持 `order?.id` 这种写法，但是目前最好的方案是使用 [Lodash](https://lodash.com/) 的 [`get`](https://lodash.com/docs/4.17.11#get) 方法。

### 不要省略 {}

为了代码 “整洁”，常常一行代码完成 `if` 判断。但是我觉得 `if... else` 配上 `{}`「非常酷」。

```js
// 反例
function fetchShopDetail () {
  if (isInGrey(shopId)) return
}

// 正例
function fetchShopDetail () {
  if (isInGrey(shopId)) {
    return
  }
}
```

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

<!-- ### 避免纯粹的 for 循环

尽量使用更加语义化的 `map`、`forEach` 替代 `for` 循环，我们一直强调：让代码易读非常重要！(哪怕 `for` 循环在性能表现上稍微好一点，但是 Leave This To Compilers)。 -->

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

// 反例
addCouponInfos (target, source) {
  return target.map(comment => {
    comment.extendsInfo = source.filter(coupon => coupon.id === comment.id)[0]
    return comment
  })
}

// 正例
addCouponInfos (target, source) {
  return target.map(comment => {
    const extendsInfo = source.filter(coupon => coupon.id === comment.id)[0]
    return { ...comment, extendsInfo }
  })
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

### 远离 callback hell

TODO:

- [ ] Add description and example

### 避免嵌套 Promise

避免嵌套 Promise。嵌套的 Promise 会导致代码混乱<sup>7</sup>。

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

## Promise 的 then 链总该返回什么

Promise 的 then 链如果没有返回 Promise、一般值或者 thenable 的话，会将 `undefined` 作为 resolved 值返回(假设没有任何 catch 捕获到错误)。当排查问题的时候，这样的错误会极难发现。

TODO:

- [ ] Add example

## 不要“吞掉” Error

「Promise 链的最后总以一个 `catch()` 结束」是一个最佳实践。但设计一个基于 Promise 的函数时，应该考虑的是让函数自己进行差错控制处理呢，还是抛错。绝不要“吞掉”错误。

tips: 请理解这里的措辞 “吞掉”。当试图在函数进行差错控制时，你也应当有 `catch` 操作，显式处理；当试图将 Error 提供给外部使用时，你就不应该 “吞掉” 它。

```js
// 反例
function printOrderByTpl (printers) {
  return Promise.all(printers.map(p => {
    return printOrder(p)
  }))
  .catch(e => e)
}

// 可能是正例
function printOrderByTpl (printers) {
  return Promise.all(printers.map(p => {
    return printOrder(p)
  }))
  .catch(e => Promise.reject(e))
}
```

tips: 可能认为下面的这两种方式表达的方式一致。

```js
// then 链后没有 catch
function printOrderByTpl (printers) {
  return Promise.all(printers.map(p => {
    return printOrder(p)
  }))
}

// then 链后有 catch
function printOrderByTpl (printers) {
  return Promise.all(printers.map(p => {
    return printOrder(p)
  }))
  .catch(e => Promise.reject(e))
}
```

我认为这两种表达并不一致：当设计一个基于 Promise 的函数时，提供的信任方案是向外显式 `resolve` 或 `reject`。若认为向外 “throw error” 也是提供一个 `reject`，那实际上就是与 Promise 的设计思想背道而驰；另外，"错误" 是普遍的，很多情况下都无法确定 “错误” 的来源，而 `reject` 是确定的。

## 基于 Promise 的函数不应当 throw 异常

http://2ality.com/2016/03/promise-rejections-vs-exceptions.html

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
    reject(new Error('请检查打印机相关设置'))
  })
}
```

## 改变认知，成为专业人士

1. 让别人读懂你的代码很重要

2. 「如果有坑，别挖」

3. 「“无情” 重构」

- [ ] 业务迭代，修改一个函数，而不是添加几行代码

## SOLID

来自书本「Agile Software Development: Principles, Patterns, and Practices」- Martin, Robert C

## GRASP

来自书本「Applying UML and Patterns」- Craig Larman

https://www.cnblogs.com/pangjianxin/p/7928083.html

## Don't repeat yourself - DRY

## KISS

## Inversion of control - 控制反转

## loose coupling high cohesion - 高耦合低内聚

## YAGNI(ya ain't gonna need it) - 你不会用到它的

## Principle of least surprise - 最小意外原则




[1] https://gist.github.com/cjohansen/4135065

[2] http://blog.timoxley.com/post/47041269194/avoid-else-return-early

[3] https://github.com/petkaantonov/bluebird/wiki/Optimization-killers

[4] https://www.bennadel.com/blog/2828-creating-custom-error-objects-in-node-js-with-error-capturestacktrace.htm

[5] http://taobaofed.org/blog/2017/01/05/writing-readable-code/

[6] https://github.com/tc39/proposal-optional-chaining

[7] http://taoofcode.net/promise-anti-patterns/

[8] Functional JavaScript - Michael Fogus

