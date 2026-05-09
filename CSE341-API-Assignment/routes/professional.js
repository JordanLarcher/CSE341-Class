const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');
router.get('/', professionalController.getData);
router.get('/:id', professionalController.getUserById);

module.exports = router;