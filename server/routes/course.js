const courseController = require('../controllers/course.js');
const router = require('koa-router')();

router.post('/course/add', courseController.addCourse)
router.post('/course/del', courseController.delCourse)
router.post('/course/search', courseController.getCorList)

module.exports = router;
