import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejhbbhubwpsochugezix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqaGJiaHVid3Bzb2NodWdleml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5ODUxMDgsImV4cCI6MjA0MzU2MTEwOH0.6m_lMtzPsuOCys32hVIt9CyRGP7JWx3RQAnyT591lCU';
export const supabase = createClient(supabaseUrl, supabaseKey);