const bcrypt = require('bcryptjs');
const validator = require('validator');

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
            if(validationErrors.length > 0){
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

    }
}