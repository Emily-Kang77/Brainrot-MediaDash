"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";

export default function SearchResultsPage() {
  const { query } = useParams();
  const [result, setResult] = useState<Result[]>([]);

  const imageUrls = [
    "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80",
    "https://picsum.photos/200/300",
    "https://picsum.photos/id/237/200/300",
    "https://fastly.picsum.photos/id/39/3456/2304.jpg?hmac=cc_VPxzydwTUbGEtpsDeo2NxCkeYQrhTLqw4TFo-dIg",
    "https://picsum.photos/200/300?grayscale",
  ];

  interface Query {
    userId: string;
    query: string;
  }

  interface Result {
    title: string;
    reason: string | null;
    creator: string | null;
    platform: string | null;
    rating: null | number;
  }

  const getRecommendations = async (userData: Query) => {
    const response = await axios.post("http://127.0.0.1:8000/user_query", {
      user_id: userData.userId,
      query: userData.query,
    });
    console.log(response);
    setResult(response.data);
  };

  useEffect(() => {
    getRecommendations({
      userId: "123",
      query: query as string,
    });
  }, []);

  return (
    <main className="px-screen-320 lg:px-screen-992 xl:px-screen-1200 2xl:px-screen-1440">
      <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto text-white">
        <div className="container mx-auto py-6">
          <h1 className="text-2xl font-bold">Search Results</h1>
          <p className="mt-2">
            You searched for: <strong>{query}</strong>
          </p>

          <div className="mt-4">
            <p>Displaying results for "{query}"...</p>
          </div>
        </div>

        <div>
          <div className="font-bold text-xl py-3">
            Here&#39;s what we think you&#39;ll like:
          </div>
          <div className="">
            {result.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-t px-6 py-6"
              >
                <div className="flex items-center gap-x-6">
                  <div className="w-[150px] lg:w-[180px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-blackA4">
                    <AspectRatio.Root ratio={16 / 16}>
                      <img
                        className="size-full object-cover"
                        src={imageUrls[index]}
                        alt="Content thumbnail"
                      />
                    </AspectRatio.Root>
                  </div>
                  <div className="space-y-4">
                    <div className="font-bold text-lg">
                      {item.title || "No title"}
                    </div>
                    <div className="font-medium text-sm">
                      {"1 December"} | {item.creator || "Emily Kang"}
                    </div>
                    <div className="font-medium text-sm ">
                      {item.platform || "Tik Tok"}
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer">
                  <IoIosArrowForward />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16">
          <div className="font-medium text-base">
            Not what you were looking for?
          </div>
          <div className="font-normal text-sm">
            <span className="underline cursor-pointer">More results </span>
            or search again
          </div>
        </div>
      </div>
    </main>
  );
}
