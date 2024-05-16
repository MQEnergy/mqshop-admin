import * as React from 'react'
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
import {useEffect} from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number

  onPage(page: number): void
}

export function DataTable<TData, TValue>({columns, data, pageCount, onPage}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
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
  })

  useEffect(() => {
    console.log("pagination.pageIndex + 1", table.getState().pagination.pageIndex)
    onPage(table.getState().pagination.pageIndex + 1)
  }, [table.getState().pagination.pageIndex + 1])

  return (
      <Card className={'shadow-none'}>
        <CardHeader>
          <DataTableToolbar table={table}/>
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
          <DataTablePagination table={table}/>
        </div>
      </Card>
  )
}
