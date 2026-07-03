require('dotenv').config();
var mailer = require('./mailer');
mailer.sendWelcomeEmail('hellofocusframe26@gmail.com').then(function(r) {
  console.log('OK', r);
}).catch(function(e) {
  console.log('ERR', e.message);
});
