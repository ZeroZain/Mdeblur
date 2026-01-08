import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PhotoGallery } from "./components/PhotoGallery";
import { SelectionModal } from "./components/SelectionModal";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { ComparisonView } from "./components/ComparisonView";

interface Photo {
  id: number;
  url: string;
  isBlurred: boolean;
}

type Screen = "gallery" | "selection" | "processing" | "comparison";

// Mock photo gallery data
const mockPhotos: Photo[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1614432279322-73a2f6fee37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBibHVyJTIwcGhvdG98ZW58MXx8fHwxNzY3ODMzMTAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1660555267263-c169c20ceb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVycnklMjBhY3Rpb24lMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3Njc4MzMxMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1648970186588-e5ba4ad7f35a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMG1vdGlvbnxlbnwxfHx8fDE3Njc4MDc2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1650805174015-53ceeec12c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBhY3Rpb24lMjBibHVyfGVufDF8fHx8MTc2NzgzMzEwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1694444082445-b98e0574ad87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbW92ZW1lbnQlMjBibHVyfGVufDF8fHx8MTc2NzgzMzEwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1662182782241-32bd9635b430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwbW92aW5nJTIwY2Fyc3xlbnwxfHx8fDE3Njc4MzMxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isBlurred: true,
  },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("gallery");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoSelect = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentScreen("selection");
  };

  const handleEnhance = () => {
    setCurrentScreen("processing");
  };

  const handleProcessingComplete = () => {
    setCurrentScreen("comparison");
  };

  const handleSave = () => {
    // Simulate download
    alert("Image saved successfully! (In a real app, this would download the deblurred image)");
  };

  const handleBackToGallery = () => {
    setCurrentScreen("gallery");
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-black text-white max-w-md mx-auto relative overflow-hidden">
      {/* Gallery Screen */}
      {(currentScreen === "gallery" || currentScreen === "selection") && (
        <div className="pb-safe">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6">
            <h1 className="text-3xl">MDEBLUR</h1>
          </div>

          {/* Enhance Section */}
          <div className="px-6 py-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl">Deblurring</h2>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
          </div>

          {/* Photo Grid */}
          <div className="mt-4">
            <PhotoGallery photos={mockPhotos} onPhotoSelect={handlePhotoSelect} />
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-black border-t border-gray-800 px-6 py-4">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-xs">Deblurring</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Modal */}
      {currentScreen === "selection" && selectedPhoto && (
        <SelectionModal
          imageUrl={selectedPhoto.url}
          onClose={() => setCurrentScreen("gallery")}
          onEnhance={handleEnhance}
        />
      )}

      {/* Processing Screen */}
      {currentScreen === "processing" && selectedPhoto && (
        <ProcessingScreen
          imageUrl={selectedPhoto.url}
          onComplete={handleProcessingComplete}
        />
      )}

      {/* Comparison View */}
      {currentScreen === "comparison" && selectedPhoto && (
        <ComparisonView
          blurredUrl={selectedPhoto.url}
          deblurredUrl={selectedPhoto.url}
          onSave={handleSave}
          onBackToGallery={handleBackToGallery}
        />
      )}
    </div>
  );
}