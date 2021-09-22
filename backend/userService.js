const mongoose = require('mongoose')
const validator = require('validator')
const User = require('./model/UserShema')

const add = (userJson) =>{
  const {name,age,email,password} = userJson;

  console.log(process.env.MONGO)

  mongoose.connect(process.env.MONGO,
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
    email:email,
    password:password
  })

  user.save().then(() => {
    return user
  }).catch((error) => {
    // console.log('Error!', error)
    throw new Error();

  })
}

const findById = id => {
  mongoose.connect(process.env.MONGO,
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

    console.log("user service")
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