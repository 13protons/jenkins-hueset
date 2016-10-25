#! /usr/bin/env node
var http = require('http');
var program = require('commander');
var hue = require('./index.js');

var defaults = require('./defaults.js');

program
  .version('0.0.1')
  .option('-u, --user [value]', 'Hue User Name', defaults.user)
  .option('-i, --ip [value]', 'IP address of hue hub', defaults.ip)
  .option('-l, --light <n>', 'Light number (1, 2, etc.)', defaults.light)
  .option('-a, --api [value]', 'API endpoint for Jenkins rest api (poits to a view)')
  .option('-s, --success [color]', 'CSS color for success state', defaults.success)
  .option('-f, --fail [color]', 'CSS color for fail state', defaults.fail)
  .option('-w, --warn [color]', 'CSS color for warn state', defaults.warn)
  .option('-b, --building [color]', 'CSS color for building state', defaults.building)
  .option('-n, --neutral [color]', 'CSS color for neutral state', defaults.neutral)
  .parse(process.argv);

var light = new hue.light(program.user, program.ip, program.light);

// determine state from call to API
getContent(program.api)
  .then((json) => {
    var data = JSON.parse(json);
    console.log(data);
    // figure out statuses
    // success: _.every(data, ['status', 'SUCCESS']);
    // failure: _.some(data, ['status', 'FAILURE']);
    // building: building, all other success
    // warning: building, any other FAILURE
    // neutral: all neutral
    return 'fail';
  })
  .then(function(status){
    status = status || 'neutral';
    light.on(program[status]);
  })
  .catch((err) => console.error(err));

const getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    const request = http.get(url, (res) => {
      // handle http errors
      if (res.statusCode < 200 || res.statusCode > 299) {
         reject(new Error('Failed to load Jenkins API, status code: ' + res.statusCode));
       }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      res.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      res.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};
