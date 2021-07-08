const express = require('express');
const router = express.Router();
const historiesController = require('../controllers/histories');

router.post('/addHistory', historiesController.addHistory);
router.get('/getAllHistory', historiesController.getAllHistory);
router.delete('/deleteHistory/:id', historiesController.deleteHistory);

module.exports = router;