const rewardModel = require('../models/rewards.js');

const getRewardsByStuID = async function() {
  const data = this.request.body; // post 请求，参数在 request.body 里
  const currentPage = Number(data.currentPage);
  const pageSize = Number(data.pageSize);
  const info_stu_id=data.stu_id;
  const result = await rewardModel.getRewardsByStuID(info_stu_id);

  let list = result.rows;

  // 根据分页输出数据
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);

  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取奖惩信息列表成功！'
  }
}

const getRewardDetails = async function() {
  const info_id = this.params.info_id;
  const list = await rewardModel.getRewardDetails(info_id);

  this.body = {
    success: true,
    list: Array.isArray(list) ? list : [list],
    msg: '获取奖惩信息成功！'
  };
}

// const manageGoods = async function() {
//   const data = this.request.body;
//   const id = data.id;
//   const name = data.name;
//   const description = data.description;
//   const imgUrl = data.imgUrl;
//
//   let success = false;
//   let msg = '';
//
//   if (id) {
//     if (name) {
//       await goodsModel.updateGoods( name, description, imgUrl);
//       success = true;
//       msg = '修改成功！';
//     }
//   } else if (name) {
//     await goodsModel.addGoods(name, description, imgUrl);
//     success = true;
//     msg = '添加成功！';
//   }
//
//   this.body = {
//     success,
//     msg
//   }
// }

const removeReward = async function() {
  const info_id = this.params.info_id;

  await rewardModel.removeReward(info_id);

  this.body = {
    success: true,
    msg: '删除成功！'
  }
}

//add
const addReward = async function() {
  const data = this.request.body;
  let res = rewardModel.addReward(data.info_id,data.info_stu_id,data.info_name,data.info_content);
  if(res){
    this.body = {
      success: true,
      info:'发布成功！'
    }
  }else{
    this.body = {
      success: false,
      info:'添加失败！'
    }
  }
}
//fetch
const getRewards = async function() {
  const data = this.request.body; // post 请求，参数在 request.body 里
  const currentPage = Number(data.currentPage);
  const pageSize = Number(data.pageSize);
  const result = await rewardModel.getRewards();
  let list = result.rows;
  // 根据分页输出数据
  let start = pageSize * (currentPage - 1);
  list = list.slice(start, start + pageSize);
  this.body = {
    success: true,
    list,
    total: result.count,
    msg: '获取奖惩信息列表成功！'
  }
}
//delete
const delReward = async function(){
  const data = this.request.body;
  let res = await rewardModel.removeReward(data.info_id);
  if(res){
    this.body={
      success:true,
      info:'删除成功！'
    }
  }else{
    this.body={
      success:false,
      info:'删除失败。'
    }
  }
}

module.exports = {
  removeReward,
  getRewardDetails,
  getRewardsByStuID,
  addReward,
  getRewards,
  delReward
}
