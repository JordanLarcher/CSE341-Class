const { body, validationResult } = require('express-validator');

const programValidationRules = () => {
    return [
        body('companyName').notEmpty().withMessage('Company entity name configuration required').isString().trim(),
        body('bountyMax').optional().isNumeric().withMessage('Bounty caps must resolve to standard numeric entries'),
        body('isPlatformActive').optional().isBoolean().withMessage('Platform active state flags require a boolean format'),
        body('scopeCovered').isArray({ min: 1 }).withMessage('Perimeter target arrays must register at least one target scope entry')
    ];
};

const validateProgram = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        success: false,
        errors: extractedErrors
    });
};

module.exports = { programValidationRules, validateProgram }; 