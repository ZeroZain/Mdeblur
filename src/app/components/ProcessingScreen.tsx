import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProcessingScreenProps {
  imageUrl: string;
  onComplete: () => void;
}

export function ProcessingScreen({ imageUrl, onComplete }: ProcessingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="w-64 h-64 rounded-2xl overflow-hidden mb-8">
        <ImageWithFallback
          src={imageUrl}
          alt="Processing"
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-white text-2xl mb-4">Deblurring Image...</h2>
      
      <div className="w-full max-w-xs bg-gray-800 rounded-full h-2 overflow-hidden mb-2">
        <div
          className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-gray-400 text-sm">{progress}%</p>
    </div>
  );
}
