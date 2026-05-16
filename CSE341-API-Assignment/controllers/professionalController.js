const Professional = require('../models/professional');
const { ObjectId } = require('mongodb');

const getData = async (req, res, next) => {
  try {
    const lists = await Professional.getAll();
    if (!lists || lists.length === 0) {
      return res.status(404).json({ message: 'No professional data found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const user = await Professional.getById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};


const createProfessional = async (req, res, next) => {
  try {
    const professional = await Professional.createUser(req.body);
    res.status(201).json(professional);
  }catch (error) {
    res.status(500).json({message: 'Server error'});
  }
};

const updateProfessional = async (req, res, next) => {
  try {
    const result = await Professional.updateUser(req.params.id, req.body);
    if(!result) return res.status(404).json({message: 'User not found'});
    res.status(200).json(result);
  }catch (error) {
    next(error);
  }
};

const deleteProfessional = async (req, res, next) => {
  try{
    const result = await Professional.deleteUser(req.params.id);
    if(!result) return res.status(404).json({message: 'User not found'});
    res.status(200).json(result);
  }catch (error) {
    next(error);
  }
};
module.exports = { getData, getUserById, createProfessional, updateProfessional, deleteProfessional };
