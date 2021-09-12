const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY
console.log(sendgridAPIKey)
sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'ender.o@geopagos.com',
    from: 'enderochoa@gmail.com',
    subject: 'This is my second creation!',
    text: 'I hope this one actually get to you.'
}).then(() => {
    console.log('Email sent')
}).catch((error) => {
   console.error(error)
})