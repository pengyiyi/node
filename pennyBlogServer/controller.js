const fs = require('fs');
const upload = require('./koa-multer');
// add url-route in /controllers:
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);  //mapping[url]就是对应的处理函数
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        //f就是controller目录下的所有的js文件
        let mapping = require(__dirname + '/' + dir + '/' + f);
        //mapping就是引入的模块
        addMapping(router, mapping);
    });
}


module.exports = function (dir){
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    router.post('/upload', upload.single('myImg'), async (ctx, next) => {  
        console.log('register URL mapping: POST /upload')
        const filename = `http://localhost:3000/imgs/${ctx.req.file.filename}`;
        ctx.body ={
            newPath:filename
        }
      });
    router.redirect('/','/index.html');
    addControllers(router, controllers_dir);
    return router.routes();  //注册路由
};