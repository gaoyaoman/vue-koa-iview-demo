const theDatabase = require('../config/db.js').theDb;
const scoreSchema = theDatabase.import('../schema/score.js');


const updateScore = async (sco_score,sco_name,sco_class,term,sco_stu_id) => {
  await scoreSchema.update(
    {
      sco_score
    },
    {
      where: {
        sco_name,
        sco_class,
        term,
        sco_stu_id
      }
    }
  );
  return true;
};

const getScore1 = async function(sco_name,sco_class,term) {
  return await scoreSchema.findAndCount({
    where:{
      sco_name,
      sco_class,
      term
    }
  });
};
const getScore = async function(sco_stu_id,term) {
  return await scoreSchema.findAndCount({
    where:{
      sco_stu_id,
      term
    }
  });
};

module.exports = {
  updateScore,
  getScore1,
  getScore
};
