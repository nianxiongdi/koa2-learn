
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

//实例化
const app = new Koa()
const router = new Router()

/**
 * 动态路由
 */

//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
}).get('/news', async (ctx) =>{
    ctx.body = 'thia is news page.'
})

// 一个
router.get('/newscontent/:aid', async (ctx) =>{
    
    //http://localhost:8000/newscontent/123
    console.log(ctx.params) //{ aid: '123' }

})

//多个
router.get('/newscontent/:aid/:name', async (ctx) =>{
    
    //http://localhost:8000/newscontent/123
    console.log(ctx.params) //{ aid: '123', name: 'zhang' }

})


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);