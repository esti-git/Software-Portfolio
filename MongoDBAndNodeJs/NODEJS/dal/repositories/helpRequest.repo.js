const Repository = require('./repository.js');
const HelpRequests = require('../models/helpRequests.model.js');

class HelpRequestsRepo extends Repository {
    constructor() {
        super(HelpRequests);
    }
}

module.exports = new HelpRequestsRepo();