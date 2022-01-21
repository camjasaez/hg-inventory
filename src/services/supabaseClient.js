import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_2;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY_2;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
