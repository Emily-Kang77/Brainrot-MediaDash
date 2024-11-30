'use client'

import "./home.css";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";
import MobileNavBar from "./components/MobileNavBar";
import NavBar from "./components/NavBar";

import { useSession, useUser } from '@clerk/nextjs'
import { useRouter } from "next/navigation";


import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client' // custom client
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/** Needs client side because data is specific to user */
export default function Home() {

  // The `useSession()` hook will be used to get the Clerk `session` object
	const { session } = useSession()
  const { user } = useUser() // Add this to get user details from Clerk
  const router = useRouter();

  // const [data, setData] = useState<any | null>(null)
  // const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    } else {
      router.push('/sign-in'); // Or wherever you want unauthenticated users to go
    }
  }, [router, session]);


  const supabase = createClient()

  interface RequestOptions {
    headers?: HeadersInit
  }


  function createClerkSupabaseClient() {
	  return createSupabaseClient(
	    process.env.NEXT_PUBLIC_SUPABASE_URL!,
	    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	    {
	      global: {
	        // Get the custom Supabase token from Clerk
	        fetch: async (url, options = {}) => {
		        // The Clerk `session` object has the getToken() method      
	          const clerkToken = await session?.getToken({
		          // Pass the name of the JWT template you created in the Clerk Dashboard
		          // For this tutorial, you named it 'supabase'
	            template: 'supabase',
	          })
	          
	          // Insert the Clerk Supabase token into the headers
		        const headers = new Headers((options as RequestOptions)?.headers || {})
	          headers.set('Authorization', `Bearer ${clerkToken}`)
	          
	          // Call the default fetch
	          return fetch(url, {
	            ...options,
	            headers,
	          })
	        },
	      },
	    },
	  )
  }

  // Function to write user data to Supabase
  const writeUserToSupabase = async () => {
    if (!user) return

    console.log(user)
    const supabaseClient = createClerkSupabaseClient()

    // First check if user exists
    const { data: existingUser } = await supabaseClient
    .from('mediaDash_user_data')
    .select()
    .eq('user_id', user.id)
    .single()

    if(!existingUser) {
      const { data, error } = await supabaseClient
        .from('mediaDash_user_data')
        .upsert({ 
          user_id: user.id,
          email: user.emailAddresses[0].emailAddress,
          // Add any other user fields you want to store
          // updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id' // This will update the record if it already exists
        })

      if (error) {
        console.error('Error writing to Supabase:', error)
      } else {
        console.log('Successfully wrote user data to Supabase')
      }
    } else {
      console.log('User already exists. No writing done')
    }
  }

  // Call this function when component mounts
  useEffect(() => {
    if (user) {
      writeUserToSupabase()
    }
  }, [user])


  // if(error) {
  //   console.error('Error fetching data:', error)
  // }

  return (
    <>
      {/* <MobileNavBar />
      <NavBar /> */}
      <div className="relative gap-3">
        {/* Hello here's the data?
        {data && data.map((user: { user_id: string; name: string }) => (
          <div key={user.user_id}>{user.name}</div>
        ))} */}
      </div>
    </>
  );
}