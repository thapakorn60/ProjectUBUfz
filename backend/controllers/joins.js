const Joins = require('../models/joins');

exports.addjoin = async(req, res, next) => {
    const data = req.body;
    const join = new Joins({
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
        type: req.body.type

    })
    console.log(join);
    join.save(join).then(data => {
        res.send("Join success")
    }).catch(err => {
        res.send(err)
    })
};

exports.getjoin = (req, res, next) => {
    Joins.find({}).then((data) => {
        res.status(201).json({
            response: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
};

exports.getjoinDetail = (req, res, next) => {
    postId = req.params.postId
    joinerId = req.params.joinerId
    Joins.find({ 'postId': postId, 'joinerId': joinerId }).then((data) => {
        res.json(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.leavejoin = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Joins.findByIdAndRemove(id).then(() => {
        res.status(200).send("Leave success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};

exports.deleteJoinPost = (req, res, next) => {
    const postId = req.params.postId;
    console.log(postId)
    Joins.deleteMany({ 'postId': postId }).then(() => {
        res.status(200).send("Remove all success")
    }).catch(err => {
        res.status(500).send("Server Err")
        console.log(err)
    })
};

exports.getJoinPostId = (req, res, next) => {
    postId = req.params.postId
    Joins.find({ 'postId': postId }).then((data) => {
        // res.json(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.acceptjoin = (req, res, next) => {
    const id = req.params.id;
    if (!req.body) {
        res.send("Not found data")
    }
    const join = {
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
        type: req.body.type
    }
    console.log(join);

    Joins.findByIdAndUpdate(id, join, { useFindAndModify: false }).then((data) => {
        res.json(data)
        console.log(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
};

exports.getidjoin = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    if (!req.body) {
        res.send("Not found data")
    }
    Joins.findById(id).then(data => {
        console.log(data)
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })

};