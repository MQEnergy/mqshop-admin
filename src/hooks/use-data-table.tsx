import {useState} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel, getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState, Table,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import * as React from "react";


export interface UseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  rowCount: number
  pagination: {
    pageIndex: number,
    pageSize: number
  }
  onPaginationChange: any
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[]
}

export function useDataTable<TData, TValue>(props: UseDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const table: Table<TData> = useReactTable({
    data: props.data,
    columns: props.columns,
    pageCount: props.pageCount,
    rowCount: props.rowCount,
    state: {
      pagination: props.pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: props.getSubRows,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: props.onPaginationChange,
    // debugTable: true,
  })
  return table
}
