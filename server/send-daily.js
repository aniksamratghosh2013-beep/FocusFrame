require('dotenv').config();
var mailer = require('./mailer');

mailer.sendDailyArticle().then(function(result) {
  console.log(JSON.stringify(result, null, 2));
}).catch(function(err) {
  console.error('Script failed:', err);
  process.exit(1);
});
