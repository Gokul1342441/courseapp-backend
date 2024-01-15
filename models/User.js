const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phonenumber:{
    type:Number,
    unique:true,
    require:true
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };