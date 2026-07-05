var db = require('./db');

var articles = [{"d":"Jan 6, 2026","c":"Eye Health","t":"The Hidden Cost of Blue Light: What the Research Actually Says","b":"A deep dive into the latest peer-reviewed studies on blue light exposure, circadian rhythms, and the surprising impact on long-term vision health.","u":"https://www.brightfocus.org/news/new-research-links-blue-light-to-macular-degeneration-risk-antioxidants-may-offer-hope"},{"d":"Jan 13, 2026","c":"Eye Health","t":"Effective Tips for Reducing Eye Strain","b":"Evidence-based strategies to reduce digital eye strain, from optimal screen positioning to the right lighting conditions.","u":"https://www.health.harvard.edu/healthy-aging-and-longevity/effective-tips-for-reducing-eye-strain"},{"d":"Jan 20, 2026","c":"Eye Health","t":"Screen Time and Children: What Parents Need to Know","b":"How excessive screen time affects developing eyes and what parents can do to protect their children's vision.","u":"https://rollingout.com/2026/02/21/children-prescription-glasses-triple/"},{"d":"Jan 27, 2026","c":"Eye Health","t":"20-20-20 Rule: Does It Actually Work?","b":"We examine the evidence behind the most commonly prescribed digital eye strain remedy and how to implement it effectively.","u":"https://www.aao.org/eye-health/tips-prevention/computer-usage"},{"d":"Feb 3, 2026","c":"Eye Health","t":"Do Blue Light Glasses Really Work? The 2026 Science Update","b":"A comprehensive review of the latest clinical evidence on blue-light filtering lenses and what ophthalmologists now recommend.","u":"https://www.zenottic.com/blogs/eyewear-style-guide/do-blue-light-glasses-work-2026-science-update"},{"d":"Feb 10, 2026","c":"Eye Health","t":"Blue Light and Sleep: What the Science of Melatonin Tells Us","b":"How evening screen exposure disrupts your natural sleep cycle and whether blue-blocking lenses can help restore circadian balance.","u":"https://us.scienceinhealth.com/2025/07/03/blue-light-glasses-eye-strain/"},{"d":"Feb 17, 2026","c":"Eye Health","t":"Computer Vision Syndrome: The 65% Problem","b":"Nearly two-thirds of adults experience digital eye strain. Here is what happens to your eyes after two hours of screen time.","u":"https://www.poudrevalleyeyecare.com/blog/blue-light-glasses-do-they-work-fort-collins-eye-expert-guide"},{"d":"Feb 24, 2026","c":"Eye Health","t":"Blink Rate and Screen Use: Why Your Eyes Feel Dry","b":"Studies show we blink 60% less when staring at screens. Learn how this affects tear film stability and long-term comfort.","u":"https://www.crystalrunhealthcare.com/articles/advice-expert-eye-strain-digital-age"},{"d":"Mar 3, 2026","c":"Eye Health","t":"The Link Between Screen Time and Myopia in Children","b":"With childhood myopia rates rising globally, researchers are examining the connection between near-work and nearsightedness.","u":"https://www.maple-eyecare.com/blog/the-impact-of-digital-screens-on-eye-health-tips-for-preventative-care.html"},{"d":"Mar 10, 2026","c":"Eye Health","t":"Blue Light Glasses vs Regular Glasses: Scientific Guide","b":"A practical comparison of blue-light filtering lenses against standard options, with evidence-based recommendations for screen users.","u":"https://weatherguard360.com/blue-light-glasses-vs-regular-scientific-guide"},{"d":"Mar 17, 2026","c":"Eye Health","t":"How Digital Screens Affect Eye Health: Preventative Care Tips","b":"Simple adjustments to your workspace and habits that can dramatically reduce screen-related eye discomfort.","u":"https://avoneyecare.com/services/digital-eye-strain"},{"d":"Mar 24, 2026","c":"Eye Health","t":"Artificial Tears and Screen Fatigue: What Actually Helps","b":"A guide to lubricating eye drops, humidifiers, and other remedies for the dry eye symptoms caused by prolonged screen use.","u":"https://www.optiquevisioncare.com/article/tips-to-help-provide-relief-from-digital-eye-strain"},{"d":"Mar 31, 2026","c":"Eye Health","t":"OLED Monitors and Coding Fatigue: When Standard Blue Light Glasses Aren't Enough","b":"New research on how modern OLED displays affect visual comfort differently than traditional LCD screens.","u":"https://www.zenottic.com/blogs/eyewear-style-guide/do-blue-light-glasses-work-2026-science-update"},{"d":"Apr 7, 2026","c":"Wellness","t":"5 Signs Your Screen Time Is Affecting Your Sleep","b":"Recognize the early warning signs of digital eye strain and circadian disruption before they become chronic.","u":"https://health.osu.edu/health/mental-health/how-screen-time-affects-your-health"},{"d":"Apr 14, 2026","c":"Wellness","t":"The Pomodoro Technique: A Scientific Breakdown","b":"Why the 25-minute work interval is backed by cognitive science and how to adapt it for deep focus work.","u":"https://www.configurationconnection.com/reclaim-your-time-focus-with-digital-minimalism"},{"d":"Apr 21, 2026","c":"Wellness","t":"How to Stay Hydrated During Long Work Sessions","b":"The surprising connection between hydration, cognitive performance, and eye comfort during extended screen time.","u":"https://www.bridgemilleyecare.com/how-to-prevent-digital-eye-strain-in-2025-smart-habits-for-screen-users/"},{"d":"Apr 28, 2026","c":"Wellness","t":"Morning Routines of High-Performers","b":"How successful professionals structure their first hour for sustained mental clarity throughout the day.","u":"https://www.globalwellnesssummit.com/2026trends"},{"d":"May 5, 2026","c":"Wellness","t":"Digital Eye Strain: Causes, Symptoms, and Evidence-Based Solutions","b":"Over 50% of computer users experience digital eye strain. Understanding the causes is the first step to relief.","u":"https://us.scienceinhealth.com/2025/09/22/digital-eye-strain-screen-time-vision-health/"},{"d":"May 12, 2026","c":"Wellness","t":"The Over-Optimization Backlash: Why Wellness Needs Balance","b":"How data-driven health tracking can tip from motivation into fixation and why nervous-system regulation matters more than scores.","u":"https://www.globalwellnesssummit.com/the-over-optimization-backlash/"},{"d":"May 19, 2026","c":"Wellness","t":"Digital Eye Strain and Productivity: The Hidden Cost","b":"Chronic screen discomfort affects more than your eyes. Studies show it reduces work accuracy, focus, and output.","u":"https://centerforsight.net/blog/how-digital-eye-strain-affects-productivity-and-ways-to-prevent-it"},{"d":"May 26, 2026","c":"Wellness","t":"How Screen Time Affects Your Health: Beyond Just Your Eyes","b":"A broad look at how prolonged digital device use impacts posture, mental health, and overall physical well-being.","u":"https://www.crystalrunhealthcare.com/articles/advice-expert-eye-strain-digital-age"},{"d":"Jun 2, 2026","c":"Wellness","t":"Achieve Digital Wellness: Reduce Screen Time by 25% in 2026","b":"Actionable strategies and expert tips for building a healthier relationship with technology and reclaiming your focus.","u":"https://zentechfocus.com/reduce-screen-time-2/"},{"d":"Jun 9, 2026","c":"Wellness","t":"Digital Eye Strain Prevention: Smart Habits for Screen Users","b":"Optometrist-approved habits including the 20-20-20 rule, proper lighting, and blink exercises for daily screen comfort.","u":"https://www.bridgemilleyecare.com/how-to-prevent-digital-eye-strain-in-2025-smart-habits-for-screen-users/"},{"d":"Jun 16, 2026","c":"Wellness","t":"10 Digital Wellness Habits to Stop Screen Fatigue in 2026","b":"Evidence-backed habits to reduce eye strain, digital stress, and screen fatigue in an always-connected world.","u":"https://vucense.com/tech-guides/digital-wellness/10-digital-wellness-habits-to-reduce-screen-fatigue-and-stress/"},{"d":"Jun 23, 2026","c":"Wellness","t":"The Rise of Neurowellness: Regulating Your Nervous System","b":"Modern life keeps the nervous system in constant activation. Learn how neurowellness practices can restore balance and focus.","u":"https://www.globalwellnesssummit.com/the-rise-of-neurowellness/"},{"d":"Jun 30, 2026","c":"Wellness","t":"How to Actually Reduce Your Screen Time: 12 Realistic Tips","b":"Practical, no-gimmick strategies to stop doomscrolling and build healthier digital habits that actually stick.","u":"https://www.theguardian.com/thefilter/2026/jun/04/how-to-reduce-your-screen-time"},{"d":"Jul 7, 2026","c":"Technology","t":"How Adaptive Lenses Actually Work","b":"The technology behind lenses that automatically adjust to ambient light and screen conditions for optimal visual comfort.","u":"https://www.allaboutvision.com/eyewear/eyeglasses/lenses/photochromic/"},{"d":"Jul 14, 2026","c":"Technology","t":"The Future of Wearable Displays","b":"From waveguide optics to micro-LED projectors, explore the display technologies powering next-generation smart eyewear.","u":"https://www.techtimes.com/articles/315067/20260311/smart-glasses-technology-2026-wearable-tech-trend-changing-how-we-see-world.htm"},{"d":"Jul 21, 2026","c":"Technology","t":"Electrochromic vs Photochromic: Key Differences","b":"A technical comparison of self-tinting lens technologies and which approach delivers better performance for daily use.","u":"https://www.allaboutvision.com/eyewear/eyeglasses/lenses/photochromic/"},{"d":"Jul 28, 2026","c":"Technology","t":"Understanding Bluetooth 5.3 and Why It Matters","b":"How the latest Bluetooth standard improves wearable connectivity, reduces latency, and extends battery life for smart glasses.","u":"https://www.szmorrison.com/AI_smartwatches_smartglasses/Shaping_the_Future_2026_Market_Predictions_for_AI_Camera_Smart_Glasses_1765199514577.html"},{"d":"Aug 4, 2026","c":"Technology","t":"Smart Glasses Technology in 2026: The Wearable Tech Trend","b":"How smart glasses are evolving beyond prototypes into practical daily wearables with AI, AR, and hands-free computing.","u":"https://www.techtimes.com/articles/315067/20260311/smart-glasses-technology-2026-wearable-tech-trend-changing-how-we-see-world.htm"},{"d":"Aug 11, 2026","c":"Technology","t":"CES 2026 Smart Glasses: AI and Neural Controls Redefine AR","b":"At CES 2026, new smart glasses showcased micro-LED displays and neural interfaces that surpass current market leaders.","u":"https://www.webpronews.com/ces-2026-smart-glasses-surpass-meta-with-ai-neural-tech-for-ar-future/"},{"d":"Aug 18, 2026","c":"Technology","t":"Google Project Aura: What Android XR Means for Smart Glasses","b":"Google's renewed push into smart glasses with Android XR, real-time translation, and deep Gemini AI integration.","u":"https://www.geeky-gadgets.com/google-io-2026-smart-glasses/"},{"d":"Aug 25, 2026","c":"Technology","t":"Best Smart Glasses 2026 Compared: Android, Apple, and Rokid","b":"A comprehensive comparison of the most anticipated smart glasses arriving this year across every major platform.","u":"https://www.geeky-gadgets.com/best-smart-glasses-2026-compared/"},{"d":"Sep 1, 2026","c":"Technology","t":"Smart Glasses Market Outlook 2026-2034: Growth and Trends","b":"Industry projections show the AI smart glasses market transforming workforce productivity across healthcare and industrial sectors.","u":"https://www.intelmarketresearch.com/ai-smart-glasses-market-36324"},{"d":"Sep 8, 2026","c":"Technology","t":"How AI Is Making Smart Glasses Smarter in 2026","b":"From real-time translation to visual recognition, AI capabilities are turning smart glasses into indispensable daily tools.","u":"https://www.accio.com/business/meta-smart-glasses-trends"},{"d":"Sep 15, 2026","c":"Technology","t":"The Best New Smart Glasses Arriving in 2026","b":"A roundup of the most innovative smart glasses launches this year, from premium AR headsets to audio-first designs.","u":"https://techcabal.com/2026/03/27/recommended-smart-glasses-in-2026"},{"d":"Sep 22, 2026","c":"Technology","t":"5 Google Predictions for 2026: Gemini Comes to Wearables","b":"How Google plans to bring Gemini AI to smart glasses, TVs, and every device in your ecosystem throughout 2026.","u":"https://www.techrepublic.com/article/news-5-google-predictions-2026"},{"d":"Sep 29, 2026","c":"Technology","t":"AI Smart Glasses Market: From Novelty to Necessity","b":"As consumer adoption accelerates, smart glasses are transitioning from experimental gadgets to essential productivity tools.","u":"https://www.accio.com/business/meta-smart-glasses-trends"},{"d":"Oct 6, 2026","c":"Lifestyle","t":"Digital Minimalism: 3 Tools That Changed How We Work","b":"Our team’s curated toolkit for reducing digital noise and reclaiming deep focus in a distracted world.","u":"https://www.configurationconnection.com/reclaim-your-time-focus-with-digital-minimalism"},{"d":"Oct 13, 2026","c":"Lifestyle","t":"How to Build a Distraction-Free Workspace","b":"Practical steps to design a physical and digital environment that supports sustained attention and creative work.","u":"https://welloclock.com/blog-list/boost-productivity-31-with-screen-time-reduction-2026"},{"d":"Oct 20, 2026","c":"Lifestyle","t":"The 8 Best Productivity Apps in 2026","b":"A curated selection of tools that actually help reduce digital friction rather than adding to the noise.","u":"https://apps.apple.com/ua/app/one-sec-screen-time-focus/id1532875441"},{"d":"Oct 27, 2026","c":"Lifestyle","t":"Reading More in a Screen-Obsessed World","b":"How to rebuild the habit of deep reading in an era of endless scrolling and notification-driven attention spans.","u":"https://www.globalwellnesssummit.com/the-over-optimization-backlash/"},{"d":"Nov 3, 2026","c":"Lifestyle","t":"Recommended Smart Glasses to Buy in 2026","b":"A buyer's guide to choosing between AR displays, audio frames, and AI-powered smart glasses for every use case.","u":"https://techcabal.com/2026/03/27/recommended-smart-glasses-in-2026"},{"d":"Nov 10, 2026","c":"Lifestyle","t":"Smart Glasses Are About to Have a Big Year","b":"From CES reveals to Apple, Google, and Meta’s plans, here is what to expect from the next wave of wearable tech.","u":"https://lifehacker.com/tech/ssmart-glasses-in-2026-apple-google-meta"},{"d":"Nov 17, 2026","c":"Lifestyle","t":"How to Build a Distraction-Free Digital Life","b":"Strategies for setting boundaries with technology, from screen-free zones to intentional app usage.","u":"https://zentechfocus.com/reduce-screen-time-2/"},{"d":"Nov 24, 2026","c":"Lifestyle","t":"Boost Productivity by Reducing Screen Time","b":"Evidence suggests cutting screen time by 25-30% can increase productivity by over 31%. Here is how to start.","u":"https://welloclock.com/blog-list/boost-productivity-31-with-screen-time-reduction-2026"},{"d":"Dec 1, 2026","c":"Lifestyle","t":"The Future of Wellness: 2026 Trends You Should Know","b":"The Global Wellness Summit reveals the top trends shaping how we think about health, focus, and balance this year.","u":"https://www.globalwellnesssummit.com/2026trends"},{"d":"Dec 8, 2026","c":"Lifestyle","t":"5 Wellness Trends to Watch in 2026","b":"From neurowellness to digital detox, discover the most important wellness movements redefining self-care.","u":"https://www.forbes.com/sites/alyssajaffer/2025/12/23/these-are-the-5-wellness-trends-to-watch-in-2026"},{"d":"Dec 15, 2026","c":"Lifestyle","t":"The Best Blue-Light Glasses for 2026: Tested and Reviewed","b":"Hands-on testing of nine blue-light blocking glasses reveals which ones actually deliver comfort during full workdays.","u":"https://health.yahoo.com/conditions/eyes/glasses-contacts/article/best-blue-light-glasses-162435151.html"},{"d":"Dec 22, 2026","c":"Lifestyle","t":"How to Prevent Digital Eye Strain: Your Complete Guide","b":"A comprehensive guide combining ergonomic setup, healthy habits, and the right eyewear for screen-heavy lifestyles.","u":"https://www.poudrevalleyeyecare.com/blog/protect-your-vision-fort-collins-digital-eye-strain-guide"},{"d":"Dec 29, 2026","c":"Lifestyle","t":"Protect Your Vision: A Digital Eye Strain Guide for 2026","b":"Blue light separated from fact and fiction, plus practical ergonomic solutions for the modern screen worker.","u":"https://www.poudrevalleyeyecare.com/blog/protect-your-vision-fort-collins-digital-eye-strain-guide"}];

function getWeekNumber(date) {
  var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function getDayOfYear(date) {
  var start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function pickArticle() {
  var now = new Date();
  var weekNum = getWeekNumber(now);
  var day = getDayOfYear(now);
  // Deterministic selection: week number offset with prime multiplier
  // ensures different articles each week for a full year
  var index = ((weekNum - 1) * 17 + day) % articles.length;
  return articles[index];
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
