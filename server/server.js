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

// POST /api/chat — Dasher AI assistant powered by Claude
var Anthropic = require('@anthropic-ai/sdk');

var SITE_INFO = [
  'FocusFrame is smart eyewear with adaptive blue-light lenses, silent touch controls, and ambient light sensing.',
  '',
  'Site pages:',
  '- / (home): Hero with 3D glasses, Problem section (10h screen time), Features (adaptive lenses, blue-light 99%, touch, 18g, 7-day battery), Lifestyles (workspace/gaming/outdoor), How It Works, FAQ, Comparison table, Pricing CTA (50 QAR).',
  '- /pricing.html: 50 QAR one-time for glasses, 5 QAR/month tech plan. Free shipping, 30-day trial, 2-year warranty. Comparison vs standard glasses. Pricing FAQ.',
  '- /about.html: Company mission, abstract team (4 members), core values (innovation, wellness, sustainability, accessibility), 2026 timeline, contact section.',
  '- /blog.html: Weekly articles on Eye Health, Technology, Wellness, Lifestyle, Product, Company. Newsletter signup form.',
  '- /careers.html: Culture values, 6 employee benefits, 5 open positions (senior optomechanical engineer, firmware engineer, UI/UX designer, marketing lead, supply chain manager). Apply via email.',
  '- /press.html: Press kit download, 4 press releases, 6 press mentions (TechCrunch, Wired, The Verge, Bloomberg, Forbes, Fast Company). Media contact.'
].join('\n');

app.post('/api/chat', async function(req, res) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ reply: 'Dasher is not configured yet. Please set the ANTHROPIC_API_KEY.' });
  }

  var messages = req.body.messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ reply: 'Please send a message.' });
  }

  var anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  var modelsToTry = ['claude-opus-4-7', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229'];
  var lastError = '';

  for (var mi = 0; mi < modelsToTry.length; mi++) {
    try {
      var response = await anthropic.messages.create({
        model: modelsToTry[mi],
        max_tokens: 1024,
        system: 'You are Dasher, a helpful AI assistant for the FocusFrame website. You are powered by Claude. Your role is to help users understand the product, navigate the site, and find what they need.\n\nAlways be friendly, concise, and enthusiastic about FocusFrame.\n\nWhen a user is looking for a specific page, provide a direct link like <a href="/pricing.html">Pricing</a>.\n\nHere is the site information you know:\n' + SITE_INFO + '\n\nIf a user asks about something not related to FocusFrame, politely redirect them back to the website topic.',
        messages: messages
      });
      return res.json({ reply: response.content[0].text });
    } catch (err) {
      lastError = err.message;
    }
  }

  console.error('Claude API error:', lastError);
  res.status(500).json({ reply: 'Dasher error: ' + lastError });
});

app.listen(PORT, function() {
  console.log('FocusFrame running at http://localhost:' + PORT);
});
