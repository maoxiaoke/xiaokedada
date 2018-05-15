# 再来仔细研究DOM

之前，我们是通过<<JavaScript DOM编程艺术>>这本书来学习原生的 JavaScript DOM 编程。这里呢，想更加具体地将这些方法和属性都罗列出来。

首先，理解节点(node)的概念。DOM 树其实就是一棵节点树，节点分为多种不同的类型。

## Node 类型

### 有关节点类型的属性

Node 是一个基本类型，是一个抽象的接口。其他所有的节点类型都继承自这个 Node 类型。所以**对于每个节点**，都有一个 `nodeType` 属性，用于表明节点类型。比较常用的就是以下两种：

+ Node.ELEMENT_NODE(1) 元素节点
+ Node.TEXT_NODE(3) 文本节点

> 注意，属性节点已经被spec废置了(因为确实没啥用)，详见[W3C DOM4](https://www.w3.org/TR/2015/REC-dom-20151119/#interface-node)

除此之外，每个节点还有 `nodeName` 和 `nodeValue` 属性。前者会返回符合其类型的字符串，后者返回节点的值。比如:

+ 如果是元素节点，`nodeName` 返回大写的标签名， `nodeValue` 永远返回 `null`;
+ 如果是文本节点，`nodeName` 返回 `"#text"`, `nodeValue` 返回文本内容。

### 有关节点关系的属性

每个节点都有一个 `childNodes` 属性，其中保存一个 `NodeList` 对象，是一个类数组，用于保存一组有序的节点(还有个 HTMLCollection 对象，保存一组元素节点)。比如:

```html
  <body>
    <div class="main-wrapper">
      <ul class="deleteItem">
        <li class="items">Yuer</li>
        <li class="items">Maoxiaoke</li>
        <li class="items">I Love you</li>
      </ul>
    </div>
    <script type="text/javascript">
      var div = document.getElementsByTagName('div')[0].childNodes; //[text, ul.deleteItem, text]，其中 text 节点的 nodeValue 是""
      var ul = document.getElementsByTagName('ul')[0].childNodes; //[text, li.items, text, li.items, text, li.items, text]
      var liValue1 = document.getElementsByTagName('li')[0].childNodes[0].nodeValue; // "Yuer"
      var liValue2 = document.getElementsByTagName('li')[0].innerHTML; // "Yuer"
    </script>
  </body>
```

> 注意1. childNodes 属性获取的是*直接*子节点。
> 注意2. 并非所有的空白都会变成文本节点

举个栗子：

```html
<!DOCTYPE html>
<html class=e>
 <head><title>Aliens?</title></head>
 <body>Why yes.</body>
</html>
```

节点树如下：

![nodeTree]({{ '/styles/images/dom/nodetree.png' | prepend: site.baseurl }})

这个网址[Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/#)提供在线的 DOM Tree 查看。

> 如果让 IE 来解析解析这些代码，可能又是另一种情况了: 空白符的文本节点可能并不会计算在内。所以由于浏览器之间的这种差别，在执行某项操作之前，通常都要先检查以下 nodeType 的属性。

每个节点都有一个 `parentNode` 属性，指向 DOM 树的父节点。`previousSibling` 属性指向前向节点，`nextSibling` 属性指向后向节点。`firstChild`指向第一个子节点，`lastChild`指向最后一个子节点。当然了，如果上述节点的属性没有指向，那都指向 `null`。

所有节点还有一个 `ownerDocument` 属性，该属性指向表示整个文档的文档节点(DOCUMENT_NODE)，也就是 `Document`，nodeName 是 `"#document"`，nodeType 是 `9`。

### 节点的操作

+ `appendChild(node)` 向 childNodes 列表末尾添加一个节点，返回新增节点。
+ `insertBefore(node, child)` 方法接收两个参数: 要插入的节点和作为参照的节点，要插入的节点插入到参照节点的前面，返回新增节点
+ `removeChild(node)` 移除节点，返回移除节点
+ `replaceChild(node, child)` 方法接收两个参数: 要插入的节点和要替换的节点

以上这四种方法必须先取得父节点(比如，使用 parentNode 属性)。另外，并不是所有类型都有子节点，如果在不支持子节点的节点上调用这些方法，将会导致错误。

下面的这两个方法是所有类型的节点都有的。
+ `cloneNode(boolean)` 接收一个布尔值，true 表示深复制；false 表示浅复制。
+ `normalize()` 这个方法的唯一作用是处理文档树中的文本节点。

---

## Document 节点

Document 类型表示文档。在浏览器中，document 对象是 HTMLDocument (继承自 Document 类型)的一个实例，表示整个 HTML 文档。 而且，document 对象是 window 对象的一个属性，因此可以将其作为全局对象来访问。

上面我们说到，节点的 `ownerDocument` 属性指向 Document 节点，nodeName 是 `"#document"`，nodeType 是 `9`，nodeValue 是 `null`，parentNode 是 `null`，ownerDocument 是 `null`。

### 文档子节点

有两个内置的方法访问其子节点的快捷方式。
+ `documentElement` 属性，这个属性始终指向 HTML页面的 `<html>` 的元素。当然，也可以通过 childNodes列表来访问。
+ `body` 属性，直接指向 `<body>` 元素

### 文档信息

作为 HTMLDocument 的一个实例，document 对象还有一些标准的 Document 对象所没有的属性。

+ `title` 属性，取得当前页面的标题
+ `URL` 属性，取得页面完整的 URL
+ `domain` 属性，只包含页面的域名
+ `referrer` 属性，保存着链接到当前页面的那个页面的 URL

### 取得元素的方法

+ `getElementById(id)` 接收元素的 id，如果页面中有多个 ID 值相同，只返回文档中第一次出现的元素
+ `getElementsByTagName(tagName)` 接收要取得的元素的标签名，返回包含零或多个元素的 `HTMLCollection` 对象
+ `getElementsByClassName(className)` 接收元素的属性名，返回零或多个元素 `HTMLCollection` 对象。这个方法是在 HTML5 中提出来的。
+ `getElementsByName(name)` 接收元素的 name 特性，返回零或多个元素 `HTMLCollection` 对象。如果多个 name 特性的值相同，只返回第一个元素

### 特殊集合

除了属性和方法，document 对象还有一些特殊的集合。这些集合都是 HTMLCollection 对象，为访问文档常用的部分提供了快捷方式。

+ `document.anchors` 包含文档中所有带 name 特性的 `<a>` 元素
+ `document.forms` 包含文档中所有 `<form>` 元素
+ `document.images` 包含文档中所有 `<img>` 元素
+ `document.links` 包含文档中所有带 href 特性的 `<a>` 元素

---

## Element 节点

Element 类型主要提供对元素标签名、子节点及特性的访问。

Element 节点的 nodeType 是 1，nodeName 的值是元素标签名的**大写形式**，nodeValue 的值是 null。要访问元素的标签名，可以使用 nodeName属性，也可以使用 `tagName` 属性，两者的结果是一样的，后者只是为了表述更清晰。

### 常见的 Element 节点属性

所有的 HTML 元素都由 HTMLElement 类型表示。**所有的特性都是属性**。有以下常见的属性：
+ `id` 就是元素的 ID 标识符
+ `className` 与元素的 class 特性对应
+ `title`
+ `style` 与元素的 style 特性对应

### 有关特性的方法

+ `getAttribute()` 获得特性值
+ `setAttribute()` 设置特性，这个方法接收两个参数：要设置的特性名和值。
+ `removeAttribute()` 彻底删除元素的特性

`getAttribute()` 其实大多数都可以直接由节点属性得到。

```html
<div id="myDiv" class="wrapper" style="color:red;background-color: yellow;">I Love Yuer</div>
<script>
var div = document.getElementById("myDiv");
div.getAttribute("id");  //"myDiv"
div.id;  //"myDiv"
div.getAttribute("class");  //"wrapper"，注意不是 className
div.className;  //"wrapper"
div.getAttribute("style"); // "color:red;background-color: yellow;"
div.style;  //CSSStyleDeclaration
</script>
```

但有两类特殊的特性，虽然有对应的属性名，但属性的值与通过 `getAttribute()` 返回的值并不相同。一类是 style 属性，`getAttribute()` 返回 style 属性值的文本，而通过 `.style` 属性来访问则会返回一个对象。另一种就是就是 onclick 这样的事件处理函数。`getAttribute()` 相应代码的字符串，而访问 `.onclick` 属性则会返回一个函数。

`setAttribute()` 其实大多时候也可以直接由节点属性设置。比如:

```js
div.id = "someOtherId";
div.className = "myDivClass";
```

但是问题是，无法通过上面这个方式添加**自定义属性**。而 `setAttribute()` 是可以的。

```js
div.myColor = "red"; //虽然为 div 添加了一个名为 myColor的属性，但大多数浏览器上，这个属性并不会变成特性。
```

### attributes 属性

attributes 属性中包含一个 `NamedNodeMap` 的对象，也是一个类数组。元素的每一个特性都保存在这个对象当中。有以下的方法：
+ `getNamedItem(name)` 得到元素的特性
+ `removeNamedItem(name)` 从列表中移除
+ `setNamedItem(name)` 向列表中添加
+ `item(pos)` 返回位于数字 pos 位置处的节点

相比起前面 getAttribute() 等方法，上面这些方法并不方便，所以也很少使用。但是，**如果向遍历元素的特性**，attributes 属性倒是可以派上用场。

### 创建元素

使用 `document.createElement(tagName)` 方法创建新元素。之后，还可以为此元素添加更多的特性。但是这个方法只是创建了新元素，新元素尚未被添加到文档树中，因此设置这些新特性不会影响浏览器的显示。所有最后，要使用 appenChild()、insertBefore() 或 replaceChild() 等方法。例如:

```js
var div = document.createElement('div');
div.innerHTML = "I Love Yuer";
div.style.color = "red";
div.className = "lover";
var body = document.body;
body.appendChild(div);
```

---

## 文本节点

文本节点包含纯文本内容。纯文本中可以包含转义后的 HTML 字符，但不能包含 HTML 代码。

Text 节点的 nodeType 是 3，nodeName 的值是 "#text"，nodeValue 的值为节点所包含的文本，没有子节点。要访问 Text 节点中的文本，可以通过 nodeValue 属性或 data 属性，这两个属性中包含的值相同。

以下方法可以操作节点中的文本:

+ `apppendData(text)` 将 text 添加到节点的末尾
+ `deleteData(offset, count)` 从 offset 指定的位置开始删除 count 个字符
+ `insertData(offset, text)` 在 offset 指定的位置插入 text
+ `repalceData(offset, count, text)` 用 text 替换从 offset 指定的位置开始到 offset + count 的文本
+ `splitText(offset)` 从 offset 指定的位置将当前文本节点分成两个文本节点
+ `substringData(offset, count)` 提取从 offset 指定的位置开始到 offset + count 为止处的字符串

### 创建文本节点

使用 `document.createTextNode(text)` 创建新文本节点，这个方法接受一个参数 -- 要插入节点中的文本。这当然是不够的，我们还需要将新文本节点添加到文档中已经存在的节点中，用的是 appenChild()、insertBefore() 或 replaceChild() 等方法。

```js
var div = document.getElementsByTagName('div')[0];

var textNode = document.createTextNode ("Hello World!");
div.appendChild(textNode);
```

### normalize() 和 splitText() 方法

一般情况下，只有一个文本子节点。不过，某些情况下，也可能包含多个文本子节点。如果两个文本子节点是相邻的同胞节点，那么这两个节点中文本就会连起来显示，中间不会有空格。

于是，催生了一种能够将相邻文本节点合并的方法，即 `normalize()`。该方法在包含两个或多个文本节点的**父元素**上调用，将所有文本节点合并成一个节点。

相反操作，`splitText(num)` 。这个方法将一个文本节点分割成两个文本节点。该方法接收一个数值，返回新文本节点，新文本节点包含剩下的文本。注意注意。拿前面创建文本节点的栗子。

```js
var newNode = div.firstChild.split(5);
div.firstChild.nodeValue; // "Hello"
newNode.nodeValue; // " World!"
```

分割文本节点是从文本节点中提取数据的一种常用的 DOM 解析技术。

---

## 属性(特性)节点

之前我们说到，属性节点已被废置了。现在基本都是通过 getAttribute()、setAttribute() 和 removeAttribute()，或者直接进行属性节点的操作(因为所有的特新都是 Element 节点的属性)。

但是，仍保留着一些方法可以创建属性节点。

+ `document.createAttribute()` 创建属性节点
+ `(element).setAttributeNode()` 将创建的特性添加到元素中

之后就可以使用 attributes 属性(上面提到的)、getAttributeNode()方法以及 getAttribute() 方法访问该特性。

---

## DOM 扩展

虽然上述的 API 已经非常完善了，但是社区还是 DOM API 进行了扩展。包括 Selectors API、Element Traversal API、HTML5 DOM 扩展、专用扩展。

### Selectors API

Selectors API 致力于让浏览器原生支持 CSS 查询。有两个核心方法 `querySelector()` 和 `querySelectorAll()`。

`querySelector()` 方法接收一个 CSS 选择符，返回与该模式匹配的**第一个元素**，没有找到，返回 null。这个方法既可以通过 Document 类型调用，也可通过 Element 类型调用。前者会在文档元素的范围内查找匹配元素，后者只在该元素后代的范围内查找匹配的元素。

`querySelectorAll()` 返回所有匹配的元素，即一个 NodeList 的实例。

### Element Traversal API

这个 API 出现的原因在于对于元素间的空白字符，IE9 之前的版本不会返回文本节点，而其他浏览器会返回文本节点。这样，在使用 childNodes 和 firstChild 等属性时的行为不一致。所以 Element Traversal 规范新定义了一组属性，主要针对元素节点。
+ `firstElementChild` 指向第一个子元素
+ `lastElementChild` 指向最后一个子元素
+ `childElementCount` 只返回**所有子元素**的个数
+ `previousElementSibling` 前向一个同辈元素
+ `nextElementSibling` 后向一个同辈元素

### HTML5 扩充

#### 和 class 属性相关的扩充

`getElementsByClassName(className)` 可以通过 document 和所有 HTML 元素调用该方法。这个方法可以传入一个或多个类名。

`classList` 属性。

主要是在操作多个类名时，对类型的删除和增加都非常不方便。为此，HTML5 新增一种操作类名的方法，即 classList 属性，是 `DOMTokenList` 的实例。很显然，也是一个类数组对象。有以下方法：

+ add(className) 添加类名，已经存在的话，就不用添加了
+ contains(className) 表示列表中是否存在给定类名，返回布尔值
+ remove(className) 从列表中删除给定的字符串
+ toggle(value) 如果列表中已经存在给定的值，删除它；否则，添加它。

例如：

```html
<div class="user myDiv wrapper">...</div>
<script>
  var div = document.getElementsByTagName("div")[0];
  div.classList.remove("user");
</script>
```

#### 焦点管理

`document.activeElement` 属性，这个属性始终会引用 DOM 中当前获得了焦点的元素。元素获得焦点的方式有页面加载、用户输入(通常是 Tab 键)、在代码中调用 focus() 方法。

另外就是新增的 document.hasFocus() 方法，用于确定文档是否获得了焦点。

#### 其他新增属性

`readyState` 属性，该属性有两个可能的值。使用方法： document.readyState

+ loading: 正在加载文档
+ complete: 文档加载完成

`head` 属性，这个属性引用文档的 `<head>` 元素。使用方法： document.head

`charset` 属性，表示文档中实际使用的字符集。

`dataset` 属性。HTML5 可以添加自定义属性，只需要前缀加上 `data-`，目的是为元素提供与渲染无关的信息，或者提供语义信息。添加完自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值。dataset 属性的值是 DOMStringMap 的一个实例，是一个名值对的映射。

`innerHTML`属性

在**读模式**下，innerHTML 属性返回与调用元素的所有**子节点**(包括元素，注释和文本节点)对应的 HTML 标记。在写模式下，innerHTML 会根据指定的值创建新的 DOM 树，然后用这个 DOM 树完全替换元素原先的**所有子节点**。

> 不要指望所有的浏览器返回的 innerHTML 值完全相同。另外就是，并不是所有元素都支持 innerHTML 属性。

读模式下，如果设置的值仅是文本而没有标签，那么结果就是设置纯文本。比如：

```js
div.innerHTML = "Hello World!";
```

`outerHTML` 属性

在读模式下，outerHTML 返回**调用它的元素及所有子节点的 HTML 标签**。在写模式下，outerHTML 会根据指定的 HTML 字符串创建新的 DOM 子树，然后用这个 DOM 子树完全替代**调用元素**。

### 专有扩展

#### children 属性

还是因为 IE9 之前的版本与其他浏览器处理文本节点的空白符的差异，因此出现了 children 属性，这个属性是 HTMLCollection 的实例，只包含元素中**还是元素的**子节点。

这个属性得到了大多数浏览器的支持。

### contains 方法

这个方法用来检测节点是否是后代节点。方法接收一个参数，即要检测的后代节点。

### innerText 属性和 outerText 属性

innerText 和 outerText 属性没有 innerHTML 和 outerHTML 属性那么好的运气。

innerText 属性操作元素中包含的所有文本内容，包括子文档树的文本。

> 注意和 innerHTML 的区别

除了作用范围扩大到包含调用它的节点之外，outerText 和 innerText 基本没有什么多大区别。在读取文本时，outerText 和 innerText 的结果完全一样。但在写模式下，outerText 会替换整个元素(包括子节点)。

---

## 注意的几点

### NodeList/HTMLCollection/NamedNodeMap

这三个集合是**动态的**，也就是说，每当文档结构发生变化时，它们都会得到更新。