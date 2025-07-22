import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmyitfqewbvyphuhtfkb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWl0ZnFld2J2eXBodWh0ZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNzI2NDYsImV4cCI6MjA2Nzk0ODY0Nn0.56BZdlWnDvhOpgr0_3B5bj_pobqEgOGzIWlaahnb8mo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 