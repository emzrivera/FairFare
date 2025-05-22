import 'dotenv/config';

export default {
  expo: {
    name: "FairFare",
    slug: "fairfare",
    version: "1.0.0",
    android: {
      package: "com.fairfare.app" // ✅ This is what you need
    },
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      mapboxToken: process.env.MAPBOX_TOKEN,
    },
  },
};
