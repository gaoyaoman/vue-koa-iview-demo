const teacherModel = require('../models/teacher.js');
const userModel = require('../models/users.js');
const clscoreModel = require('../models/clscore.js');

const getClscoreList = async function() {
  const cs_tea_id = this.request.body.cs_tea_id;
  const cs_term = this.request.body.cs_term;
  const result = await clscoreModel.getClscore(cs_tea_id,cs_term);
  const currentPage = this.request.body.currentPage;
  const pageSize = this.request.body.pageSize;
  let list = result.rows;
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取列表成功！'
  }
}

module.exports = {
  getClscoreList
}
