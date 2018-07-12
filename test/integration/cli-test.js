const coffee = require('coffee'),
    executable = require.resolve('../../bin/gatoo')

describe('cli', () => {
    it(`should retrieve the metrics from ga and show in console`, done => {
        let email = process.env.USER_EMAIL
        let username = process.env.USER_NAME
        let expected = '{"reports":[{"columnHeader":{"dimensions":["ga:date"],"metricHeader":{"metricHeaderEntries":[{"name":"ga:users","type":"INTEGER"}]}},"data":{"totals":[{"values":["0"]}],"isDataGolden":true}}]}\n'
        coffee.fork(executable, ['console', email, "../key.pem", username, "2017-06-29","2017-06-30", "ga:users", "ga:date"])
            .expect('stdout', expected)
            .expect('code', 0)
            .end(done)
    })
})