const binService = require('./userService.js')

const express = require('express')
const app = express()

app.use(express.json())

app.post('/users', (req, res) => {

  try {
    const user = binService.add(req.body)
    res.send(user)
  } catch(e){
    res.status(400).send(e)
  }
})



app.listen(3000,()=>{
  console.log('server is up')
})