const { body } = require('express-validator');

const createProfessional = [
    body('name').isString().trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().trim().notEmpty().withMessage('Email is required').normalizeEmail(),
];

const updateProfessional = [
  body('name').isString().trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().trim().notEmpty().withMessage('Email is required').normalizeEmail(),
];

module.exports = { createProfessional, updateProfessional };