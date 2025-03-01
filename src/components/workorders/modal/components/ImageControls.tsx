
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn } from "lucide-react";

interface ImageControlsProps {
  imagesCount: number;
  currentImageIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
  isImageExpanded: boolean;
  toggleImageExpand: () => void;
  zoomModeEnabled: boolean;
  toggleZoomMode: () => void;
  zoomLevel: number;
}

export const ImageControls = ({
  imagesCount,
  currentImageIndex,
  handlePrevious,
  handleNext,
  isImageExpanded,
  toggleImageExpand,
  zoomModeEnabled,
  toggleZoomMode,
  zoomLevel
}: ImageControlsProps) => {
  return (
    <>
      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentImageIndex + 1} / {imagesCount}
      </div>
      
      {/* Previous/Next buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-200 text-gray-700 shadow-md ml-2"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-200 text-gray-700 shadow-md mr-2"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Control buttons */}
      <div className="absolute top-4 left-4 flex gap-2">
        {/* Expand/Collapse button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleImageExpand}
          className="h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-200 text-gray-700 shadow-md"
          aria-label={isImageExpanded ? "Minimize image" : "Maximize image"}
        >
          {isImageExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
        
        {/* Zoom toggle button - only show when expanded */}
        {isImageExpanded && (
          <Button
            variant="outline"
            size="icon"
            onClick={toggleZoomMode}
            className={`h-10 w-10 rounded-full bg-white/90 hover:bg-white border-gray-200 text-gray-700 shadow-md ${zoomModeEnabled ? 'bg-blue-100 border-blue-300' : ''}`}
            aria-label={zoomModeEnabled ? "Disable zoom mode" : "Enable zoom mode"}
          >
            <ZoomIn className={`h-4 w-4 ${zoomModeEnabled ? 'text-blue-500' : ''}`} />
          </Button>
        )}
      </div>
      
      {/* Zoom indicator - only show when zoomed */}
      {isImageExpanded && zoomLevel !== 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
          {Math.round(zoomLevel * 100)}%
        </div>
      )}
      
      {/* Zoom mode indicator */}
      {isImageExpanded && zoomModeEnabled && zoomLevel === 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
          Click to zoom or use mouse wheel
        </div>
      )}
    </>
  );
};
