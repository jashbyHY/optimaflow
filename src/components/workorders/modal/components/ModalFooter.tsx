
import { Button } from "@/components/ui/button";
import { Check, Download, Flag } from "lucide-react";

interface ModalFooterProps {
  workOrderId: string;
  onStatusUpdate?: (workOrderId: string, status: string) => void;
  onDownloadAll?: () => void;
  hasImages: boolean;
}

export const ModalFooter = ({
  workOrderId,
  onStatusUpdate,
  onDownloadAll,
  hasImages
}: ModalFooterProps) => {
  return (
    <div className="p-3 bg-white dark:bg-gray-950 border-t flex justify-between items-center">
      <div className="flex gap-2">
        {onStatusUpdate && (
          <>
            <Button 
              variant="custom"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => onStatusUpdate(workOrderId, "approved")}
            >
              <Check className="mr-1 h-4 w-4" />
              Approve
            </Button>
            <Button 
              variant="custom"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => onStatusUpdate(workOrderId, "flagged")}
            >
              <Flag className="mr-1 h-4 w-4" />
              Flag for Review
            </Button>
          </>
        )}
      </div>
      <div>
        {onDownloadAll && hasImages && (
          <Button 
            variant="custom" 
            className="bg-black hover:bg-black/80 text-white"
            onClick={onDownloadAll}
          >
            <Download className="mr-1 h-4 w-4" />
            Download All
          </Button>
        )}
      </div>
    </div>
  );
};
