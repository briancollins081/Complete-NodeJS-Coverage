const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    /* const isLoggedIn = req
        .get('Cookie')
        .split(';')[2]
        .trim()
        .split('=')[1]; */
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        logedInUser: req.session.user
    });
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    User.findById('5de485e7cb22470fa93b7720')
        .then(user => {
            //console.log(user);
            return req.session.user = user;
        }).then(result => {
            // console.log(req.session)
            res.redirect('/');
        })
        .catch(err => console.log(err));
}