const request = require('request')
const chalk = require('chalk')

const validate = (bin,callback) => {
    const url = "https://api.promptapi.com/bincheck/" + bin
    const apiKey = 'HKdtRNDMsHDvXU58Ss2KYzHXZHvtC0wi';

    const options = {
        url: url,
        json: true,
        redirect: 'follow',
        headers: {
            'apiKey': apiKey
        }
    };
    request(options, (error, response) => {
        if (error) {
            console.log(chalk.red('unable to connect'))
            callback('')
            return false
        }

        callback(response.body)

    })
}

module.exports = {
    validate: validate
}

