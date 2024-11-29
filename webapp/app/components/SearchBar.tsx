import { IoSearch } from "react-icons/io5";

const SearcBar = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pb-2 sm:pb-0.5 pointer-events-none">
        <IoSearch size={22} color="black" />
        <span className="sr-only">Search icon</span>
      </div>
      <input
        type="text"
        id="search-navbar"
        className="bg-[#F8F9FB] sm:bg-white block w-full min-w-48 max-w-72 pr-10 lg:pr-1 xl:pr-16 py-[10px] sm:py-3 ps-10 text-body2-mobile sm:text-body2-desktop font-medium sm:font-bold border rounded-3xl border-gray-600 text-[#404040] placeholder:text-[#D6D6D6] sm:placeholder:text-[#404040] focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search here"
      />
    </div>
  );
};

export default SearcBar;
