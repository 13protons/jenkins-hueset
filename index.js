var hue = require('hueset');

module.exports = function(program) {
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
};
