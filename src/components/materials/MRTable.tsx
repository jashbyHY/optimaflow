
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MaterialItem } from "@/hooks/materials/useMRStore";
import { formatMaterialType } from "@/utils/materialsUtils";
import { CustomBadge } from "@/components/ui/custom-badge";

// Map material types to our custom badge variants
const getCustomBadgeVariant = (type: string): "success" | "info" | "purple" | "warning" | "primary" | undefined => {
  if (type === 'CONDCOIL') {
    return 'success';
  } else if (type === 'REFRIGERATOR_COILS' || type.includes('FREEZER') || type.includes('FREEZECOOL') || type.includes('COOLER')) {
    return 'info';
  } else if (type.startsWith('S') && type.endsWith('MEND')) {
    return 'purple';
  } else if (type.startsWith('S')) {
    return 'warning';
  } else if (type.startsWith('G') && type.endsWith('B')) {
    return undefined; // Use default style
  } else if (type.startsWith('P') && type.includes('INS')) {
    return 'primary';
  } else if (type.startsWith('F')) {
    return undefined; // Use default style
  } else if (type === 'PRODUCE') {
    return 'success';
  } else {
    return undefined;
  }
};

interface MRTableProps {
  data: MaterialItem[];
}

export const MRTable = ({ data }: MRTableProps) => {
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
                  <CustomBadge 
                    customVariant={getCustomBadgeVariant(item.type)} 
                    className="font-normal"
                  >
                    {formatMaterialType(item.type)}
                  </CustomBadge>
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
