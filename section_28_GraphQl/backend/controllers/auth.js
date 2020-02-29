const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../keys/keys');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        const hp = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            name: name,
            password: hp
        });
        const signedUsed = await user.save();
        res.status(201).json({ message: 'User created!', userId: signedUsed._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const err = new Error("A user with that email is not found!");
            err.statusCode = 401;
            throw err;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const err = new Error("Your password is incorrect!");
            err.statusCode = 401;
            throw err;
        }
        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            keys.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            token: token,
            userId: user._id.toString()
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getStatus = async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        const error = new Error('User not logged in');
        error.statusCode = 422;
        throw error;
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: user.status });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    const userStatus = req.body.status;
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            const err = new Error("User not found!");
            err.statusCode = 404;
            throw err;
        }
        user.status = userStatus;
        const updatedUser = await user.save();
        res.json({ message: 'User updated successfully', updatedUser: updatedUser });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}