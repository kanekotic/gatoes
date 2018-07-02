const importer = require('./importer')

const exporter = async (email,path,config, adapter) => {
    let result = await importer(email,path,config)
    adapter(result)
 }

module.exports = exporter