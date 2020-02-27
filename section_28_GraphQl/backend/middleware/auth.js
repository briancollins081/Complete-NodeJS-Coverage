const jwt = require('jsonwebtoken');

const keys = require('../keys/keys');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    // console.log("Authorization " + authHeader);
    if(!authHeader){
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1];
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, keys.JWT_SECRET);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    //retrive data passed with the token
    req.userId = decodedToken.userId;
    req.isAuth = true;
    next();
}