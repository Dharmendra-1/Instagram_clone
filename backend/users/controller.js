const pool = require('../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const jwtGenerator = require('./utils/jwtGenerator');

const createTable = async () => {
  try {
    await pool.query(queries.createTable);
    await pool.query(queries.postTable);
    await pool.query(queries.followerTable);
    await pool.query(queries.likesTable);
    await pool.query(queries.commentsTable);
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
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      let newUser = await pool.query(queries.addUser, [
        firstName,
        lastName,
        email,
        bcryptPassword,
      ]);

      const jwtToken = jwtGenerator(newUser.rows[0].user_email);

      return response.json({ jwtToken });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const userExists = await pool.query(queries.loginUserData, [email]);
    let loginUserData = userExists.rows[0];

    if (loginUserData && loginUserData.user_email === email) {
      const jwtToken = jwtGenerator(loginUserData.user_email);

      return response.json({ jwtToken });
    } else {
      return response.send(false);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const homeUser = async (request, response, next) => {
  try {
    let userData = await pool.query(queries.getUser);
    return response.status(200).json(userData.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const updateImg = async (request, response) => {
  const { email, img } = request.body;
  try {
    let update = await pool.query(queries.updateImg, [img, email]);
  } catch (error) {
    throw new Error(error);
  }
};

const createPost = async (request, response) => {
  const { title, body, img, id } = request.body;

  try {
    if (!title || !body || !img) {
      return response.status(422).json({ error: 'Plase add all the fields' });
    }
    let newPost = await pool.query(queries.addPost, [title, body, img, id]);
    return response.json(newPost.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const getPost = async (request, response) => {
  try {
    let userPost = await pool.query(queries.getPost);
    return response.status(200).json(userPost.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const getProfilePic = async (request, response) => {
  const { id } = request.body;
  try {
    let userPost = await pool.query(queries.getProfilePic, [id]);
    return response.status(200).json(userPost.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const deletePost = async (request, response) => {
  const pid = request.params.pid;

  try {
    let result = await pool.query(queries.deletePost, [pid]);
    return response.status(200).json(result.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const like = async (request, response) => {
  const { id, pid } = request.body;
  try {
    await pool.query(queries.likeInsert, [id, pid]);

    const likes = await pool.query(queries.likeIncrease, [pid]);

    return response.status(200).json(likes.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const unlike = async (request, response) => {
  const { id, pid } = request.body;
  try {
    await pool.query(queries.likeDelete, [id, pid]);

    const likes = await pool.query(queries.likeDecrease, [pid]);

    return response.status(200).json(likes.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const getFollowList = async (request, response) => {
  const { id, fid, follow } = request.body;
  try {
    if (follow === 1) {
      await pool.query(queries.increaseFollow, [id, fid, 1]);
    } else {
      await pool.query(queries.DecreaseFollow, [id, fid, 0]);
    }

    let allFollower = await pool.query(queries.getFollowList);
    return response.status(200).json(allFollower.rows);
  } catch (error) {
    throw new Error(error);
  }
};

const getFollowers = async (request, response) => {
  try {
    const followers = await pool.query(queries.getFollowList);
    response.status(200).json(followers.rows);
  } catch (err) {
    console.log(err);
  }
};

const defaultFollow = async (request, response) => {
  const { id, fid } = request.body;
  try {
    let followerExists = await pool.query(queries.followerExists, [id, fid]);

    if (followerExists.rows.length == 0) {
      await pool.query(queries.insertFollower, [id, fid, 0]);
      return response.status(200).json(0);
    } else {
      let follow = await pool.query(queries.followExists, [id, fid]);

      return response.status(200).json(follow.rows);
    }
  } catch (err) {
    console.log(err);
  }
};

const comment = async (request, response) => {
  const { comment, id, pid } = request.body;
  try {
    const result = await pool.query(queries.addComments, [comment, id, pid]);
    return response.status(200).json(result.rows);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUser,
  addUser,
  loginUser,
  homeUser,
  createPost,
  getPost,
  updateImg,
  getProfilePic,
  getFollowList,
  getFollowers,
  defaultFollow,
  deletePost,
  like,
  unlike,
  comment,
};
