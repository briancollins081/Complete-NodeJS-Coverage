const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../keys/keys');

exports.signup = (req, res, next) => {
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
    bcrypt.hash(password, 12)
        .then(hp => {
            const user = new User({
                email: email,
                name: name,
                password: hp
            });
            return user.save();
        })
        .then(result => {
            res.status(201)
                .json({ message: 'User created!', userId: result._id })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const err = new Error("A user with that email is not found!");
                err.statusCode = 401;
                throw err;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const err = new Error("Your password is incorrect!");
                err.statusCode = 401;
                throw err;
            }
            const token = jwt.sign(
                { email: loadedUser.email, userId: loadedUser._id.toString() },
                keys.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString()
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getStatus = (req, res, next) => {
    const userId = req.userId;
    let status;
    if (!userId) {
        const error = new Error('User not logged in');
        error.statusCode = 422;
        throw error;
    }

    User.findById(userId)
        .then(user => {
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            status = user.status;
            res.status(200).json({ status: status });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateStatus = (req, res, next) => {
    const userStatus = req.body.status;
    User.findById(req.userId)
        .then(user => {
            if(!user){
                const err = new Error("User not found!");
                err.statusCode = 404;
                throw err;
            }
            user.status = userStatus;
            return user.save();
        })
        .then(result => {
            res.json({message: 'User updated successfully', updatedUser: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}