const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts')

router.get('/getpost', postController.getpost);
router.get('/getallpost', postController.getallpost);
router.get('/getidpost/:id', postController.getidpost);
router.post('/addpost', postController.addpost);
router.put('/editpost/:id', postController.editpost);
router.delete('/deletepost/:id', postController.deletepost);


module.exports = router;