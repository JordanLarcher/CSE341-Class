const mongodb = require("../db/dbConnection");
const { ObjectId } = require('mongodb');


const getAllContacts = async() => {
    const result = await mongodb.getDb().db().collection("contacts").find();
    return await result.toArray();
};

const getContactById = async (id) => {
    const result = await mongodb.getDb().db().collection("contacts").findOne({ _id: new ObjectId(id) });
    return result || null;
}

const createContact = async (data) => {
    const result = await mongodb.getDb().db().collection("contacts").insertOne(data);
    return { _id: result.insertedId, ...data};
};

const updateContact = async (id, data) => {
    return await mongodb.getDb().db().collection("contacts").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after'}
    )
};

const deleteContact = async (id) => {
    const result = await mongodb.getDb().db().collection("contacts").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };