const { body, validationResult } = require('express-validator');

const vulnerabilityValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Vulnerability title context is required').isString().trim(),
        body('targetApp').notEmpty().withMessage('Target application identification is required').trim(),
        body('cveId').optional({ checkFalsy: true }).matches(/^CVE-\d{4}-\d{4,7}$/).withMessage('Formatting must strictly follow standard tracking parameters (e.g., CVE-2026-0123)'),
        body('severity').isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Severity designation must match explicit levels: Low, Medium, High, Critical'),
        body('cvssScore').isFloat({ min: 0.0, max: 10.0 }).withMessage('CVSS rating numbers must balance within boundaries of 0.0 to 10.0'),
        body('description').notEmpty().withMessage('A description detailing the vector flaw is required'),
        body('reproductionSteps').isArray({ min: 1 }).withMessage('Step-by-step validation tracking requires an array containing at least one step entry'),
        body('status').optional().isIn(['Open', 'Triaged', 'Remediated', 'Duplicate']).withMessage('Invalid asset operational status parameter passed')
    ];
};


const validateVuln = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();

    const extractedErrors = [];
    errors.array().map( err =>  extractedErrors.push({ [err.path]: err.msg }));

    return res.status(400).json({
        success: false,
        errors: extractedErrors
    });
};

module.exports = { vulnerabilityValidationRules, validateVuln };