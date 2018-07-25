const userController = require('../controllers/users.js');
const router = require('koa-router')();

router
  .post('/users', userController.postUserAuth)
  .post('/users/delUser', userController.delUser)
  .post('/users/updatePass', userController.updatePass)
  .post('/users/updateRole',userController.updateRole)
  .post('/users/:id', userController.getUserInfo) // 定义 url 的参数 id
  .post('/users/list', userController.getUserList)

module.exports = router;
