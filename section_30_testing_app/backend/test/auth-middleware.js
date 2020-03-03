const expect = require('chai').expect

const authMiddleware = require('../middleware/is-auth');
it('should throw an error if no authorization header is present', function (){
    let r = {
        get: function(headerName){
            return null;
        }
    };

    expect(authMiddleware.bind(this, r, {}, ()=>{})).to.throws("Not authenticated");
});