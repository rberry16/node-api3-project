function logger(req, res, next) {
  const method = req.method;
  const URL = req.originalUrl;
  const timeStamp = Date.now();
  console.log(`method: ${method}, URL: ${URL}, timestamp: ${timeStamp}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}