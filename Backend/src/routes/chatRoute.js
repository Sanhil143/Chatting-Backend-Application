
const router = require('express').Router();
const { createChat, fetchChat, createGroupChat, renameGroup } = require('../controllers/chatController');
const {auth} = require('../middlewares/authMiddleware')


router.post('/createChat',auth,createChat);

router.get('/fetchChat', auth, fetchChat);

router.post('/createGroup',auth,createGroupChat);

router.put('/renameGroup',auth, renameGroup)



module.exports = router;;