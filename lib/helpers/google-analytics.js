const gapi = require('googleapis')

const authorize = (jwt) => new Promise((resolve, reject) => {
    jwt.authorize((err, _) => {
        if (err)
            reject(`unable to authorize to googleapi (${err})`)
        else
            resolve()
    });
});

const login = async (email, path) => {
    let jwt = new gapi.auth.JWT(email, path, null, ['https://www.googleapis.com/auth/analytics.readonly'])
    await authorize(jwt)
    return jwt
}

const realtime = async (configuration) => {
    let expectParams = {
        auth: configuration.jwtClient,
        ids: `ga:${configuration.viewId}`,
        metrics: configuration.rt_metrics,
        dimensions: configuration.rt_dimensions,
        'max-results': configuration.maxResults
    }
    return new Promise(resolve => gapi.analytics('v3').data.realtime.get(expectParams, resolve))
}

module.exports = { login, realtime }