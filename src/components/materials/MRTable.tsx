
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MaterialItem } from "@/hooks/materials/useMRStore";

interface MRTableProps {
  data: MaterialItem[];
}

export const MRTable = ({ data }: MRTableProps) => {
  // Format material type for display
  const formatMaterialType = (type: string) => {
    // Add special formatting based on known material types
    if (type.includes('FREEZER') || type.includes('FREEZECOOL')) {
      return 'Freezer Filter';
    } else if (type.includes('COOLER')) {
      return 'Cooler Filter';
    } else if (type.includes('CONDCOIL')) {
      return 'Condenser Coil';
    } else if (type.startsWith('G')) {
      return 'Standard Filter';
    } else if (type.startsWith('S')) {
      return 'Specialty Filter';
    } else if (type === 'P-TRAP') {
      return 'P-Trap';
    } else if (type === 'PRODUCE') {
      return 'Produce Filter';
    } else {
      return type;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material Type</TableHead>
            <TableHead>Work Order ID</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                No materials data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {formatMaterialType(item.type)}
                  </Badge>
                </TableCell>
                <TableCell>{item.workOrderId || 'Unknown'}</TableCell>
                <TableCell className="text-right font-medium">
                  {item.quantity}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
