'use client'

import { IoIosArrowForward } from "react-icons/io";
import ContentCard from "../components/ContentCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();

  const handleCardClick = () => {
    router.push("/view-content");
  };

  return (
    <main className="max-w-[85rem] mx-auto px-screen-320 md:px-screen-768 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440 py-14 text-white space-y-10">
      <div className="space-y-2">
        <div className="flex justify-between px-2">
          <div className="font-bold text-xl">
            We think you&#39;ll like these
          </div>
          <div className="pr-2 cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <ContentCard
              key={index}
              imageUrl={
                "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
              }
              title={"Brainrot"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"YouTube"}
              onCardClick={handleCardClick}
            />
          ))}

          <div className="hidden lg:block">
            <ContentCard
              imageUrl={
                "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
              }
              title={"Brainrot"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"YouTube"}
              onCardClick={handleCardClick}
            />
          </div>
          <div className="hidden sm:block">
            <ContentCard
              imageUrl={
                "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
              }
              title={"Brainrot"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"YouTube"}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between px-2">
          <div className="font-bold text-xl">
            We think you&#39;ll like these
          </div>
          <div className="pr-2 cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <ContentCard
              key={index}
              imageUrl={"https://picsum.photos/200/300?grayscale"}
              title={"GrayScale"}
              date={"29 November"}
              creator={"Amul Gaurav"}
              platform={"Instagram"}
              onCardClick={handleCardClick}
            />
          ))}

          <div className="hidden lg:block">
            <ContentCard
              imageUrl={"https://picsum.photos/200/300?grayscale"}
              title={"GrayScale"}
              date={"29 November"}
              creator={"Amul Gaurav"}
              platform={"Instagram"}
              onCardClick={handleCardClick}
            />
          </div>
          <div className="hidden sm:block">
            <ContentCard
              imageUrl={"https://picsum.photos/200/300?grayscale"}
              title={"GrayScale"}
              date={"29 November"}
              creator={"Amul Gaurav"}
              platform={"Instagram"}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between px-2">
          <div className="font-bold text-xl">Trending in (POP)</div>
          <div className="pr-2 cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <ContentCard
              key={index}
              imageUrl={"https://picsum.photos/seed/picsum/200/300"}
              title={"Closer"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"Spotify"}
              onCardClick={handleCardClick}
            />
          ))}

          <div className="hidden lg:block">
            <ContentCard
              imageUrl={"https://picsum.photos/seed/picsum/200/300"}
              title={"Closer"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"Spotify"}
              onCardClick={handleCardClick}
            />
          </div>
          <div className="hidden sm:block">
            <ContentCard
              imageUrl={"https://picsum.photos/seed/picsum/200/300"}
              title={"Closer"}
              date={"29 November"}
              creator={"Audrey Chen"}
              platform={"Spotify"}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between px-2">
          <div className="font-bold text-xl">Trending in (Netflix)</div>
          <div className="pr-2 cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <ContentCard
              key={index}
              imageUrl={"https://picsum.photos/200/300/?blur"}
              title={"Stranger Things"}
              date={"1 January"}
              creator={"Genie Chen"}
              platform={"Netflix"}
              onCardClick={handleCardClick}
            />
          ))}

          <div className="hidden lg:block">
            <ContentCard
              imageUrl={"https://picsum.photos/200/300/?blur"}
              title={"Stranger Things"}
              date={"1 January"}
              creator={"Genie Chen"}
              platform={"Netflix"}
              onCardClick={handleCardClick}
            />
          </div>
          <div className="hidden sm:block">
            <ContentCard
              imageUrl={"https://picsum.photos/200/300/?blur"}
              title={"Stranger Things"}
              date={"1 January"}
              creator={"Genie Chen"}
              platform={"Netflix"}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
