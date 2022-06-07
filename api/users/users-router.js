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

router.delete('/:id', md.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = await Users.getById(req.params.id)
  Users.remove(req.params.id)
    .then(user => {//eslint-disable-line
      res.json(deletedUser);
    })
    .catch(err => {
      res.status(500).json({
        message: 'error deleting user',
        err: err.message,
        stack: err.stack,
      });
    });
});

router.get('/:id/posts', md.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: `error retrieving posts for user id: ${req.params.id}`,
        err: err.message,
        stack: err.stack,
      });
    });
});

router.post('/:id/posts', md.validateUserId, md.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({user_id: req.params.id, text: req.body.text})
    .then(post => {
      res.status(201).json(post);
    })
});

// do not forget to export the router
module.exports = router;