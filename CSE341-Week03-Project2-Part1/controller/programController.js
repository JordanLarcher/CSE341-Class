const Program = require('../models/program');

// GET all tracking profiles with optional active filter configurations
exports.getAll = async (req, res, next) => {
    try {
        let queryConditions = {};

        if (req.query.isActive) {
            queryConditions.isPlatformActive = req.query.isActive === 'true';
        }
        if (req.query.minBounty) {
            queryConditions.bountyMax = { $gte: Number(req.query.minBounty) };
        }

        const programs = await Program.find(queryConditions);
        res.status(200).json({
            totalResults: programs.length,
            programs: programs
        });
    } catch (error) {
        next(error);
    }
};

// GET single scope ledger item
exports.getById = async (req, res, next) => {
    try {
        const program = await Program.findById(req.params.id);
        if (!program) return res.status(404).json({ message: "Program ledger tracking node not resolved." });
        res.status(200).json(program);
    } catch (error) {
        next(error);
    }
};

// POST save a new company scope environment
exports.create = async (req, res, next) => {
    try {
        const newProgram = new Program(req.body);
        const savedProgram = await newProgram.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        next(error);
    }
};

// PUT update parameters for an active campaign profile
exports.update = async (req, res, next) => {
    try {
        const updatedProgram = await Program.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProgram) return res.status(404).json({ message: "Campaign parameters out of reach, update aborted." });
        res.status(200).json(updatedProgram);
    } catch (error) {
        next(error);
    }
};

// DELETE target track archive profile
exports.deleteProgram = async (req, res, next) => {
    try {
        const deletedProgram = await Program.findByIdAndDelete(req.params.id);
        if (!deletedProgram) return res.status(404).json({ message: "Profile entry absent, execution bypassed." });
        res.status(200).json({ message: "Program profiling target registry disconnected successfully." });
    } catch (error) {
        next(error);
    }
};