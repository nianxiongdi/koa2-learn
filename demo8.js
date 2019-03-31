
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

const app = new Koa()
const router = new Router()

/**
 * 路由级中间件  匹配到news路由以后继续向下匹配路由
 * 
 * 
 * 这个第一个中间件01
 * 新闻页面02
 * 打印url->03
 * /news
 * 
 * 
 * 
 * 执行过程 http://localhost:8000/news  => console.log('这个第一个中间件01'); ==>执行 await next() ==>寻找对应的路由 ==>console.log('新闻页面02')
 * 再返回到 app.use  接着执行下面的代码  ==> console.log('打印url->03'); ...
 * 
 * 洋葱模式
 * 
 * 
 * 
**/


app.use(async (ctx, next)=>{
    
    console.log('这个第一个中间件01');

    next();

    if(ctx.status === 404) {
        ctx.status = 404;
        ctx.body = 'this is 404 page';
    }else {
        console.log('打印url->03');
        console.log(ctx.url)
    }

})
 
//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
})

// http://localhost:8000/news
router.get('/news', async (ctx) =>{
   console.log('新闻页面02')
    
   ctx.body = '新闻'
   
})


 
app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);