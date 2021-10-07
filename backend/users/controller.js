const pool = require('../db');
const queries = require('./queries');

const createTable = async () => {
  try {
    await pool.query(queries.createTable);
  } catch (error) {
    throw new Error(error);
  }
};

createTable();

const getUser = async (request, response, next) => {
  try {
    let userData = await pool.query(queries.getUser);
    response.status(200).json(userData.rows);
    next();
  } catch (error) {
    throw new Error(error);
  }
};

const addUser = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  try {
    //check if email or user already exists..
    let userExists = await pool.query(queries.checkEmailExists, [email]);
    if (userExists.rows.length) {
      return response.send(false);
    } else {
      await pool.query(queries.addUser, [firstName, lastName, email, password]);
      return response.send(true);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    let userExists = await pool.query(queries.loginUserData, [email]);
    let loginUserData = userExists.rows[0];
    if (
      loginUserData &&
      loginUserData.user_email === email &&
      loginUserData.user_password === password
    ) {
      return response.send(true);
    } else {
      return response.send(false);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUser, addUser, loginUser };
