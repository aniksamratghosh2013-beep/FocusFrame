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
var { containerBootstrap, Nlp, LangEn } = require('@nlpjs/basic');
var container = containerBootstrap();
var nlp = new Nlp({ languages: ['en'], container: container });
container.register('nlp', nlp);
container.register('Language', LangEn);

var SITE_INFO = 'FocusFrame is smart eyewear (300 QAR) with adaptive blue-light lenses, silent touch controls, ambient light sensing, 18g titanium frame, 7-day battery. Pages: / (home), /pricing.html (300 QAR + 12/10 QAR tech plan), /about.html (mission + team), /blog.html (weekly articles), /careers.html (5 open roles). Contact: hellofocusframe26@gmail.com.';

nlp.addDocument('en', 'hello', 'greeting');
nlp.addDocument('en', 'hi', 'greeting');
nlp.addDocument('en', 'hey', 'greeting');
nlp.addDocument('en', 'hi dasher', 'greeting');
nlp.addDocument('en', 'good morning', 'greeting');
nlp.addDocument('en', 'how are you', 'greeting');
nlp.addDocument('en', 'what is the price', 'pricing');
nlp.addDocument('en', 'how much does it cost', 'pricing');
nlp.addDocument('en', 'what is the cost', 'pricing');
nlp.addDocument('en', 'pricing', 'pricing');
nlp.addDocument('en', 'how much', 'pricing');
nlp.addDocument('en', 'buy', 'pricing');
nlp.addDocument('en', 'order', 'pricing');
nlp.addDocument('en', 'where can i buy', 'pricing');
nlp.addDocument('en', '300 qar', 'pricing');
nlp.addDocument('en', 'tech plan', 'pricing');
nlp.addDocument('en', 'subscription', 'subscription');
nlp.addDocument('en', 'monthly subscription', 'subscription');
nlp.addDocument('en', 'annual subscription', 'subscription');
nlp.addDocument('en', 'how does the subscription work', 'subscription');
nlp.addDocument('en', 'tech plan pricing', 'subscription');
nlp.addDocument('en', 'how do the lenses work', 'lenses');
nlp.addDocument('en', 'how do smart lenses work', 'lenses');
nlp.addDocument('en', 'adaptive lenses', 'lenses');
nlp.addDocument('en', 'blue light', 'lenses');
nlp.addDocument('en', 'blue-light', 'lenses');
nlp.addDocument('en', 'eye strain', 'lenses');
nlp.addDocument('en', 'lens tint', 'lenses');
nlp.addDocument('en', 'electrochromic', 'lenses');
nlp.addDocument('en', 'touch control', 'touch');
nlp.addDocument('en', 'how do the touch controls work', 'touch');
nlp.addDocument('en', 'gestures', 'touch');
nlp.addDocument('en', 'tap', 'touch');
nlp.addDocument('en', 'swipe', 'touch');
nlp.addDocument('en', 'battery life', 'battery');
nlp.addDocument('en', 'how long does the battery last', 'battery');
nlp.addDocument('en', 'battery', 'battery');
nlp.addDocument('en', 'charging', 'battery');
nlp.addDocument('en', 'wireless charging', 'battery');
nlp.addDocument('en', 'quick charge', 'battery');
nlp.addDocument('en', 'how much does it weigh', 'weight');
nlp.addDocument('en', 'weight', 'weight');
nlp.addDocument('en', 'how heavy are they', 'weight');
nlp.addDocument('en', 'lightweight', 'weight');
nlp.addDocument('en', 'are they comfortable', 'weight');
nlp.addDocument('en', 'return policy', 'warranty');
nlp.addDocument('en', 'refund', 'warranty');
nlp.addDocument('en', 'warranty', 'warranty');
nlp.addDocument('en', 'trial', 'warranty');
nlp.addDocument('en', 'return', 'warranty');
nlp.addDocument('en', '30 day trial', 'warranty');
nlp.addDocument('en', 'shipping', 'shipping');
nlp.addDocument('en', 'free shipping', 'shipping');
nlp.addDocument('en', 'delivery', 'shipping');
nlp.addDocument('en', 'how long does shipping take', 'shipping');
nlp.addDocument('en', 'jobs', 'careers');
nlp.addDocument('en', 'career', 'careers');
nlp.addDocument('en', 'careers', 'careers');
nlp.addDocument('en', 'hiring', 'careers');
nlp.addDocument('en', 'open positions', 'careers');
nlp.addDocument('en', 'apply', 'careers');
nlp.addDocument('en', 'work at focusframe', 'careers');
nlp.addDocument('en', 'about', 'about');
nlp.addDocument('en', 'about focusframe', 'about');
nlp.addDocument('en', 'company', 'about');
nlp.addDocument('en', 'mission', 'about');
nlp.addDocument('en', 'team', 'about');
nlp.addDocument('en', 'blog', 'blog');
nlp.addDocument('en', 'articles', 'blog');
nlp.addDocument('en', 'newsletter', 'blog');
nlp.addDocument('en', 'read', 'blog');
nlp.addDocument('en', 'compare', 'compare');
nlp.addDocument('en', 'vs', 'compare');
nlp.addDocument('en', 'versus', 'compare');
nlp.addDocument('en', 'difference', 'compare');
nlp.addDocument('en', 'better', 'compare');
nlp.addDocument('en', 'how does it compare', 'compare');
nlp.addDocument('en', 'prescription', 'prescription');
nlp.addDocument('en', 'prescription lenses', 'prescription');
nlp.addDocument('en', 'rx', 'prescription');
nlp.addDocument('en', 'optician', 'prescription');
nlp.addDocument('en', 'compatible', 'compatible');
nlp.addDocument('en', 'phone compatibility', 'compatible');
nlp.addDocument('en', 'bluetooth', 'compatible');
nlp.addDocument('en', 'app', 'compatible');
nlp.addDocument('en', 'ios', 'compatible');
nlp.addDocument('en', 'android', 'compatible');
nlp.addDocument('en', 'is it waterproof', 'water');
nlp.addDocument('en', 'waterproof', 'water');
nlp.addDocument('en', 'water resistant', 'water');
nlp.addDocument('en', 'splash', 'water');
nlp.addDocument('en', 'rain', 'water');
nlp.addDocument('en', 'ipx', 'water');
nlp.addDocument('en', 'can i wear while driving', 'driving');
nlp.addDocument('en', 'driving', 'driving');
nlp.addDocument('en', 'drive with glasses', 'driving');
nlp.addDocument('en', 'car', 'driving');
nlp.addDocument('en', 'help', 'help');
nlp.addDocument('en', 'contact', 'help');
nlp.addDocument('en', 'support', 'help');
nlp.addDocument('en', 'email', 'help');
nlp.addDocument('en', 'how can i reach you', 'help');

nlp.addAnswer('en', 'greeting', 'Hi there! I\'m Dasher, your FocusFrame guide. Ask me about the glasses, pricing, features, or anything else!');
nlp.addAnswer('en', 'pricing', 'FocusFrame is <strong>300 QAR</strong> one-time for the glasses. Subscribe to the Tech Plan for <strong>12 QAR/month</strong> (monthly) or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). <a href="/pricing.html">See full pricing</a>');
nlp.addAnswer('en', 'subscription', 'The Tech Plan unlocks premium features: advanced lens modes, firmware updates, usage analytics, and priority support. <strong>12 QAR/month</strong> or <strong>10 QAR/month</strong> billed annually (120 QAR/yr — save 24 QAR). No long-term commitment.');
nlp.addAnswer('en', 'lenses', 'FocusFrame uses electrochromic technology that adjusts lens tint in under 2 seconds based on ambient light. It blocks <strong>99% of blue light</strong> while maintaining crystal-clear vision. The tint level adapts automatically to your environment.');
nlp.addAnswer('en', 'touch', 'The arms have a capacitive touch sensor that detects taps (single/double/triple), swipes, and holds — no buttons needed. Adjust settings silently without looking at the controls.');
nlp.addAnswer('en', 'battery', 'Up to <strong>7 days</strong> of mixed use per charge. The wireless charging case holds 3 more full charges (nearly a month total). A 15-minute quick charge gives you 24 hours of use.');
nlp.addAnswer('en', 'weight', 'At just <strong>18 grams</strong> in a titanium alloy frame, FocusFrame is lighter than standard glasses (typically 25-35g). Designed for all-day wear.');
nlp.addAnswer('en', 'warranty', 'Every purchase includes a <strong>30-day risk-free trial</strong> — full refund if not satisfied. Also comes with a <strong>2-year warranty</strong> covering manufacturing defects, with free shipping on replacements.');
nlp.addAnswer('en', 'shipping', 'Free shipping on all orders. Replacements under warranty also ship free. Delivery typically takes 5-10 business days.');
nlp.addAnswer('en', 'careers', 'We\'re hiring! Open roles: Senior Optomechanical Engineer, Firmware Engineer, UI/UX Designer, Marketing Lead, and Supply Chain Manager. <a href="/careers.html">View careers</a> and apply via email.');
nlp.addAnswer('en', 'about', 'FocusFrame\'s mission is to help the digital generation protect their eyes without sacrificing style or functionality. We value innovation, wellness, sustainability, and accessibility. <a href="/about.html">Learn more</a>');
nlp.addAnswer('en', 'blog', 'Our blog covers eye health, technology, wellness, and lifestyle topics — updated weekly. <a href="/blog.html">Read the blog</a> and subscribe to the newsletter for updates.');
nlp.addAnswer('en', 'compare', 'FocusFrame vs standard glasses: 99% blue-light protection (vs 45%), adaptive lenses (none), touch controls (none), 18g titanium frame (vs 25-35g plastic), 7-day battery, wireless charging. <a href="/#compare">See full comparison</a>');
nlp.addAnswer('en', 'prescription', 'Yes! FocusFrame is prescription-ready. Take them to any optical retailer to swap in prescription lenses — the smart tech stays in the frame and arms, so functionality is unaffected.');
nlp.addAnswer('en', 'compatible', 'Compatible with iOS 16+ and Android 13+ via Bluetooth 5.3. The companion app offers advanced customization, firmware updates, and analytics. Core features work without a phone.');
nlp.addAnswer('en', 'water', 'Rated <strong>IPX4</strong> — splash-resistant against sweat, light rain, and spills. Not for submersion or swimming. The charging case is not water-resistant.');
nlp.addAnswer('en', 'driving', 'Yes, safe for driving. The adaptive tint stays within legal transmittance limits, and blue-light filtration doesn\'t affect color perception needed for road signs.');
nlp.addAnswer('en', 'help', 'You can reach us at <a href="mailto:hellofocusframe26@gmail.com">hellofocusframe26@gmail.com</a>. For quick questions, just ask me right here!');

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
  var nlpResponse = await nlp.process('en', lastMsg);
  var reply = nlpResponse.answer;
  if (!reply) {
    reply = 'I\'m not sure I understand. I can help with <a href="/pricing.html">pricing</a>, <a href="/#features">features</a>, <a href="/#faq">FAQs</a>, <a href="/careers.html">careers</a>, and more. What would you like to know?';
  }
  res.json({ reply: reply });
});

(async function() {
  await nlp.train();
  console.log('Dasher ready');
  app.listen(PORT, function() {
    console.log('FocusFrame running at http://localhost:' + PORT);
  });
})();
