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