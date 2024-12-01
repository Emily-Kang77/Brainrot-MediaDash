'use client';

import { createClerkSupabaseClient } from "@/utils/supabase-client";
import { useSignIn, useSignUp, useUser, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HandleAuth() {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { isLoaded: sessionLoaded, session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async() => {
      if (!userLoaded || !sessionLoaded) {
        console.log("Still loading...");
        return;
      }

      if (isSignedIn && session && user) {
        try {
          // Create Supabase client
          const supabase = createClerkSupabaseClient({
            userId: user.id,
            getToken: () => session.getToken({ template: 'supabase' })
          });

          // Write user data to Supabase
          const { error } = await supabase
            .from('mediaDash_user_data')
            .upsert({ 
              user_id: user.id,
              email: user.emailAddresses[0].emailAddress,
            }, {
              onConflict: 'email'
            });

          if (error) throw error;
          console.log('Successfully synced user data to Supabase');
          // Always redirect to onboarding for now
          router.push('/onboarding');
          
        } catch (error) {
          console.error('Error syncing to Supabase:', error);
        }
      } else {
        router.push('/sign-in');
      }
    }

    handleAuth();
  }, [userLoaded, sessionLoaded, isSignedIn, user, session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}