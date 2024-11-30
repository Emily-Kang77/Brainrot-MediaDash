import { IoIosArrowForward } from "react-icons/io";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import StarRating from "./StarRating";

const ContentCardRatings = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 lg:px-5 2xl:px-6 py-6">
      <div className="flex items-center gap-x-4 md:gap-x-6">
        <div className="w-[120px] md:w-[150px] lg:w-[180px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-blackA4">
          <AspectRatio.Root ratio={16 / 16}>
            <img
              className="size-full object-cover"
              src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
              alt="Landscape photograph by Tobias Tullius"
            />
          </AspectRatio.Root>
        </div>

        <div className="space-y-2 md:space-y-4 lg:space-y-6">
          <div className="space-y-3 md:space-y-4">
            <div className="font-medium text-base">Brainrot</div>
            <div className="font-normal text-xs">30 November | Amul Gaurav</div>
            <div className="font-normal text-xs">YouTube</div>
          </div>

          <StarRating />
        </div>
      </div>
      <div className="cursor-pointer">
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default ContentCardRatings;
