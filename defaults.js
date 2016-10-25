module.exports = {
  user: process.env.hueuser || '1234',
  ip: process.env.hueip || '127.0.0.1',
  light: process.env.huelight || 1,
  api: process.env.jenkinsApi || 'http://localhost:8080/view/MyView/api/json',
  success: process.env.jenkinsSuccess || 'green',
  fail: process.env.jenkinsFail || 'red',
  warn: process.env.jenkinsWarn || 'yellow',
  building: process.env.jenkinsBuilding || 'blue',
  neutral: process.env.jenkinsNeutral || '#666'
}
