const Histories = require('../models/histories');

exports.addHistory = async(req, res, next) => {
    const data = req.body;
    const history = new Histories({
        postId: req.body.postId,
        postName: req.body.postName,
        ownerName: req.body.ownerName,
        ownerId: req.body.ownerId,
        joinerName: req.body.joinerName,
        joinerId: req.body.joinerId,
        // status: req.body.status,
        datetime: req.body.datetime,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        place: req.body.place,
        type: req.body.type,
    })
    console.log(history);
    history.save(history).then(data => {
        res.send("Created history")
    }).catch(err => {
        res.send(err)
    })
};

exports.getAllHistory = (req, res, next) => {
    const index = { 'createdAt': -1 };
    Histories.find({}).sort(index).then((data) => {
        res.status(201).json({
            response: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
};

exports.deleteHistory = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Histories.findByIdAndRemove(id).then(() => {
        res.status(200).send("Delete success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};