
const koa = require('koa')
const app = new koa()


//express 自带路由
//koa需要自己配置  就是中间件



//express 写法
// app.use((req, res) => {
//     res.send('返回数据');
// })


//中间件
app.use(async (ctx) => {
    ctx.body = 'hello world';
})

app.listen(8000);