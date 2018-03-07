const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body
app.use(bodyParser());

//add controllers,注册所有的url模块
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');