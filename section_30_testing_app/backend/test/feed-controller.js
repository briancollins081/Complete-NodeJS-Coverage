const expect = require('chai').expect;
const mongoose = require('mongoose');

const User = require('../models/user');
const feedController = require('../controllers/feed');

describe('Feed Controller', function (done) { //done used to test async code
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

    it('should add a created post to the posts of the creator', (done) => {
        const req = {
            body: {
                title: "This is a test post",
                content: "A test post for testing!"
            },
            file: {
                path: "abc"
            },
            userId: "5e5a5ce79c90176821df17f5"
        };
        const res = {
            status: function () {
                return this;
            }, json: function () { }
        };

        feedController.createPost(req, res, () => { })
            .then(savedUser => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();
            });
    }); //can use then since we implicitly add a return on the login middleware
});

//hook
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