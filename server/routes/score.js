const scoreController = require('../controllers/score.js');
const router = require('koa-router')();

router.post('/score/teaScore', scoreController.getScore1)
router.post('/score/stuScore', scoreController.getScore)
router.post('/score/update', scoreController.updateScore)

module.exports = router;
