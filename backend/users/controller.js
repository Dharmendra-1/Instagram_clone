const pool = require("../db");
const queries = require("./queries");

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
    return;
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
      response.send("Email Already exists...");
    } else {
      await pool.query(queries.addUser, [firstName, lastName, email, password]);
      response.status(200).send("User Added Sucessfully");
      next();
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUser, addUser };
