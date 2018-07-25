const classController = require('../controllers/class.js');
const router = require('koa-router')();

router.post('/class/search', classController.getClsList)

module.exports = router;
