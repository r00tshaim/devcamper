const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
    try {
        //const bootcamps = await Bootcamp.find({});
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select'];

        // Loop over removeFields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        //replacing gte with $gte - to form a mongoose query
        // that is Create opertors like $gt, $gte, etc
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = Bootcamp.find(JSON.parse(queryStr));

        // Select Fields
        if (req.query.select) {
            // Converting select fields to space seperted values ie: /api/v1/bootcamps?select=name,location to name location
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Executing query
        const bootcamps = await query;
        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps
        });
    } catch (err) {
        next(err);
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
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        // id format is incorrect, this case is handled here
        next(err);
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
        next(err);
    }
}


// @desc        Update single bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (err) {
        next(err);
    }
}


// @desc        Delete single bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      Private
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
}


// @desc        Get bootcamps within radius
// @route       GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access      Private
exports.getBootcampsInRadius = async (req, res, next) => {
    try {
        const { zipcode, distance } = req.params;

        // Get lat/lng from geocoder
        const loc = await geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // Calc radius using radians
        // Divide distance by radius of Earth
        // Earth Radius = 3,963 miles / 6,378 kilometers
        const radius = distance / 3963;

        const bootcamps = await Bootcamp.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[lng, lat], radius]
                }
            }
        });

        res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
    } catch (err) {
        next(err);
    }
}