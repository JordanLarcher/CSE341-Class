const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid tracking identity format. Must represent a clean 24 characters'
        });
    }
    next();
};

module.exports = validateObjectId;