import Constants from 'expo-constants';

const SUPABASE_URL = Constants.expoConfig.extra.supabaseUrl;
const SUPABASE_KEY = Constants.expoConfig.extra.supabaseAnonKey;

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation' // <-- This tells Supabase to return the updated row
};


export async function getFares() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/fares?select=*`, {
    headers,
  });
  return await res.json();
}

export async function updateFare(type, price) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/fares?type=eq.${type}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      price,
      created_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update ${type}: ${errorText}`);
  }

  const data = await res.json();
  return data;
}

