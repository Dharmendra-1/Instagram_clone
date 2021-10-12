const { Router } = require('express');
const controller = require('../controller');
const router = Router();
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.get('/', controller.getUser);

router.post('/signup', validInfo, controller.addUser);

router.post('/login', validInfo, controller.loginUser);

router.get('/home', controller.homeUser);

router.post('/profile/img', controller.getProfilePic);

router.post('/post', controller.createPost);

router.get('/post', controller.getPost);

router.delete('/post/:pid', controller.deletePost);

router.put('/like', controller.like);
router.put('/unlike', controller.unlike);

router.post('/comment', controller.comment);

router.post('/verify', authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/img', controller.updateImg);

router.post('/follow', controller.getFollowList);

module.exports = router;
