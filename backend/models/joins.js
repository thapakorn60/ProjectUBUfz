const mongoose = require('mongoose');
const Join = mongoose.Schema({
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
    type: Object

}, { timestamps: true });
module.exports = mongoose.model('Joins', Join);