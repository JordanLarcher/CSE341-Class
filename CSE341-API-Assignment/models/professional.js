const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const result = await mongodb.getDb().db().collection('user').find();
  return await result.toArray();
};

const getById = async (id) => {
  const result = await mongodb.getDb().db().collection('user').find({ _id: new ObjectId(id) });
  const arr = await result.toArray();
  return arr[0] || null;
};

const createUser = async (data) => {
  const result = await mongodb.getDb().db().collection('user').insertOne(data);
  return { _id: result.insertedId, ...data};
};

const updateUser = async (id, data) => {
  return await mongodb.getDb().db().collection('user').findOneAndUpdate(
      {_id: new ObjectId(id)},
      {$set: data},
      {returnDocument: 'after'}
  );
};

const deleteUser = async (id) => {
  const result = await mongodb.getDb().db().collection('user').deleteOne({ _id: new ObjectId(id)});
  return result.deletedCount > 0 ;
}
module.exports = { getAll, getById, createUser, updateUser, deleteUser };