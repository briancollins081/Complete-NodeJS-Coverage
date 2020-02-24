const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const UserSChema = require('./schema');

module.exports = {
    createUser: async function ({ userInput }, req) {
        try {
            let validationErrors = [];

            if (!validator.isEmail(userInput.email)) {
                validationErrors.push({ message: "Email address is invalid" });
            }
            if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 5 })) {
                validationErrors.push({ message: "Password is too short" });
            }
            if (validationErrors.length > 0) {
                const error = new Error('Invalid input!');
                error.data = validationErrors;
                error.code = 422;
                throw error;
            }
            const existingUser = await User.findOne({ email: userInput.email });
            if (existingUser) {
                const error = new Error("A user with this email exists!");
                throw error;
            }

            const hp = await bcrypt.hashSync(userInput.password, 12);
            const newUser = new User({
                name: userInput.name,
                email: userInput.email,
                password: hp
            });
            const createdUser = await newUser.save();
            return { ...createdUser._doc, _id: createdUser._id.toString() }
        } catch (error) {
            console.log(error)
            throw error;
        }

    },
    login: async function ({ loginInput }, req) {
        console.log('Email passed in: ');
        console.log(loginInput.email);
        console.log('Password passed in: ');
        console.log(loginInput.password);
        let token;
        let user
        try {
            user = await User.findOne({ email: loginInput.email });
            console.log("USER");
            console.log(user);
        } catch (error) {
            console.log("User Error!");
            console.log(error);
        }

        if (!user) {
            const error = new Error("User is not found");
            error.code = 401;
            throw error;
        }
        try {
            const isEqual = await bcrypt.compare(loginInput.password, user.password);
            if (!isEqual) {
                const error = new Error("Password do not match");
                error.code = 401;
                throw error;
            }
        } catch (error) {
            console.log("Bcrypt Error");
            console.log(error);
        }
        try {
            token = await jwt.sign(
                { userId: user._id.toString(), email: user.email },
                "secret for token 771818817818",
                { expiresIn: '1h' }
            );
        } catch (error) {
            console.log("Token Error");

            console.log(error);
        }
        return { token: token, userId: user._id.toString() } || {}
    }
}