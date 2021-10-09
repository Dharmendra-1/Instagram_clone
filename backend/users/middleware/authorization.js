const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const token = req.header('jwt_token');
  if (!token) {
    res.send(false);
  }
  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    req.user = verify.user;
    next();
  } catch (err) {
    res.send(false);
  }
};
