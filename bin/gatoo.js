#! /usr/bin/env node

const program = require('commander'),
  index = require('../lib/index'),
  packageJson = require('../package.json')

program
  .version(packageJson.version)

program
  .command('console')
  .description('get data to console from google analytics')
  .action(() => 
      console.log("TODO")
  )
  
  program.parse(process.argv)