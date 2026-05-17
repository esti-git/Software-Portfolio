const express = require('express');
const controller = require('../controllers/volunteers.controller.js')

const router = express.Router();

router.get('/', controller.getAll);

router.get('/:id',controller.getById);

router.post('/',controller.insert);


module.exports = router;