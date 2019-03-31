
const Koa = require('koa')
const Router = require('koa-router'); // 注意引入方式

//实例化
const app = new Koa()
const router = new Router()



//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
}).get('/news', async (ctx) =>{
    ctx.body = 'thia is news page.'
})


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());   // 使用在router.routes()之后，所有的路由中间件最后调用，此时根据ctx.status设置response的响应头


//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';  //显示在浏览器中
})

app.listen(8000);