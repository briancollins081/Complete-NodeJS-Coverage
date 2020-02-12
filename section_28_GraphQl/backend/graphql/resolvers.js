const bcrypt = require('bcryptjs');

const User = require('../models/user');
const UserSChema = require('./schema');

module.exports = {
    createUser: async function ({ userInput }, req) {
        try {
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
            return {...createdUser._doc, _id: createdUser._id.toString() }
        } catch (error) {
            console.log(error)
            throw error;
        }

    }
}