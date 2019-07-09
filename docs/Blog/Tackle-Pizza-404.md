# 404 还是跨域

今天通过自己的页面去调用 bdi 那边的 pizza 地址，报错如下：

![cors.png](https://intranetproxy.alipay.com/skylark/lark/0/2019/png/144596/1562244671230-88f20fd2-9107-4c06-88d4-6822bf3cac14.png) 

第一眼还以为是个跨域问题。

后面发现，在发 option 请求的时候，就已经返回 404 了。

不过比较好奇的是，option 请求 404，为啥还会有后面的报错...

