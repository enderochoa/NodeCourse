const mongoose = require('mongoose')
const User = require('./model/UserShema')

mongoose.connect('mongodb://127.0.0.1:27017/bines',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        findAndModify:false
    }).catch(error=>{
    console.log("cant connect")
    throw new Error(error.toString())

})

User.findByIdAndUpdate('611bbde488e1432bd6c1d557',{age:31})
    .then(user=>{
        console.log(user)
        return User.countDocuments({age:31})
    }).then(countDocuments=>{
        console.log(countDocuments)
    }).catch(e=>{
        console.log(e)
    })