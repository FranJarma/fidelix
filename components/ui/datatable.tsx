"use client";

import * as React from "react";
import { FiBell, FiTrash } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

interface BulkAction<T> {
  icon?: React.ReactNode;
  id: string;
  label: string;
  onClick: (rows: T[]) => void;
}

interface DataTableProps<TData> {
  bulkActions?: BulkAction<TData>[];
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  rowKey: keyof TData;
  searchablePlaceholder?: string;
}

export function DataTable<TData>({
  bulkActions = [],
  columns,
  data,
  onRowClick,
  rowKey,
  searchablePlaceholder = "Buscar...",
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder={searchablePlaceholder}
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-2">
            {bulkActions.map(action => (
              <Button
                key={action.id}
                size="sm"
                variant="outline"
                onClick={() => action.onClick(selectedRows)}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
                onClick={e => {
                  const target = e.target as HTMLElement;
                  if (
                    target.closest("button") ||
                    target.closest("input[type=checkbox]") ||
                    target.closest("svg")
                  ) {
                    return;
                  }
                  onRowClick?.(row.original);
                }}
                className="cursor-pointer transition-colors hover:bg-muted/50"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    </div>
  );
}
