const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getUser);

router.post('/signup', controller.addUser);

router.post('/login', controller.loginUser);

module.exports = router;
