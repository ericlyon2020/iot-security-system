// === src/lib/supabaseClient.js ===
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utoreydndavduamqrhxz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// === src/lib/api.js ===
import { supabase } from './supabaseClient';

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return error;
}

export async function getUserBets(userId) {
  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .eq('user_id', userId);
  return { data, error };
}

export async function placeBet(betDetails) {
  const { data, error } = await supabase
    .from('bets')
    .insert([betDetails]);
  return { data, error };
}
