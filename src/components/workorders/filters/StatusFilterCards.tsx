
import { Card, CardContent } from "@/components/ui/card";
import { Check, Flag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusFilterCardsProps {
  statusFilter: string | null;
  onStatusFilterChange: (value: string | null) => void;
}

export const StatusFilterCards = ({
  statusFilter,
  onStatusFilterChange,
}: StatusFilterCardsProps) => {
  const statuses = [
    { 
      label: "Approved", 
      value: "approved", 
      icon: Check, 
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-green-500" 
    },
    { 
      label: "Pending Review", 
      value: "pending_review", 
      icon: Clock, 
      color: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-600",
      textColor: "text-yellow-500" 
    },
    { 
      label: "Flagged", 
      value: "flagged", 
      icon: Flag, 
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      textColor: "text-red-500" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
      {statuses.map((status) => {
        const isActive = statusFilter === status.value;
        
        return (
          <Card 
            key={status.value}
            className={cn(
              "cursor-pointer transition-all overflow-hidden group",
              isActive 
                ? "ring-2 ring-offset-2" 
                : `hover:shadow-md ${status.hoverColor}`,
              isActive ? "ring-black" : ""
            )}
            onClick={() => onStatusFilterChange(
              statusFilter === status.value ? null : status.value
            )}
          >
            <div 
              className={cn(
                "h-1 w-full", 
                isActive ? "bg-black" : status.color
              )}
              aria-hidden="true"
            />
            <CardContent className={cn(
              "p-4 flex items-center justify-center gap-2 transition-colors",
              isActive ? "bg-black text-white" : "bg-white"
            )}>
              <status.icon 
                size={18} 
                className={isActive ? "text-white" : status.textColor} 
              />
              <h3 className="font-medium">{status.label}</h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
