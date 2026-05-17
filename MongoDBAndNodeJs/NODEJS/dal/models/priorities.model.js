const mongoose = require('mongoose')

const prioritiySechema = new mongoose.Schema({
    _id: Number,
    name: String
})

const Priorities = mongoose.model('priorities', prioritiySechema);

module.exports = Priorities;

