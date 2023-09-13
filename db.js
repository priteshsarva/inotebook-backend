// require('dotenv').config();

import 'dotenv/config'

const Mongoose = require('mongoose'); 

const mongooseURI = process.env.MOGO_URI

const connectToMongo= async ()=>{
       await Mongoose.connect(mongooseURI);
}

module.exports = connectToMongo;