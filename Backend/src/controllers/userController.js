const userModel = require('../models/userModel');
const generateToken = require('../config/jwtToken')
const bcrypt = require('bcrypt')


const saltRound = 10;
const createUser = async (req, res) => {
      try {
            let data = req.body;
            const { name, email, password } = data;
            if (!name || !email || !password) {
                  return res.status(400).send({ status: false, message: 'Please enter all fields' })
            }
            const userExists = await userModel.findOne({ email })
            if (userExists) {
                  return res.status(400).send({ status: false, message: 'user already exist' })
            }
            let hashedPass = bcrypt.hashSync(password,saltRound);
            data.password = hashedPass;
            const user = await userModel.create(data)
            if (user) {
                  return res.status(201).send({ status: true, message: 'user created succesfully' })
            }
      } catch (err) {
            return res.status(500).send({ status: false, error: err.message })
      }
}


const loginUser = async (req,res) => {
      try {
            let data = req.body;
            const {email,password} = data;
            if(!email || !password){
                  return res.status(400).send({status:false, message:'Please enter all fields'});
            }
            const checkUser = await userModel.findOne({email});
            if(!checkUser){
                  return res.status(400).send({status:false, message:'email is not exist'});
            }
            const bcryptPass = await bcrypt.compare(password.trim(), checkUser.password);
            if(!bcryptPass){
                  return res.status(400).send({status:false, message:'enter your correct password'});
            }
            let jwtToken = generateToken(checkUser._id)
            return res.status(200).send({status:true, message:'successfully login',token:jwtToken})
      } catch (err) {
            return res.status(500).send({status:false, error:err.message});
      }
}

module.exports = { createUser,loginUser }