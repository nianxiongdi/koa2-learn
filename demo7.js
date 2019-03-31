
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

const app = new Koa()
const router = new Router()

/**
 * 路由级中间件  匹配到news路由以后继续向下匹配路由
 * 
 * 例如 两个同样的router 如下
 * 
 * http://localhost:8000/news
 * 
 *  this is news page. 
 **/


//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
})

// http://localhost:8000/news
router.get('/news', async (ctx, next) =>{
   console.log('this is news page.')

   await next()
})


router.get('/news', async (ctx) =>{
    ctx.body = ' this is news page. '
})

 


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);