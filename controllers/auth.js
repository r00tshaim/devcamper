const Bootcamp = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) => {
    res.status(200).json({ success: true });
}