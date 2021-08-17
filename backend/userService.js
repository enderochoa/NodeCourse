const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./model/UserShema')

const add = (userJson) =>{
  const {name,age,email} = userJson;
  
  mongoose.connect('mongodb://127.0.0.1:27017/bines',
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }).catch(error=>{
      console.log("cant connect")
      throw new Error(error.toString())

    })

  const user = new User({
    name: name,
    age: age,
    email:email
  })
 
  user.save().then(() => {
    return user
  }).catch((error) => {
    console.log('Error!', error)
    throw new Error(error.toString());

  })
}

const findById = id => {
  mongoose.connect('mongodb://127.0.0.1:27017/bines',
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }).catch(error=>{
    console.log("cant connect")
    throw new Error(error.toString())
  })

  User.findById(id).then((user) => {

    if (!user) {
      return null;
    }
    console.log(user)
    return user
  }).catch((e) => {
    console.log(e.toString());
    throw new Error(e.toString())
  })
}

module.exports = {
  add,
  findById
}