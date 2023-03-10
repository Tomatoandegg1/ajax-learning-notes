# AJAX的学习笔记(Node.js环境)

AJAX学习的笔记，主要环境为Node.js

课程地址： https://www.bilibili.com/video/BV1WC4y1b78y

## 第一章： 原生Ajax

### 1.1 Ajax简介

* Ajax全称为Asynchronous Javascript And XML，即异步JS和XML
* 通过Ajax可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
* AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

### 1.2 XML简介

* XML：可扩展标记语言
* XML：被设计用来传输和存储数据
* XML和HTML类似，不同点：HTML中都是预定义标签，XML中没有预定义标签，全是自定义标签，用来表示一些数据
* 现在已被JSON取代

### 1.3 AJAX 的特点

#### 1.3.1 AJAX的优点

1. 可以无刷新页面与服务端进行通信
2. 允许你根据用户事件来更新部分页面内容

#### 1.3.2 AJAX 的缺点

1. 没有浏览历史，不能回退
2. 存在跨域问题（同源）
3. SEO不友好（爬虫获取不到信息）

### 1.4 AJAX 的使用

#### 1.4.1 核心对象

## 第二章 jQuery中的AJAX

### 2.1 get请求

    $.get(url, [data], [callback], [type])
    url: 请求的URL地址
    data: 请求携带的参数
    callbac: 载入成功时回调函数
    type：设置返回内容格式，xml、html、script、json、text、_default

## 第三章： 跨域

### 3.1 同源策略

同源策略（Same-Origin Policy）最早由 Netscape 公司提出，是浏览器的一种安全策略。

同源：协议、域名、端口号 必须完全相同：

##### 客户端：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>首页</title>
</head>
<body>
    <h1>Nliver</h1>
    <button>点击获取用户数据</button>
    <script>
        const btn = document.querySelector('button');

        btn.onclick = function(){
            const x = new XMLHttpRequest();
            //这里因为是满足同源策略的，所以url可以简写
            x.open("GET",'/data');
            //发送
            x.send();
            //
            x.onreadystatechange = function () {
                if (x.readyState === 4) {
                    if(x.status >= 200 && x.status < 300){
                        console.log(x.response);
                    }

                }
            }
        }
    </script>
</body>
</html>
```

##### 服务端

```服务端
// const { response } = require('express');
const express = require('express');

const app = express();

app.get('/home', (request, response)=>{
    //响应一个页面
    response.sendFile(__dirname + '/index.html');

});

app.get('/data', (request, response)=>{
    //响应一个页面
    response.send('用户数据');

});

app.listen(9000,()=>{
    console.log("服务已经启动...");
})
```

这里我们是响应了一个页面叫home我们要进入(http://127.0.0.1:9000/home) 这个地址才可以访问

违背同源策略就是跨域

### 3.2 如何解决跨域

#### 3.2.1 JSONP

1. JSONP是什么
   
   JSONP (JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求

2. JSONP 怎么工作的？
   
   在网页有一些标签天生具有跨域能力，比如：img, link, iframe, script
   
   JSONP就是利用**script**标签的跨域能力来发送请求的

3. JSONP的使用
   
   * 动态的创建一个script标签
     
      var script = document.createElement("script");
   
   * 设置script的src，设置回调函数
     
      script.src = "http://locallhost:3000/textAJAX?callback=abc"

### 3.2.2 CORS

推荐阅读：

* http://www.ruanyifeng.com/blog/2016/04/cors.html

* https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS
1. CORS是什么？
   
   CORS (Cross-Origin Resource Sharing), 跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 等请求。跨域资源共享标准新增了一组 HTTP 首部字段（响应头），允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS怎么工作的？
   
   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

3. CORS 的使用
   
   主要是服务端的设置：
   
      rounter.get("/testAJAX",function(req, res){
   
      })
   
   ### 调试用到的工具：
   
   nodemon 工具，自动修改服务端的数据，我们在修改服务端数据的时候经常修改，修改之后要重启很麻烦，下载这个工具会自动帮我们重启
   
       安装
       npm install -g nodemon
       使用
       nodemon 你要执行的文件
