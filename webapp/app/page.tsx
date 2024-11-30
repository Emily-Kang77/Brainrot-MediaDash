'use client'

import "./home.css";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./components/footer";
import MobileNavBar from "./components/MobileNavBar";
import NavBar from "./components/NavBar";

import { useSession, useUser } from '@clerk/nextjs'
import { PostgrestError } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client'

/** Needs client side because data is specific to user */
export default function Home() {

  // The `useSession()` hook will be used to get the Clerk `session` object
	const { session } = useSession()
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null);

  console.log("Current working directory:", process.cwd())
  console.log("All env vars:", process.env)
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_KEY)

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options = {}) => fetch(url, options)
      }
    }
  )

  useEffect(() => {
    console.log('effect running')
    async function fetchData() {
      console.log('Fetching data...') // Add this

      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

      const { data, error } = await supabase
        .from('mediaDash_user_data')
        .select('*')

      if (error) {
        setError(error)
        return
      }

      setData(data)
      console.log('Received data:', data) // Add this
    }

    fetchData()
  }, []) // Empty dependency array means this runs once when component mounts

  


  // function createClerkSupabaseClient() {
	//   return createClient(
	//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
	//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	//     {
	//       global: {
	//         // Get the custom Supabase token from Clerk
	//         fetch: async (url, options = {}) => {
	// 	        // The Clerk `session` object has the getToken() method      
	//           const clerkToken = await session?.getToken({
	// 	          // Pass the name of the JWT template you created in the Clerk Dashboard
	// 	          // For this tutorial, you named it 'supabase'
	//             template: 'supabase',
	//           })
	          
	//           // Insert the Clerk Supabase token into the headers
	// 	        const headers = new Headers(options?.headers)
	//           headers.set('Authorization', `Bearer ${clerkToken}`)
	          
	//           // Call the default fetch
	//           return fetch(url, {
	//             ...options,
	//             headers,
	//           })
	//         },
	//       },
	//     },
	//   )
  // }

  // // Create a `client` object for accessing Supabase data using the Clerk token
  // const client = createClerkSupabaseClient()
  // const {data, error} = await client.from('Users').select('*')

  // if(error) {
  //   console.error('Error fetching data:', error)
  // }

  return (
    <>
      {/* <MobileNavBar />
      <NavBar /> */}
      <div className="relative gap-3">
        Hello here's the data?
        {data && data.map((user: { user_id: string; name: string }) => (
          <div key={user.user_id}>{user.name}</div>
        ))}
      </div>
    </>
  );
}