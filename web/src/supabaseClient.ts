import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://jqpnvtoacdtpjyojqtoe.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcG52dG9hY2R0cGp5b2pxdG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMDEyOTEsImV4cCI6MTk4NDc3NzI5MX0.n63qKi52zFqNKfFIiMheKb5b6H_v6TKyg8KbFh6VQqc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);