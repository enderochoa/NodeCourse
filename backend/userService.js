const mongoose = require('mongoose')
const validator = require('validator')


const add = (userJson) =>{
  const {name,age,email} = userJson;

  mongoose.connect('mongodb://127.0.0.1:27017/bines',
    {
      useNewUrlParser: true,
      useCreateIndex: true
    })

  const User = mongoose.model('User', {
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
        validate (value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
          }
        }
      },
      age: {
        type: Number
      }
    }
  )

  const user = new User({
    name: name,
    age: age,
    email:email
  })

  user.save().then(() => {
    return user
  })
  /*.catch((error) => {
    console.log('Error!', error)
  })*/

}

module.exports = {
  add
}