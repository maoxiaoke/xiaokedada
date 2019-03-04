# 一天一道面试题

1. new 跟 object.create 有什么区别？

Friend： new 是先新建一个 Object 对象，再用这个对象去继承目标对象的prototype。 Object.create() 是先新建一个隐式构造函数，用它的 prototype 去继承目标对象，最后 new 一个对象

Me: 没啥区别，都是将 A 对象 跟 B 对象关联起来

2. 如何精确计算加法

** 扩展，如何精确计算 加、减、乘、除 **

3. 遍历一个数组 `[0, -1, 1, 2, 3]` 打印当前值，如果遇到负数就停止遍历，不能使用 break

Friend:

```js
[0, -1, 1, 2, 3].some(i => {
  console.log(i)
  return i < 0
})
```

4. 集合 A: [1, 3, 4, 6]，集合 B: [3,4]，求差集；集合 C: [1, 3, 4, 6]，集合 D: [4, 7]，求交集。

Me:

```js
A.filter(i => !B.includes(i))
C.filter(i => D.includes(i))
```

4. 第一个非重复字母

题干描述：

Write a function named first_non_repeating_letter that takes a string input, and returns the first character that is not repeated anywhere in the string.

For example, if given the input 'stress', the function should return 't', since the letter t only occurs once in the string, and occurs first in the string.

As an added challenge, upper- and lowercase letters are considered the same character, but the function should return the correct case for the initial letter. For example, the input 'sTreSS' should return 'T'.

If a string contains all repeating characters, it should return an empty string ("") or None

Me:

```js
function firstNonLetter (str) {
  const letterArr = str.split('')
  let i
  for (i = 0; i < letterArr.length; ++i) {
    const slicedArr = [ ...letterArr.slice(0, i), ...letterArr.slice(i + 1) ]
    if (!slicedArr.includes(letterArr[i])) {
      break
    }
  }
  return letterArr[i]
}

// 使用正则
function firstNonLetter (str) {
  let i
  for (i = 0; i < str.length; ++i) {
    const matchedArr = str.match(new RegExp(str[i], 'gi'))
    if (matchedArr.length === 1) {
      break
    }
  }
  return str[i]
}
```

5. 阶乘的末尾有多少个 0

题干描述：

Write a program that will calculate the number of trailing zeros in a factorial of a given number.

N! = 1 * 2 * 3 * ... * N

Examples zeros(6) = 1

```bash
# 6! = 1 * 2 * 3 * 4 * 5 * 6 = 720 --> 1 trailing zero
```

zeros(12) = 2

```bash
# 12! = 479001600 --> 2 trailing zeros
```

> 这个题主要是看阶乘的前 n 个数有多少个和 5 有关的值，但是 25 = 5 * 5, 50 = 5 * 5 * 2... 零的个数相对应又要一个

Friend:

```js
function zeros (n) {
  let count = 0
  for (let i = 0; i <= n; i += 5) {
    let num = i
    while (num && num % 5 === 0) {
      count++
      num /= 5
    }
  }
  return count
}
```

6. 获取一个变量的类型

```js
function types(val: any): string {
  return Object.prototype.toString().call(val)
}
```