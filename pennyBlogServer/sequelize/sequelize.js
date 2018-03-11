const Sequelize = require('sequelize');

const config = require('./config');

console.log('init sequelize...');

//创建对象实例
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//建立映射关系
var Info = sequelize.define('info', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    desc: Sequelize.STRING(200),
    content:Sequelize.STRING(2000),
    createdAt: Sequelize.STRING(100),
    updatedAt: Sequelize.STRING(100),
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });
function getNowTime(){
    var now = Date.now();
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth()+1 <10 ?'0'+(nowDate.getMonth() + 1)
    : nowDate.getMonth() + 1;
    var day = nowDate.getDate() <10? '0'+ nowDate.getDate() : nowDate
    .getDate();
    var dateStr = year +'-'+month +'-'+day;
    return dateStr;
}
 
//新增记录
var add = function(Upload){
    Info.create({
        id: 'd-' + now,
        name: Upload.name,
        desc:Upload.desc,
        content:Upload.content,
        createdAt: getNowTime,
        updatedAt: getNowTime,
        version: 0
    });
}
//查询所有的url
var getAllUrls = function(){
    return Info.findAll();
}
//点击之后查找到对应的文章返回
var articleDetails = function(id){
    return Info.findAll({
        where:{
            id:id
        }
    })
}


//删除记录(把文章删掉，先进行查询－－－前台无反馈动作)


module.exports = {
    add:add,
    getAllUrls:getAllUrls,
    getArticleDetails:articleDetails,
    time:getNowTime
}