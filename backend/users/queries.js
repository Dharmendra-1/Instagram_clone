const createDatabase = `CREATE DATABASE instagram`;

const createTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL,
  First_name VARCHAR(255) NOT NULL,
  Last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  resetToken VARCHAR(255),
  expireToken VARCHAR(255),
  img VARCHAR(255),
  PRIMARY KEY(id)
)`;

const postTable = `CREATE TABLE IF NOT EXISTS posts (
    pid SERIAL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    like_count INT DEFAULT 0,
    id int,
    PRIMARY KEY (pid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id)
)`;

const likesTable = `CREATE TABLE IF NOT EXISTS likes (
    lid SERIAL,
    id int,
    pid int,
    PRIMARY KEY (lid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id)
)`;

const commentsTable = `CREATE TABLE IF NOT EXISTS comments (
    cid SERIAL,
    comment VARCHAR(255),
    id int,
    pid int,
    PRIMARY KEY (cid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT FK_pid FOREIGN KEY (pid) REFERENCES posts(pid)
)`;

const followerTable = `CREATE TABLE IF NOT EXISTS follower(
 sid SERIAL,
 id INT NOT NULL,
 fid INT NOT NULL,
 follow INT NOT NULL,
 CONSTRAINT FK_id FOREIGN KEY(id) REFERENCES users(id)
)`;

const getUser = 'SELECT * FROM users';

const addUser =
  'INSERT INTO users(First_name, Last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *';

const addPost =
  'INSERT INTO posts(title, body, img, id) VALUES($1, $2, $3, $4) RETURNING *';

const getPost = `SELECT users.id, Last_name, First_name, posts.pid, title, body, posts.img, posts.like_count
FROM users
LEFT JOIN posts
  ON users.id = posts.id
`;

const deletePost = `DELETE FROM posts
WHERE posts.pid = $1 RETURNING *`;

const deleteComment = `DELETE FROM comments WHERE pid = $1`;
const deleteLike = `DELETE FROM likes WHERE pid = $1`;

const likeInsert = `INSERT INTO likes (id, pid) VALUES($1, $2)`;
const likeDelete = `DELETE FROM likes WHERE id=$1 AND pid=$2`;

const getLike = `SELECT * FROM likes`;
const checkLikeOfPost = `SELECT * FROM likes WHERE id =($1) AND pid = ($2)`;

const addComments = `INSERT INTO comments (comment, id, pid) VALUES($1, $2, $3) RETURNING id, pid, comment`;

const checkEmailExists =
  'SELECT user_email FROM users WHERE users.user_email = $1';

const loginUserData = 'SELECT * FROM users WHERE users.user_email = $1';

const updateImg = 'UPDATE users SET img = ($1) WHERE user_email = ($2)';

const getProfilePic = 'SELECT img FROM users WHERE users.id = $1';

const getFollowList = 'SELECT * FROM follower';

const increaseFollow = `UPDATE follower SET follow = ($3) WHERE id = ($1) AND fid = ($2)`;

const DecreaseFollow = `UPDATE follower SET follow = ($3) WHERE id = ($1) AND fid = ($2)`;

const insertFollower = `INSERT INTO follower(id, fid, follow) VALUES($1, $2, $3) RETURNING *`;

const followerExists = `SELECT id, fid, follow FROM follower WHERE id = ($1) AND fid = ($2)`;

const followExists = `SELECT follow from follower where id = ($1) AND fid = ($2)`;

const getComments = `SELECT users.Last_name, comments.cid, comments.comment , comments.id,comments.pid 
FROM users LEFT JOIN comments 
ON users.id=comments.id`;

const setToken = `UPDATE users SET resetToken = $1, expireToken = $2 WHERE user_email = $3 `;

const checkReset = `SELECT id from users WHERE resetToken = $1 AND expireToken >= $2`;

const updatePassword = `UPDATE users SET user_password = $1, resetToken = $2, expireToken = $3 WHERE id = $4`;

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
  followExists,
  deletePost,
  likesTable,
  commentsTable,
  likeInsert,
  likeDelete,
  getLike,
  addComments,
  getComments,
  deleteComment,
  checkLikeOfPost,
  deleteLike,
  setToken,
  checkReset,
  updatePassword,
};
