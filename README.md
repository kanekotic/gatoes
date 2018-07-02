# ![logomakr_32f2md](https://user-images.githubusercontent.com/3071208/42147664-29898cca-7dcf-11e8-9c50-2cf3845b7fe8.png)

[![Build Status](https://travis-ci.org/kanekotic/gatoes.svg?branch=master)](https://travis-ci.org/kanekotic/gatoes)
[![Coverage Status](https://coveralls.io/repos/github/kanekotic/gatoes/badge.svg?branch=master)](https://coveralls.io/github/kanekotic/gatoes?branch=master)

this project will provide a command line and a library to export google analytics to your prefered endpoint (console, log management, or db).

## Use as library

first step is to add this to your project throught `yarn add gatoo` or `npm install gatoo`

currently you can retrieve in a simple way data from google analytics and route it to your prefered output. An example of retreaval is the next one.

```js
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
```

## Use as Command Line

Soon

## TODO

- [x] Retrieve data from google analytics 
- [x] Create library
- [ ] Create adapter for output console  
- [ ] Create adapter logstash  
- [ ] Create adapter fluentd  
- [ ] Create adapter ES  
- [ ] Create command line tool  

### Logo
Check out the new logo that I created on <a href="http://logomakr.com" title="Logo Makr">LogoMakr.com</a> https://logomakr.com/32f2Md

