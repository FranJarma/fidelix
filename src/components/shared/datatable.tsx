import { useTheme, useMediaQuery } from "@mui/material";
import type { ColumnDef } from "@tanstack/react-table";

import { DataListView } from "./datalist-view";
import { DataTableView } from "./datatable-view";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  showActions?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export function DataTable<T extends object>({
  columns,
  data,
  showActions = true,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return !isMobile ? (
    <DataTableView
      columns={columns}
      data={data}
      showActions={showActions}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ) : (
    <DataListView columns={columns} data={data} />
  );
}
