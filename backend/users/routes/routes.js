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

router.get('/getLike', controller.getLike);

router.post('/comment', controller.comment);

router.delete('/comment/:pid', controller.deleteComment);

router.post('/verify', authorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/img', controller.updateImg);

router.post('/follow', controller.getFollowList);

router.get('/followers', controller.getFollowers);

router.post('/defaultFollow', controller.defaultFollow);

router.get('/getComment', controller.getComment);

module.exports = router;
