const express = require('express');
const bcrypt = require('bcryptjs');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
            body('email')
                .isEmail()
                .withMessage('Wrong credentials, enter a valid email address or password.')
                .normalizeEmail(),

            body('password')
                .isAlphanumeric()
                .isLength({ min: 5 })
                .trim()
                .withMessage('Wrong credentials, enter a valid email address or password.')
        ], 
        authController.postLogin);

router.post('/signup', 
        [
            check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please enter a valid email address.')
            .custom((value, { req })=>{
                /* if(value ==='test@test.com'){
                    throw new Error('This email address is forbidden!');
                }
                return true; */

                // Express validator checks if this custom validator throws an error, 
                // returns a boolean true or false, or if it return a promise. 
                // If a promise, express-validator will wait for it to complete validation, 
                // once it is done, if it returns nothing, then it is assumed to be successful
                // otherwise if the promise returns a rejection then it will be treated as false 
                // and rejection handled by storing it as an error message.
                return User.findOne({email: value})
                    .then(user=>{
                        if(user){
                            return Promise.reject('Email exists, please pick a new one or login.');
                        }
                    });
            }),
            // check('password') or alternatively
            //check the error message can also be included as below
            body('password', 'Please enter a password with only text and numbers and at least 5 characters.')
                .isLength({min: 5})
                .isAlphanumeric()
                .trim(),
            body('confirmPassword')
                .trim()
                .custom((value, {req})=>{
                    if(value !== req.body.password){
                        throw new Error('Passwords have to match!');
                    }
                    return true;
                })
        ], 
        authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword); 

router.post('/new-password', authController.postNewPassword);

module.exports = router;