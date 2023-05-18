const mongoose = require('mongoose');
const colors = require('colors')

const connectDB = async () => {
      try{
            const conn = await mongoose.connect('mongodb+srv://sanhil143:raisahab12345@sanhildb.kk3knyj.mongodb.net/chatApp',{useNewUrlParser:true});
            console.log('DB is connected'.blue.bold.underline);
      }
      catch(err){
            console.log((err.message).red.bold);
      }
}

module.exports = connectDB