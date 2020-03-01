const jwt = require('jsonwebtoken');

const keys = require('../keys/keys');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, keys.JWT_SECRET);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    if(!decodedToken){
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    //retrive data passed with the token
    req.userId = decodedToken.userId;
    next();
}