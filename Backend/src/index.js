const express = require('express');
const colors = require('colors')
const connectionDb = require('./config/dbconfig')


const server = express();
server.use(express.json());

connectionDb();



server.listen(5000 , () => {
      console.log(('Server is running on port ' + 5000).blue.bold.underline);
}) 