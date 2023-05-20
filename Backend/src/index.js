const express = require('express');
const connectionDb = require('./config/dbconfig')
const userRoute = require('./routes/userRoute')

const colors = require('colors')
const dotenv = require('dotenv').config();
const cors = require('cors')

const server = express();
server.use(express.json());
server.use(cors())

connectionDb();


server.use('/user', userRoute);

server.listen(process.env.PORT , () => {
      console.log(('Server is running on port ' + process.env.PORT).blue.bold.underline);
}) 