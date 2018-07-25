const userModel = require('../models/users.js');
const studentModel = require('../models/student.js');
const teacherModel = require('../models/teacher.js');
const jwt = require('koa-jwt');
const bcrypt = require('bcryptjs');

const postUserAuth = async function() {
  const data = this.request.body; // 用 post 传过来的数据存放于 request.body
  const userInfo = await userModel.getUserById(data.user_id);

  if (userInfo != null) { // 如果查无此用户会返回 null
    if (userInfo.user_password != data.password) {
        if (!bcrypt.compareSync(data.password, userInfo.user_password)) {
        this.body = { // 返回给前端的数据
          success: false,
          info: '密码错误！'
        }
      }
    } else { // 密码正确
      const userToken = {
        id: userInfo.user_id,
        name: userInfo.user_name,
        role:userInfo.user_role,
        originExp: Date.now() + 60 * 60 * 2000, // 设置过期时间（毫秒）为 2 小时
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断 token 合法性的标志
      const token = jwt.sign(userToken, secret); // 签发 token
      this.body = {
        success: true,
        token: token
      }
    }
  } else {
    this.body = {
      success: false,
      info: '请输入正确的学号或工号！',
      messages:{
        userInfo:userInfo,
        data:data
      }
    }
  }
}

const getUserInfo = async function() {
  const id = this.params.user_id; // 获取 url 里传过来的参数里的 id
  const result = await userModel.getUserById(id);

  if (result) {
    this.body = {
      success: true,
      list: [result],
      msg: '获取用户成功！'
    }
  } else {
    this.body = {
      success: false,
      list: [],
      msg: '用户不存在！'
    }
  }
}

const getUserList = async function() {
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  const result = await userModel.getUserList();
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  for(var i=0;i<list.length;i++){
    if(list[i].user_name=='admin'){
      list.splice(i,1);
    }
  }
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取用户列表成功！'
  }
}
//修改users表的密码字段
const updatePass =async function(){
    const data = this.request.body;
    const userInfo = await userModel.getUserById(data.user_id);
    if(data.user_id&&userInfo){
        if(data.oldPass!==userInfo.user_password){
            this.body = {
                success: false,
                info: '原始密码输入错误！'
            }
        }else{
            await userModel.updatePass(data.user_id,data.newPass);
            this.body = {
                success: true,
                info: '修改成功！'
            }
        }
    }
}
//修改user_id 的user_role
const updateRole =async function(){
  const data = this.request.body;
  const userInfo = await userModel.updateRole(data.user_id,data.user_role);
  if(data.user_id&&userInfo){
    this.body = {
      success: true,
      info: `权值已修改成功。`
    }
  }else{
    this.body = {
      success: false,
      info: `权值修改失败。`
    }
  }
}
//删除user_id 的用户以及相应的其他表中的信息
const delUser =async function(){
  const data = this.request.body;
  const userInfo = await userModel.delUser(data.user_id);
  const stuInfo = await studentModel.delStudent(data.user_id);
  const teaInfo = await teacherModel.delTeacher(data.user_id);
  if(userInfo&&stuInfo&&teaInfo){
    this.body = {
      success: true,
      info: `删除成功。`
    }
  }else{
    this.body = {
      success: false,
      info: `删除失败。`
    }
  }
}
//add
const addUser = async function(){

}
module.exports = {
  postUserAuth,
  getUserInfo,
  getUserList,
  updatePass,
  updateRole,
  delUser,
  addUser
}
