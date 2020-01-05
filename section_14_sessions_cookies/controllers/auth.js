const User = require('../models/user');
exports.getLogin = (req, res, next) => {
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
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            }); //ensure the session is saved before redirection so that the view picks the changes

        })
        .catch(err => console.log(err));
}
exports.postLogout = (req, res, then) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}