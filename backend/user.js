const validator = require('validator')
const yargs = require('yargs')
const userService = require('./userService.js')

yargs.command({
  command: 'add',
  describe: 'add user',
  builder: {
    name: {
      describe: 'name max length 40',
      demandOption: true,
      type: 'string'
    },
    age: {
      describe: 'age',
      demandOption: true,
      type: 'integer'
    }
  },
  handler: argv => {
    data = userService.add({
        name:argv.name,
        age: argv.age,
      email:argv.email}
    )

  }
})

yargs.parse()