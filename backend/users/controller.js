const pool = require("../db");
const queries = require("./queries");
// const fetch = require("node-fetch");

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

const loginUser = async (request, response, next) => {
  const { email, password } = request.body;
  // const requestUrl = "http://localhost:4000/user/userdata";

  try {
    let userExists = await pool.query(queries.loginUserData, [email]);
    let loginUserData = userExists.rows[0];
    if (
      loginUserData &&
      loginUserData.user_email === email &&
      loginUserData.user_password === password
    ) {
      response.redirect("http://localhost:3000/signup");
      // fetch(requestUrl, {
      //   method: "POST",
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(loginUserData),
      // }).catch((err) => {
      //   console.log(err);
      // });
    } else {
      response.send("reject");
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUser, addUser, loginUser };
