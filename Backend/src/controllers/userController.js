const userModel = require('../models/userModel');
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


module.exports = { createUser }