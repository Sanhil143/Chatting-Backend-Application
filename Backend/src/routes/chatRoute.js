
const router = require('express').Router();
const { createChat, fetchChat, createGroupChat, renameGroup, addTOGroup, removeFromGroup } = require('../controllers/chatController');
const {auth} = require('../middlewares/authMiddleware')


router.post('/createChat',auth,createChat);

router.get('/fetchChat', auth, fetchChat);

router.post('/createGroup',auth,createGroupChat);

router.put('/renameGroup',auth, renameGroup)

router.put('/addMember',auth,addTOGroup) 

router.delete('/deleteMember',auth,removeFromGroup)

module.exports = router;;