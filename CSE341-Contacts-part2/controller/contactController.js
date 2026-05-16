const Contact = require('../models/contact');
const { ObjectId } = require('mongodb');

const getContacts = async (req, res, next) => {
    try {
        const contactList = await Contact.getAllContacts();
        if (!contactList || contactList.length === 0) {
            return res.status(404).json({message:'No contacts found.'});
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contactList);
    } catch (error) {
        next(error);
    }
}


const getContactById = async (req, res, next) => {
    const contactId = req.params.id;
    if(!ObjectId.isValid(contactId)) {
        return res.status(400).json({message:'Invalid contactId.'});
    }
    try {
        const contact = await Contact.getContactById(contactId);
        if(!contact) return res.status(404).json({message:'No contacts found.'});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    }catch (error) {
        next(error);
    }
}


const createContact = async (req, res, next) => {
    try {
        const contact = await Contact.createContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
}

const updateContact = async (req, res, next) => {
    try {
        const result = await Contact.updateContact(req.params.id, req.body);
        if(!result) return res.status(404).json({message:'No contacts found.'});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const result = await Contact.deleteContact(req.params.id);
        if(!result) return res.status(404).json({message:'No contacts found.'});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}


module.exports = { getContactById, getContacts, createContact, deleteContact, updateContact }