const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const publicDirectoryPath = path.join(__dirname,'./public')
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'./templates/views'))
hbs.registerPartials(path.join(__dirname,'/templates/partials'))

app.get('',(request, response)=>{
    response.send('Hello Express')
})

app.get('/example',(request, response)=>{
    let paymentMethod = 'VISA'
    if(request.query.paymentMethod && request.query.paymentMethod.length>0){
        paymentMethod = request.query.paymentMethod
    }
    response.send({
        bin:"400000",
        paymentMethod:paymentMethod,
        country:"AR"}
    )
})

app.get('/view',(request, response)=>{
    response.render('view',{
        bin:"400000",
        paymentMethod:"VISA",
        country:"AR"
    })
})

app.get('/search',(request, response)=>{
    response.render('search')
})

app.get('*',(request,response)=>{
    response.render('404')
})



app.listen(3000,()=>{
    console.log('server is up')
})
