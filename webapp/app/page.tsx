import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import { LearnMore } from "./components/learn-more"
import screenshotDevices from "./images/user-button@2xrl.webp"
import signIn from "./images/sign-in@2xrl.webp"
import verify from "./images/verify@2xrl.webp"
import userButton2 from "./images/user-button-2@2xrl.webp"
import signUp from "./images/sign-up@2xrl.webp"
import logo from "./images/logo.png"
import "./home.css"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "./components/footer"
import { redirect } from 'next/navigation'

export default function Home() {

  redirect('/landing')
  // return (
  //   <>
  //     <div className="relative flex gap-3">
  //       <SignedIn>
  //         <Link
  //           href="/dashboard"
  //           className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
  //         >
  //           Dashboard
  //         </Link>
  //       </SignedIn>
  //       <SignedOut>
  //         <SignInButton>
  //           <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
  //             Sign in
  //           </button>
  //         </SignInButton>
  //       </SignedOut>
  //     <Footer />
  //     </div>
  //   </>
  // )
}
