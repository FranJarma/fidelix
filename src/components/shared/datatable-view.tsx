import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

interface Props<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
}

export function DataTableView<T extends object>({
  columns,
  data,
  onEdit,
  onDelete,
  showActions = true,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {table.getHeaderGroups()[0].headers.map((header) => {
              const canSort = header.column.getCanSort();
              const sortDirection = header.column.getIsSorted() || false;

              return (
                <TableCell key={header.id} sx={{ fontWeight: 600 }}>
                  {canSort ? (
                    <TableSortLabel
                      active={!!sortDirection}
                      direction={sortDirection === "desc" ? "desc" : "asc"}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableSortLabel>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )
                  )}
                </TableCell>
              );
            })}

            {showActions && (
              <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} hover>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}

              {showActions && (
                <TableCell>
                  {onEdit && (
                    <IconButton
                      onClick={() => onEdit(row.original)}
                      size="small"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton
                      onClick={() => onDelete(row.original)}
                      size="small"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
