
const koa = require('koa')
const router = require('koa-router')(); // 引入和实例化路由


const app = new koa()
 


router.get('/', (ctx, next)=>{
    ctx.body = 'Hello koa'
})

router.get('/news', (ctx, next)=>{
    ctx.body = 'news page' 
})

app.use(router.routes());
app.use(router.allowedMethods());  // 使用在router.routes()之后，所有的路由中间件最后调用，此时根据ctx.status设置response的响应头



//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);