#! /usr/bin/env node
var program = require('commander');
var defaults = require('./defaults.js');
var main = require('./index.js');

program
  .version('0.0.1')
  // .option('-c --config [path]', 'JSON file used to set program options', defaults.config)
  .option('-u, --user [value]', 'Hue User Name', defaults.user)
  .option('-i, --ip [value]', 'IP address of hue hub', defaults.ip)
  .option('-l, --light <n>', 'Light number (1, 2, etc.)', defaults.light)
  .option('-a, --api [value]', 'API endpoint for Jenkins rest api (poits to a view)', defaults.api)
  .option('-s, --success [color]', 'CSS color for success state', defaults.success)
  .option('-f, --fail [color]', 'CSS color for fail state', defaults.fail)
  .option('-w, --warn [color]', 'CSS color for warn state', defaults.warn)
  .option('-b, --building [color]', 'CSS color for building state', defaults.building)
  .option('-j, --job [value]', 'Name of the Jenkins job to inspect', defaults.jobName)
  .option('-n, --neutral [color]', 'CSS color for neutral state', defaults.neutral)
  .parse(process.argv);

main(program);
