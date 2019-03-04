# CORS

之前一直对跨域存在的是概念的理解。这次想结合实际的开发经历图文并茂一下。

## 跨域问题

并非是无法访问 *域外* 的资源，而是浏览器会限制从 *脚本* 发起的跨域(无论是浏览器限制脚本发起跨域资源，还是跨域资源的返回结果被浏览器拦截)。

正如我们看到的：

+ `<img>` 标签的 `src` 属性可以正常跨域
+ `<script>` 标签的 `href` 属性可以正常跨域

## 什么情况下需要 CORS

在目前浏览器支持的 HTTP 请求的 API 中，`XMLHttpRequest` 和 `Fetch` 允许使用跨域请求。

还有一些其他 [api](https://www.w3.org/TR/cors/) 也支持跨域请求。

## CORS 的实现

CORS 和传统的资源请求方式一致，仅是 HTTP 协议专为 CORS 提供了一组首部字段。

## 简单请求和非简单请求

CORS 将 HTTP 请求区分为简单请求和非简单请求(或称 Preflight Request)。

有关简单请求和非简单请求的需满足的条件可以查看 [简单请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82) 和 [非简单请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82)。

## Preflight Request 的图文并茂

预检请求的意思是：在请求某些资源的时候，必须首先需要使用 `OPTIONS` 方法发起一个 preflight request 到服务器，以获知目标服务器是否允许该请求。其目的是避免 **跨域请求对服务器的数据产生未知的影响**。

比如我们发起一个请求，获取 `https://app-api-shop.alta.elenet.me/membership/invoke/?method=MelodyCardService.canUseVipCard` 返回的 json 内容。

1. 第一步，发送预检的 `OPTIONS` 请求

![](https://github.com/maoxiaoke/xiaokedada/blob/master/assets/preflight-option.jpg?raw=true)

看一下抓包的内容:

```http
--------- 请求头 ---------

:method: OPTIONS
:authority: app-api-shop.alta.elenet.me
:scheme: https
:path: /membership/invoke/?method=MelodyCardService.canUseVipCard
pragma: no-cache
cache-control: no-cache
access-control-request-method: POST
origin: http://melody-test.faas.elenet.me
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36
access-control-request-headers: content-type,x-eleme-requestid,x-shard
accept: */*
alexatoolbar-alx_ns_ph: AlexaToolbar/alx-4.0.3
referer: http://melody-test.faas.elenet.me/app/chain-shop/dashboard
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7

--------- 返回头 ---------
:status: 200
access-control-allow-headers: Token-Type,shfda-access-token,x-eleme-requestid,Token,Order-Id,HTTP_DEVICE_ID,HTTP_SIGNATURE,test-happy,X-Eleme-RequestID,content-type,Content-Type,Invocation-Protocol,X-Requested-With,Accept,HTTP_CONSUMER_KEY,dom-auth-token,Pragma,HTTP_ACCESS_TOKEN,x-shard,invocation-protocol,Access-Token,Dom-Auth-Token,X-Shard,HTTP_TIMESTAMP,family
access-control-allow-methods: POST
access-control-allow-origin: http://melody-test.faas.elenet.me
access-control-max-age: 172800
server: Sopush/0.19.0
vary: Origin
x-echo-requestid: DC939D37BD7B49CD9FDAF025004A64EE|1551676946955
x-sopush-cache-status: skip
content-length: 0
date: Mon, 04 Mar 2019 05:22:26 GMT
```

上方表示浏览器发送一个使用 `OPTIONS` 的预检请求。几个重点的请求头首部字段：

+ `Origin` - 表示该请求的来源
+ `Access-Control-Request-Method` - 告知服务器实际请求使用的方法，本例中就是 `POST`
+ `Access-Control-Request-Headers` - 告知服务器实际请求将携带的自定义请求首部字段，本例中分别是 content-type、x-eleme-requestid 和 x-shard

服务器根据这三者决定，该实际请求是否被允许。该预检请求的 response header 如下：


接着，服务器响应，几个重点的响应头首部字段：

+ `Access-Control-Allow-Methods` - 说明服务器允许客户端使用的方案，本例就是 `POST`
+ `Access-Control-Allow-Headers` - 表明服务器允许使用的自定义请求首部字段，本例中，有很多
+ `Access-Control-Max-Age` - 表明响应的有效时间，在该时段内，浏览器无需为同一请求再次发起预检请求

浏览器对预检请求的这几个对应的字段对应比较，如果请求不符合服务器要求的条件，则不再进行实际请求，并在控制台报错提醒。

2. 发送实际请求

抓包的内容如下:

```http
--------- 请求头 ---------

:method: POST
:authority: app-api-shop.alta.elenet.me
:scheme: https
:path: /membership/invoke/?method=MelodyCardService.canUseVipCard
content-length: 252
pragma: no-cache
cache-control: no-cache
accept: application/json, text/plain, */*
origin: http://melody-test.faas.elenet.me
x-shard: shopid=94412443
x-eleme-requestid: 17D7092BAB884F27B4CE8CEFF3C136E1|1551710275332
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36
content-type: application/json;charset=UTF-8
alexatoolbar-alx_ns_ph: AlexaToolbar/alx-4.0.3
referer: http://melody-test.faas.elenet.me/app/chain-shop/dashboard
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7

{"id":"17D7092BAB884F27B4CE8CEFF3C136E1|1551710275332","metas":{"appName":"melody","appVersion":"1.1.1","ksid":"ODQWMWMTAxMDAwMDQ5NTM2NDAxTWVxMTJPdjFC"},"service":"MelodyCardService","method":"canUseVipCard","params":{"chainId":94412443},"ncp":"2.0.0"}

--------- 返回头 ---------
:status: 200
access-control-allow-origin: http://melody-test.faas.elenet.me
content-type: application/json; charset=UTF-8
server: Sopush/0.19.0
vary: Origin
x-echo-requestid: 17D7092BAB884F27B4CE8CEFF3C136E1|1551710275332
x-sopush-cache-status: skip
content-length: 96
date: Mon, 04 Mar 2019 14:37:59 GMT

{"ncp":"2.0.0","id":"17D7092BAB884F27B4CE8CEFF3C136E1|1551710275332","result":true,"error":null}
```

可以看到，在正式请求中，请求首部字段携带了自定义的 `x-shard` 和 `x-eleme-requestid`。

## 服务端配置 CORS

待我学了 node 再说，🤦‍

## Reference

1. [CORS - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)