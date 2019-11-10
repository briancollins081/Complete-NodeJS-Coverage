const express = require('express');

const registerData = require('./register');

const router = express.Router();

router.get('/', (req, res, next)=>{
    const userlist = registerData.userslist;
    console.log(userlist);
    res.render('users',{
        userList: userlist,
        active: 'users',
        pageTitle: "Registered Users"
    });
});

module.exports = router;