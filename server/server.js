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

// POST /api/chat — Dasher AI assistant (keyword-based, no API key needed)
var KB = [
  { keywords: ['hello','hi','hey','greetings'], resp: 'Hi there! I\'m Dasher, your FocusFrame guide. Ask me about the glasses, pricing, features, or anything else!' },
  { keywords: ['price','cost','pricing','buy','order','qar'], resp: 'FocusFrame is <strong>300 QAR</strong> one-time for the glasses. Subscribe to the Tech Plan for <strong>12 QAR/month</strong> (monthly) or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). <a href="/pricing.html">See full pricing</a>' },
  { keywords: ['lens','blue-light','blue light','adaptive','tint','eye strain'], resp: 'FocusFrame uses electrochromic technology that adjusts lens tint in under 2 seconds based on ambient light. It blocks <strong>99% of blue light</strong> while maintaining crystal-clear vision. The tint level adapts automatically to your environment.' },
  { keywords: ['touch','control','gesture','tap','swipe'], resp: 'The arms have a capacitive touch sensor that detects taps (single/double/triple), swipes, and holds — no buttons needed. Adjust settings silently without looking at the controls.' },
  { keywords: ['battery','charge','charging','wireless','usb'], resp: 'Up to <strong>7 days</strong> of mixed use per charge. The wireless charging case holds 3 more full charges (nearly a month total). A 15-minute quick charge gives you 24 hours of use.' },
  { keywords: ['weight','gram','light','comfortable','comfort'], resp: 'At just <strong>18 grams</strong> in a titanium alloy frame, FocusFrame is lighter than standard glasses (typically 25-35g). Designed for all-day wear.' },
  { keywords: ['return','refund','trial','warranty'], resp: 'Every purchase includes a <strong>30-day risk-free trial</strong> — full refund if not satisfied. Also comes with a <strong>2-year warranty</strong> covering manufacturing defects, with free shipping on replacements.' },
  { keywords: ['shipping','delivery','ship','free shipping'], resp: 'Free shipping on all orders. Replacements under warranty also ship free. Delivery typically takes 5-10 business days.' },
  { keywords: ['subscription','tech plan','monthly','annual','month','year'], resp: 'The Tech Plan unlocks premium features: advanced lens modes, firmware updates, usage analytics, and priority support. <strong>12 QAR/month</strong> or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). No long-term commitment.' },
  { keywords: ['career','job','apply','position','hiring','work'], resp: 'We\'re hiring! Open roles: Senior Optomechanical Engineer, Firmware Engineer, UI/UX Designer, Marketing Lead, and Supply Chain Manager. <a href="/careers.html">View careers</a> and apply via email.' },
  { keywords: ['about','company','mission','team'], resp: 'FocusFrame\'s mission is to help the digital generation protect their eyes without sacrificing style or functionality. We value innovation, wellness, sustainability, and accessibility. <a href="/about.html">Learn more</a>' },
  { keywords: ['blog','article','newsletter','read'], resp: 'Our blog covers eye health, technology, wellness, and lifestyle topics — updated weekly. <a href="/blog.html">Read the blog</a> and subscribe to the newsletter for updates.' },
  { keywords: ['compare','vs','versus','difference','better','standard','normal'], resp: 'FocusFrame vs standard glasses: 99% blue-light protection (vs 45%), adaptive lenses (none), touch controls (none), 18g titanium frame (vs 25-35g plastic), 7-day battery, wireless charging. <a href="/#compare">See full comparison</a>' },
  { keywords: ['prescription','rx','prescription-ready','optician','lens replacement'], resp: 'Yes! FocusFrame is prescription-ready. Take them to any optical retailer to swap in prescription lenses — the smart tech stays in the frame and arms, so functionality is unaffected.' },
  { keywords: ['compatible','phone','app','bluetooth','ios','android'], resp: 'Compatible with iOS 16+ and Android 13+ via Bluetooth 5.3. The companion app offers advanced customization, firmware updates, and analytics. Core features work without a phone.' },
  { keywords: ['water','waterproof','water-resistant','splash','rain','ipx'], resp: 'Rated <strong>IPX4</strong> — splash-resistant against sweat, light rain, and spills. Not for submersion or swimming. The charging case is not water-resistant.' },
  { keywords: ['driving','drive','car','road'], resp: 'Yes, safe for driving. The adaptive tint stays within legal transmittance limits, and blue-light filtration doesn\'t affect color perception needed for road signs.' },
  { keywords: ['help','support','contact','email','reach'], resp: 'You can reach us at <a href="mailto:hellofocusframe26@gmail.com">hellofocusframe26@gmail.com</a>. For quick questions, just ask me right here!' },
];

function findResponse(text) {
  text = text.toLowerCase();
  var best = null, bestCount = 0;
  for (var i = 0; i < KB.length; i++) {
    var count = 0;
    for (var k = 0; k < KB[i].keywords.length; k++) {
      if (text.indexOf(KB[i].keywords[k]) !== -1) count++;
    }
    if (count > bestCount) { bestCount = count; best = KB[i].resp; }
  }
  return best;
}

app.post('/api/chat', function(req, res) {
  var messages = req.body.messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ reply: 'Please send a message.' });
  }
  var lastMsg = messages[messages.length - 1].content || '';
  var reply = findResponse(lastMsg);
  if (!reply) {
    reply = 'I\'m not sure I understand. I can help with <a href="/pricing.html">pricing</a>, <a href="/#features">features</a>, <a href="/#faq">FAQs</a>, <a href="/careers.html">careers</a>, and more. What would you like to know?';
  }
  res.json({ reply: reply });
});

app.listen(PORT, function() {
  console.log('FocusFrame running at http://localhost:' + PORT);
});
