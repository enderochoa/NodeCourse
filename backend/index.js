const express = require('express')
const userRouter = require('./userController')
const taskController = require('./controller/task')

const app = express()
const port = process.env.PORT || 3001

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskController)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


