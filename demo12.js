
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

var views = require('koa-views');


const app = new Koa()
const router = new Router()

/**
 * ejs模板引擎的使用
 * 
 * 1、安装 koa-views
 * 2. 安装 ejs  
 * 
 * 3. var views = require('koa-views');
 * 
 *  app.use(views(__dirname, { extension: 'ejs' }))
 * 4. await ctx.render('index')
 * 
**/

app.use(views('./', { extension: 'ejs' }))
// app.use(async (ctx, next)=>{
    
//     console.log('这个第一个中间件01');
//     next();
//     console.log('返回到这里04');
// })
 

// app.use(async (ctx, next)=>{
    
//     console.log('这个第二个中间件02');
//     next();
//     console.log('返回到这里03');
// })


//配置路由
// ctx 上下文  包含request和response等信息
router.get('/abc', async (ctx)=> {
    
    // ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
    await ctx.render('index', {message: '123'})
})

 
app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);

// 当前目录下的indx.ejs
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ejs</title>
</head>
<body>

<%=message%> <!-- ejs 的模版语法，读取变量 message | 是从 render 传递过来 -->

</body>
</html>


*/
