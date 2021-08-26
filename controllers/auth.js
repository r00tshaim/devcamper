const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

// @desc        Register User
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({ success: true });
}