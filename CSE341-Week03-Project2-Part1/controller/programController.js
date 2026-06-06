const Program = require('../models/program');

// GET all programs with optional filters
exports.getAll = async (req, res, next) => {
    try {
        let queryConditions = {};

        if (req.query.isActive) {
            queryConditions.isPlatformActive = req.query.isActive === 'true';
        }
        if (req.query.minBounty) {
            queryConditions.bountyMax = { $gte: Number(req.query.minBounty) };
        }

        const programs = await Program.find(queryConditions).sort({ createdAt: -1 });
        res.status(200).json({
            totalResults: programs.length,
            programs: programs
        });
    } catch (error) {
        next(error);
    }
};

// GET single program by ID
exports.getById = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: "Program not found" });
        res.status(200).json(program);
    } catch (error) {
        next(error);
    }
};

// POST create a new program
exports.create = async (req, res, next) => {
    try {
        const newProgram = new Program(req.body);
        const savedProgram = await newProgram.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        next(error);
    }
};

// PUT update an existing program
exports.update = async (req, res, next) => {
    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProgram) return res.status(404).json({ message: "Program not found" });
        res.status(200).json(updatedProgram);
    } catch (error) {
        next(error);
    }
};

// DELETE a program
exports.delete = async (req, res, next) => {
    try {
        const deletedProgram = await Program.findByIdAndDelete(req.params.id);
        if (!deletedProgram) return res.status(404).json({ message: "Program not found" });
        res.status(200).json({ message: "Program deleted successfully" });
    } catch (error) {
        next(error);
    }
};