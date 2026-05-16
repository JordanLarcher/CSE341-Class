const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const { createContact, updateContact } = require ('../validator/contactValidator');
const validate = require('../middlewares/validate');

/**
 * @openapi
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB ID
 *         firstName:
 *           type: string
 *           description: The contact's first name
 *         lastName:
 *           type: string
 *           description: The contact's last name
 *         email:
 *           type: string
 *           format: email
 *           description: The contact's email address
 *         phone:
 *           type: string
 *           description: The contact's phone number
 *         favoriteColor:
 *           type: string
 *           description: The contact's favorite color
 *         birthday:
 *           type: string
 *           format: date
 *           description: The contact's birthday
 *       example:
 *         _id: 664c9a1f2b5e7a0001c8d9e0
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         phone: "555-1234"
 *         favoriteColor: Blue
 *         birthday: 1990-01-15
 *     ContactInput:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         favoriteColor:
 *           type: string
 *         birthday:
 *           type: string
 *           format: date
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         email: john.doe@example.com
 *         phone: "555-1234"
 *         favoriteColor: Blue
 *         birthday: 1990-01-15
 */

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Retrieve all contacts
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       404:
 *         description: No contacts found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', contactController.getContacts);

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Retrieve a single contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid contactId
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', contactController.getContactById);

/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     tags:
 *       - Contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', createContact, validate, contactController.createContact);

/**
 * @openapi
 * /contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', updateContact, validate, contactController.updateContact);

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       201:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;