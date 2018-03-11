//处理 文章详情
const Container = require('../sequelize/sequelize')
var fn_article = async (ctx, next) => {
    //console.log("处理到了的");
    var id = ctx.request.query.id;     //query是内置的可以处理的通过console找到的
    console.log(id);
    //用id对数据库进行处理
    var result = await Container.getArticleDetails(id);
        console.log(result[0]);
        ctx.response.body ={"data":result[0]}; 
};

module.exports = {
    'GET /article': fn_article
};