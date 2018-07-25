const userModel = require('../models/users.js');
const studentModel = require('../models/student.js');
// const teacherModel = require('../models/teacher.js');

const postStuInfo = async function() {
    const data = this.request.body; // 用 post 传过来的数据存放于 request.body
    const stuInfo = await studentModel.getStuById(data.id);

    if (stuInfo != null) { // 如果查无此用户会返回 null
        this.body = {
                success: true,
                data: stuInfo
            }
    } else {
        this.body = {
            success: false,
            data:stuInfo,
            info: '暂无此用户'
        }
    }
}

//修改student表的tel字段
const updateTel =async function(){
    const data = this.request.body;
    const userInfo = await studentModel.getStuById(data.id);
    if(data.id&&userInfo){
        await studentModel.updateTel(data.id,data.tel);
        this.body = {
            success: true,
            info: '手机号码修改成功！'
        }
    }
}

const getStuList = async function() {
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  const result = await studentModel.getStuList();
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取学生列表成功！'
  }
}

const getStuListByCls = async function() {
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  const data = this.request.body;
  const result = await studentModel.getStuListCls(data.stu_class);
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取学生列表成功！'
  }
}
//删除stu_id 的用户以及相应的其他表中的信息
const delStudent =async function(){
  const data = this.request.body;
  const userInfo = await userModel.delUser(data.stu_id);
  const stuInfo = await studentModel.delStudent(data.stu_id);
  if(userInfo&&stuInfo){
    this.body = {
      success: true,
      info: `学生信息删除成功。`
    }
  }else{
    this.body = {
      success: false,
      info: `学生信息删除失败。`
    }
  }
}
//add a student
const addStudent = async function() {
  const data = this.request.body;
  let stu = await studentModel.addStudent(data.stu_id,data.stu_name,data.stu_gender,data.stu_birth,data.stu_grade,data.stu_class,data.stu_address,data.stu_tel,data.stu_college,data.stu_major);
  let user = await userModel.addUser(data.stu_id,data.stu_name,data.stu_id,2);
  if(stu&&user){
    this.body = {
      success: true,
      info:'学生信息添加成功！'
    }
  }else{
    this.body = {
      success: false,
      info:'学生信息添加失败！'
    }
  }
}

//update student's information
const updateInfo =async function(){
  const data = this.request.body;
  await studentModel.updateInfo(data.stu_id, data.stu_gender, data.stu_grade, data.stu_class, data.stu_address, data.stu_tel, data.stu_college, data.stu_major);
  this.body = {
    success: true,
    info: '学生信息更新成功！'
  }
}

module.exports = {
  postStuInfo,
  getStuList,
  updateTel,
  delStudent,
  addStudent,
  updateInfo,
  getStuListByCls
}
