const importer = require('./importer'),
    exporter = require('./exporter'),
    consoleAdapter = require('./adapters/console')

const console = (email,path,config) => exporter(email, path, config, consoleAdapter)


module.exports = { importer, exporter, outputTo : { console } }

