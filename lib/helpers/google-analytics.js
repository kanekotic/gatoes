const gapi = require('googleapis').google

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

const get = async (jwtClient, configuration) => {
    let expectParams = {
        resource:{
            reportRequests:[
                {
                    viewId: configuration.viewId,
                    dateRanges: [configuration.daterange],
                    metrics:[
                        {
                            expression:configuration.metrics
                        }
                    ],
                    dimensions: [
                        {
                            name:configuration.dimensions
                        }
                    ]
                }
            ]
        }
    }
    let analyticsSetup = {
        version: 'v4',
        auth: jwtClient
    }
    return gapi.analyticsreporting(analyticsSetup).reports.batchGet(expectParams)
}

module.exports = { login, get }