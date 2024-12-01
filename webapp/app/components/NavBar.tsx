"use client";

import { usePathname, useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import PopoverComponent from "./PopoverComponent";

export default function AppBar() {
  const router = useRouter();
  const pathname = usePathname(); // Add this

  return (
    <SignedIn>
      <div className="px-2 md:px-6 lg:px-9 2xl:px-10 py-4 flex justify-between items-center sticky top-0 z-50">
        <button
          className="hidden sm:block px-3 py-1.5 text-white font-semibold bg-red-600 hover:bg-red-700 rounded-lg"
          onClick={() => {
            router.push("/");
          }}
        >
          MediaDash
        </button>

        {/* Conditionally render SearchBar */}
        {!pathname.includes("user-profile") &&
          !pathname.includes("landing") && (
            <div className="flex-1 flex justify-center">
              <SearchBar />
            </div>
          )}

        <div className="hidden lg:flex gap-x-6 xl:gap-x-6">
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-[#131316] hover:bg-gray-900 text-white font-semibold"
          >
            Dashboard
          </Link>

          <Link
            href="/user-profile"
            className="px-5 py-2 rounded-full bg-[#131316] hover:bg-gray-900 text-white font-semibold"
          >
            User
          </Link>

          <div>
            <SignOutButton>
              <button className="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 font-semibold text-white rounded-lg">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>

        <div className="hidden md:block lg:hidden w-16 h-[41px] px-4 py-2 bg-white rounded-2xl">
          <PopoverComponent />
        </div>
      </div>
    </SignedIn>
  );
}
