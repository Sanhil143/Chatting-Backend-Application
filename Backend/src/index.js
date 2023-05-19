const express = require('express');
require('colors')
require('dotenv').config();
const connectionDb = require('./config/dbconfig')


const server = express();
server.use(express.json());

connectionDb();



server.listen(process.env.PORT , () => {
      console.log(('Server is running on port ' + process.env.PORT).blue.bold.underline);
}) 