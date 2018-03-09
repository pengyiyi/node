var test = require('../sequelize/sequelize');


//处理主页的逻辑的函数放在这里
var fn_index = async(ctx,next) =>{
    ctx.response.body =`<h1>Index</h1>
    <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="Submit"></p>
  </form>`;  
};

var fn_signin = async(ctx,next)=>{
    var name = ctx.request.body.name ||'',
        password = ctx.request.body.password ||'';
    console.log(`signin with name: ${name}, password: ${password}`);
    if(name==='koa' && password==='12345'){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    } 
};

var fn_editor = async(ctx,next)=>{
    var content= ctx.request.body.data ||'error';
   // console.log(`edit with: ${content}`);
   //返回给前端内容
    ctx.response.body ={"state":"success"}; 
   //调用数据库处理函数进行数据的更新操作
   (async ()=>{
    var pets = await test({name:"pengyi","desc":"是描述","content":content});
    })();
};


module.exports ={
    'GET /':fn_index,
    'POST /Signin':fn_signin,
    'POST /editor':fn_editor,
}