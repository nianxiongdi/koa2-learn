
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

const app = new Koa()
const router = new Router()

/*
// 匹配任何路由  
app.use(async (ctx) =>{
   
})

*/

// 匹配路由之前打印日期
//http://localhost:8000/xxx
//http://localhost:8000/
app.use(async (ctx, next) =>{
    console.log(new Date())
    await next()
})


//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
})

router.get('/news', async (ctx) =>{
    ctx.body = 'thia is news page.'
})
router.get('/news1', async (ctx) =>{
    ctx.body = 'thia is news page.'
})
 


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);