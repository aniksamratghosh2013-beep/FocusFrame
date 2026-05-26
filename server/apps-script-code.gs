// Google Apps Script — FocusFrame Newsletter Subscriber Database
// Deploy as Web App: Execute as "Me", Access "Anyone"
// 1. Go to https://script.google.com
// 2. Create new project, paste this code
// 3. Deploy > New Deployment > Web App
// 4. Copy the web app URL

var SHEET_NAME = 'Subscribers';
var API_KEY = ''; // ← Set a secret key for the GET endpoint

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var email = (data.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond({ error: 'Invalid email' }, 400);
    }

    var sheet = getSheet();
    var existing = sheet.getDataRange().getValues();

    for (var i = 0; i < existing.length; i++) {
      if (existing[i][0] === email) {
        return respond({ success: true, message: 'Already subscribed' });
      }
    }

    sheet.appendRow([email, new Date().toISOString()]);
    return respond({ success: true });
  } catch (err) {
    return respond({ error: err.message }, 500);
  }
}

function doGet(e) {
  if (!API_KEY || e.parameter.key !== API_KEY) {
    return respond({ error: 'Unauthorized' }, 401);
  }

  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var emails = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) emails.push(data[i][0]);
  }

  return respond({ emails: emails });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Email', 'Subscribed At']);
  }
  return sheet;
}

function respond(data, status) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  if (status) output.setStatusCode(status);
  return output;
}
