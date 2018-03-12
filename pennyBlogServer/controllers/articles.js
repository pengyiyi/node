//处理 文章详情
const Container = require('../sequelize/sequelize');
const HyperDown = require('hyperdown');

//编辑文章返回的是markdown文法
var fn_Markdown_article = async (ctx, next) => {
    //console.log("处理到了的");
    var id = ctx.request.query.id;     //query是内置的可以处理的通过console找到的
    console.log(id);
    //用id对数据库进行查询
    var result = await Container.getArticleDetails(id);
        console.log(result[0]);
        ctx.response.body ={"data":result[0]}; 
};
//处理markdown文法返回html的内容
var fn_Html_article = async (ctx, next) => {
    var id = ctx.request.query.id;     //query是内置的可以处理的通过console找到的
    console.log(id);
    //用id对数据库进行查询
    var result = await Container.getArticleDetails(id);
        //console.log(result[0]);
    var parser = new HyperDown,
        html = parser.makeHtml(result[0].content);
   // console.log(html);
       ctx.response.body ={"data":html}; 
};
module.exports = {
    'GET /article': fn_Markdown_article,
    'GET /articleHtml':fn_Html_article
};