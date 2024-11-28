"use client";

import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";

const MobileNavBar = () => {
  const router = useRouter();

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white flex justify-evenly items-center border-t h-20">
      <div className="flex flex-col items-center cursor-pointer">
        <div
          onClick={() => {
            router.push("/");
          }}
        >
          <IoHomeOutline size={24} color="black" className="mb-1" />
        </div>
        <div className="text-black">Home</div>
      </div>

      <div className="flex flex-col items-center cursor-pointer">
        <div>
          <IoSearch size={24} color="black" className="mb-1" />
        </div>
        <div className="text-black">Search</div>
      </div>

      <div className="flex flex-col items-center cursor-pointer">
        <div>
          <LuUser size={24} color="black" className="mb-1" />
        </div>
        <div className="text-black">My</div>
      </div>
    </div>
  );
};

export default MobileNavBar;
