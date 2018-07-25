const timeModel = require('../models/timetable.js');



//fetch teacher's information with tea_id
const getTimetable = async function() {
  const id = this.request.body.id;
  const term = this.request.body.term;
  const result = await timeModel.getTimetable(id,term);
  if(result){
    let list = result.rows;
    this.body = {
      success: true,
      list,
      msg: '获取课程表成功！'
    }
  }else{
    this.body = {
      success: false,
      msg: '暂无课程表。'
    }
  }
}
module.exports = {
  getTimetable
}
