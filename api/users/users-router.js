const express = require('express');
const md = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', md.logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: 'error retrieving users',
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get('/:id', md.logger, md.validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', md.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'error creating new user',
        err: err.message,
        stack: err.stack,
      });
    });
});

router.put('/:id', md.validateUserId, md.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: 'error updating user',
        err: err.message,
        stack: err.stack,
      });
    });
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: 'error creating new post',
        err: err.message,
        stack: err.stack,
      });
    });
});

// do not forget to export the router
module.exports = router;