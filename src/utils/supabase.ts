import { createClient } from '@supabase/supabase-js';

// Configure dotenv when developement environment
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
supabase.auth.setAuth(process.env.SUPABASE_API_KEY!);

export default supabase;
