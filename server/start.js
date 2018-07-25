const path = require('path'),
  koa = new (require('koa'))(),
  router = require('koa-router')(),
  bodyparser = require('koa-bodyparser'), // 对于 POST 请求，将 koa2 上下文的 formData 数据解析到 ctx.request.body
  logger = require('koa-logger'), // 日志中间件
  koaStatic = require('koa-static'),
  historyApiFallback = require('koa-history-api-fallback'),
  userRoute = require('./routes/users.js'),
  studentRoute = require('./routes/student.js'),
  teacherRoute = require('./routes/teacher.js'),
  courseRoute = require('./routes/course.js'),
  classRoute = require('./routes/class.js'),
  timeRoute = require('./routes/timetable.js'),
  clscoreRoute = require('./routes/clscore.js'),
  scoreRoute = require('./routes/score.js'),
  rewardsRoute = require('./routes/rewards.js');

const cors = require('koa2-cors');
koa.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

koa.use(bodyparser());
koa.use(logger());
koa.use(historyApiFallback());


koa.on('error', function(err, ctx) {
  console.log('server error: ', err);
});

// 静态文件服务 koa-static 规则位于 koa-router 的系列规则之前
koa.use(koaStatic(path.resolve('dist'))); // 将 webpack 打包好的项目目录作为 Koa 静态文件服务的目录

// 挂载到 koa-router 上，同时会让所有的 user 的请求路径前面加上 '/auth' 前缀。
router.use('/auth', userRoute.routes());
router.use('/auth', studentRoute.routes());
router.use('/auth', teacherRoute.routes());
router.use('/auth', rewardsRoute.routes());
router.use('/auth', courseRoute.routes());
router.use('/auth', classRoute.routes());
router.use('/auth', timeRoute.routes());
router.use('/auth', clscoreRoute.routes());
router.use('/auth', scoreRoute.routes());

koa.use(router.routes()); // 将路由规则挂载到Koa上。

koa.listen(9090, () => {
  console.log('Koa is listening on port 9090');
});

module.exports = koa;
