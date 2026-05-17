const Service = require('./service.js');
const repo = require('../../dal/repositories/helpRequest.repo.js')
class HelpRequestsService extends Service {
    constructor() {
        super(repo);
    }

    
async updateRequestForTreatment(helpRequestId, volunteerId) {
    try {
        const helpRequest = await this.repo.getById(helpRequestId);

        if (!helpRequest) {
            const error = new Error('Help request not found');
            error.statusCode = 404;
            throw error;
        }

        helpRequest.volunteerId = volunteerId;
        helpRequest.statusId = 2; // 2 = "בטיפול"

        return await this.repo.update(helpRequestId, helpRequest);
    } catch (error) {
        throw error;
    }
}
}



module.exports = new HelpRequestsService();