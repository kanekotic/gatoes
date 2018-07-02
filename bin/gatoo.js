#! /usr/bin/env node

const program = require('commander'),
  index = require('../lib/index'),
  packageJson = require('../package.json'),
  path = require('path')


program
  .version(packageJson.version)

program
  .command('console <email> <path> <viewId> <startDate> <endDate> <metrics> <dimensions>')
  .description('get data to console from google analytics')
  .action(async ( email, relativePath, viewId, startDate, endDate, metrics, dimensions) => {
    let params = {
    viewId: viewId,
    daterange:{
        "endDate":endDate,
        "startDate":startDate
      },
      metrics: metrics,
      dimensions: dimensions
    }
    await index.outputTo.console(email, path.join(__dirname, relativePath), params)
  })
  
  program.parse(process.argv)