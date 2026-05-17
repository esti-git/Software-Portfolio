const mongoose = require('mongoose');


async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/volunteerSystem');
        console.log('connected to volunteerSystem db');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error connecting to db. please try later...');
    }
}

module.exports = { connect };