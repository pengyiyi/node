'use strict'
//一个简单的的http服务器
//导入HTTP模块
var http =require('http');
//创建http server，并传入回调函数
var server = http.createServer(function(request,response){
    //回调函数接收request和response两个参数
    //获得HTTP请求的method和url
    console.log(request.method+':'+request.url);
    //写回response头的状态码和Content-Type
    response.writeHead(200,{'Content-Type':'text/html'});
    //将响应写回去
    response.end('<h1>hello world!</h1>');
})
//服务器监听8080端口
server.listen(8080);
//启动提示信息
console.log('Server is running at http://127.0.0.1:8080/');