const localFileSystem = require('fs')

const local = function (text) {
    //localFileSystem.writeFileSync('logs/log.txt',text)
    localFileSystem.appendFileSync('logs/log.txt', text + '\n')
}

module.exports = local
