import { useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";

interface ContentViewProps {
    content: {
      imageUrl: string;
      title: string;
      creator: string;
      date: string;
      platform: string;
      description: string;
    };
    onClose?: () => void;
  }

const ContentView: React.FC<ContentViewProps> = ({ content, onClose }) => {
const [rating, setRating] = useState(0);
const [isHovering, setIsHovering] = useState(0);

    return (
        <div className="bg-background-color min-h-screen text-white">
        {/* Header */}
        <div className="p-4 flex justify-between items-center">
            <button onClick={onClose} className="text-white">
            <IoArrowBack size={24} />
            </button>
        </div>

        {/* Content Image */}
        <div className="w-full aspect-square bg-gray-800">
            <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-full object-cover"
            />
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-4">
            {/* Title and Bookmark */}
            <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <BsBookmark size={20} />
            </div>

            {/* Creator and Date */}
            <div className="text-sm text-gray-400">
            {content.creator} | {content.date}
            </div>

            {/* Platform */}
            <div className="text-sm text-gray-400">
            {content.platform}
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
            {content.description}
            </p>
        </div>
        </div>
    );
};

export default ContentView;