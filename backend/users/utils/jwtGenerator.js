const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_email) {
  const payload = {
    user: {
      email: user_email,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '365d' });
}

module.exports = jwtGenerator;
