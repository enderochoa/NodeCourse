const binService = require('./userService.js')
const express = require('express')
const router = new express.Router()
const User = require('./model/UserShema')
const auth = require('./middleware/auth')


router.post('/users', async (req, res) => {
  try {
    const user = await binService.add(req.body)
    res.status(201).send( user)
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

const multer = require('multer')
const upload = multer({
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error('Please upload a image'))
    }
    cb(undefined, true)
  }
})

const sharp = require('sharp')



router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250
  }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router