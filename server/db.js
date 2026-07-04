var fs = require('fs');
var path = require('path');

var DATA_DIR = path.join(__dirname, 'data');
var SUBSCRIBERS_PATH = path.join(DATA_DIR, 'subscribers.json');
var EXCEL_PATH = path.join(__dirname, '..', 'EMAIL_LIST.xlsx');

var XLSX = null;
try { XLSX = require('xlsx'); } catch (e) {}

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

function pad2(n) { return n < 10 ? '0' + n : '' + n; }

function appendToExcel(email) {
  if (!XLSX) return;
  try {
    var now = new Date();
    var dateStr = pad2(now.getDate()) + '/' + pad2(now.getMonth() + 1) + '/' + now.getFullYear();
    var timeStr = pad2(now.getHours()) + ':' + pad2(now.getMinutes());

    var wb;
    if (fs.existsSync(EXCEL_PATH)) {
      wb = XLSX.readFile(EXCEL_PATH);
    } else {
      wb = XLSX.utils.book_new();
      var hdr = [['Email', 'Date of Entering', 'Time of Entering', 'Subscribed for Daily Article']];
      var ws = XLSX.utils.aoa_to_sheet(hdr);
      ws['!cols'] = [{ wch: 40 }, { wch: 20 }, { wch: 20 }, { wch: 30 }];
      XLSX.utils.book_append_sheet(wb, ws, 'Emails');
    }

    var ws = wb.Sheets['Emails'];
    var ref = XLSX.utils.decode_range(ws['!ref']);
    var nextRow = ref.e.r + 1;
    XLSX.utils.sheet_add_aoa(ws, [[email, dateStr, timeStr, 'Yes']], { origin: nextRow });
    ws['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: nextRow, c: 3 } });
    XLSX.writeFile(wb, EXCEL_PATH);
  } catch (e) {
    console.error('Excel append error:', e.message);
  }
}

function addSubscriber(email) {
  var list = readSubscribers();
  var exists = list.some(function(s) { return s.email === email; });
  if (exists) return { success: true, message: 'Already subscribed' };
  list.push({ email: email, subscribed_at: new Date().toISOString() });
  writeSubscribers(list);
  appendToExcel(email);
  return { success: true };
}

function getAllEmails() {
  return readSubscribers().map(function(s) { return s.email; });
}

module.exports = { addSubscriber, getAllEmails };
