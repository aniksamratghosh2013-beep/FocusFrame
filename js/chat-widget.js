(function() {
  var style = document.createElement('style');
  style.textContent = [
    '#dasher-btn{position:fixed;bottom:24px;right:24px;z-index:9999;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#4f46e5);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(99,102,241,0.4);transition:transform .2s,box-shadow .2s;color:#fff}',
    '#dasher-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(99,102,241,0.55)}',
    '#dasher-btn svg{width:24px;height:24px}',
    '#dasher-panel{position:fixed;bottom:92px;right:24px;z-index:9999;width:360px;max-height:520px;background:#111827;border:1px solid rgba(99,102,241,0.2);border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.5);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif}',
    '#dasher-panel.open{display:flex}',
    '#dasher-header{padding:16px 20px;background:linear-gradient(135deg,rgba(99,102,241,0.15),rgba(79,70,229,0.1));border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:10px}',
    '#dasher-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#4f46e5);display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;font-weight:600;flex-shrink:0}',
    '#dasher-header-info{flex:1}',
    '#dasher-header-info h3{margin:0;font-size:14px;color:#f1f5f9;font-weight:600;font-family:Space Grotesk,Inter,sans-serif}',
    '#dasher-header-info p{margin:0;font-size:11px;color:#64748b}',
    '#dasher-close{background:none;border:none;color:#64748b;cursor:pointer;padding:4px;border-radius:6px;display:flex}',
    '#dasher-close:hover{color:#f1f5f9;background:rgba(255,255,255,0.06)}',
    '#dasher-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:200px;max-height:340px}',
    '#dasher-messages::-webkit-scrollbar{width:4px}',
    '#dasher-messages::-webkit-scrollbar-track{background:transparent}',
    '#dasher-messages::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:4px}',
    '.dasher-msg{max-width:85%;padding:10px 14px;border-radius:12px;font-size:13px;line-height:1.5;word-wrap:break-word}',
    '.dasher-msg a{color:#818cf8;text-decoration:underline}',
    '.dasher-msg.user{background:#6366f1;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}',
    '.dasher-msg.assistant{background:rgba(255,255,255,0.06);color:#e2e8f0;align-self:flex-start;border-bottom-left-radius:4px}',
    '.dasher-msg.typing{background:rgba(255,255,255,0.06);color:#94a3b8;align-self:flex-start;border-bottom-left-radius:4px}',
    '#dasher-input-wrap{display:flex;padding:12px 16px;border-top:1px solid rgba(255,255,255,0.06);gap:8px}',
    '#dasher-input{flex:1;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;font-size:13px;color:#f1f5f9;outline:none;font-family:Inter,system-ui,sans-serif}',
    '#dasher-input:focus{border-color:#6366f1}',
    '#dasher-input::placeholder{color:#64748b}',
    '#dasher-send{background:#6366f1;border:none;border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;flex-shrink:0;transition:background .2s}',
    '#dasher-send:hover{background:#4f46e5}',
    '#dasher-send:disabled{opacity:0.4;cursor:default}',
    '@media(max-width:480px){#dasher-panel{width:calc(100vw - 32px);right:16px;bottom:84px;max-height:60vh}}'
  ].join('');
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'dasher-btn';
  btn.setAttribute('aria-label', 'Chat with Dasher');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
  document.body.appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'dasher-panel';
  panel.innerHTML = [
    '<div id="dasher-header">',
    '<div id="dasher-avatar">D</div>',
    '<div id="dasher-header-info"><h3>Dasher</h3></div>',
    '<button id="dasher-close" aria-label="Close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>',
    '</div>',
    '<div id="dasher-messages"><div class="dasher-msg assistant">Hi! I\'m Dasher. Ask me anything about FocusFrame or help finding a page.</div></div>',
    '<div id="dasher-input-wrap"><input id="dasher-input" type="text" placeholder="Ask Dasher..." autocomplete="off"><button id="dasher-send" aria-label="Send"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>'
  ].join('\n');
  document.body.appendChild(panel);

  var messagesEl = document.getElementById('dasher-messages');
  var inputEl = document.getElementById('dasher-input');
  var sendEl = document.getElementById('dasher-send');
  var closeEl = document.getElementById('dasher-close');

  function addMessage(role, text) {
    var el = document.createElement('div');
    el.className = 'dasher-msg ' + role;
    el.innerHTML = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'dasher-msg assistant typing';
    el.id = 'dasher-typing';
    el.textContent = 'Dasher is thinking...';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('dasher-typing');
    if (el) el.remove();
  }

  var messageHistory = [];

  async function sendMessage() {
    var text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    sendEl.disabled = true;

    addMessage('user', text);
    messageHistory.push({ role: 'user', content: text });
    showTyping();

    try {
      var resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messageHistory })
      });
      var data = await resp.json();
      hideTyping();
      addMessage('assistant', data.reply);
      messageHistory.push({ role: 'assistant', content: data.reply.replace(/<[^>]+>/g, '') });
    } catch (err) {
      hideTyping();
      addMessage('assistant', 'Sorry, I couldn\'t reach the server. Please try again.');
    }

    sendEl.disabled = false;
  }

  btn.addEventListener('click', function() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) inputEl.focus();
  });

  closeEl.addEventListener('click', function() { panel.classList.remove('open'); });

  sendEl.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendMessage(); });
})();
