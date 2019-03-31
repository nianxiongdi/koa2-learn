

koa2.x的学习


# 安装和搭建

## 安装
```

    ## 初始化package.json 初始化pa 
    npm init

    # 安装koa2 
    npm install koa
```

## 搭建
```

// 由于koa2是基于async/await操作中间件，目前node.js 7.x的harmony模式下才能使用，所以启动的时的脚本如下：


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

```

访问： http:localhost:8000  即可出现hello world

# es6基础
* let 块级作用域
* const 是常量
* 模板字符串  console.log(`${name}的年龄${age}`); 大话西游2的年龄15
* 属性的简写 let name="123" let app ={ name: name  } ==>简写  let name="123" let app ={  name  }
* 方法的简写 
* 箭头函数  箭头指向上下文
* promise async await


# Router
router是由一个URI和一个特定的HTTP方法(get,post)等组成，涉及到应用如何响应客户端对某个网站节点的访问。
通俗的说根据不同的URL加载不同的页面

express中自带路由， koa2中需要自己安装: npm install koa-router

## koa-router

[详情链接](https://www.npmjs.com/package/koa-router)

例子1：
```
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


```


## 从ctx中读取get传值
 
    通过request接收，但是接收的方法有两种query和querystring
    query： 返回的格式化好的参数对象
    querystring： 返回的是请求字符串

    //访问  http://localhost:8000/newscontent?username=123&password=123
        方式1：
            console.log(ctx.query) //  { username: '123', password: '123' } 获取的是对象 用的最多的方式
            console.log(ctx.querystring) //  username=123&password=123  是一个字符串
            console.log(cts.url) // /newscontent?username=123&password=123
        方式2：
            console.log(ctx.request.query) //{ username: '123', password: '123' }
            console.log(ctx.request.querystring) //  username=123&password=123  是一个字符串
            console.log(cts.request.url) // /newscontent?username=123&password=123

 
 ```

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


 ```

 ## 动态路由的使用并获取参数

```
当url为//http://localhost:8000/newscontent/123，对应的代码为
router.get('/newscontent/:aid', async (ctx) =>{
    console.log(ctx.params) //{ aid: '123' }

})
通过params获取参数
```

例子：
```

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


```



# 中间件
就是`匹配路由之前`或`匹配路由完成做的一系列的操作`。

中间件的功能：
* 执行任何代码
* 修改请求和响应对象
* 终结请求-响应循环
* 调用堆栈中下一个中间件

koa应用如下几种中间件：
* 应用级中间件
* 路由级中间件
* 错误处理中间件
* 第三方中间件

# 应用级中间件
匹配路由`之前`做的操作
如果不写next， 这个路由被匹配到了就不会继续了
next() 当前路由匹配完成以后继续向下匹配
app.use(async (ctx)=>{})  //匹配任意路由的中间件，且在路由函数之前执行

```

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


```

## 路由级中间件  
匹配到news路由以后继续向下匹配路由

```

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
```
 
* 错误处理中间件

这里说下use与router的顺序问题，
```

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

    await next();

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
router.get('/news', async (ctx, next) =>{
   console.log('新闻页面02')

   await next();
   
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
```

执行的流程
```

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
 * 执行过程 http://localhost:8000/news  
 *              这个第一个中间件01
                这个第二个中间件02
                匹配news路由03
                返回到这里03
                返回到这里04
 * 洋葱模式
**/

app.use(async (ctx, next)=>{
    
    console.log('这个第一个中间件01');
    next();
    console.log('返回到这里04');
})
 

app.use(async (ctx, next)=>{
    
    console.log('这个第二个中间件02');
    next();
    console.log('返回到这里03');
})


//配置路由
// ctx 上下文  包含request和response等信息
router.get('/', async (ctx)=> {
    
    ctx.body = '首页'  /*返回数据 相当于 res.writeHead() res.end() */
})

// http://localhost:8000/news
router.get('/news', async (ctx) =>{
   console.log('匹配news路由03  ')
    
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


```


ejs模板引擎

官网文档: https://www.npmjs.com/package/koa-views
1. 安装： npm install koa-views
      npm install ejs
2. 引入 koa-views 配置中间件
    方式1：

        const views = require('koa-views');
        app.use(views('views', { map: {html: 'ejs' }})); // //这样配置也可以  注意如果这样配置的话 模板的后缀名是.html
    方式2：
        app.use(views('views',{
            extension:'ejs'  /*应用ejs模板引擎*/
        }))
3. 使用：
    router.get('/add',async (ctx)=>{
        let title = 'hello koa2'
        await ctx.render(index',{
        title
        })
    })

4、Ejs 引入模板

    <%- include header.ejs %>

5、Ejs 绑定数据
```
<%=h%>
```

6、Ejs 绑定 html 数据
```
<%-h%>
```

7、Ejs 模板判断语句
```
    <% if(true){ %>
    <div>true</div>
    <%} else{ %>
    <div>false</div>
    <%} %>
```

8、Ejs 模板中循环数据
```
    <%for(var i=0;i<list.length;i++) { %><li><%=list[i] %></li>
    <%}%>
```

9. 公共数据

注意：我们需要在每一个路由的render里面都要渲染一个公共的数据

    公共的数据放在这个里面，这样的话在模板的任何地方都可以使用
```
//写一个中间件配置公共的信息
app.use(async (ctx,next)=>{

    ctx.state.userinfo='张三';

    await next();/*继续向下匹配路由*/
})
```