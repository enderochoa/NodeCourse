

const localFileSystem = require('fs')
const { MongoClient , ObjectID } =require('mongodb')

const add = (bin, paymentMethod, country) => {

    const bins = load();

    debugger

    const duplicateBins = bins.filter(function (bin) {
        return bin.bin === bin
    })

    if (duplicateBins.length === 0) {
        const binJson = {
            bin: bin,
            paymentMethod: paymentMethod,
            country: country
        }

        bins.push(binJson)
        save(bins)
    }
}

const save = (bins) => {
    const binString = JSON.stringify(bins)
    localFileSystem.writeFileSync('data/bins.json', binString)
}

const load = () => {
    try {
        const dataBuffer = localFileSystem.readFileSync('data/bins.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const create = (bin, paymentMethod, country) =>{
    const connectionURL ='mongodb://127.0.0.1:27017'
    const databaseName = 'bines'

    console.log(new ObjectID)

    MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client) =>{
        if (error){
            return console.log('UNable to connect to database')
        }

        const db = client.db(databaseName)
        db.collection('bin').insertOne({
            bin:bin,
            paymentMethod: paymentMethod,
            country :country
        })
        return true
    })
}

const get= (bin)=> {
    const connectionURL ='mongodb://127.0.0.1:27017'
    const databaseName = 'bines'

    console.log(new ObjectID)

    MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client) =>{
        if (error){
            return console.log('UNable to connect to database')
        }

        const db = client.db(databaseName)

        db.collection('bin').find({bin:bin}).toArray((error,data)=>{
            console .log(data)
        })

        const doWorkPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([7, 4, 1])
            // reject('Things went wrong!')
            }, 2000)
        })
        doWorkPromise.then((result) => {
            console.log('Success!', result)
        }).catch((error) => {
            console.log('Error!', error)
        })

        return true
    })

}

const update = (bin, paymentMethod) =>{
    const connectionURL ='mongodb://127.0.0.1:27017'
    const databaseName = 'bines'

    MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client) => {

        const db = client.db(databaseName)

        if (error) {
            return console.log('UNable to connect to database')
        }
        db.collection('bin').updateOne({
            bin:bin
        }, {
            $set: {
                paymentMethod: paymentMethod
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

    })
}

const deleter = (bin) =>{
    const connectionURL ='mongodb://127.0.0.1:27017'
    const databaseName = 'bines'

    MongoClient.connect(connectionURL,{useUnifiedTopology:true},(error,client) => {

        const db = client.db(databaseName)

        if (error) {
            return console.log('UNable to connect to database')
        }
        db.collection('bin').deleteOne({
            bin:bin
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

    })
}

module.exports = {
    add: add,
    create,
    get,
    update,
    deleter
}