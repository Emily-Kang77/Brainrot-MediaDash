"use client";

import React, { useState } from "react";
import LandingPageNavigation from "../components/LandingPageNavigation";
import { useRouter } from "next/navigation";
import { Divide } from "lucide-react";

const onBoardingPage = () => {
  const router = useRouter();
  const [viewNumber, setViewNumber] = useState(1);

  const platforms = [
    {
      name: "YouTube",
      id: "youtube",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
    },
    {
      name: "Spotify",
      id: "spotify",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/768px-Spotify_logo_without_text.svg.png",
    },
    {
      name: "Netflix",
      id: "netflix",
      icon: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    },
    {
      name: "TikTok",
      id: "tiktok",
      icon: "https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_1280.png",
    },
    {
      name: "Instagram",
      id: "instagram",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
    },
    {
      name: "Twitch",
      id: "twitch",
      icon: "https://wallpapers.com/images/hd/twitch-logo-glitch-icon-5mgj00lrf8mqsieh.jpg",
    },
  ];

  const genres = ["Comedy", "Romance", "Horror", "Documentary", "Mystery"];

  console.log(viewNumber);

  return (
    <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto py-10 space-y-10">
      <div>
        <LandingPageNavigation
          viewNumber={viewNumber}
          setViewNumber={setViewNumber}
        />
      </div>

      <div className="space-y-2">
        <div className="font-bold text-3xl">
          {viewNumber === 1 && "What media streaming platforms do you use?"}
          {viewNumber === 2 && "Select 3-5 of your favorite genres!"}
          {viewNumber === 3 && "Welcome, user!"}
        </div>

        <div className="text-base">
          {viewNumber === 1 &&
            "*If none are selected, content from all platforms will be recommended"}
          {viewNumber === 2 &&
            "This will help us recommend you content! If none are selected, we will give you a random selection amongst what is trending amongst other users."}
        </div>
      </div>

      <div>
        {viewNumber === 1 && <PlatformSelector platforms={platforms} />}
        {viewNumber === 2 && <GenreSelector genres={genres} />}
        {viewNumber === 3 && (
          <div className="text-2xl pb-20">
            You have successfully signed up for MediaDash! There are so many
            content recs waiting for you just around the corner :&gt; Go check
            them out now!
          </div>
        )}
      </div>


      <div className="px-1">
        <button
          className="w-full bg-[#005DC8] text-white hover:bg-blue-800 font-medium text-xl py-1.5 rounded-md"
          onClick={() => {
            setViewNumber((prevViewNumber: number) => {
              if (prevViewNumber === 1) return 2;
              if (prevViewNumber === 2) return 3;
              return 3;
            });
            if (viewNumber === 3) router.push("/dashboard");
          }}
        >
          {viewNumber < 3 ? "Next" : "Go to Home"}
        </button>
      </div>
    </div>
  );
};

const PlatformSelector = ({ platforms }: { platforms: Array<{ id: string; name: string; icon: string }> }) => {
  return (
    <div className="flex flex-wrap justify-center gap-x-2 py-4">
      {platforms.map((platform: { id: string; name: string; icon: string }) => (
        <Platform key={platform.id} platform={platform} />
      ))}
    </div>
  );
};

const GenreSelector = ({ genres }: { genres: string[] }) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-3 py-4">
      {genres.map((genre, index) => (
        <Genre key={index} genre={genre} />
      ))}
    </div>
  );
};

const Platform = ({ platform }: { platform: { id: string; name: string; icon: string } }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className="space-y-3 hover:bg-gray-800 p-5 rounded-xl"
      onClick={() => setIsSelected((isSelected) => !isSelected)}
    >
      <div
        className={`
    w-24 h-24 
    rounded-full 
    cursor-pointer 
    transition-all 
    flex items-center justify-center
    bg-black
    ${isSelected ? "ring-4 ring-green-500" : "ring-2 ring-gray-300"}
  `}
      >
        <img
          src={platform.icon}
          alt={platform.name}
          className="w-14 h-14 object-contain"
        />
      </div>

      <div className="text-center">{platform.name}</div>
    </div>
  );
};

const Genre = ({ genre }: { genre: string }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className="hover:bg-gray-800 rounded-xl"
      onClick={() => setIsSelected((isSelected) => !isSelected)}
    >
      <div
        className={`px-3 py-1 border rounded-3xl text-center cursor-pointer 
    transition-all  ${isSelected && "bg-gray-400 text-black"}`}
      >
        {genre}
      </div>
    </div>
  );
};

export default onBoardingPage;
