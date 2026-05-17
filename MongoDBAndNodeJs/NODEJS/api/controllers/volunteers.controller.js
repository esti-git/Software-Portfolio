const Controller = require('./controller.js');
const VolunteersService = require('../../bll/services/volunteers.service.js');

class VolunteersController extends Controller {
    constructor() {
       super(VolunteersService)
    }
}

module.exports = new VolunteersController();
