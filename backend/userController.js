const binService = require('./userService.js')

const express = require('express')
const app = express()

app.use(express.json())

app.post('/users', (req, res) => {
  try {
    const user = binService.add(req.body)
    console.log(user)
    res.send(user)
  } catch(e){
    console.log(e.toString())
    res.status(400).send(e)
  }
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id // Access the id provided

  try {
    const user = binService.findById(_id);
    console.log("user")
    console.log(user)
    if(!user){
      return res.status(404).send()
    }
    res.send(user)
  } catch(e) {
    console.log(e)
    res.status(500).send()
  }

})


app.listen(3001,()=>{
  console.log('server is up')
})