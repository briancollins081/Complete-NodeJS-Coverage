const path = require('path');

const express = require('express');

const rootDirectory = require('../utils/path');

const router = express.Router();

router.get('/add-book', (req, res, next)=>{
    res.sendFile(path.join(rootDirectory, 'views','addbook.html'));
});

router.post('/add-book', (req, res, next)=>{
    res.redirect('/');
});

module.exports = router;