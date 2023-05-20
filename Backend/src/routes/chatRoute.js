
const router = require('express').Router();
const { createChat, fetchChat } = require('../controllers/chatController');
const {auth} = require('../middlewares/authMiddleware')


router.post('/createChat',auth,createChat);

router.get('/fetchChat', auth, fetchChat)



module.exports = router;;