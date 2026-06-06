const express = require('express');
const router = express.Router();
const vulnerabilitiesController = require('../controller/vulnerabilitiesController');
const { validateId } = require('../middleware/validateId');
const { vulnerabilityValidationRules, validateVuln } = require('../middleware/validateVuln');
const { isAuthenticated } = require('../middleware/authenticate');


// Core collection endpoints 

/**
 * @swagger
 * /api/vulnerabilities:
 *   get:
 *     tags: [Vulnerabilities]
 *     summary: Get all vulnerabilities
 *     parameters:
 *       - in: query
 *         name: severity
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: keyword
 *         schema: { type: string }
 *       - in: query
 *         name: hasCve
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of vulnerabilities
 */
router.get('/', vulnerabilitiesController.getAll);

/**
 * @swagger
 * /api/vulnerabilities/{id}:
 *   get:
 *     tags: [Vulnerabilities]
 *     summary: Get vulnerability by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Vulnerability found
 *       404:
 *         description: Not found
 */
router.get('/:id', validateId, vulnerabilitiesController.getById);

/**
 * @swagger
 * /api/vulnerabilities:
 *   post:
 *     tags: [Vulnerabilities]
 *     summary: Create a new vulnerability
 *     security:
 *       - github_auth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - targetApp
 *               - severity
 *               - cvssScore
 *               - description
 *               - reproductionSteps
 *             properties:
 *               title:
 *                 type: string
 *               targetApp:
 *                 type: string
 *               cveId:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High, Critical]
 *               cvssScore:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *               description:
 *                 type: string
 *               reproductionSteps:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [Open, Triaged, Remediated, Duplicate]
 *           examples:
 *             criticalSqlInjection:
 *               summary: Critical SQL Injection
 *               value:
 *                 title: SQL Injection in Login Endpoint
 *                 targetApp: Corporate Dashboard
 *                 cveId: CVE-2026-0123
 *                 severity: Critical
 *                 cvssScore: 9.8
 *                 description: Unauthenticated SQL injection found in the login form allowing full database access.
 *                 reproductionSteps:
 *                   - Navigate to /login
 *                   - Enter "' OR 1=1 --" as username
 *                   - Observe admin access granted
 *                 status: Open
 *             mediumXss:
 *               summary: Medium Stored XSS
 *               value:
 *                 title: Stored XSS in User Profile
 *                 targetApp: Customer Portal
 *                 cveId: CVE-2026-0456
 *                 severity: Medium
 *                 cvssScore: 6.1
 *                 description: Stored cross-site scripting vulnerability in the user profile bio field allowing script injection.
 *                 reproductionSteps:
 *                   - Navigate to /profile/edit
 *                   - Inject '<script>alert(1)</script>' in bio
 *                   - Save and view profile page
 *                 status: Triaged
 *             lowInfoDisclosure:
 *               summary: Low Information Disclosure
 *               value:
 *                 title: Server Path Disclosure in Error Pages
 *                 targetApp: API Gateway
 *                 severity: Low
 *                 cvssScore: 3.3
 *                 description: Internal server paths are exposed in error messages when invalid parameters are sent.
 *                 reproductionSteps:
 *                   - Send GET request with invalid ID
 *                   - Observe full server path in error response
 *                 status: Open
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', isAuthenticated, vulnerabilityValidationRules(), validateVuln, vulnerabilitiesController.create);

/**
 * @swagger
 * /api/vulnerabilities/{id}:
 *   put:
 *     tags: [Vulnerabilities]
 *     summary: Update an existing vulnerability
 *     security:
 *       - github_auth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - targetApp
 *               - severity
 *               - cvssScore
 *               - description
 *               - reproductionSteps
 *             properties:
 *               title:
 *                 type: string
 *               targetApp:
 *                 type: string
 *               cveId:
 *                 type: string
 *               severity:
 *                 type: string
 *                 enum: [Low, Medium, High, Critical]
 *               cvssScore:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *               description:
 *                 type: string
 *               reproductionSteps:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [Open, Triaged, Remediated, Duplicate]
 *           examples:
 *             updateSqlInjection:
 *               summary: Update SQL Injection to Triaged
 *               value:
 *                 title: SQL Injection in Login Endpoint
 *                 targetApp: Corporate Dashboard
 *                 cveId: CVE-2026-0123
 *                 severity: Critical
 *                 cvssScore: 9.8
 *                 description: Updated with additional findings — second-order SQLi also confirmed.
 *                 reproductionSteps:
 *                   - Navigate to /login
 *                   - Enter SQL injection payload
 *                   - Observe error output disclosing query structure
 *                 status: Triaged
 *             remediateXss:
 *               summary: Remediate XSS vulnerability
 *               value:
 *                 title: Stored XSS in User Profile
 *                 targetApp: Customer Portal
 *                 cveId: CVE-2026-0456
 *                 severity: Medium
 *                 cvssScore: 6.1
 *                 description: Input sanitization has been applied — vulnerability remediated.
 *                 reproductionSteps:
 *                   - Deploy input sanitization patch
 *                   - Verify script tags are stripped
 *                 status: Remediated
 *             closeDuplicate:
 *               summary: Mark as Duplicate
 *               value:
 *                 title: Path Traversal in File Download
 *                 targetApp: File Server
 *                 severity: High
 *                 cvssScore: 7.5
 *                 description: Duplicate of ticket VULN-2026-0089 — same vector and affected component.
 *                 reproductionSteps:
 *                   - Cross-reference with existing report
 *                   - Confirm identical payload behavior
 *                 status: Duplicate
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', isAuthenticated, validateId, vulnerabilityValidationRules(), validateVuln, vulnerabilitiesController.update);

/**
 * @swagger
 * /api/vulnerabilities/{id}:
 *   delete:
 *     tags: [Vulnerabilities]
 *     summary: Delete a vulnerability
 *     security:
 *       - github_auth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', isAuthenticated, validateId, vulnerabilitiesController.delete);

module.exports = router;