const path = require('path');

const express = require('express');

const rootFolder = require('../utils/path');

// create a route object
const router = express.Router();

router.get('/add-book', (req, res, next)=>{
    res.sendFile(path.join(rootFolder, 'views', 'add-book.html'));
});

router.post('/add-book', (req, res, next)=>{
    res.sendFile(path.join(rootFolder, 'views', 'shelf.html'));
});

module.exports = router;