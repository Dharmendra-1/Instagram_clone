const createDatabase = `CREATE DATABASE instagram`;

const createTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL,
  First_name VARCHAR(255) NOT NULL,
  Last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  PRIMARY KEY(id)
);`;

const postTable = `CREATE TABLE IF NOT EXISTS posts (
    pid SERIAL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    id int,
    PRIMARY KEY (pid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id)
);`;

const followerTable = `CREATE TABLE IF NOT EXISTS follower(
 fid SERIAL,
 id INT,
 pid INT,
 follow INT NOT NULL,
 FOREIGN KEY(id) REFERENCES users(id),
 FOREIGN KEY(pid) REFERENCES posts(pid) 
);`;

const getUser = 'SELECT * FROM users';

const addUser =
  'INSERT INTO users(First_name, Last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *';

const addPost =
  'INSERT INTO posts(title, body, img, id) VALUES($1, $2, $3, $4) RETURNING *';

const getPost = `SELECT users.id, Last_name, pid, title, body, posts.img
FROM users
INNER JOIN posts
ON users.id = posts.id;`;

const checkEmailExists =
  'SELECT user_email FROM users WHERE users.user_email = $1';

const loginUserData = 'SELECT * FROM users WHERE users.user_email = $1';

const updateImg = 'UPDATE users SET img = ($1) WHERE user_email = ($2)';

const getProfilePic = 'SELECT img FROM users WHERE users.id = $1';

const getFollowList = 'SELECT * FROM follower';

const increaseFollow = `UPDATE follower SET follow = follow + 1 WHERE id = ($1) AND pid = ($2)`;

const DecreaseFollow = `UPDATE follower SET follow = follow - 1 WHERE id = ($1) AND pid = ($2)`;

const insertFollower = `INSERT INTO follower(id, pid, follow) VALUES($1, $2, $3) RETURNING *`;

const followerExists = `SELECT id, pid, follow FROM follower WHERE id = ($1) AND pid = ($2)`;

module.exports = {
  createDatabase,
  createTable,
  getUser,
  addUser,
  checkEmailExists,
  loginUserData,
  updateImg,
  postTable,
  addPost,
  getPost,
  getProfilePic,
  getFollowList,
  increaseFollow,
  DecreaseFollow,
  insertFollower,
  followerExists,
  followerTable,
};
