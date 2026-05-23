const { body } = require("express-validator");

const createContact = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('phone').optional().trim().isString(),
    body('favoriteColor').optional().trim().isString(),
    body('birthday').optional().trim().isISO8601().withMessage('Birthday must be a valid date'),
];

const updateContact = [
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('email').optional().trim().isEmail(),                                                                                                                                             body('phone').optional().trim().isString(),
    body('favoriteColor').optional().trim().isString(),
    body('birthday').optional().trim().isISO8601().withMessage('Birthday must be a valid date'),
];


module.exports = { createContact, updateContact };