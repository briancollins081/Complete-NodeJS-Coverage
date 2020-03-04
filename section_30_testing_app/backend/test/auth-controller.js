const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function(){
    it('login middleware should throw an error with code 500 if database access fails', ()=>{
        sinon.stub(User, 'findOne'); //create a stub for find one
        User.findOne.throws(); //force the stub to throw an error

    })
})