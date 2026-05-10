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
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getData, getUserById };
