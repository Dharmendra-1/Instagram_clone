const createDatabase = `CREATE DATABASE instagram`;

const createTable = `CREATE TABLE IF NOT EXISTS users(
  id SERIAL,
  First_name VARCHAR(255) NOT NULL,
  Last_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  PRIMARY KEY(id)
)`;

const postTable = `CREATE TABLE IF NOT EXISTS posts (
    pid SERIAL,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    id int,
    PRIMARY KEY (pid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id)
)`;

const likesTable = `CREATE TABLE IF NOT EXISTS likes (
    lid SERIAL,
    like_count int NOT NULL,
    id int,
    pid int,
    PRIMARY KEY (lid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT FK_pid FOREIGN KEY (pid) REFERENCES posts(pid)
)`;

const commentsTable = `CREATE TABLE IF NOT EXISTS comments (
    cid SERIAL,
    comment VARCHAR(255) NOT NULL,
    id int,
    pid int,
    PRIMARY KEY (cid),
    CONSTRAINT FK_id FOREIGN KEY (id) REFERENCES users(id),
    CONSTRAINT FK_pid FOREIGN KEY (pid) REFERENCES posts(pid)
)`;

const getUser = 'SELECT * FROM users';

const addUser =
  'INSERT INTO users(First_name, Last_name, user_email, user_password) VALUES($1, $2, $3, $4) RETURNING *';

const addPost =
  'INSERT INTO posts(title, body, img, id) VALUES($1, $2, $3, $4) RETURNING *';

const getPost = `SELECT users.id, Last_name, posts.pid, title, body, posts.img, like_count, comment
FROM users
INNER JOIN posts
  ON posts.id = users.id
INNER JOIN likes
  ON likes.pid = posts.pid
INNER JOIN comments
  ON comments.pid = posts.pid`;

const deletePost = `DELETE FROM posts
WHERE posts.pid = $1 RETURNING *`;

const addLikes = `UPDATE likes SET like = like + 1 WHERE id=($1) and pid=($2) RETURNING like, id, pid`;

const addComments = `INSERT INTO comments(comment) VALUES($1) WHERE id = ($2) and pid = ($3) RETURNING comment WHERE pid = ($3)`;

const checkEmailExists =
  'SELECT user_email FROM users WHERE users.user_email = $1';

const loginUserData = 'SELECT * FROM users WHERE users.user_email = $1';

const updateImg = 'UPDATE users SET img = ($1) WHERE user_email = ($2)';

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
  deletePost,
  likesTable,
  commentsTable,
  addLikes,
  addComments,
};
