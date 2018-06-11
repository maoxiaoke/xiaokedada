# 有关 CSS properties 声明顺序的思考

在 [CSS Trick](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) 曾经进行过有关使用 CSS properties 的民意调查，其中随机声明顺序(39%)和按照类型组织(45%)占据大头。

若是按照类型来组织 CSS properties，比较推荐这么一种方式：

```css
.selector {
  /* Positioning */
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;

  /* Display & Box Model */
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid #333;
  margin: 10px;

  /* Color */
  background: #000;
  color: #fff

  /* Text */
  font-family: sans-serif;
  font-size: 16px;
  line-height: 1.4;
  text-align: right;

  /* Other */
  cursor: pointer;
}
```

这种方式也被称作 [`Outside In`](https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685)，是指*先从大角度描述，再从小的角度切入*。

对于大型团队而言，可能需要更为细致的声明。[AlloyTeam](http://alloyteam.github.io/CodeGuide/#css-declaration-order) 团队给出了一份针对每个属性的顺序声明，可供参考。

从我的角度，按照类型来组织代码，是一种可靠的方式。但这个非常 personal。