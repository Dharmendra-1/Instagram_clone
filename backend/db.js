const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'osftxcuczmsakg',
  host: 'ec2-54-158-247-97.compute-1.amazonaws.com',
  database: 'd4c0j60a6join9',
  password: '24f31020f6cf036303aa02b8dafd14bdf06e994e28b98b33e95ce30c603d9196',
  port: 5432,
});

module.exports = pool;
