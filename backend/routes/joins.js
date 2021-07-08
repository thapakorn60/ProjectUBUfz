const express = require('express');
const router = express.Router();
const joinController = require('../controllers/joins')

router.post('/addjoin', joinController.addjoin);
router.get('/getjoin', joinController.getjoin);
router.get('/getidjoin/:id', joinController.getidjoin);
router.get('/getjoinDetail/:postId/:joinerId', joinController.getjoinDetail);
router.delete('/leavejoin/:id', joinController.leavejoin);
// router.delete('/leavejoinhome/:id/:id', joinController.leavejoinhome);
router.put('/acceptjoin/:id', joinController.acceptjoin);
router.delete('/deleteJoinPost/:postId', joinController.deleteJoinPost);
router.get('/getJoinPostId/:postId', joinController.getJoinPostId);

module.exports = router;