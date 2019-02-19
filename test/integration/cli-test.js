const coffee = require('coffee'),
    executable = require.resolve('../../bin/gatoo')

describe('cli', () => {
    it(`should retrieve the metrics from ga and show in console`, done => {
        let email = process.env.USER_EMAIL_GATOO
        let username = process.env.USER_NAME_GATOO
        let expected = '{"reports":[{"columnHeader":{"dimensions":["ga:date"],"metricHeader":{"metricHeaderEntries":[{"name":"ga:users","type":"INTEGER"}]}},"data":{"rows":[{"dimensions":["20181129"],"metrics":[{"values":["2"]}]},{"dimensions":["20181130"],"metrics":[{"values":["1"]}]}],"totals":[{"values":["3"]}],"rowCount":2,"minimums":[{"values":["1"]}],"maximums":[{"values":["2"]}],"isDataGolden":true}}]}\n'
        coffee.fork(executable, ['console', email, "../key.json", username, "2018-11-29","2018-11-30", "ga:users", "ga:date"])
            .expect('stdout', expected)
            .expect('code', 0)
            .end(done)
    })
})