const scoreModel = require('../models/score.js');
const courseModel = require('../models/course.js');

const updateScore =async function(){
  const data = this.request.body;
  const res = await scoreModel.updateScore(data.sco_score,data.sco_name,data.sco_class,data.term,data.sco_stu_id)
  if(res){
    this.body = {
      success: true,
      info: '分数更新成功'
    }
  }else{
    this.body = {
      success: false,
      info: '分数更新失败'
    }
  }

}

const getScore1 = async function() {
  const data = this.request.body;
  const result = await scoreModel.getScore1(data.sco_name,data.sco_class,data.term);
  let list = result.rows;
  this.body = {
    success: true,
    list,
    msg: '获取成绩表成功！'
  }
}

const getScore = async function() {
  const data = this.request.body;
  const result = await scoreModel.getScore(data.sco_stu_id,data.term);
  let grade=0;
  if(data.term==='20162'||data.term==='20161'){
    grade=3;
  }else if(data.term==='20152'||data.term==='20151'){
    grade=2;
  }else{
    grade=1;
  }
  const res = await courseModel.getCorStu(grade);
  let list = res.rows;
  let list1 = result.rows;
  this.body = {
    success: true,
    list,
    list1,
    msg: '获取成绩表成功！'
  }
}

module.exports = {
  updateScore,
  getScore1,
  getScore
}
