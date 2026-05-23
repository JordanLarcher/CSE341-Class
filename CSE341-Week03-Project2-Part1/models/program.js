const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company entity configuration name is required'],
        unique: true,
        trim: true,
    },
    bountyMax: {
        type: Number,
        default: 0,
        min: [0, 'Bounty limits cannot be negative']
    },
    isPlatformActive: {
        type: Boolean,
        default: true,
    },
    scopeCovered: {
        type: [String],
        required: [true, 'Target perimeter configurations must be declared']
    }
},
{
    timestamps: true // This automatically creates 'createdAt' and 'updatedAt' fields
});

module.exports = mongoose.model('Program', programSchema, 'programs_record');