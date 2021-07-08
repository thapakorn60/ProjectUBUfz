const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notifications');

router.post('/addNotification', notificationController.addNotification);
router.get('/getAllNotification', notificationController.getAllNotification);
router.get('/getidNoti/:id', notificationController.getidNoti);
router.put('/read/:id', notificationController.read);
router.delete('/deleteNoti/:id', notificationController.deleteNoti);

module.exports = router;