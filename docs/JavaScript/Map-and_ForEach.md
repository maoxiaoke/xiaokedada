# map 和 forEach 在实际业务中的选择和使用

在 JavaScript 中，`map`、`forEach`、`for`循环、`for...in` 和 `for...of` 都可以用来遍历数组。

`map` 和 `forEach` 是一种更为函数式的写法，更强调**数据的变化**，而不是变化的过程。但 `map` 并不会修改原数组。

:::warning
一家之言：**如果不是在写库或者其他供别人调用的函数**，`forEach` 和 `map` 可以完全替代 `for` 循环。
:::

但是有些时候，在写代码的时候还是会考虑到底使用 `forEach` 还是 `map` 呢。下面是几个🌰。

## 仅是做了操作

比如，有以下数据：

```js
let printPreference: {
  printOrderIdBarcode: ['true'],
  printGoodsIdBarcode: [],
  printGoodsSKUId: [],
  printLogo: [],
  printPlatformContent: ['true']
}
let globalSettings: {
  fontStyle: 'normal',
  spacingBetweenCopies: 'middle',
  isPrintBarcodeEnabled: true,
  isPrintOrderIdBarcodeEnabled: true,
  isPrintGoodsInfo: false,
  isPrintGoodBarcodeEnabled: false,
  isPrintGoodIdEnabled: false,
  isPrintSkuIdEnabled: false,
  copiesCountOfOrder: 1,
  copiesCountOfDineOrder: 1,
  copiesCountOfPhoneOrder: 1,
  countSettings: {},
  ticketSettings: {
    showCustom: false,
    welcomeSpeech2: '扫码关注领店铺红包',
    welcomeSpeech: '欢迎光临，下次再来',
    contentType: 'SHOP_QR_CODE'
  },
  printLogo: false,
  printPlatformContent: true
}
```