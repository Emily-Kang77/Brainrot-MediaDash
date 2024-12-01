import { createClient } from '@supabase/supabase-js';

interface ClerkSessionData {
  userId: string;
  getToken: () => Promise<string | null>;
}

export function createClerkSupabaseClient(session: ClerkSessionData) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = await session.getToken();
          
          if (!token) {
            throw new Error('No authentication token available');
          }
          
          const headers = new Headers((options as any)?.headers || {});
          headers.set('Authorization', `Bearer ${token}`);
          
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
} 