var fs = require('fs');
var path = require('path');

var DATA_DIR = path.join(__dirname, 'data');
var SUBSCRIBERS_PATH = path.join(DATA_DIR, 'subscribers.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readSubscribers() {
  ensureDataDir();
  if (!fs.existsSync(SUBSCRIBERS_PATH)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function writeSubscribers(list) {
  ensureDataDir();
  fs.writeFileSync(SUBSCRIBERS_PATH, JSON.stringify(list, null, 2), 'utf8');
}

function addSubscriber(email) {
  var list = readSubscribers();
  var exists = list.some(function(s) { return s.email === email; });
  if (exists) return { success: true, message: 'Already subscribed' };
  list.push({ email: email, subscribed_at: new Date().toISOString() });
  writeSubscribers(list);
  return { success: true };
}

function getAllEmails() {
  return readSubscribers().map(function(s) { return s.email; });
}

function getAllSubscribers() {
  return readSubscribers();
}

module.exports = { addSubscriber, getAllEmails, getAllSubscribers };
