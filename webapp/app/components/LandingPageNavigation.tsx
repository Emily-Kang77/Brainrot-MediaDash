"use client";

import { useRouter } from "next/navigation";

interface LandingPageNavigationProps {
  viewNumber: number;
  setViewNumber: React.Dispatch<React.SetStateAction<number>>;
}

const LandingPageNavigation: React.FC<LandingPageNavigationProps> = ({ viewNumber, setViewNumber }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-8 text-white">
      <div className="flex space-x-2">
        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            viewNumber === 1 ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setViewNumber(1)}
        ></div>

        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            viewNumber === 2 ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setViewNumber(2)}
        ></div>

        <div
          className={`h-4 w-4 rounded-full cursor-pointer ${
            viewNumber === 3 ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setViewNumber(3)}
        ></div>
      </div>
    </div>
  );
};

export default LandingPageNavigation;
