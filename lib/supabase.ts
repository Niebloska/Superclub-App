import { createClient } from '@supabase/supabase-js';

// Valores hardcodeados para evitar fallos de carga de entorno en StackBlitz
const supabaseUrl = 'https://mrcyjatjgtgrgotckgyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yY3lqYXRqZ3RncmdvdGNrZ3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxOTk1ODAsImV4cCI6MjA5NTc3NTU4MH0.RvWc9nivtOdGe99Edqfhm-sZSPNoprB1DK8tN5Dk9QQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);