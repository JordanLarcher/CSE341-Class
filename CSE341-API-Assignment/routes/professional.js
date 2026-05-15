const express = require('express');
const router = express.Router();
const professionalController = require('../controllers/professionalController');
const {route} = require("express/lib/application");
const { createProfessional, updateProfessional } = require('../validator/professionalValidator');
const validate = require('../middlewares/validate');

router.get('/', professionalController.getData);
router.get('/:id', professionalController.getUserById);

router.post('/', createProfessional, validate, professionalController.createProfessional);
router.put('/:id', updateProfessional, validate, professionalController.updateProfessional);
router.delete('/:id', professionalController.deleteProfessional);

module.exports = router;