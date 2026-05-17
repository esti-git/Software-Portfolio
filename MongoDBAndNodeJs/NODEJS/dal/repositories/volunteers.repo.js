const Repository = require('./repository.js');
const Volunteers = require('../models/volunteers.model.js');

class VolunteersRepo extends Repository {
    constructor() {
        super(Volunteers);
    }
}

module.exports = new VolunteersRepo();