const { body, validationResult } = require('express-validator');

const programValidationRules = () => {
    return [
        body('companyName').notEmpty().withMessage('Company name is required').isString().trim(),
        body('bountyMax').optional().isNumeric().withMessage('Bounty max must be a number'),
        body('isPlatformActive').optional().isBoolean().withMessage('isPlatformActive must be a boolean'),
        body('scopeCovered').isArray({ min: 1 }).withMessage('At least one scope entry is required')
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