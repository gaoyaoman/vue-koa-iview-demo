const theDatabase = require('../config/db.js').theDb;
const clscoreSchema = theDatabase.import('../schema/clscore.js');



const getClscore = async function(cs_tea_id,cs_term) {
  return await clscoreSchema.findAndCount({
    where:{
      cs_tea_id,
      cs_term
    }
  });
}

module.exports = {
  getClscore
}
