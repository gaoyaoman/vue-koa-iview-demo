const clscoreController = require('../controllers/clscore.js');
const router = require('koa-router')();

router.post('/clscore/search', clscoreController.getClscoreList)

module.exports = router;
