const rewardsController = require('../controllers/rewards.js');
const router = require('koa-router')();

router.post('/rewards/getListByStuID', rewardsController.getRewardsByStuID);
router.post('/rewards/add', rewardsController.addReward);
router.post('/rewards/getRewards', rewardsController.getRewards);
router.post('/rewards/delete', rewardsController.delReward);
// router.get('/goods/:id', rewardController.getGoodsDetails);
// router.delete('/goods/:id/', rewardController.removeGoods);
// router.post('/goods/management', rewardController.manageGoods);

module.exports = router;
