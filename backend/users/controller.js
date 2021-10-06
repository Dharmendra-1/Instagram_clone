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

const getUser = async (request, response) => {
  try {
    let userData = await pool.query(queries.getUser);
    response.status(200).json(userData.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const addUser = async (request, response) => {
  const { First_name, Last_name, user_email, user_password } = request.body;
  try {
    //check if email or user already exists..
    let userExists = await pool.query(queries.checkEmailExists, [user_email]);
    if (userExists.rows.length) {
      response.send('Email Already exists...');
    } else {
      let userAdd = await pool.query(queries.addUser, [
        First_name,
        Last_name,
        user_email,
        user_password,
      ]);
      response.status(201).send('User Added Sucessfully');
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUser, addUser };
