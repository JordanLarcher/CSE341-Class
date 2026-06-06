const Vulnerabilities = require('../models/vulnerability');


// Get all items 

exports.getAll = async (req, res, next) => {
    try {
        let queryConditions = {};

        // Exact match checks
        if(req.query.severity) queryConditions.severity = req.query.severity;
        if(req.query.status) queryConditions.status = req.query.status;

        // NVD Keyword search processing via regex across Title and Description
        if(req.query.keyword) {
            queryConditions.$or = [
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } }
            ];
        }


        // NVD Flag replication: Verify if entries contain an assigned CVE ID
        if (req.query.hasCve === 'true') {
            queryConditions.cveId = { $exists: true, $ne:""};
        }

        const vulns = await Vulnerabilities.find(queryConditions).sort({ createdAt: -1 });
        res.status(200).json({
            totalResults: vulns.length,
            vulnerabilities: vulns
        });

    }catch (err) {
        next(err);
    };
};


exports.getById = async (req, res, next) => {
    try {
        const vuln = await Vulnerabilities.findById(req.params.id);
        if(!vuln) return res.status(404).json({ message: 'Vulnerability not found' });
        res.status(200).json(vuln);
    }catch (err) {
        next(err);
    };
};

exports.create = async (req, res, next) => {
    try {
        const newVuln = new Vulnerabilities(req.body);
        const savedVuln = await newVuln.save();
        res.status(201).json(savedVuln);
    } catch (err) {
        next(err);
    }
};


exports.update = async (req, res, next) => {
    try {
        const updatedVuln = await Vulnerabilities.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );

        if(!updatedVuln) return res.status(404).json({ message: 'Vulnerability not found' });
        res.status(200).json(updatedVuln);
    }catch (err) {
        next(err);
    };
};

exports.delete = async (req, res, next) => {
    try {
        const deletedVuln = await Vulnerabilities.findByIdAndDelete(req.params.id);
        if(!deletedVuln) return res.status(404).json({message: 'Vulnerability not found'});
        res.status(200).json({ message: 'Vulnerability deleted successfully'})
    }catch(error) {
        next(error);
    };

};