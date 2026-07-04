var { createClient } = require('@supabase/supabase-js');

var supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function addSubscriber(email) {
  var { data: existing } = await supabase
    .from('subscribers')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    return { success: true, message: 'Already subscribed' };
  }

  var { error } = await supabase
    .from('subscribers')
    .insert({ email: email, subscribed_for_daily: true });

  if (error) {
    if (error.code === '23505') {
      return { success: true, message: 'Already subscribed' };
    }
    throw error;
  }

  return { success: true };
}

async function getAllEmails() {
  var { data, error } = await supabase
    .from('subscribers')
    .select('email');

  if (error) throw error;
  return data.map(function(s) { return s.email; });
}

async function getAllSubscribers() {
  var { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: true });

  if (error) throw error;
  return data;
}

module.exports = { addSubscriber, getAllEmails, getAllSubscribers };
