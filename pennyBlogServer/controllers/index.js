var Container = require('../sequelize/sequelize');

//处理主页的逻辑的函数放在这里
var fn_index = async(ctx,next) =>{
   /*ctx.response.body =`<h1>Index</h1>
    <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="Submit"></p>
  </form>`; */
  ctx.response.body ={
    "data":"hi"
  }

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

//获取所有列表
var fn_AllUrls =  async(ctx,next) =>{
        var result = await Container.getAllUrls();
        console.log(result);
        //var temp =[];
       // for (let p of result) {
       //    temp.push(JSON.stringify(p));
       // }
        ctx.response.body ={"data":result}; 
};


module.exports ={
    'GET /':fn_index,
    'POST /Signin':fn_signin,
    'GET /getAllUrls':fn_AllUrls
}