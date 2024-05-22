import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DataTableToolbar} from "./data-table-toolbar";
import DataTablePagination from "./data-table-pagination";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useState} from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  rowCount: number
  loading: boolean
  pagination: {
    pageIndex: number,
    pageSize: number
  }
  onPaginationChange: any
  onRefresh: () => void
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                           pageCount,
                                           rowCount,
                                           loading,
                                           pagination,
                                           onPaginationChange,
                                           onRefresh
                                         }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    rowCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: onPaginationChange,
  })

  return (
      <Card className={'shadow-none'}>
        <CardHeader>
          <DataTableToolbar table={table} onRefresh={onRefresh} loading={loading}/>
        </CardHeader>
        <CardContent className={'pb-0'}>
          <ScrollArea className="md:h-[calc(100svh-400px)] lg:h-[calc(100svh-400px)] rounded-md border">
            <Table key={'table'}>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                  )}
                            </TableHead>
                        )
                      })}
                    </TableRow>
                ))}
              </TableHeader>
              <TableBody key={'table-body'}>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                        >
                          {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                              </TableCell>
                          ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                      <TableCell
                          colSpan={columns.length}
                          className='h-24 text-center'
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>

            </Table>
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
        </CardContent>
        <div className='p-4'>
          <DataTablePagination table={table} sizes={[10, 20, 50]}/>
        </div>
      </Card>
  )
}
