var db = require('./db');

var articleSets = [{f:{d:"May 26, 2026",c:"Eye Health",t:"The Hidden Cost of Blue Light: What the Research Actually Says",b:"A deep dive into the latest peer-reviewed studies on blue light exposure, circadian rhythms, and the surprising impact on long-term vision health.",u:"https://www.brightfocus.org/news/new-research-links-blue-light-to-macular-degeneration-risk-antioxidants-may-offer-hope"},g:[{d:"May 22, 2026",c:"Wellness",t:"5 Signs Your Screen Time Is Affecting Your Sleep",b:"Recognize the early warning signs of digital eye strain and circadian disruption before they become chronic.",u:"https://health.osu.edu/health/mental-health/how-screen-time-affects-your-health"},{d:"May 18, 2026",c:"Product",t:"Why We Built Silent Touch Instead of Voice Control",b:"Voice assistants are intrusive. Here\u2019s why we chose haptic touch for controlling your FocusFrame.",u:"#"},{d:"May 14, 2026",c:"Product",t:"FocusFrame vs. Traditional Blue-Light Glasses",b:"A full comparison of adaptive lens technology against conventional blue-light filtering solutions.",u:"#"},{d:"May 10, 2026",c:"Technology",t:"How Adaptive Lenses Actually Work",b:"The technology behind lenses that automatically adjust to ambient light and screen conditions.",u:"https://www.allaboutvision.com/eyewear/eyeglasses/lenses/photochromic/"},{d:"May 6, 2026",c:"Lifestyle",t:"Digital Minimalism: 3 Tools That Changed How We Work",b:"Our team\u2019s curated toolkit for reducing digital noise and reclaiming deep focus in a distracted world.",u:"https://www.configurationconnection.com/reclaim-your-time-focus-with-digital-minimalism"},{d:"May 2, 2026",c:"Company",t:"Qatar\u2019s Growing Role in Health-Tech Innovation",b:"How FocusFrame is contributing to Qatar\u2019s vision of becoming a global hub for health technology.",u:"#"}]},{f:{d:"May 25, 2026",c:"Eye Health",t:"Effective Tips for Reducing Eye Strain",b:"A Harvard Health guide to recognizing and preventing digital eye strain with simple daily habits and workspace adjustments.",u:"https://www.health.harvard.edu/diseases-and-conditions/computer-vision-syndrome"},g:[{d:"May 21, 2026",c:"Wellness",t:"The Pomodoro Technique: A Scientific Breakdown",b:"Why 25-minute focus intervals work and how to adapt them for modern workflows.",u:"https://www.forbes.com/sites/bryancollinseurope/2024/03/14/the-pomodoro-technique-6-productivity-tools-for-2024/"},{d:"May 17, 2026",c:"Product",t:"What\u2019s in the Box: FocusFrame Unboxing Guide",b:"Everything you get when your FocusFrame arrives, from the titanium frame to the wireless charging case.",u:"#"},{d:"May 13, 2026",c:"Product",t:"Frame Materials Compared: Titanium vs TR-90 vs Acetate",b:"A deep dive into why we chose titanium alloy for FocusFrame over TR-90 and acetate alternatives.",u:"https://www.eyebuydirect.com/blog/titanium-vs-t90/"},{d:"May 9, 2026",c:"Technology",t:"The Future of Wearable Displays",b:"From early monochrome HUDs to transparent AR waveguides \u2014 the evolution of wearable display technology.",u:"https://www.androidauthority.com/augmented-reality-glasses-guide-3445603/"},{d:"May 5, 2026",c:"Lifestyle",t:"How to Build a Distraction-Free Workspace",b:"Practical tips for designing a physical and digital environment that supports deep focus.",u:"https://www.nytimes.com/guides/smarterliving/how-to-actually-be-less-distracted"},{d:"May 1, 2026",c:"Company",t:"Behind the Name: Why FocusFrame",b:"The story behind the name and what it represents for our mission and values.",u:"#"}]},{f:{d:"May 24, 2026",c:"Eye Health",t:"Screen Time and Children: What Parents Need to Know",b:"Expert guidance on managing screen exposure for children without eliminating technology entirely.",u:"https://www.aao.org/eye-health/tips-prevention/screen-time-and-children"},g:[{d:"May 20, 2026",c:"Wellness",t:"How to Stay Hydrated During Long Work Sessions",b:"The connection between hydration, focus, and eye comfort \u2014 with practical tracking tips.",u:"https://www.healthline.com/health/how-to-stay-hydrated"},{d:"May 16, 2026",c:"Product",t:"FocusFrame Firmware Update: What\u2019s New",b:"The latest firmware brings improved gesture recognition, faster lens transitions, and new AR modes.",u:"#"},{d:"May 12, 2026",c:"Product",t:"Designing for All-Day Wear: How We Engineered 18g",b:"The engineering decisions that let FocusFrame disappear on your face while delivering smart functionality.",u:"#"},{d:"May 8, 2026",c:"Technology",t:"Electrochromic vs Photochromic: Key Differences",b:"Understanding the two major smart lens technologies and why electrochromic wins for instant adaptation.",u:"https://www.opticaljournal.com/electrochromic-vs-photochromic-lenses/"},{d:"May 4, 2026",c:"Lifestyle",t:"The 8 Best Productivity Apps in 2026",b:"Our curated list of apps that respect your focus \u2014 no notifications, no dark patterns, just results.",u:"https://www.pcmag.com/picks/the-best-productivity-apps"},{d:"Apr 30, 2026",c:"Company",t:"FocusFrame\u2019s Sustainability Commitment",b:"Our approach to responsible manufacturing, material sourcing, and end-of-life recycling.",u:"#"}]},{f:{d:"May 23, 2026",c:"Eye Health",t:"20-20-20 Rule: Does It Actually Work?",b:"We examine the evidence behind the most famous eye strain prevention rule and offer practical alternatives.",u:"https://www.medicalnewstoday.com/articles/20-20-20-rule"},g:[{d:"May 19, 2026",c:"Wellness",t:"Morning Routines of High-Performers",b:"How successful people structure their first hour \u2014 and what it has to do with screen exposure.",u:"https://www.cnbc.com/2024/02/15/morning-routines-of-successful-people.html"},{d:"May 15, 2026",c:"Product",t:"FocusFrame Color Collection Announced",b:"New frame colors available \u2014 Midnight Black, Lunar Silver, and limited-edition Doha Gold.",u:"#"},{d:"May 11, 2026",c:"Product",t:"How to Clean and Maintain Your FocusFrame",b:"Proper care guidelines to keep your FocusFrame looking and performing like new.",u:"#"},{d:"May 7, 2026",c:"Technology",t:"Understanding Bluetooth 5.3 and Why It Matters",b:"How the latest Bluetooth standard enables instant pairing, greater range, and lower power consumption.",u:"https://www.techrepublic.com/article/bluetooth-5-3-explained/"},{d:"May 3, 2026",c:"Lifestyle",t:"Reading More in a Screen-Obsessed World",b:"Strategies for rebuilding your reading habit when every app fights for your attention.",u:"https://www.theguardian.com/books/2024/jan/10/how-to-read-more-books-tips"},{d:"Apr 29, 2026",c:"Company",t:"Join the FocusFrame Beta Program",b:"Be among the first to test new features before they launch. Sign up for the beta program today.",u:"#"}]}];

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

async function sendEmail(to, subject, html) {
  var fromEmail = process.env.BREVO_FROM || 'hellofocusframe26@gmail.com';
  var fromName = process.env.SENDER_NAME || 'FocusFrame';
  var resp = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: fromName, email: fromEmail },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
    }),
  });
  var data = await resp.json();
  if (!data.messageId) {
    throw new Error('Brevo [' + resp.status + ']: ' + (data.message || JSON.stringify(data)));
  }
}

async function sendWelcomeEmail(email) {
  await sendEmail(email, 'Welcome to FocusFrame — You\'re in.', buildWelcomeHtml());
}

async function sendDailyArticle() {
  try {
    var article = pickArticle();
    if (!article) return 'no_article';
    var emails = await db.getAllEmails();
    if (emails.length === 0) return 'no_subs';
    var emailHtml = buildEmailHtml(article);
    var sent = 0;
    var failed = 0;
    for (var j = 0; j < emails.length; j++) {
      try {
        await sendEmail(emails[j], article.c + ': ' + article.t, emailHtml);
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
