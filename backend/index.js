const express = require('express')
const userRouter = require('./userController')

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const password = 'Red12345!'
const hashedPassword = await bcrypt.hash(password, 8)

const isMatch = await bcrypt.compare('red12345!', hashedPassword)
console.log(isMatch)
