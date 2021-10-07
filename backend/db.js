const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'instagram',
  password: 'jk@123',
  port: 5432,
});

module.exports = pool;
