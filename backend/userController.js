const binService = require('./userService.js')
const express = require('express')
const router = new express.Router()

router.post('/users', (req, res) => {
  try {
    const user = binService.add(req.body)
    console.log(user)
    res.send(user)
  } catch(e){
    console.log(e.toString())
    res.status(400).send(e)
  }
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id // Access the id provided

    const a = async () =>{
      const user =  await binService.findById(_id);
      return user
    }

    a().then((user)=>{
      console.log("user contro")
      console.log(user)
      if(!user){
        return res.status(404).send()
      }
      res.send(user)

    }).catch((e)=>{
      console.log(e)
      res.status(500).send()
    })
})

module.exports = router