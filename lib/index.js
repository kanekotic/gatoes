const importer = require('./importer'),
    exporter = require('./exporter'),
    consoleAdapter = require('./adapters/console')

const console = async (email,path,config) => await exporter(email, path, config, consoleAdapter)

module.exports = { importer, exporter, outputTo : { console } }

