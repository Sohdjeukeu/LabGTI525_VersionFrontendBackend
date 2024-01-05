const mongoose = require('mongoose');

const connectDB = ()=>{
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DATABASE_URL);
    }catch (error) {
        console.log(error);
        process.exit(-1)
    }
}

module.exports = connectDB;