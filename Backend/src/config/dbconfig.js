const mongoose = require('mongoose');
const colors = require('colors')

const connectDB = async () => {
      try{
            const conn = await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});
            console.log('DB is connected'.blue.bold.underline);
      }
      catch(err){
            console.log((err.message).red.bold);
      }
}
 
module.exports = connectDB