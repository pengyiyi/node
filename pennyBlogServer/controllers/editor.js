var Container = require('../sequelize/sequelize');

//markdown上传过来的html
var fn_editor = async(ctx,next)=>{
    var name = ctx.request.body.title;
    var desc = ctx.request.body.description;
    var content= ctx.request.body.content ||'error';
   //新增数据
    await Container.add({"name":name,"desc":desc,"content":content});
    ctx.response.body ={"status":"success"}; 
   
};
var fn_reEditor =  async(ctx,next) =>{
    var name = ctx.request.body.title;
    var desc = ctx.request.body.description;
    var content = ctx.request.body.content || 'error';
    var id = ctx.request.body.id;
    //console.log(id);
    var query = await Container.getArticleDetails(id);
    var result = query[0];
    result.name = name;
    result.desc = desc;
    result.content = content;
    result.updatedAt = Container.time();
    result.version ++;
    await result.save();
    ctx.response.body ={"status":"success"}; 
}

module.exports ={
    'POST /editor':fn_editor,
    'POST /reEditor':fn_reEditor
    
}