const Comments = require('../models/comments');

exports.addcomment = async(req, res, next) => {
    const data = req.body;
    const comment = new Comments({
        postId: req.body.postId,
        // postName: req.body.postName,
        ownerName: req.body.ownerName,
        ownerId: req.body.ownerId,
        // joinerName: req.body.joinerName,
        // joinerId: req.body.joinerId,
        description: req.body.description
    })
    console.log(comment);
    comment.save(comment).then(data => {
        res.send("comment success")
    }).catch(err => {
        res.send(err)
    })
};

exports.getcomment = (req, res, next) => {
    Comments.find({}).then((data) => {
        res.status(201).json({
            response: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
};

// exports.getcommentDetail = (req, res, next) => {
//     postId = req.params.postId
//     joinerId = req.params.joinerId
//     Comments.find({ 'postId': postId, 'joinerId': joinerId }).then((data) => {
//         res.json(data)
//     }).catch(err => {
//         res.status(500).send(err)
//     })
// }

exports.deletecomment = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Comments.findByIdAndRemove(id).then(() => {
        res.status(200).send("Delete success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};

// exports.acceptjoin = (req, res, next) => {
//     const id = req.params.id;
//     if (!req.body) {
//         res.send("Not found data")
//     }
//     const join = {
//         // _id: req.params.id,
//         postId: req.body.postId,
//         postName: req.body.postName,
//         ownerName: req.body.ownerName,
//         ownerId: req.body.ownerId,
//         joinerName: req.body.joinerName,
//         joinerId: req.body.joinerId,
//         status: req.body.status,
//         datetime: req.body.datetime,
//         starttime: req.body.starttime,
//         endtime: req.body.endtime,
//         place: req.body.place,
//         type: req.body.type
//     }
//     console.log(join);

//     Comments.findByIdAndUpdate(id, comment, { useFindAndModify: false }).then((data) => {
//         res.json(data)
//         console.log(data)
//     }).catch(err => {
//         console.log(err)
//         res.status(500).send(err)
//     })
// };

// exports.getidcomment = (req, res, next) => {
//     const id = req.params.id;
//     console.log(id)
//     if (!req.body) {
//         res.send("Not found data")
//     }
//     Comments.findById(id).then(data => {
//         console.log(data)
//         res.status(201).send(data)
//     }).catch(err => {
//         res.status(500).send(err)
//     })

// };