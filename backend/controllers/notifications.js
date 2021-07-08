const Notifications = require('../models/notifications');

exports.addNotification = async(req, res, next) => {
    const data = req.body;
    const notification = new Notifications({
        postId: req.body.postId,
        postName: req.body.postName,
        ownerName: req.body.ownerName,
        ownerId: req.body.ownerId,
        joinerName: req.body.joinerName,
        joinerId: req.body.joinerId,
        status: req.body.status,
        datetime: req.body.datetime,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        place: req.body.place,
        type: req.body.type,
        press: req.body.press,
        inject: req.body.inject,
        description: req.body.description,
        read: req.body.read
    })
    console.log(notification);
    notification.save(notification).then(data => {
        res.send("Created notification")
    }).catch(err => {
        res.send(err)
    })
};

exports.read = (req, res, next) => {
    const id = req.params.id;
    if (!req.body) {
        res.send("Not found data")
    }
    const notification = {
        // _id: req.params.id,
        postId: req.body.postId,
        postName: req.body.postName,
        ownerName: req.body.ownerName,
        ownerId: req.body.ownerId,
        joinerName: req.body.joinerName,
        joinerId: req.body.joinerId,
        status: req.body.status,
        datetime: req.body.datetime,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        place: req.body.place,
        type: req.body.type,
        press: req.body.press,
        inject: req.body.inject,
        description: req.body.description,
        read: req.body.read
    }
    console.log(notification);

    Notifications.findByIdAndUpdate(id, notification, { useFindAndModify: false }).then((data) => {
        res.json(data)
        console.log(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
};

exports.getidNoti = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    if (!req.body) {
        res.send("Not found data")
    }
    Notifications.findById(id).then(data => {
        console.log(data)
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })

};


exports.getAllNotification = (req, res, next) => {
    const index = { 'createdAt': -1 };
    Notifications.find({}).sort(index).then((data) => {
        res.status(201).json({
            response: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
};

exports.deleteNoti = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Notifications.findByIdAndRemove(id).then(() => {
        res.status(200).send("Leave success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};