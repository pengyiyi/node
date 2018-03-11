const multer = require('koa-multer');

//文件配置上传
var storage = multer.diskStorage({
    //文件的保存路径
    destination:function(req,file,cb){
        cb(null,'public/imgs/');
    },
    //修改文件的名称
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split('.');
        cb(null,Date.now()+'.'+fileFormat[fileFormat.length-1]);
    }
})
//加载配置
var upload  = multer({storage:storage});

//导出对象
module.exports = upload;