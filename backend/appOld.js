const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const logger = require('./logger.js')
const binService = require('./binService.js')
const binValidator = require('./binValidator.js')

logger('Start')
logger('https://mead.io is valid:' + validator.isEmail('ender.o@geopagos.com'))

const command = process.argv[2]
if (command === 'help') {
    console.log(chalk.red.inverse.bold('usind process argv'));

}

yargs.command({
    command: 'add',
    describe: 'add bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        },
        paymentMethod: {
            describe: 'payment method VISA,MASTER',
            demandOption: true,
            type: 'string'
        },
        country: {
            describe: 'Bin Country',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        binService.add(argv.bin, argv.paymentMethod, argv.country)
    }
})

yargs.command({
    command: 'create',
    describe: 'create bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        },
        paymentMethod: {
            describe: 'payment method VISA,MASTER',
            demandOption: true,
            type: 'string'
        },
        country: {
            describe: 'Bin Country',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        binService.create(argv.bin, argv.paymentMethod, argv.country)
    }
})

yargs.command({
    command: 'get',
    describe: 'get by bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        data = binService.get(argv.bin)

    }
})

yargs.command({
    command: 'validate',
    describe: 'validate bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv =>{
        binValidator.validate(argv.bin,(data)=>{

            if(data.length===0){
                console.log(chalk.green('Bin:'+argv.bin+ ' is invalid'))
            }

            console.log(chalk.red('Bin:'+argv.bin+ ' is valid'))
            console.log(chalk.green.inverse( 'Bin:'+argv.bin+' is '+data.scheme))
        })
    }
})

yargs.command({
    command: 'update',
    describe: 'update by bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        },
        paymentMethod: {
            describe: 'payment method VISA,MASTER',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        data = binService.update(argv.bin,argv.paymentMethod)

    }
})

yargs.command({
    command: 'delete',
    describe: 'delete by bin',
    builder: {
        bin: {
            describe: 'bin 6 o 8 digits',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => {
        data = binService.deleter(argv.bin)

    }
})

yargs.parse()