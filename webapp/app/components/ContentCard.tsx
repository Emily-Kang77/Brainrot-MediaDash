import * as AspectRatio from "@radix-ui/react-aspect-ratio";

interface ContentCardProps {
  imageUrl: string;
  title: string;
  date: string;
  creator: string;
  platform: string;
  onCardClick?: () => void;
}

const ContentCard = ({
  imageUrl,
  title,
  date,
  creator,
  platform,
  onCardClick,
}: ContentCardProps) => {
  return (
    <div onClick={onCardClick} className="space-y-4 hover:bg-gray-800 p-4 rounded-xl">
      <div className="w-[150px] lg:w-[180px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-blackA4">
        <AspectRatio.Root ratio={16 / 16}>
          <img
            className="size-full object-cover transition-all duration-300 ease-in-out opacity-70 hover:opacity-100"
            src={imageUrl}
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio.Root>
      </div>
      <div className="space-y-0.5 transition-all duration-300 ease-in-out opacity-90 hover:opacity-100">
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
