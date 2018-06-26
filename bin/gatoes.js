#! /usr/bin/env node

const program = require('commander'),
  index = require('../lib/index'),
  packageJson = require('../package.json')

program
  .version(packageJson.version)

program
  .command('realtime')
  .description('realtime updates')
  .action(() => 
      console.log(index.realtime())
  )

program
  .command('batch')
  .description('batch updates')
  .action(() => 
      console.log(index.batch())
  )
  
  program.parse(process.argv)