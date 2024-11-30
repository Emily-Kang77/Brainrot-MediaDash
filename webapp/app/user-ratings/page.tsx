import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ContentCardRatings from "../components/ContentCardRatings";

export default async function UserRatingsPage() {
  return (
    <main className="px-screen-320 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440 py-14 lg:py-24">
      <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto text-white">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex-shrink-0 cursor-pointer">
            <IoIosArrowForward className="rotate-180" />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            My Ratings
          </div>
        </div>

        <div className="flex justify-end py-2">
          <button className="bg-white hover:bg-slate-200 px-3 py-1 rounded-[20px] text-black border flex items-center gap-x-2 text-lg">
            <div>sort</div>
            <div>
              <IoIosArrowDown />
            </div>
          </button>
        </div>

        <div className="p-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <ContentCardRatings key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
