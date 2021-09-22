const {calculateTip,add} = require('../math')

test('shouldcalculate total with tip',()=>{
    const total = calculateTip(100,.3)

    expect(total).toBe(130)
})

test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(2, 3)
    expect(sum).toBe(5)
})