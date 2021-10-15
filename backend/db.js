const Pool = require('pg').Pool;
require('dotenv').config;

const pool = new Pool({
  connectionString: 'process.env.DATABASE_URL',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
