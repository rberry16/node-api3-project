const Users = require('../users/users-model');

function logger(req, res, next) {
  const method = req.method;
  const URL = req.originalUrl;
  const timeStamp = Date.now();
  console.log(`method: ${method}, URL: ${URL}, timestamp: ${timeStamp}`);
  next();
}

async function validateUserId(req, res, next) {
  const user = await Users.getById(req.params.id);
  if (!user) {
    next({status: 404, message: 'user not found'});
  } else {
    req.user = user;
    next();
  }
}

function validateUser(req, res, next) {
  if (!req.body.name || req.body.name === undefined) {
    next({status: 400, message: 'missing required name field'});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text || req.body.text === undefined) {
    next({status: 400, message: 'missing required text field'});
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}