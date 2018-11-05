# JavaScript 一些奇怪的地方

或者，我需要取一个标题 - 恐怕我是不懂 JavaScript 吧。

## 模板字符串用于函数调用

```js
function hello(name) {
	console.log(`Hello ${name}`);
}
hello`world`
// Hello World
hello `world`
// Hello World
```

竟然可以这样调用函数！这简直就是字符串的妙用(**千奇百怪**的用法)。

> 不过，好像只有需要传入的参数是字符串的时候，才可这样操作。


另一个有趣的 `feature` 是：

```js
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hello "
  console.log(strings[1]); // " World "
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50
  return "Bazinga!";
}

tag`Hello ${ a + b } World ${ a * b }`;
// "Bazinga!"
```

更多请参阅[Javascript: call functions without using parentheses (what?!)](https://michelenasti.com/2018/09/19/Javascript-chiamare-funzioni-senza-usare-parentesi-(what!).html)

## null 和 NaN 的奇怪之处

`NaN` 表示一个非数字，比如：

```js
parseInt(null) // NaN
```

但是我们可以通过 `JSON.stringify()` 将它又变回 `null`。

```js
JSON.stringify([ NaN ]) // [ null ]
```

`Infinity` 是相同的道理。

## setTimeout 中的 try...catch

当我们想要捕获 `setTimeout`、`setInterval` 回调函数的错误，下面的方法是行不通的：

```js
try {
  setTimeout(callback, delay)
} catch (e => {
  console.error(e.message)
})
```

因为当定时完成时，定时器只是将 callback 加入到时间队列中，callback 仍在主线程运行。需要进行下面的处理：

```js
setTimeout(() => {
  try {
    callback()
  } catch (e) {
    console.error(e.message)
  }
})
```

更优雅的一种方式，可能是通过 `Promise` 来解决：实现一个 `delay` 函数。

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
delay(1000).then(callback).catch(handleError)
```

> [Handle error from setTimeout](https://stackoverflow.com/questions/41431605/handle-error-from-settimeout)