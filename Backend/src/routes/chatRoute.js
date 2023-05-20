
const router = require('express').Router();
const { createChat } = require('../controllers/chatController');
const {auth} = require('../middlewares/authMiddleware')


router.post('/createChat',auth,createChat);



module.exports = router;;