#! /usr/bin/env node
var http = require('http');
var program = require('commander');
var hue = require('hueset');

var defaults = require('./defaults.js');

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

var colorMap = {
  red: program.fail,
  red_anime: program.warn,
  yellow: program.warn,
  yellow_anime: program.building,
  blue: program.success,
  blue_anime: program.building,
  grey: program.neutral,
  grey_anime: program.neutral,
  disabled: program.neutral,
  disabled_anime: program.neutral,
  aborted: program.neutral,
  aborted_anime: program.neutral,
  notbuilt: program.neutral,
  notbuilt_anime: program.neutral
}

var light = new hue.light(program.user, program.ip, program.light);
var jenkins = require('jenkins')({ baseUrl: program.api, crumbIssuer: true });

jenkins.job.get(program.job, function(err, data) {
  if (err) throw err;
  var color = colorMap[data.color]
  console.log('Job', program.job, 'is', data.color + '. Setting light', program.light, 'to', color);
  light.on(color);
});
