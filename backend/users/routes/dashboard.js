const router = require('express').Router();
const pool = require('../../db');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      req.user.email,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
