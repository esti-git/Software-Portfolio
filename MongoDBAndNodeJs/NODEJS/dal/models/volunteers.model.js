const mongoose = require('mongoose')

const volunteerSechema = new mongoose.Schema({
    _id: String,
    identityCard: String,
    firstName: String,
    lastName: String,
    phone: String,
    specialties: [String]

})

const Volunteer = mongoose.model('volunteers', volunteerSechema);

module.exports = Volunteer;
