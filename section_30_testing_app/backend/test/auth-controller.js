const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller', function (done) { //done used to test async code
    //hook
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/test-postmessages', { useUnifiedTopology: true, useNewUrlParser: true })
            .then(result => {
                const user = new User({
                    email: "tester@.test.com",
                    password: "tester",
                    name: "Test",
                    posts: [],
                    _id: "5e5a5ce79c90176821df17f5"
                });
                return user.save();
            })
            .then(() => {
                done();
            });
    });
    beforeEach(function(){
        console.log("Inside beforeEach()");
        
    }); // hook run before each test case i.e. before every it
    it('login middleware should throw an error with code 500 if database access fails', () => {
        sinon.stub(User, 'findOne'); //create a stub for find one
        User.findOne.throws(); //force the stub to throw an error
        const req = {
            body: {
                email: "briancollins081@gmail.com",
                password: "12344545556"
            },

        }
        //simulation of (req, res, next)=>{} middleware fuction
        AuthController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);

            // done(); //waits for async code to finish execution

        }); //can use then since we implicitly add a return on the login middleware


        User.findOne.restore();
    });

    it("should send a response with a valid status for an existing user", function (done) {
        const req = { userId: "5e5a5ce79c90176821df17f5" };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };
        AuthController.getStatus(req, res, () => { }).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am new!');
            done();
        })
    });

    after(function (done) {
        //clean up
        User.deleteMany({})
            .then(() => {
                //diconnect all open handles
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            })
    });
    afterEach(function(){
        console.log("Inside afterEach()");
    }); //runs after each test block i.e. after every it
})