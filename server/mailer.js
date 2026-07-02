var nodemailer = require('nodemailer');
var dns = require('dns');
var db = require('./db');

var transporter = null;

function createTransporter(port, secure, rejectUnauthorized) {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: port,
    secure: secure,
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    tls: { rejectUnauthorized: rejectUnauthorized },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    lookup: function(hostname, opts, cb) {
      dns.lookup(hostname, { family: 4, hints: dns.ADDRCONFIG }, cb);
    },
  });
}

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD');
  }
  transporter = createTransporter(465, true, true);
  return transporter;
}

getTransporter().verify().then(function() {
  console.log('Mail transporter verified');
}).catch(function(err) {
  console.error('Mail transporter FAILED (' + err.message + '), trying 587...');
  transporter = null;
  transporter = createTransporter(587, false, false);
  transporter.verify().then(function() {
    console.log('Mail transporter verified via 587');
  }).catch(function(err2) {
    console.error('Mail transporter also FAILED on 587:', err2.message);
  });
});

// Article sets — must match blog.html weekly rotation
var articleSets = [{f:{d:"May 26, 2026",c:"Eye Health",t:"The Hidden Cost of Blue Light: What the Research Actually Says",b:"A deep dive into the latest peer-reviewed studies on blue light exposure, circadian rhythms, and the surprising impact on long-term vision health.",u:"https://www.brightfocus.org/news/new-research-links-blue-light-to-macular-degeneration-risk-antioxidants-may-offer-hope"},g:[{d:"May 22, 2026",c:"Wellness",t:"5 Signs Your Screen Time Is Affecting Your Sleep",b:"Recognize the early warning signs of digital eye strain and circadian disruption before they become chronic.",u:"https://health.osu.edu/health/mental-health/how-screen-time-affects-your-health"},{d:"May 18, 2026",c:"Product",t:"Why We Built Silent Touch Instead of Voice Control",b:"Voice assistants are intrusive. Here\u2019s why we chose haptic touch for controlling your FocusFrame.",u:"#"},{d:"May 14, 2026",c:"Product",t:"FocusFrame vs. Traditional Blue-Light Glasses",b:"A full comparison of adaptive lens technology against conventional blue-light filtering solutions.",u:"#"},{d:"May 10, 2026",c:"Technology",t:"How Adaptive Lenses Actually Work",b:"The technology behind lenses that automatically adjust to ambient light and screen conditions.",u:"https://www.allaboutvision.com/eyewear/eyeglasses/lenses/photochromic/"},{d:"May 6, 2026",c:"Lifestyle",t:"Digital Minimalism: 3 Tools That Changed How We Work",b:"Our team\u2019s curated toolkit for reducing digital noise and reclaiming deep focus in a distracted world.",u:"https://www.configurationconnection.com/reclaim-your-time-focus-with-digital-minimalism"},{d:"May 2, 2026",c:"Company",t:"Qatar\u2019s Growing Role in Health-Tech Innovation",b:"How FocusFrame is contributing to Qatar\u2019s vision of becoming a global hub for health technology.",u:"#"}]},{f:{d:"May 25, 2026",c:"Eye Health",t:"Effective Tips for Reducing Eye Strain",b:"A Harvard Health guide to recognizing and preventing digital eye strain with simple daily habits and workspace adjustments.",u:"https://www.health.harvard.edu/staying-healthy/computer-related-eye-strain"},{d:"May 21, 2026",c:"Technology",t:"The Future of Smart Eyewear",b:"Where wearable display technology is headed and how FocusFrame fits into the next decade of human-computer interaction.",u:"#"}/*,{d:"May 17, 2026",c:"Wellness",t:"Screen Time and Mental Health: What the Data Says",b:"An analysis of recent studies linking prolonged screen exposure to anxiety, attention span, and overall well-being.",u:"#"},{d:"May 13, 2026",c:"Product",t:"Our Design Philosophy: Why We Chose Titanium",b:"The material science behind our 18g frame and how titanium alloy improves durability without adding weight.",u:"#"}*/];

function getWeekNumber(date) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function pickArticle() {
  var now = new Date();
  var weekNum = getWeekNumber(now);
  var setIndex = weekNum % articleSets.length;
  var set = articleSets[setIndex];
  var realArticles = set.g.filter(function(a) {
    return a.c !== 'Product' && a.c !== 'Company';
  });
  if (realArticles.length === 0) return null;
  var day = getDayOfYear(now);
  return realArticles[day % realArticles.length];
}

function buildEmailHtml(article) {
  return [
    '<!DOCTYPE html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#080c14;font-family:Inter,system-ui,sans-serif">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">',
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111827;border-radius:16px;overflow:hidden;border:1px solid rgba(99,102,241,0.15)">',
    '<tr><td style="padding:32px 40px 8px 40px">',
    '<p style="margin:0 0 4px 0;font-size:12px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600">' + article.c + '</p>',
    '<h1 style="margin:0 0 8px 0;font-size:22px;color:#f1f5f9;font-family:\'Space Grotesk\',Inter,sans-serif;font-weight:600;line-height:1.3">' + article.t + '</h1>',
    '<p style="margin:0 0 24px 0;font-size:15px;color:#94a3b8;line-height:1.6">' + article.b + '</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:#6366f1;padding:0">',
    '<a href="' + article.u + '" target="_blank" style="display:inline-block;padding:12px 28px;font-size:14px;color:#fff;text-decoration:none;font-weight:500;border-radius:8px">Read the Full Article</a>',
    '</td></tr></table>',
    '</td></tr>',
    '<tr><td style="padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06)">',
    '<p style="margin:0;font-size:13px;color:#64748b">You received this because you subscribed to the FocusFrame newsletter. <a href="mailto:hellofocusframe26@gmail.com" style="color:#6366f1;text-decoration:none">Unsubscribe</a></p>',
    '</td></tr></table></td></tr></table></body></html>'
  ].join('\n');
}

function buildWelcomeHtml() {
  return [
    '<!DOCTYPE html>',
    '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#080c14;font-family:Inter,system-ui,sans-serif">',
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 16px">',
    '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111827;border-radius:16px;overflow:hidden;border:1px solid rgba(99,102,241,0.15)">',
    '<tr><td style="padding:32px 40px 8px 40px">',
    '<p style="margin:0 0 4px 0;font-size:12px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600">Welcome</p>',
    '<h1 style="margin:0 0 8px 0;font-size:22px;color:#f1f5f9;font-family:\'Space Grotesk\',Inter,sans-serif;font-weight:600;line-height:1.3">You\'re in.</h1>',
    '<p style="margin:0 0 24px 0;font-size:15px;color:#94a3b8;line-height:1.6">Thanks for subscribing to the FocusFrame newsletter. You\'ll now receive weekly articles on eye health, technology, wellness, and lifestyle — delivered straight to your inbox every morning.</p>',
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:8px;background:#6366f1;padding:0">',
    '<a href="https://focus-frame.onrender.com/" target="_blank" style="display:inline-block;padding:12px 28px;font-size:14px;color:#fff;text-decoration:none;font-weight:500;border-radius:8px">Explore FocusFrame</a>',
    '</td></tr></table>',
    '</td></tr>',
    '<tr><td style="padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06)">',
    '<p style="margin:0;font-size:13px;color:#64748b">You received this because you subscribed to the FocusFrame newsletter. <a href="mailto:hellofocusframe26@gmail.com" style="color:#6366f1;text-decoration:none">Unsubscribe</a></p>',
    '</td></tr></table></td></tr></table></body></html>'
  ].join('\n');
}

async function sendWelcomeEmail(email) {
  var t = getTransporter();
  var senderName = process.env.SENDER_NAME || 'FocusFrame';
  await t.sendMail({
    from: '"' + senderName + '" <' + process.env.GMAIL_USER + '>',
    to: email,
    subject: 'Welcome to FocusFrame — You\'re in.',
    html: buildWelcomeHtml(),
  });
}

async function sendDailyArticle() {
  try {
    var article = pickArticle();
    if (!article) return 'no_article';
    var t = getTransporter();
    var emails = db.getAllEmails();
    if (emails.length === 0) return 'no_subs';
    var emailHtml = buildEmailHtml(article);
    var senderName = process.env.SENDER_NAME || 'FocusFrame';
    var sent = 0;
    var failed = 0;
    for (var j = 0; j < emails.length; j++) {
      try {
        await t.sendMail({
          from: '"' + senderName + '" <' + process.env.GMAIL_USER + '>',
          to: emails[j],
          subject: article.c + ': ' + article.t,
          html: emailHtml,
        });
        sent++;
      } catch (err) {
        console.error('Failed to send to ' + emails[j] + ':', err.message);
        failed++;
      }
    }
    return 'ok:' + sent + '/' + failed;
  } catch (err) {
    return 'err:' + err.message.slice(0, 100);
  }
}

module.exports = { sendDailyArticle, sendWelcomeEmail };
