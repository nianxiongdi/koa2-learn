
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
}).get('/newscontent', async (ctx) =>{
    // 从ctx中读取get传值
    /*
        通过request接收，但是接收的方法有两种query和querystring
        query： 返回的格式化好的参数对象
        querystring： 返回的是请求字符串
    */

    //访问  http://localhost:8000/newscontent?username=123&password=123
    console.log(ctx.query) //  { username: '123', password: '123' } 获取的是对象 用的最多的方式

    console.log(ctx.querystring) //  username=123&password=123  是一个字符串

    console.log(cts.url) // /newscontent?username=123&password=123

    // 从ctx里面的request里面获取get传值
    // console.log(ctx.request)
    /*
    { method: 'GET',
    url: '/newscontent?username=123&password=123',
    header:
   { host: 
     connection:  
     'upgrade-insecure-requests': 
     'user-agent':
      accept:
     'accept-encoding': 
     'accept-language':  
      cookie:
      ....
    */

    console.log(ctx.request.query) //{ username: '123', password: '123' }
    console.log(ctx.request.querystring) //  username=123&password=123  是一个字符串
    console.log(cts.request.url) // /newscontent?username=123&password=123

})


app
  .use(router.routes()) //启动路由
  .use(router.allowedMethods());

//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);