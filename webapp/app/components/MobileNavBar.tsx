"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { FocusContext } from "@/utils/FocusProvider";

const MobileNavBar = () => {
  const router = useRouter();
  const { setFocus } = useContext(FocusContext) as { setFocus: (value: boolean) => void };

  const focusSearchInput = () => {
    setFocus(true);
  };

  return (
    <div className="bg-background-color md:hidden fixed z-10 bottom-0 left-0 w-full flex justify-evenly items-center border-t h-20">
      <div className="flex flex-col items-center cursor-pointer">
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          <IoHomeOutline size={24} color="white" className="mb-1" />
        </div>
        <div className="text-white">Home</div>
      </div>
      
      {/* This should take you to the dashboard and focus on search intead?? Not sure
      Or just show the search bar only when you click on search, its weird to have search bar
      on user profile screen */}
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={focusSearchInput}
      >
        <div>
          <IoSearch size={24} color="white" className="mb-1" />
        </div>
        <div className="text-white">Search</div>
      </div>

      <div className="flex flex-col items-center cursor-pointer">
        <div
          onClick={() => {
            router.push("user-profile/");
          }}
        >
          <LuUser size={24} color="white" className="mb-1" />
        </div>
        <div className="text-white">Me</div>
      </div>
    </div>
  );
};
export default MobileNavBar;
