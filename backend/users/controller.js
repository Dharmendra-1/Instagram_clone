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

const addUser = async (request, response, next) => {
  const { firstName, lastName, email, password } = request.body;
  try {
    //check if email or user already exists..
    let userExists = await pool.query(queries.checkEmailExists, [email]);
    if (userExists.rows.length) {
      response.send('Email Already exists...');
    } else {
      await pool.query(queries.addUser, [firstName, lastName, email, password]);
      response.status(201).send('User Added Sucessfully');
      response.end();
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (request, response, next) => {
  const { user_email, user_password } = request.body;

  try {
    let userExists = await pool.query(queries.loginUserData, [user_email]);
    let loginUserData = userExists.rows[0];
    if (
      loginUserData &&
      loginUserData.user_email === user_email &&
      loginUserData.user_password === user_password
    ) {
      response.send('Welcome to Instagram');
    } else {
      response.send('USER DOES NOT EXISTS');
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUser, addUser, loginUser };
