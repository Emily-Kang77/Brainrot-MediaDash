"use client";

import { SignOutButton } from "@clerk/nextjs";
import * as Avatar from "@radix-ui/react-avatar";
import { BiCategory } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default async function UserProfilePage() {
  const router = useRouter();

  return (
    <main className="px-screen-320 md:px-screen-768 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440 py-20 lg:py-32">
      <div className="max-w-sm md:max-w-md mx-auto">
        <div className="flex items-center gap-x-12 px-10">
          <Avatar.Root className="inline-flex size-[90px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
              alt="Pedro Duarte"
            />
            <Avatar.Fallback
              className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
              delayMs={600}
            >
              JD
            </Avatar.Fallback>
          </Avatar.Root>

          <div className="text-white font-bold text-2xl">User</div>
        </div>

        <div className="text-white p-10">
          <div className="flex items-center justify-between px-2 py-4 border-t cursor-pointer hover:bg-gray-800">
            <div className="flex items-center gap-x-1.5">
              <div>
                <BiCategory />
              </div>
              <div>My platforms</div>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>

          <div
            className="flex items-center justify-between px-2 py-4 border-t cursor-pointer hover:bg-gray-800"
            onClick={() => {
              router.push("user-ratings");
            }}
          >
            <div className="flex items-center gap-x-1.5">
              <div>
                <FaRegStar />
              </div>
              <div>My ratings</div>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-4 border-t cursor-pointer hover:bg-gray-800">
            <div className="flex items-center gap-x-1.5">
              <div>
                <FaRegBookmark />
              </div>
              <div>Saved content</div>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-4 border-t cursor-pointer hover:bg-gray-800">
            <div className="flex items-center gap-x-1.5">
              <div>
                <IoSettingsOutline />
              </div>
              <div>Account settings</div>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>

          <div className="flex items-center justify-between px-2 py-4 border-t border-b cursor-pointer hover:bg-gray-800">
            <div className="flex items-center gap-x-1.5">
              <div>
                <PiSignOutBold />
              </div>
              <div>
                <SignOutButton>
                  <button>Sign out</button>
                </SignOutButton>
              </div>
            </div>
            <div>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
