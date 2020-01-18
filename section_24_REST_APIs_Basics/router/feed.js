const express = require('express');

const router = express.Router();

const feedsController = require('../controllers/feed');

router.get('/posts', feedsController.getPosts);

module.exports = router;