const teacherModel = require('../models/teacher.js');
const userModel = require('../models/users.js');


const postTeaInfo = async function() {
  const data = this.request.body; // 用 post 传过来的数据存放于 request.body
  const teaInfo = await teacherModel.getTeaById(data.id);

  if (teaInfo != null) { // 如果查无此用户会返回 null
    this.body = {
      success: true,
      data: teaInfo
    }
  } else {
    this.body = {
      success: false,
      data:teaInfo,
      info: '暂无此用户'
    }
  }
}

//修改teacher表的tel字段
const updateTel =async function(){
  const data = this.request.body;
  const teaInfo = await teacherModel.getTeaById(data.id);
  if(data.id&&teaInfo){
    await teacherModel.updateTel(data.id,data.tel);
    this.body = {
      success: true,
      info: '手机号码修改成功！'
    }
  }
}
//update teacher's information
const updateInfo =async function(){
  const data = this.request.body;
  await teacherModel.updateInfo(data.tea_id,data.tea_gender,data.tea_tel,data.tea_class,data.tea_college,data.tea_major);
  this.body = {
    success: true,
    info: '教职工信息更新成功！'
  }
}
//fetch teacher's information with tea_id
const getTeaList = async function() {
  const result = await teacherModel.getTeaList();
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取教职工列表成功！'
  }
}
//add
const addTeacher = async function() {
  const data = this.request.body;
  let tea = await teacherModel.addTeacher(data.tea_id,data.tea_name,data.tea_gender,data.tea_tel,data.tea_class,data.tea_college,data.tea_major);
  let user = await userModel.addUser(data.tea_id,data.tea_name,data.tea_id,1);
  if(tea&&user){
    this.body = {
      success: true,
      info:'教职工信息添加成功！'
    }
  }else{
    this.body = {
      success: false,
      info:'教职工信息添加失败！'
    }
  }
}
//delete a teacher's information with tea_id
const delTeacher = async function(){
  const data = this.request.body;
  let res = await teacherModel.delTeacher(data.tea_id);
  let res1= await userModel.delUser(data.tea_id);
  if(res){
    this.body={
      success:true,
      info:'教职工信息删除成功！'
    }
  }else{
    this.body={
      success:false,
      info:'教职工信息删除失败。'
    }
  }
}
module.exports = {
  postTeaInfo,
  getTeaList,
  updateTel,
  addTeacher,
  updateInfo,
  delTeacher
}
