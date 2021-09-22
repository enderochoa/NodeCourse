const request = require('supertest')
const app = require('../app')

test('Should signup a new user',async ()=>{
    await request(app).post('/users').send({
        name:'Fernando',
        email:'fernando@example.com',
        password: 'MyPass777!'
    }).expect(201)

})
