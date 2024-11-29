import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { IoIosArrowForward } from "react-icons/io";

const ContentCard = ({ imageUrl, title, date, creator, platform }) => {
  return (
    <div className="space-y-4">
      <div className="w-[150px] lg:w-[180px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-blackA4">
        <AspectRatio.Root ratio={16 / 16}>
          <img
            className="size-full object-cover"
            src={imageUrl}
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio.Root>
      </div>
      <div className="space-y-0.5">
        <div className="font-medium text-base">{title}</div>
        <div className="font-normal text-xs">
          {date} | {creator}
        </div>
        <div className="font-normal text-xs">{platform}</div>
      </div>
    </div>
  );
};

export default ContentCard;
