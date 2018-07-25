const theDatabase = require('../config/db.js').theDb;
const studentSchema = theDatabase.import('../schema/student.js');

// 通过表（student）中用户stu_id查找
const getStuById = async function(id) {
    const studentInfo = await studentSchema.findOne({
        where: {
            stu_id: id
        }
    });
    return studentInfo
};

//根据id修改tel
const updateTel = async (id, tel) => {
    await studentSchema.update(
        {
            stu_tel:tel
        },
        {
            where: {
                stu_id: id
            }
        }
    );
    return true;
};
//删除学号为stu_id的学生信息
const delStudent = async (stu_id) => {
  await studentSchema.destroy({
    where: {
      stu_id
    }
  });
  return true;
};
//查询表（users）中所有用户信息
const getStuList = async function() {
    return await studentSchema.findAndCount(); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
};
const getStuListCls = async function(stu_class) {
  return await studentSchema.findAndCount({
    where:{
      stu_class
    }
  }); // findAndCount() 用 get 路由访问，会得到 204 状态：无数据返回。改用 post 就行
};
//add a student
const addStudent = async (stu_id,stu_name,stu_gender,stu_birth,stu_grade,stu_class,stu_address,stu_tel,stu_college,stu_major) => {
  await studentSchema.create({
    stu_id,
    stu_name,
    stu_gender,
    stu_birth,
    stu_grade,
    stu_class,
    stu_address,
    stu_tel,
    stu_college,
    stu_major
  });
  return true;
};
//update student's information by stu_id
const updateInfo = async (stu_id, stu_gender, stu_grade, stu_class, stu_address, stu_tel, stu_college, stu_major) => {
  await studentSchema.update(
    {
      stu_gender,
      stu_grade,
      stu_class,
      stu_address,
      stu_tel,
      stu_college,
      stu_major
    },
    {
      where: {
        stu_id
      }
    }
  );
  return true;
}

module.exports = {
  getStuById,
  getStuList,
  updateTel,
  delStudent,
  addStudent,
  updateInfo,
  getStuListCls
};
