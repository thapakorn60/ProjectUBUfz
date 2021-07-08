const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments')

router.post('/addcomment', commentController.addcomment);
router.get('/getcomment', commentController.getcomment);
// router.put('/editcomment/:id', commentController.editcomment);
router.delete('/deletecomment/:id', commentController.deletecomment);


module.exports = router;