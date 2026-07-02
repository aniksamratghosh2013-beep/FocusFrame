var nodemailer = require('nodemailer');
var db = require('./db');

// Article sets — must match blog.html weekly rotation
var articleSets = [{f:{d:"May 26, 2026",c:"Eye Health",t:"The Hidden Cost of Blue Light: What the Research Actually Says",b:"A deep dive into the latest peer-reviewed studies on blue light exposure, circadian rhythms, and the surprising impact on long-term vision health.",u:"https://www.brightfocus.org/news/new-research-links-blue-light-to-macular-degeneration-risk-antioxidants-may-offer-hope"},g:[{d:"May 22, 2026",c:"Wellness",t:"5 Signs Your Screen Time Is Affecting Your Sleep",b:"Recognize the early warning signs of digital eye strain and circadian disruption before they become chronic.",u:"https://health.osu.edu/health/mental-health/how-screen-time-affects-your-health"},{d:"May 18, 2026",c:"Product",t:"Why We Built Silent Touch Instead of Voice Control",b:"Voice assistants are intrusive. Here\u2019s why we chose haptic touch for controlling your FocusFrame.",u:"#"},{d:"May 14, 2026",c:"Product",t:"FocusFrame vs. Traditional Blue-Light Glasses",b:"A full comparison of adaptive lens technology against conventional blue-light filtering solutions.",u:"#"},{d:"May 10, 2026",c:"Technology",t:"How Adaptive Lenses Actually Work",b:"The technology behind lenses that automatically adjust to ambient light and screen conditions.",u:"https://www.allaboutvision.com/eyewear/eyeglasses/lenses/photochromic/"},{d:"May 6, 2026",c:"Lifestyle",t:"Digital Minimalism: 3 Tools That Changed How We Work",b:"Our team\u2019s curated toolkit for reducing digital noise and reclaiming deep focus in a distracted world.",u:"https://www.configurationconnection.com/reclaim-your-time-focus-with-digital-minimalism"},{d:"May 2, 2026",c:"Company",t:"Qatar\u2019s Growing Role in Health-Tech Innovation",b:"How FocusFrame is contributing to Qatar\u2019s vision of becoming a global hub for health technology.",u:"#"}]},{f:{d:"May 25, 2026",c:"Eye Health",t:"Effective Tips for Reducing Eye Strain",b:"A Harvard Health guide to recognizing and preventing digital eye strain with simple daily habits and workspace adjustments.",u:"https://www.health.harvard.edu/healthy-aging-and-longevity/effective-tips-for-reducing-eye-strain"},g:[{d:"May 21, 2026",c:"Wellness",t:"Deep Work: A Framework for Focus in the Age of Distraction",b:"Understanding deep work and how creating distraction-free environments can dramatically improve cognitive output.",u:"https://www.autonomous.ai/ourblog/deep-work"},{d:"May 17, 2026",c:"Product",t:"How FocusFrame Protects Your Vision",b:"A look at the multi-layer eye protection built into every pair of FocusFrame smart glasses.",u:"#"},{d:"May 13, 2026",c:"Product",t:"Inside the FocusFrame Lens Technology",b:"From substrate materials to adaptive coatings\u2014what makes our lenses different from conventional eyewear.",u:"#"},{d:"May 9, 2026",c:"Technology",t:"Google\u2019s Latest Smart Glasses Patent: What It Means",b:"An analysis of Google\u2019s newly patented smart glasses with display, speaker, and eye-tracking capabilities.",u:"https://www.androidheadlines.com/2024/12/google-patents-smart-glasses-with-display-speaker-eye-tracking.html"},{d:"May 5, 2026",c:"Lifestyle",t:"What Is Deep Work? A Complete Guide",b:"The Asana guide to deep work: why distraction-free concentration is the most valuable skill in the modern workplace.",u:"https://asana.com/resources/what-is-deep-work"},{d:"May 1, 2026",c:"Company",t:"FocusFrame\u2019s Journey from Concept to Product",b:"The story of how our team turned an idea about better digital wellness into a reality.",u:"#"}]},{f:{d:"May 24, 2026",c:"Eye Health",t:"Screen Use for Kids: What Parents Need to Know",b:"The American Academy of Ophthalmology shares guidance on managing children\u2019s screen time for healthy eye development.",u:"https://www.aao.org/eye-health/tips-prevention/screen-use-kids"},g:[{d:"May 20, 2026",c:"Wellness",t:"The Impact of Screen Time on Mental Wellness",b:"How screen time and blue light exposure before bed interfere with sleep patterns and emotional regulation.",u:"https://www.slatetherapy.com/blog-slate/the-impact-of-sleep-and-screen-time-on-mental-wellness"},{d:"May 16, 2026",c:"Product",t:"Why FocusFrame Chose Adaptive Lenses",b:"The engineering trade-offs behind our decision to use photochromic technology over electronic dimming.",u:"#"},{d:"May 12, 2026",c:"Product",t:"FocusFrame Battery Life: What to Expect",b:"A detailed breakdown of power consumption and battery optimization in the FocusFrame smart glasses.",u:"#"},{d:"May 8, 2026",c:"Technology",t:"Photochromic Lenses: Types, Pros & Cons",b:"A comprehensive comparison of the different photochromic lens technologies available in 2026.",u:"https://www.visioncenter.org/eyeglasses/photochromic-lenses/"},{d:"May 4, 2026",c:"Lifestyle",t:"Digital Minimalism in 2026: Reclaiming Your Focus",b:"Practical strategies for reducing digital noise and building a more intentional relationship with technology.",u:"https://mybestday.ai/blog/digital-minimalism-focus-2025"},{d:"May 1, 2026",c:"Company",t:"Building the Future of Vision Technology in Qatar",b:"How FocusFrame is leveraging Doha\u2019s growing tech ecosystem to pioneer the next generation of eyewear.",u:"#"}]},{f:{d:"May 23, 2026",c:"Eye Health",t:"Eye Strain: Symptoms, Causes & Treatment",b:"The Cleveland Clinic\u2019s complete guide to eye strain, including digital eye strain causes and when to see a doctor.",u:"https://my.clevelandclinic.org/health/diseases/21059-eye-strain"},g:[{d:"May 19, 2026",c:"Wellness",t:"Screen Time, Sleep and Mental Health: What Research Shows",b:"New research from Texas A&M reveals the mediating role of sleep between screen time and adolescent mental health.",u:"https://vitalrecord.tamu.edu/researchers-assess-relationships-between-screen-time-sleep-and-mental-health-in-american-teens"},{d:"May 15, 2026",c:"Product",t:"Is FocusFrame Water Resistant?",b:"Understanding the durability and water resistance ratings of your FocusFrame smart glasses.",u:"#"},{d:"May 11, 2026",c:"Product",t:"Designing for Comfort: The FocusFrame Fit",b:"How we engineered a lightweight, comfortable frame that stays secure during all-day wear.",u:"#"},{d:"May 7, 2026",c:"Technology",t:"Transition Lenses: Pros and Cons",b:"The American Academy of Ophthalmology weighs the benefits and drawbacks of photochromic lenses for daily wear.",u:"https://www.aao.org/eye-health/tips-prevention/pros-cons-of-transitions-lenses"},{d:"May 3, 2026",c:"Lifestyle",t:"The Art of Digital Productivity in a Distracted World",b:"Strategies for thriving amid constant connectivity, with techniques for focused work and intentional tech use.",u:"https://www.wordraptor.com/blog/productivity-digital-age"},{d:"May 1, 2026",c:"Company",t:"FocusFrame\u2019s Commitment to Quality and Craftsmanship",b:"Our approach to materials, testing, and quality assurance that ensures every pair meets exacting standards.",u:"#"}]}];

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
    '<a href="https://focusframe-ru71.onrender.com/" target="_blank" style="display:inline-block;padding:12px 28px;font-size:14px;color:#fff;text-decoration:none;font-weight:500;border-radius:8px">Explore FocusFrame</a>',
    '</td></tr></table>',
    '</td></tr>',
    '<tr><td style="padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06)">',
    '<p style="margin:0;font-size:13px;color:#64748b">You received this because you subscribed to the FocusFrame newsletter. <a href="mailto:hellofocusframe26@gmail.com" style="color:#6366f1;text-decoration:none">Unsubscribe</a></p>',
    '</td></tr></table></td></tr></table></body></html>'
  ].join('\n');
}

async function sendWelcomeEmail(email) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Missing GMAIL_USER or GMAIL_APP_PASSWORD');
  }

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  var senderName = process.env.SENDER_NAME || 'FocusFrame';
  await transporter.sendMail({
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

    var required = ['GMAIL_USER', 'GMAIL_APP_PASSWORD'];
    for (var i = 0; i < required.length; i++) {
      if (!process.env[required[i]]) return 'missing_' + required[i];
    }

    var emails = db.getAllEmails();
    if (emails.length === 0) return 'no_subs';

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    var emailHtml = buildEmailHtml(article);
    var senderName = process.env.SENDER_NAME || 'FocusFrame';
    var sent = 0;
    var failed = 0;

    for (var j = 0; j < emails.length; j++) {
      try {
        await transporter.sendMail({
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
