import { createClient } from '@supabase/supabase-js'

export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // This is different from the anon key!
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}