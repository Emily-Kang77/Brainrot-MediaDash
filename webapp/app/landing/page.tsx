"use client";

import { useState } from "react";
import Image from "next/image";
import { WavyBackground } from "@/components/ui/wavy-background";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import LandingPageNavigation from "../components/LandingPageNavigation";
import { useRouter } from "next/navigation";

function Landing() {
  const router = useRouter();
  const [viewNumber, setViewNumber] = useState(1);

  return (
    <WavyBackground className="px-screen-320 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440 py-14 lg:flex lg:items-center lg:justify-center lg:gap-x-32 xl:gap-x-52">
      <div className="max-w-md md:max-w-lg mx-auto lg:mx-0">
        <BackgroundGradient className="rounded-[22px] w-full  p-6 sm:p-10 bg-white dark:bg-zinc-900 space-y-14 lg:space-y-16 text-center">
          {/* <div className="max-w-md md:max-w-lg text-black text-center space-y-20 bg-gray-400 p-8"> */}
          <div className="font-bold text-3xl">Welcome to MediaDash!</div>

          <div className="flex justify-center">
            {viewNumber === 1 && (
              <Image
                src="/landing1.png"
                className="w-[135px] md:w-[190px]"
                alt="logo 1"
                width={500}
                height={500}
              />
            )}
            {viewNumber === 2 && (
              <Image
                src="/landing2.png"
                className="w-[135px] md:w-[190px]"
                alt="logo 2"
                width={500}
                height={500}
              />
            )}
            {viewNumber === 3 && (
              <Image
                src="/landing3.png"
                className="w-[135px] md:w-[190px]"
                alt="logo 3"
                width={500}
                height={500}
              />
            )}
          </div>

          <div>
            <div className="font-medium text-2xl">
              {viewNumber === 1 && "Content recommendations just for you"}
              {viewNumber === 2 && "All of your media platforms in one place"}
              {viewNumber === 3 && "Keep track of your content preferences"}
            </div>
            <div>
              <LandingPageNavigation
                viewNumber={viewNumber}
                setViewNumber={setViewNumber}
              />
            </div>
          </div>
          <div className="px-3">
            <button
              className="w-full bg-[#005DC8] hover:bg-blue-800 font-medium text-xl py-1.5 rounded-md"
              onClick={() => router.push("/onboarding")}
            >
              Get Started
            </button>
          </div>
        </BackgroundGradient>
      </div>

      <div className="hidden lg:block">
        {viewNumber === 1 && (
          <Image
            src="/landing4.png"
            className="w-[150px] md:w-[500px]"
            alt="logo 3"
            width={500}
            height={500}
          />
        )}
        {viewNumber === 2 && (
          <Image
            src="/landing5.png"
            className="w-[150px] md:w-[500px]"
            alt="logo 3"
            width={500}
            height={500}
          />
        )}
        {viewNumber === 3 && (
          <Image
            src="/landing6.png"
            className="w-[150px] md:w-[500px]"
            alt="logo 3"
            width={500}
            height={500}
          />
        )}
      </div>
    </WavyBackground>
  );
}

export default Landing;
