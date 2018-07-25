const theDatabase = require('../config/db.js').theDb;
const rewardSchema = theDatabase.import('../schema/reward.js');

const getRewardsList = async (searchVal) => {
  return await rewardSchema.findAndCount(
    {
      where: {
        name: {
          $like: '%' + searchVal + '%'
        }
      },
      order: 'id desc' // 根据 id 倒序
    }
  );
}

// 根据文件编号 info_id 查找数据
const getRewardDetails = async (info_id) => {
  return await rewardSchema.findById(info_id);
}

const getRewardsByStuID = async (info_stu_id) => {
  return await rewardSchema.findAndCount(
    {
      where:{
        info_stu_id
      },
      order:'info_id desc'
    }
  )
}
//add
const addReward = async (info_id,info_stu_id,info_name,info_content) => {
  await rewardSchema.create({
    info_id,
    info_stu_id,
    info_name,
    info_content
  });
  return true;
};
//delete
const removeReward = async (id) => {
  await rewardSchema.destroy({
    where: {
      info_id:id
    }
  });
  return true;
}
const getRewards = async function() {
  return await rewardSchema.findAndCount();
}
module.exports = {
  getRewardsList,
  getRewardDetails,
  addReward,
  // updateGoods,
  removeReward,
  getRewardsByStuID,
  getRewards
}
