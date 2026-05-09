const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const result = await mongodb.getDb().db().collection('user').find();
  const lists = await result.toArray();
  return lists;
};

const getById = async (id) => {
  const result = await mongodb.getDb().db().collection('user').find({ _id: new ObjectId(id) });
  const arr = await result.toArray();
  return arr[0] || null;
};

module.exports = { getAll, getById };