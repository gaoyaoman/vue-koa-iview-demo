const theDatabase = require('../config/db.js').theDb;
const timeSchema = theDatabase.import('../schema/timetable.js');

const getTimetable = async function(t_user,t_year) {
  return await timeSchema.findAndCount({
    where:{
      t_user,
      t_year
    }
  });
}

module.exports = {
  getTimetable
}
