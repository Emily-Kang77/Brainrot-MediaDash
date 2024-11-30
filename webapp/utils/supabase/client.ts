import { createBrowserClient } from "@supabase/ssr";

export const createClient = (p0: string, p1: string, p2: { global: { fetch: (url: any, options?: {}) => Promise<Response>; }; }) =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: fetch
      }
    }
  );