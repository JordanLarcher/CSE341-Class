const express = require('express');
const router = express.Router();
const programController = require('../controller/programController');
const validateId = require('../middleware/validateId');
const { programValidationRules, validateProgram } = require('../middleware/validateProgram');
const { isAuthenticated } = require('../middleware/authenticate');


// Core collection endpoints 

/**
 * @swagger
 * /api/programs:
 *   get:
 *     tags: [Programs]
 *     summary: Get all programs
 *     parameters:
 *       - in: query
 *         name: isActive
 *         schema: { type: string }
 *       - in: query
 *         name: minBounty
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of programs
 */
router.get('/', programController.getAll);

/**
 * @swagger
 * /api/programs/{id}:
 *   get:
 *     tags: [Programs]
 *     summary: Get program by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Program found
 *       404:
 *         description: Not found
 */
router.get('/:id', validateId, programController.getById);

/**
 * @swagger
 * /api/programs:
 *   post:
 *     tags: [Programs]
 *     summary: Create a new program
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - scopeCovered
 *             properties:
 *               companyName:
 *                 type: string
 *               bountyMax:
 *                 type: number
 *                 minimum: 0
 *               isPlatformActive:
 *                 type: boolean
 *               scopeCovered:
 *                 type: array
 *                 items:
 *                   type: string
 *           examples:
 *             largeEnterprise:
 *               summary: Large Enterprise Program
 *               value:
 *                 companyName: Acme Corporation
 *                 bountyMax: 100000
 *                 isPlatformActive: true
 *                 scopeCovered:
 *                   - api.acme.com
 *                   - app.acme.com
 *                   - admin.acme.com
 *                   - internal.acme.com
 *             startupProgram:
 *               summary: Startup Bug Bounty
 *               value:
 *                 companyName: DevStart Inc
 *                 bountyMax: 5000
 *                 isPlatformActive: true
 *                 scopeCovered:
 *                   - api.devstart.io
 *                   - app.devstart.io
 *             inactiveProgram:
 *               summary: Inactive Program
 *               value:
 *                 companyName: Legacy Corp
 *                 bountyMax: 0
 *                 isPlatformActive: false
 *                 scopeCovered:
 *                   - legacy.corp.com
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', isAuthenticated, programValidationRules(), validateProgram, programController.create);

/**
 * @swagger
 * /api/programs/{id}:
 *   put:
 *     tags: [Programs]
 *     summary: Update an existing program
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
 *               - companyName
 *               - scopeCovered
 *             properties:
 *               companyName:
 *                 type: string
 *               bountyMax:
 *                 type: number
 *                 minimum: 0
 *               isPlatformActive:
 *                 type: boolean
 *               scopeCovered:
 *                 type: array
 *                 items:
 *                   type: string
 *           examples:
 *             increaseBounty:
 *               summary: Increase Bounty Max
 *               value:
 *                 companyName: Acme Corporation
 *                 bountyMax: 150000
 *                 isPlatformActive: true
 *                 scopeCovered:
 *                   - api.acme.com
 *                   - app.acme.com
 *                   - admin.acme.com
 *                   - dev.acme.com
 *             deactivateProgram:
 *               summary: Deactivate Program
 *               value:
 *                 companyName: DevStart Inc
 *                 bountyMax: 5000
 *                 isPlatformActive: false
 *                 scopeCovered:
 *                   - api.devstart.io
 *                   - app.devstart.io
 *             addScope:
 *               summary: Expand Scope Coverage
 *               value:
 *                 companyName: Legacy Corp
 *                 bountyMax: 10000
 *                 isPlatformActive: true
 *                 scopeCovered:
 *                   - legacy.corp.com
 *                   - staging.legacy.corp.com
 *                   - docs.legacy.corp.com
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not found
 */
router.put('/:id', isAuthenticated, validateId, programValidationRules(), validateProgram, programController.update);

/**
 * @swagger
 * /api/programs/{id}:
 *   delete:
 *     tags: [Programs]
 *     summary: Delete a program
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
router.delete('/:id', isAuthenticated, validateId, programController.deleteProgram);

module.exports = router;