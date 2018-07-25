const timeController = require('../controllers/timetable.js');
const router = require('koa-router')();

router.post('/timetable', timeController.getTimetable);

module.exports = router;
