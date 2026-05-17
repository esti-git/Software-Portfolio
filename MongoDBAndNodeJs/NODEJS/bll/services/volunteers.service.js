const Service = require('./service.js');
const repo = require('../../dal/repositories/volunteers.repo.js')

class VolunteersService extends Service {
    constructor() {
        super(repo);
    }
}

module.exports = new VolunteersService();