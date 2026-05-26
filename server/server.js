require('dotenv').config();
var express = require('express');
var path = require('path');
var db = require('./db');
var mailer = require('./mailer');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve the FocusFrame static site
app.use(express.static(path.join(__dirname, '..')));

// POST /api/subscribe — save email to JSON database
app.post('/api/subscribe', function(req, res) {
  var email = (req.body.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  var result = db.addSubscriber(email);
  res.json(result);
});

// GET /api/send-daily — triggered by cron-job.org to send daily article
app.get('/api/send-daily', async function(req, res) {
  if (req.query.key !== process.env.CRON_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  var result = await mailer.sendDailyArticle();
  res.json(result);
});

app.listen(PORT, function() {
  console.log('FocusFrame running at http://localhost:' + PORT);
});
