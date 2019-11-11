exports.get404Error = (req, res, next) => {
    res.status(404).render('404', {
        docTitle: 'Resource not found: 404',
        path: '/404'
    });
}