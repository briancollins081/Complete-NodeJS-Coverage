const expect = require('chai').expect

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function () {
    it('should throw an error if no authorization header is present', function () {
        let r = {
            get: function (headerName) {
                return null;
            }
        };

        expect(authMiddleware.bind(this, r, {}, () => { })).to.throws("Not authenticated");
    });

    it('should throw an error if authorization header is only one string', function () {
        let r = {
            get: function (headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, r, {}, () => { })).to.throw()
    });
});