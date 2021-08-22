const binService = require('./userService.js')
const express = require('express')
const router = new express.Router()
const User = require('./model/UserShema')
const auth = require('./middleware/auth')


router.post('/users', async (req, res) => {
  try {
    const user = await binService.add(req.body)
    res.send( user)
  } catch(e){
    // console.log(e.toString())
    res.status(400).send(e)
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id // Access the id provided

    try{
      const user =  await binService.findById(_id);

      console.log("user contro")
      console.log(user)

      if(!user){
        return res.status(404).send()
      }
      res.send(user)

    } catch(e){
      console.log(e)
      res.status(500).send()
    }
})



router.patch('/users/:id', async (req, res) => {

  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    console.log("antes")
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    console.log("aqu")
    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})



module.exports = router