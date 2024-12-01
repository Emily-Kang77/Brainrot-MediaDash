'use client';

import { createClerkSupabaseClient } from "@/utils/supabase-client";
import { useSignIn, useSignUp, useUser, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HandleAuth() {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  const { isLoaded: sessionLoaded, session } = useSession();  // Add sessionLoaded
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();

  useEffect(() => {
    // const handleAuth = async() => {
    //   // Wait for both user and session to load
    //   if (!userLoaded || !sessionLoaded) {
    //     console.log("Still loading...", { userLoaded, sessionLoaded });
    //     return;
    //   }

    //   console.log("Auth state:", { isSignedIn, user, session });

    //   if (isSignedIn && session) {
    //     const sessionData = {
    //       getToken: async () => await session.getToken(),
    //       userId: user.id,
    //     };
    //     await createClerkSupabaseClient(sessionData);

    //     const isFirstSignIn = user.lastSignInAt === user.createdAt;
    //     console.log("Sign in check:", { isFirstSignIn, lastSignIn: user.lastSignInAt, createdAt: user.createdAt });
        
    //     if (isFirstSignIn) {
    //       console.log("➡️ First time user - to onboarding");
    //       router.push('/onboarding');
    //     } else {
    //       console.log("➡️ Returning user - to dashboard");
    //       router.push('/dashboard');
    //     }
    //   } else {
    //     console.log("➡️ Not signed in - to sign-in");
    //     router.push('/sign-in');
    //   }
    // }
    // Just show onboarding to everyone. Always. 
    const handleAuth = async() => {
        if (!userLoaded || !sessionLoaded) {
          console.log("Still loading...", { userLoaded, sessionLoaded });
          return;
        }
  
        if (isSignedIn && session) {
          // Just go to onboarding every time!
          console.log("➡️ Always to onboarding!");
          router.push('/onboarding');
        } else {
          router.push('/sign-in');
        }
      }

    handleAuth();
  }, [userLoaded, sessionLoaded, isSignedIn, user, session, router]);  // Add sessionLoaded to deps


  // You could return a loading state here while the auth is being handled
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}