const Controller = require('./controller.js');
const HelpRequestService = require('../../bll/services/helpRequests.service.js');

class HelpRequestsController extends Controller {
    constructor() {
        super(HelpRequestService)
    }

    async updateRequestForTreatment(req, res, next) {
        try {
            const { id } = req.params;
            const { volunteerId } = req.body;

            const result = await this.service.updateRequestForTreatment(id, volunteerId);
            res.status(200).json(result);
        } 
        catch (e) {
            next(e);
        }
    }
}

module.exports = new HelpRequestsController();
