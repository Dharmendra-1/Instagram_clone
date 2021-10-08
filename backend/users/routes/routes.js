const { Router } = require('express');
const controller = require('../controller');
const router = Router();
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.get('/', controller.getUser);

router.post('/signup', validInfo, controller.addUser);

router.post('/login', controller.loginUser);

router.get('/verify', authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
