import { useState } from "react";
import { Download, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ComparisonViewProps {
  blurredUrl: string;
  deblurredUrl: string;
  onSave: () => void;
  onBackToGallery: () => void;
}

export function ComparisonView({ blurredUrl, deblurredUrl, onSave, onBackToGallery }: ComparisonViewProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-white text-xl">Deblurred Result</h2>
        <p className="text-gray-400 text-sm mt-1">
          {showOriginal ? "Original (Blurred)" : "Enhanced (Deblurred)"}
        </p>
      </div>

      {/* Image Display */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden relative">
          <ImageWithFallback
            src={showOriginal ? blurredUrl : deblurredUrl}
            alt={showOriginal ? "Blurred" : "Deblurred"}
            className="w-full h-full object-cover"
          />
          
          {/* Comparison overlay badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-white text-xs">
              {showOriginal ? "Before" : "After"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 pb-8 space-y-3">
        {/* Toggle Button */}
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="w-full bg-gray-800 text-white py-4 rounded-full flex items-center justify-center gap-3 border border-gray-700"
        >
          {showOriginal ? (
            <>
              <EyeOff className="w-5 h-5" />
              <span>Hide Original</span>
            </>
          ) : (
            <>
              <Eye className="w-5 h-5" />
              <span>Show Original</span>
            </>
          )}
        </button>

        {/* Save Button */}
        <button
          onClick={onSave}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-full flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          <span>Save Deblurred Image</span>
        </button>

        {/* Back to Gallery */}
        <button
          onClick={onBackToGallery}
          className="w-full text-gray-400 py-3 text-sm"
        >
          Back to Gallery
        </button>
      </div>
    </div>
  );
}