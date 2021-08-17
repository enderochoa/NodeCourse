const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema;

const UserShema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    age: {
      type: Number
    }
  }
  );

module.exports = mongoose.model('users',UserShema)