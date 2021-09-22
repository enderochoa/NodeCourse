const express = require('express')
const userRouter = require('./userController')
const taskController = require('./controller/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskController)

module.exports = app
