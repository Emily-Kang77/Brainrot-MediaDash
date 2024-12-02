import { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { Result } from '../types';
import { useSearchParams, useRouter } from 'next/navigation';

// interface ContentViewProps {
//     content: {
//       imageUrl: string;
//       title: string;
//       creator: string;
//       date: string;
//       platform: string;
//       description: string;
//     };
//     onClose?: () => void;
//   }

interface ContentViewProps {
  onClose?: () => void;
}

const ContentView: React.FC<ContentViewProps> = (onClose: ContentViewProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const title: string | undefined = searchParams.get('title') ?? undefined;
  const creator: string | undefined = searchParams.get('creator') ?? undefined;
  const platform: string | undefined = searchParams.get('platform') ?? undefined;
  const description: string | undefined = searchParams.get('description') ?? undefined;
  const ratings: string | undefined = searchParams.get('ratings') ?? undefined;
  const imageUrl: string | undefined = searchParams.get('imageUrl') ?? undefined;

  const [rating, setRating] = useState(0);
  const [isHovering, setIsHovering] = useState(0);

  
  const handleClose = () => {
    router.back(); // or use router.push('/dashboard')
  };
  
  const imageUrls = [
    "https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80",
    "https://picsum.photos/200/300",
    "https://picsum.photos/id/237/200/300",
    "https://fastly.picsum.photos/id/39/3456/2304.jpg?hmac=cc_VPxzydwTUbGEtpsDeo2NxCkeYQrhTLqw4TFo-dIg",
    "https://picsum.photos/200/300?grayscale",
  ];

    return (
        <div className="bg-background-color min-h-screen text-white">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
            <button className="text-white">
            <IoArrowBack onClick={handleClose} size={24} />
            </button>
        </div>

        {/* Content Image */}
        <div className="w-full aspect-square bg-gray-800">
        {imageUrl && (
          <img src={imageUrl} alt={"Content thumbnail"} onError={(e) => {
            e.currentTarget.src = imageUrls[2] || "https://picsum.photos/200/300";
          }} className="w-full h-full object-cover" />
        )}
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-4">
            {/* Title and Bookmark */}
            <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{title}</h1>
            <BsBookmark size={20} />
            </div>

            {/* Creator and Date */}
            <div className="text-sm text-gray-400">
            {creator}
            </div>

            {/* Platform */}
            <div className="text-sm text-gray-400">
            {platform}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    className="text-2xl"
                    onMouseEnter={() => setIsHovering(star)}
                    onMouseLeave={() => setIsHovering(0)}
                    onClick={() => setRating(star)}
                >
                    {star <= (isHovering || rating) ? "★" : "☆"}
                </button>
                ))}
            </div>
            <button 
                className="px-4 py-1 bg-white text-black rounded-full text-sm"
            >
                Rate
            </button>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed">
                {description}
            </p>
        </div>
        </div>
    );
};

export default ContentView;