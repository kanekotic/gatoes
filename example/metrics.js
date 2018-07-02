const importer = require('../lib/index').importer
    path = require('path')
    
const email = 'your email' //email account from the user credentials
    keyPath = path.join(__dirname, 'your credentials')// path to credentials json or pem
    config = {
    viewId: "some viewId",//the view id to query
    daterange:{
        "endDate":"2017-06-30",
        "startDate":"2016-06-30"
      },
      metrics: "ga:users",
      dimensions: "ga:date"
    }

const example = async () => {
    const result = await importer(email, keyPath, config)
    console.log(JSON.stringify(result.data))
}

example()