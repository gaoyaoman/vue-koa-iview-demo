const userModel = require('../models/users.js');
const studentModel = require('../models/student.js');
const teacherModel = require('../models/teacher.js');
const classModel = require('../models/class.js');
const jwt = require('koa-jwt');
const bcrypt = require('bcryptjs');

const getClsList = async function() {
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  const id = this.request.body.tea_id;
  if(id===""){
    let res =await classModel.getClsListAll();
    let list = res.rows;
    let start = pageSize * (currentPage - 1);
    list = list.slice(start, start + pageSize);
    this.body = {
      success: true,
      list,
      total: res.count,
      msg: '获取班级信息成功！'
    }
  }
  else{
    const res = await teacherModel.getTea(id);
      let cls = res.rows[0].tea_class;
      let results = await classModel.getClsList(cls);
      let list = results.rows;
      let start = pageSize * (currentPage - 1);
      list = list.slice(start, start + pageSize);
      this.body = {
        success: true,
        list,
        total: results.count,
        msg: '获取班级信息成功！',
      }
    }
}

module.exports = {
  getClsList
}
