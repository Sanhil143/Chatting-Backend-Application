const router = require('express').Router();
const {createUser} = require('../controllers/userController')

router.post('/signup', createUser)


module.exports = router;



