const mongoose = require('mongoose')

const statuseSechema = new mongoose.Schema({
    _id: Number,
    name: String
})

const Statuse = mongoose.model('statuses', statuseSechema);

module.exports = Statuse;