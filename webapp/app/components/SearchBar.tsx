"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FocusContext } from "@/utils/FocusProvider";
import { useRouter } from "next/navigation";

interface FocusContextType {
  focus: boolean;
  setFocus: (focus: boolean) => void;
}

const SearcBar = () => {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { focus, setFocus } = useContext(FocusContext) as FocusContextType;

  const [query, setQuery] = useState(""); // State to track search input

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      // Navigate to the new page with the search query as a parameter
      router.push(`/search-results/${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    if (focus && searchInputRef.current) {
      searchInputRef.current.focus();
      setFocus(false);
    }
  }, [focus, setFocus]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pb-2 sm:pb-0.5 pointer-events-none">
        <IoSearch size={22} color="black" className="mt-1.5 sm:mt-0" />
        <span className="sr-only">Search icon</span>
      </div>

      <input
        type="text"
        id="search-navbar"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="bg-[#F8F9FB] sm:bg-white block w-full min-w-48 max-w-72 py-[8px] pr-1 xl:pr-16 sm:py-3 ps-10 font-medium sm:font-bold border rounded-3xl border-gray-600 text-[#404040] placeholder:text-[#404040]"
        placeholder="Search / here"
      />
    </div>
  );
};

export default SearcBar;
