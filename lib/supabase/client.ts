import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create and export the Supabase client with enhanced configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-client-info': 'commercial-smb'
    }
  }
});

// Connection check with improved error handling and retry logic
export async function checkSupabaseConnection(retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      // Check auth status first
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      if (!authError) {
        return true;
      }

      // If auth check fails, try a simple query
      const { error: dbError } = await supabase
        .from('users')
        .select('count')
        .limit(1)
        .single();

      // PGRST116 means no rows found, which is fine
      if (!dbError || dbError.message.includes('PGRST116')) {
        return true;
      }

      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        continue;
      }
    } catch (error) {
      console.error('Connection check error:', error);
      
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        continue;
      }
    }
  }
  return false;
}

// Helper function to check if user is admin
export async function isUserAdmin(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.role === 'admin';
  } catch (error) {
    console.error('Admin check error:', error);
    return false;
  }
}