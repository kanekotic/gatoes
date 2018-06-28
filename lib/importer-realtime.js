const analytics = require('./helpers/google-analytics')

const importer = async (email, path, config) => {
    let client = await analytics.login(email, path)
    return analytics.realtime(client, config)
 }

module.exports = importer