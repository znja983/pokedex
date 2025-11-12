import { createClient } from '@supabase/supabase-js'; 
const supabaseUrl = 'https://fxpytybysdnszeeidgov.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4cHl0eWJ5c2Ruc3plZWlkZ292Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjkwMjY2NSwiZXhwIjoyMDc4NDc4NjY1fQ.FF5dBNnewRFp9Z5q86T7QdqPjSF_5QkJOILw14HoVQM'; 
export const supabase = createClient(supabaseUrl, supabaseKey);