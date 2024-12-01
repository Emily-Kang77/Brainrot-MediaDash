'use client'

import "./home.css";
import { useSession, useUser } from '@clerk/nextjs'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClerkSupabaseClient } from '@/utils/supabase-client';

export default function Home() {
  const { session } = useSession()
  const { user } = useUser()
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log('Redirecting to dashboard');
      router.push('/dashboard');
    } else {
      console.log('Redirecting to landing');
      router.push('/landing');
    }
  }, [router, session]);

  useEffect(() => {
    const writeUserToSupabase = async () => {
      if (!user || !session) return;

      try {
        const supabaseClient = createClerkSupabaseClient({
          userId: user.id,
          getToken: () => session.getToken({ template: 'supabase' })
        });

        // First check if user exists
        const { data: existingUser } = await supabaseClient
          .from('mediaDash_user_data')
          .select()
          .eq('user_id', user.id)
          .single()

        if (!existingUser) {
          const { error } = await supabaseClient
            .from('mediaDash_user_data')
            .upsert({ 
              user_id: user.id,
              email: user.emailAddresses[0].emailAddress,
            }, {
              onConflict: 'user_id'
            })

          if (error) {
            console.error('Error writing to Supabase:', error)
          }
        }
      } catch (error) {
        console.error('Error initializing Supabase client:', error);
      }
    }

    writeUserToSupabase()
  }, [user, session])

  return null;
}