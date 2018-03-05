// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:

const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
//通过中间件组成处理链然后处理内容
app.use(async(ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});
app.use(async (ctx,next)=>{
    const start = new Date().getTime();//获取当前时间
    await next();
    const ms = new Date().getTime()-start;
    console.log(`Time:${ms}ms`);//打印处理时间
});
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');