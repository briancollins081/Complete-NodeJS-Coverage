const { validationResult } = require('express-validator');
const Post = require('../models/posts');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '1',
                title: 'First Post',
                content: 'This is the first post!',
                imageUrl: 'images/genius.jpg',
                creator: {
                    name: 'Andere Brian'
                },
                createdAt: new Date().toUTCString()
            }
        ]
    });
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect!');
        error.statusCode = 422; //custom property
        throw error;
    }
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const content = req.body.content;
    const post = new Post({
        title: title,
        // imageUrl: imageUrl,
        imageUrl: 'images/genius.jpg',
        content: content,
        creator: { name: 'Andere Brian' },
    });
    post.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Post created successfully',
                post: result
            });
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err); // since we are inside asyncronous code
        });
}