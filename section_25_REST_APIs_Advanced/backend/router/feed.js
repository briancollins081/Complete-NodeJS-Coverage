const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();

const feedsController = require('../controllers/feed');

router.get('/posts', feedsController.getPosts);

router.post('/post',[
    body('title').trim().isLength({min: 5}),
    body('content').trim().isLength({min: 5}),
], feedsController.createPost);

module.exports = router;