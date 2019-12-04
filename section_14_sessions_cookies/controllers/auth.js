exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.loggedIn
    });
}

exports.postLogin = (req, res, next) => {
    req.loggedIn = true;
    res.redirect('/');
}