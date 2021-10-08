const createDatabase = `CREATE DATABASE instagram`;

const createTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL,
  First_name VARCHAR(255) NOT NULL,
  Last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);`;

const getUser = 'SELECT * FROM users';

const addUser =
  'INSERT INTO users(First_name, Last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *';

const checkEmailExists =
  'SELECT user_email FROM users WHERE users.user_email = $1';

const loginUserData = 'SELECT * FROM users WHERE users.user_email = $1';

module.exports = {
  createDatabase,
  createTable,
  getUser,
  addUser,
  checkEmailExists,
  loginUserData,
};
