const studentController = require('../controllers/student.js');
const router = require('koa-router')();

router.post('/student', studentController.postStuInfo)
router.post('/student/delStudent', studentController.delStudent)
router.post('/student/add', studentController.addStudent)
router.post('/student/update', studentController.updateInfo)
router.post('/student/updateTel',studentController.updateTel)
router.post('/student/list', studentController.getStuList)
router.post('/student/getStudentsByCls', studentController.getStuListByCls)

module.exports = router;
