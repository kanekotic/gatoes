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

module.exports = { login }