// 1. 引入express
// 服务端
// const { response } = require('express');
const express = require('express');

//2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
// 这里如果修改了就要重启
// all 可以接受任意的请求
app.all('/json-server',(request, response)=>{
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应头
    response.setHeader('Access-Control-Allow-Headers','*');
    // 响应一个数据
    let data={
        name:'彭于晏'
    }
    let j={
        name:'信州彭于晏'
    }
    let str=JSON.stringify(data);
    let str2=JSON.stringify(j);
    // 响应体 send里面只能放字符串
    response.send(str);
    // response.send("HELLO EXPRESS Im ajay");

});

//4. 监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动， 8000端口监听中....");
})