const mongoose = require('mongoose')

const helpRequestSechema = new mongoose.Schema({
    _id: String,
    description: String,
    contactPhone: String,
    peopleCount: Number,
    location: {
        city: {
            type: String
        },
        street: {
            type: String
        },
        roadName: {
            type: String
        },
        area: {
            type: String
        }
    },
    priorityId: {
        type: Number,
        ref: 'priorities',
        default: 1
    },
    statusId: {
        type: Number,
        ref: 'statuseses',
        default: 1
    },
    volunteerId: {
        type: String,
        ref: 'volunteers',
        default: null
    },
}, { collection: 'helpRequests' })


const HelpRequests = mongoose.model('helpRequests', helpRequestSechema);

module.exports = HelpRequests;

