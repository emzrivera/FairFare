import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtvowswitweaxijchypi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dm93c3dpdHdlYXhpamNoeXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTAyMjUsImV4cCI6MjA1OTY4NjIyNX0.FJHX8OGF-WSNZxbC1jzolKlaWEb6SbH2NHwEShLVIFM';

export const supabase = createClient(supabaseUrl, supabaseKey);