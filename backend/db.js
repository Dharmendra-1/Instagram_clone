const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "instagram",
  password: "Protozon1",
  port: 5432,
});

module.exports = pool;
