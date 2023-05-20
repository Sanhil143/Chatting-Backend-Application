const router = require('express').Router();
const {createUser, loginUser, getAllUser} = require('../controllers/userController');
const { auth } = require('../middlewares/authMiddleware');

router.post('/signup', createUser)

router.post('/login',loginUser)

router.get('/getUser', auth, getAllUser);


module.exports = router;


