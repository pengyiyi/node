//koa-router解析url处理不同的url请求
const koa =  require('koa');
const router = require('koa-router')();  //koa-router是函数
//处理post请求的话需要中间件 koa-bodyparser来解析传过来的数据
const bodyParser = require('koa-bodyparser');

const app = new koa();
app.use(bodyParser());//在router之前就要注册才能解析post的内容

//log request url:形成日志
app.use(async(ctx,next)=>{
    console.log(`process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

//处理不同的url请求 
router.get('/hello/:name',async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin',async(ctx,next)=>{
    //从request的body中解析出来名字
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password ||'';
        test = ctx.request.body;
    console.log(`sign with name:${name},password: ${password}`);
    console.log(`${test}`);
    if(name==='koa'&& password==='12345'){
        ctx.response.body ='<h1>Welcome,koa!</h1>';
    }
    else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

//添加router中间件
app.use(router.routes());

app.listen(3000);
console.log('Server is listening on 3000');