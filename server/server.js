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

// POST /api/chat — Dasher AI assistant
// Uses Groq LLM when GROQ_API_KEY is set, gracefully falls back to NLP intent classifier
var { NlpManager } = require('@nlpjs/basic');
var manager = new NlpManager({ languages: ['en'] });

var SITE_INFO = 'FocusFrame is smart eyewear (300 QAR) with adaptive blue-light lenses, silent touch controls, ambient light sensing, 18g titanium frame, 7-day battery. Pages: / (home), /pricing.html (300 QAR + 12/10 QAR tech plan), /about.html (mission + team), /blog.html (weekly articles), /careers.html (5 open roles). Contact: hellofocusframe26@gmail.com.';

manager.addNamedEntityText('hero', 'dashed', ['en'], ['dasher']);
manager.addDocument('en', 'hello', 'greeting');
manager.addDocument('en', 'hi', 'greeting');
manager.addDocument('en', 'hey', 'greeting');
manager.addDocument('en', 'hi dasher', 'greeting');
manager.addDocument('en', 'good morning', 'greeting');
manager.addDocument('en', 'how are you', 'greeting');
manager.addDocument('en', 'what is the price', 'pricing');
manager.addDocument('en', 'how much does it cost', 'pricing');
manager.addDocument('en', 'what is the cost', 'pricing');
manager.addDocument('en', 'pricing', 'pricing');
manager.addDocument('en', 'how much', 'pricing');
manager.addDocument('en', 'buy', 'pricing');
manager.addDocument('en', 'order', 'pricing');
manager.addDocument('en', 'where can i buy', 'pricing');
manager.addDocument('en', '300 qar', 'pricing');
manager.addDocument('en', 'tech plan', 'pricing');
manager.addDocument('en', 'subscription', 'subscription');
manager.addDocument('en', 'monthly subscription', 'subscription');
manager.addDocument('en', 'annual subscription', 'subscription');
manager.addDocument('en', 'how does the subscription work', 'subscription');
manager.addDocument('en', 'tech plan pricing', 'subscription');
manager.addDocument('en', 'how do the lenses work', 'lenses');
manager.addDocument('en', 'how do smart lenses work', 'lenses');
manager.addDocument('en', 'adaptive lenses', 'lenses');
manager.addDocument('en', 'blue light', 'lenses');
manager.addDocument('en', 'blue-light', 'lenses');
manager.addDocument('en', 'eye strain', 'lenses');
manager.addDocument('en', 'lens tint', 'lenses');
manager.addDocument('en', 'electrochromic', 'lenses');
manager.addDocument('en', 'touch control', 'touch');
manager.addDocument('en', 'how do the touch controls work', 'touch');
manager.addDocument('en', 'gestures', 'touch');
manager.addDocument('en', 'tap', 'touch');
manager.addDocument('en', 'swipe', 'touch');
manager.addDocument('en', 'battery life', 'battery');
manager.addDocument('en', 'how long does the battery last', 'battery');
manager.addDocument('en', 'battery', 'battery');
manager.addDocument('en', 'charging', 'battery');
manager.addDocument('en', 'wireless charging', 'battery');
manager.addDocument('en', 'quick charge', 'battery');
manager.addDocument('en', 'how much does it weigh', 'weight');
manager.addDocument('en', 'weight', 'weight');
manager.addDocument('en', 'how heavy are they', 'weight');
manager.addDocument('en', 'lightweight', 'weight');
manager.addDocument('en', 'are they comfortable', 'weight');
manager.addDocument('en', 'return policy', 'warranty');
manager.addDocument('en', 'refund', 'warranty');
manager.addDocument('en', 'warranty', 'warranty');
manager.addDocument('en', 'trial', 'warranty');
manager.addDocument('en', 'return', 'warranty');
manager.addDocument('en', '30 day trial', 'warranty');
manager.addDocument('en', 'shipping', 'shipping');
manager.addDocument('en', 'free shipping', 'shipping');
manager.addDocument('en', 'delivery', 'shipping');
manager.addDocument('en', 'how long does shipping take', 'shipping');
manager.addDocument('en', 'jobs', 'careers');
manager.addDocument('en', 'career', 'careers');
manager.addDocument('en', 'careers', 'careers');
manager.addDocument('en', 'hiring', 'careers');
manager.addDocument('en', 'open positions', 'careers');
manager.addDocument('en', 'apply', 'careers');
manager.addDocument('en', 'work at focusframe', 'careers');
manager.addDocument('en', 'about', 'about');
manager.addDocument('en', 'about focusframe', 'about');
manager.addDocument('en', 'company', 'about');
manager.addDocument('en', 'mission', 'about');
manager.addDocument('en', 'team', 'about');
manager.addDocument('en', 'blog', 'blog');
manager.addDocument('en', 'articles', 'blog');
manager.addDocument('en', 'newsletter', 'blog');
manager.addDocument('en', 'read', 'blog');
manager.addDocument('en', 'compare', 'compare');
manager.addDocument('en', 'vs', 'compare');
manager.addDocument('en', 'versus', 'compare');
manager.addDocument('en', 'difference', 'compare');
manager.addDocument('en', 'better', 'compare');
manager.addDocument('en', 'how does it compare', 'compare');
manager.addDocument('en', 'prescription', 'prescription');
manager.addDocument('en', 'prescription lenses', 'prescription');
manager.addDocument('en', 'rx', 'prescription');
manager.addDocument('en', 'optician', 'prescription');
manager.addDocument('en', 'compatible', 'compatible');
manager.addDocument('en', 'phone compatibility', 'compatible');
manager.addDocument('en', 'bluetooth', 'compatible');
manager.addDocument('en', 'app', 'compatible');
manager.addDocument('en', 'ios', 'compatible');
manager.addDocument('en', 'android', 'compatible');
manager.addDocument('en', 'is it waterproof', 'water');
manager.addDocument('en', 'waterproof', 'water');
manager.addDocument('en', 'water resistant', 'water');
manager.addDocument('en', 'splash', 'water');
manager.addDocument('en', 'rain', 'water');
manager.addDocument('en', 'ipx', 'water');
manager.addDocument('en', 'can i wear while driving', 'driving');
manager.addDocument('en', 'driving', 'driving');
manager.addDocument('en', 'drive with glasses', 'driving');
manager.addDocument('en', 'car', 'driving');
manager.addDocument('en', 'help', 'help');
manager.addDocument('en', 'contact', 'help');
manager.addDocument('en', 'support', 'help');
manager.addDocument('en', 'email', 'help');
manager.addDocument('en', 'how can i reach you', 'help');

manager.addAnswer('en', 'greeting', 'Hi there! I\'m Dasher, your FocusFrame guide. Ask me about the glasses, pricing, features, or anything else!');
manager.addAnswer('en', 'pricing', 'FocusFrame is <strong>300 QAR</strong> one-time for the glasses. Subscribe to the Tech Plan for <strong>12 QAR/month</strong> (monthly) or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). <a href="/pricing.html">See full pricing</a>');
manager.addAnswer('en', 'subscription', 'The Tech Plan unlocks premium features: advanced lens modes, firmware updates, usage analytics, and priority support. <strong>12 QAR/month</strong> or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). No long-term commitment.');
manager.addAnswer('en', 'lenses', 'FocusFrame uses electrochromic technology that adjusts lens tint in under 2 seconds based on ambient light. It blocks <strong>99% of blue light</strong> while maintaining crystal-clear vision. The tint level adapts automatically to your environment.');
manager.addAnswer('en', 'touch', 'The arms have a capacitive touch sensor that detects taps (single/double/triple), swipes, and holds — no buttons needed. Adjust settings silently without looking at the controls.');
manager.addAnswer('en', 'battery', 'Up to <strong>7 days</strong> of mixed use per charge. The wireless charging case holds 3 more full charges (nearly a month total). A 15-minute quick charge gives you 24 hours of use.');
manager.addAnswer('en', 'weight', 'At just <strong>18 grams</strong> in a titanium alloy frame, FocusFrame is lighter than standard glasses (typically 25-35g). Designed for all-day wear.');
manager.addAnswer('en', 'warranty', 'Every purchase includes a <strong>30-day risk-free trial</strong> — full refund if not satisfied. Also comes with a <strong>2-year warranty</strong> covering manufacturing defects, with free shipping on replacements.');
manager.addAnswer('en', 'shipping', 'Free shipping on all orders. Replacements under warranty also ship free. Delivery typically takes 5-10 business days.');
manager.addAnswer('en', 'careers', 'We\'re hiring! Open roles: Senior Optomechanical Engineer, Firmware Engineer, UI/UX Designer, Marketing Lead, and Supply Chain Manager. <a href="/careers.html">View careers</a> and apply via email.');
manager.addAnswer('en', 'about', 'FocusFrame\'s mission is to help the digital generation protect their eyes without sacrificing style or functionality. We value innovation, wellness, sustainability, and accessibility. <a href="/about.html">Learn more</a>');
manager.addAnswer('en', 'blog', 'Our blog covers eye health, technology, wellness, and lifestyle topics — updated weekly. <a href="/blog.html">Read the blog</a> and subscribe to the newsletter for updates.');
manager.addAnswer('en', 'compare', 'FocusFrame vs standard glasses: 99% blue-light protection (vs 45%), adaptive lenses (none), touch controls (none), 18g titanium frame (vs 25-35g plastic), 7-day battery, wireless charging. <a href="/#compare">See full comparison</a>');
manager.addAnswer('en', 'prescription', 'Yes! FocusFrame is prescription-ready. Take them to any optical retailer to swap in prescription lenses — the smart tech stays in the frame and arms, so functionality is unaffected.');
manager.addAnswer('en', 'compatible', 'Compatible with iOS 16+ and Android 13+ via Bluetooth 5.3. The companion app offers advanced customization, firmware updates, and analytics. Core features work without a phone.');
manager.addAnswer('en', 'water', 'Rated <strong>IPX4</strong> — splash-resistant against sweat, light rain, and spills. Not for submersion or swimming. The charging case is not water-resistant.');
manager.addAnswer('en', 'driving', 'Yes, safe for driving. The adaptive tint stays within legal transmittance limits, and blue-light filtration doesn\'t affect color perception needed for road signs.');
manager.addAnswer('en', 'help', 'You can reach us at <a href="mailto:hellofocusframe26@gmail.com">hellofocusframe26@gmail.com</a>. For quick questions, just ask me right here!');

app.post('/api/chat', async function(req, res) {
  var messages = req.body.messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ reply: 'Please send a message.' });
  }

  var lastMsg = messages[messages.length - 1].content || '';

  // Try Groq LLM if API key is configured
  if (process.env.GROQ_API_KEY) {
    var OpenAI = require('openai');
    var groq = new OpenAI({ apiKey: process.env.GROQ_API_KEY, baseURL: 'https://api.groq.com/openai/v1' });
    var systemMsg = 'You are Dasher, a friendly AI assistant for the FocusFrame website. Help users understand the product and navigate the site. Be concise and enthusiastic.\n\nSite info:\n' + SITE_INFO + '\n\nProvide short answers with HTML links to site pages when relevant. If asked about non-FocusFrame topics, politely redirect back.';

    var fullMessages = [{ role: 'system', content: systemMsg }].concat(messages);
    var modelsToTry = ['llama-3.1-8b-instant', 'gemma2-9b-it', 'llama-3.3-70b-versatile'];

    for (var mi = 0; mi < modelsToTry.length; mi++) {
      try {
        var response = await groq.chat.completions.create({ model: modelsToTry[mi], max_tokens: 1024, messages: fullMessages });
        return res.json({ reply: response.choices[0].message.content });
      } catch (err) {
        if (mi === modelsToTry.length - 1) console.error('Groq error:', err.message);
      }
    }
  }

  // Fallback: NLP intent classifier
  var nlpResponse = await manager.process('en', lastMsg);
  var reply = nlpResponse.answer;
  if (!reply) {
    reply = 'I\'m not sure I understand. I can help with <a href="/pricing.html">pricing</a>, <a href="/#features">features</a>, <a href="/#faq">FAQs</a>, <a href="/careers.html">careers</a>, and more. What would you like to know?';
  }
  res.json({ reply: reply });
});

(async function() {
  await manager.train();
  console.log('Dasher ready');
  app.listen(PORT, function() {
    console.log('FocusFrame running at http://localhost:' + PORT);
  });
})();
