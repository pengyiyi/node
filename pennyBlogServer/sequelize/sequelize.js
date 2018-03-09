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
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
    });

var now = Date.now();

//新增记录
var add = function(Upload){
    Info.create({
        id: 'd-' + now,
        name: Upload.name,
        desc:Upload.desc,
        content:Upload.content,
        createdAt: now,
        updatedAt: now,
        version: 0
    });
}
//查询记录

//删除记录(把文章删掉，先进行查询－－－前台无反馈动作)

//修改记录(找到文章，仍先进行查询－－－－查询到的content需要以为json形式发送回前端)

module.exports = add;