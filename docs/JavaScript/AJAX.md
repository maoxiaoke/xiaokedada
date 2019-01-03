# AJAX

`AJAX` stands for `A`synchronous `J`avaScript and `X`ML. 它是使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)对象与服务器端脚本进行通信。它可以发送以及接收各种格式的信息，包括`JSON`，`XML`，`HTML`，甚至文本文件。

> `XMLHttpRequest`是一个`API`, 它为客户端提供了在客户端和服务器之间传输数据的功能。它提供了一个通过`URL`来获取数据的简单方式，并且不会使整个页面刷新。**这个对象充当着浏览器中的脚本（客户端）和服务器之间的中间人的角色**。以往的请求都是由浏览器发出，而`JavaScript`通过这个对象可以自己发送请求，同时也自己处理响应。

The two major features of `AJAX`:

+ 向服务器发出请求，而不重新加载页面
+ 接收和处理服务器中的数据


---

## step 1 : 发出HTTP请求

In order to make an `HTTP` request to the server using JavaScript, you need an **instance** of a class that provides this functionality.

```javascript
// Old compatibility code, no longer needed.
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

// new
const httpRequest = new XMLHttpRequest();
```

Next, you need to decide what you want to do after you receive the server response to your request. At this stage, you just need to tell the `HTTP` request object which JavaScript function will handle processing the response. This is done by setting the `onreadystatechange` property of the object to the name of the JavaScript function that should be called when the state of the request changes:

```javascript
httpRequest.onreadystatechange = nameOfTheFunction;
```

> 注意，函数名后面没有括号，没有参数传递，因为你只是给函数赋了一个引用，而不是实际调用它。

Also, instead of giving a function name, you can use the JavaScript technique of defining functions on the fly (called "anonymous functions"(匿名函数)) and define the actions that will process the response right away：

```javascript
httpRequest.onreadystatechange = function(){
    // process the server response
};
```

> `onreadystatechange`是一个事件处理函数，它会在服务器给`XMLHttpRequest`对象送回响应的时候被触发。

Next, after you've declared what will happen as soon as you receive the response, you need to actually make the request(一旦你确定了收到响应后会发生什么，这个时候你才能正式提出请求). You need to call the `open()` and `send()` methods of the HTTP request class:

```javascript
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send(null);
```

> 我们最好始终将第三个参数设定成 `true` 以异步的方式发送请求的布尔值。另外强调的是，调用 `open()` 方法并不会真正发送请求，而只是启动一个请求以备发送，所以还需要调用 `send()`方法。

如果不需要通过请求主体发送数据，则必须传入 null，比如使用 GET 方法。如果使用 POST 方法，需要将传送的数据加入。

#### open()

+ The first parameter of `open()` is the HTTP request method – `GET`, `POST`, `HEAD` or any other method you want to use and that is supported by your server
+ The second parameter is the `URL` of the page you're requesting.
+ The **optional** third parameter sets whether the request is asynchronous. If TRUE (the default), the execution of the JavaScript function will continue while the response of the server has not yet arrived.

#### send()

The parameter to the `send()` method can be any data you want to send to the server if `POST`-ing the request.

---

## step 2 : 处理服务器请求

When sending the request, you provided the name of a JavaScript function that is designed to handle the response.

```javascript
httpRequest.onreadystatechange = nameOfTheFunction;
```

First, the function needs to check for the state of the request.

```javascript
if (httpRequest.readyState === XMLHTTPRequest.DONE){
    //everything is good, the response is received
    // or httpRequest.readState === 4
}
else {
    //not ready
}
```

The full list of the `readyState` values is as follows:

+ 0 表示未初始化。尚未调用 open() 方法
+ 1 表示正在加载。已经调用 open() 方法，但未调用 send() 方法
+ 2 表示加载完毕。已经调用 send() 方法，但尚未接收到响应
+ 3 表示正在交互。已经接收到部分响应数据
+ 4 表示完成。 已经接收到全部响应数据，而且可以在客户端使用了。

> 接收到响应后，响应的数据会自动填充 XMLHttpRequest 对象的属性

+ responseText: 作为响应主体被返回的文本
+ responseXML: 响应数据的内容类型是 "text/xml" 或 "application/xml"
+ status: 响应的 HTTP 状态
+ statusText: HTTP 状态的说明

The next thing to check is the response code of the HTTP server response.

For example:

```javascript
if (httpRequest.status === 200) {
    // perfect!
} else {
    // there was a problem with the request,
    // for example the response may contain a 404 (Not Found)
    // or 500 (Internal Server Error) response code
}
```

Now after you've checked the state of the request and the HTTP status code of the response, it's up to you to do whatever you want with the data the server has sent to you. You have two options to access that data(你有两种方式来获取数据):

+ `httpRequest.responseText` – returns the server response as a string of text
+ `httpRequest.responseXML` – returns the response as an XMLDocument object you can traverse using the JavaScript DOM functions(这个属性用于保存`Content-Type`头部中指定为"`text/xml`"的数据，其实是一个`DocumentFragment`对象，可以用各种`DOM`方法来处理这个对象)

---

## 使用数据

Finally, We can send some data to the server and receive a response.

---

## 取消异步请求

在接收到响应之前还可以调用 `abort()` 方法来取消异步请求。

```js
httpRequest.abort();
```

---

## example

```javascript
function getNewContent(){
    var request = new XMLHttpRequest();

    if (request){
        request.open("GET","example.txt",true);
        request.onreadystatechange = function(){
            if (request.readyState === 4){
                if (request.status === 200){
                    var para = document.createElement("p");
                var txt = document.createTextNode(request.responseText);
                para.appendChild(txt);
                document.getElementById('new').appendChild(para);
                }
            }
        };
        request.send(null);
    }
    else{
        alert('Sorry, your browser doesn\'t support XMLHttpRequest');
    }
}
```

> 回调函数中，通常我们只需通过 `readyState === 4` 判断请求是否完成。如果已完成，再根据 `status === 200` 判断是否是一个成功的响应。

---

## Ajax 跨域

通过 XHR 实现 Ajax 通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR 对象只能访问与包含它的页面位于同一个域中的资源。

CORS (Cross-Origin Resource Sharing, 跨域源资源共享) 是 W3C 的一个工作草案，定义了在必须访问跨域资源时，浏览器和服务器如何沟通。CORS 背后的思想是：**使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是应该失败**。

### 简单请求

比如，在发送简单请求时，需要自定义一个 origin 头部，其中包含请求页面的源信息(协议、域名或端口)，以便服务器根据这个头部信息来决定是否给予响应。

```txt
Origin: http://xiaokedada.com
```

如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息。

```txt
Access-Control-Allow-Origin: http://xiaokedada.com
```

如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。

IE 通过引入 XDR(XDomainRequest) 类型实现 CORS。其他浏览器对 CORS 的实现是**使用标准的 XHR 对象并在 open() 方法中传入绝对 URL**。

### 非简单请求

CORS 通过一种叫做 Preflighted Requests 的透明服务器验证机制支持开发人员使用自定义的头部、GET 或 POST 之外的方法，以及不同类型的主体内容。这种请求使用 OPTIONS 方法，发送下列头部：

+ Origin: 与简单请求一致
+ Access-Control-Request-Method: 请求自身使用的方法
+ Access-Control-Request-Headers: (可选) 自定义头部信息

发送这个请求后，服务器可以决定是否允许这种类型的请求。在响应中发送如下头部与浏览器进行沟通。

+ Access-Control-Allow-Origin: 与简单请求一致
+ Access-Control-Allow-Methods: 允许的方法
+ Access-Control-Allow-Headers: 允许的头部
+ Access-Control-Max-Age: 应该将这个 Preflight 请求缓存的时间(秒)

强烈建议参考这篇文章: [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

### JSONP 跨域技术

JSONP (JSON with padding) 是**应用** JSON 的一种新方法，只是被包含在函数调用中的 JSON。

```js
callback({"name":"maoxiaoke"});
```

JSONP 是通过动态 `<script>` 元素来使用的，是因为 `<script>` 脚本具有跨域能力。下面这个栗子：

```js
function handleResponse (response) {
    // do something
}

var script = document.createElement ("script");
script.src = "http://xxx/json/？callback=handleResponse";
document.body.insertBefore (script, document.body.firstChild);
```

> 参考: [ajax跨域，这应该是最全的解决方案了](http://www.jianshu.com/p/82b82d5dd1ea)