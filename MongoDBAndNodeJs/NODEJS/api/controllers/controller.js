const autoBind = require('auto-bind');

class Controller {

    constructor(service) {
        this.service = service;
        autoBind(this);
    }

    async getAll(req, res, next) {
        try {
            const result = await this.service.getAll(req.query);
            return res.json(result);
        } 
        catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        const { id } = req.params
        try {
            const result = await this.service.getById(id);
            return res.json(result);

        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        const { id } = req.params;
        const data = req.body;
        try {
            const response = await this.service.update(id, data)
            if (!response) {
                return res.status(404).json({ message: "Request not found" });
            }
            res.status(200).json(response);
        }
        catch (e) {
            next(e);
        }
    }

    async insert(req, res, next) {
        try {
            const response = await this.service.insert(req.body);
            if (!response) {
                return res.status(404).json({ message: "Request not found" });
            }
            res.status(200).json(response)
        }
        catch (e) {
            next(e);
        }
    }
}

module.exports = Controller;