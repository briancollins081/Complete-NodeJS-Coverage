const express = require('express');

const router = express.Router();

const userslist = [];

router.get('/register', (req, res, next)=>{
    res.render('register',{
        active: 'register',
        pageTitle: 'Add new user'
    });
});

router.post('/register',(req, res, next)=>{
    userslist.push({
        username: req.body.username,
        usermail: req.body.usermail
    });
    res.redirect('/');
});

exports.userslist = userslist;
exports.router = router;