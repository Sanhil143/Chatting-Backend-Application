const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


const auth = async (req,res,next) => {
      let token = req.headers('x-auth-key');
      if(!token){
            return res.status(401).send({status:false, message:'token is missing, Authentication denied'});
      }
      try {
            let decode = jwt.verify(token,process.env.JWT_SECU_KEY);

            req.user = await userModel.findById(decode._id).select('-password');
            next();
      } catch (err) {
            return res.status(403).send({status:false, message:'Authorization failed'});
      }
}

module.exports = {auth}