require('dotenv').config();
var express = require('express');
var path = require('path');
var db = require('./db');

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

// GET /api/subscribers — list all emails (for send-daily.js remote use)
app.get('/api/subscribers', function(req, res) {
  var key = req.query.key;
  if (key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(db.getAllEmails());
});

app.listen(PORT, function() {
  console.log('FocusFrame running at http://localhost:' + PORT);
});
