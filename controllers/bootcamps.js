const Bootcamp = require('../models/Bootcamp')

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find({});
        res.status(200).json({
            success: true,
            data: bootcamps
        });
    } catch (err) {
        res.status(400).json({ success: false, msg: err.message });
    }
}


// @desc        Get single bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      Public
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        // id format is correct, but not present in DB
        if (!bootcamp) {
            return res.status(400).json({ success: false })
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        // id format is incorrect, this case is handled here
        res.status(400).json({ success: false, msg: err.message });
    }
}


// @desc        Create single bootcamp
// @route       POST /api/v1/bootcamps
// @access      Private
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(200).json({ success: false, msg: err.message });
    }
}


// @desc        Update single bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Display bootcamp ${req.params.id}` })
}


// @desc        Delete single bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete bootcamp ${req.params.id}` })
}
