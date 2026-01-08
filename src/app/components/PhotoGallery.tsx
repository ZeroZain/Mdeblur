import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Photo {
  id: number;
  url: string;
  isBlurred: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  onPhotoSelect: (photo: Photo) => void;
}

export function PhotoGallery({ photos, onPhotoSelect }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-2 px-4 pb-24">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="aspect-square rounded-xl overflow-hidden cursor-pointer active:opacity-80 transition-opacity"
          onClick={() => onPhotoSelect(photo)}
        >
          <ImageWithFallback
            src={photo.url}
            alt={`Photo ${photo.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
