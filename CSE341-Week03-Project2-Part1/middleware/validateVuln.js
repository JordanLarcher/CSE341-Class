const { body, validationResult } = require('express-validator');

const vulnerabilityValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('Title is required').isString().trim(),
        body('targetApp').notEmpty().withMessage('Target application is required').trim(),
        body('cveId').optional({ checkFalsy: true }).matches(/^CVE-\d{4}-\d{4,7}$/).withMessage('CVE ID must follow the format CVE-YYYY-NNNN'),
        body('severity').isIn(['Low', 'Medium', 'High', 'Critical']).withMessage('Severity must be Low, Medium, High, or Critical'),
        body('cvssScore').isFloat({ min: 0.0, max: 10.0 }).withMessage('CVSS score must be between 0.0 and 10.0'),
        body('description').notEmpty().withMessage('Description is required'),
        body('reproductionSteps').isArray({ min: 1 }).withMessage('At least one reproduction step is required'),
        body('status').optional().isIn(['Open', 'Triaged', 'Remediated', 'Duplicate']).withMessage('Invalid status')
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