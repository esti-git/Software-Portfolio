const express = require('express');
const controller = require('../controllers/helpRequests.controller.js')

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id',controller.getById);

router.put('/:id',controller.update);

router.post('/:id/volunteer', controller.updateRequestForTreatment);


module.exports = router;