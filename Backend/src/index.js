const express = require('express');
const connectionDb = require('./config/dbconfig')
const userRoute = require('./routes/userRoute')

require('colors')
require('dotenv').config();
const server = express();
server.use(express.json());

connectionDb();

server.use('/user', userRoute);

server.listen(process.env.PORT , () => {
      console.log(('Server is running on port ' + process.env.PORT).blue.bold.underline);
}) 