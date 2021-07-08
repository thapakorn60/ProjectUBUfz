const mongoose = require('mongoose');

const Notification = mongoose.Schema({
    postId: String,
    postName: String,
    ownerName: String,
    ownerId: String,
    joinerName: String,
    joinerId: String,
    status: Boolean,
    datetime: Date,
    starttime: Date,
    endtime: Date,
    place: String,
    type: Object,
    press: String,
    inject: Boolean,
    description: String,
    read: Boolean
}, { timestamps: true });
module.exports = mongoose.model('Notifications', Notification);