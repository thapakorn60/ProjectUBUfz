const Posts = require('../models/posts');
/*
getpost
getallpost
addpost
editpost
deletepost
*/

exports.getpost = (req, res, next) => {
    Posts.find({}).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
};

exports.getallpost = (req, res, next) => {
    const date = { 'datetime': -1}
    const index = { 'createdAt': -1 };
    Posts.find({}).sort(index).then((data) => {
        res.status(201).json({
            response: data
        })
    }).catch(err => {
        res.status(500).send(err)
    })
};

exports.addpost = async(req, res, next) => {
    const data = req.body;
    const post = new Posts({
        // _id: req.params.id,
        name: req.body.name,
        eventname: req.body.eventname,
        userid: req.body.userid,
        description: req.body.description,
        type: req.body.type,
        datetime: req.body.datetime,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        place: req.body.place,
        location: req.body.location,
        amount: req.body.amount,
        remain: req.body.remain
        // reqtojoin: req.body.reqtojoin
    })
    console.log(post);
    post.save(post).then(data => {
        res.send("Post success")
    }).catch(err => {
        res.send(err)
    })

};


exports.editpost = (req, res, next) => {
    const id = req.params.id;
    if (!req.body) {
        res.send("Not found data")
    }
    const join = {
        // _id: req.params.id,
        name: req.body.name,
        eventname: req.body.eventname,
        userid: req.body.userid,
        description: req.body.description,
        type: req.body.type,
        datetime: req.body.datetime,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        place: req.body.place,
        location: req.body.location,
        amount: req.body.amount,
        remain: req.body.remain
        // reqtojoin: [{
        //     joinerId: req.body.joinerId,
        //     status: req.body.status
        // }]
    }
    console.log(join);
    // return res.status(201).send("OK");
    // Posts.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         throw err
    //     } else {
    //         res.status(200).send(result)
    //     }
    // })

    Posts.findByIdAndUpdate(id, join, { useFindAndModify: false }).then((data) => {
        res.json(data)
        console.log(data)
    }).catch(err => {
        console.log(err)
        // res.status(500).send(err)
    })

};


exports.getidpost = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    if (!req.body) {
        res.send("Not found data")
    }
    Posts.findById(id).then(data => {
        console.log(data)
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })

};

exports.deletepost = (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    Posts.findByIdAndRemove(id).then(() => {
        res.status(200).send("delete success")
    }).catch(err => {
        res.status(500).send("Server Err")
    })
};