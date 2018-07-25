const theDatabase = require('../config/db.js').theDb;
const classSchema = theDatabase.import('../schema/class.js');

//查询表所有信息
const getClsListAll = async function() {
  return await classSchema.findAndCount();
};
const getClsList = async function(cls_name) {
  return await classSchema.findAndCount({
    where:{
      cls_name
    }
  });
};

module.exports = {
  getClsListAll,
  getClsList
};
