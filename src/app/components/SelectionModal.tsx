import { X, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SelectionModalProps {
  imageUrl: string;
  onClose: () => void;
  onEnhance: () => void;
}

export function SelectionModal({ imageUrl, onClose, onEnhance }: SelectionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-3xl p-6 border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl">Image Preview</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-6">
          <ImageWithFallback
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Proceed Button */}
        <button
          onClick={onEnhance}
          className="w-full bg-white text-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors hover:bg-gray-100"
        >
          <span className="text-lg">Proceed to Deblur</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}