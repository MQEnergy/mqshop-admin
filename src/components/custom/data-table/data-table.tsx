import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DataTableToolbar} from "./data-table-toolbar";
import DataTablePagination from "./data-table-pagination";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import {useContext, useEffect, useState} from "react";
import {SkeletonList} from "@/components/custom/skeleton-list";
import {TableContext} from "@/context";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount: number
  rowCount: number
  isImport?: boolean // is import file
  imLoading?: boolean // import file loading
  isExport?: boolean // is export file
  exLoading?: boolean // export file loading
  deLoading: boolean // delete loading
  reLoading: boolean // refresh loading
  pagination: {
    pageIndex: number,
    pageSize: number
  }
  onPaginationChange: any
  onOpen: (isOpen: boolean) => void
  onDelete: (values: Row<TData>[]) => void
}

export function DataTable<TData, TValue>({...props}: DataTableProps<TData, TValue>) {
  const {onRefresh} = useContext(TableContext);
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
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
    onPaginationChange: props.onPaginationChange,
  })

  useEffect(() => {
    table.resetRowSelection()
  }, [onRefresh])

  return (
    <Card className={'border-none shadow'}>
      <CardHeader>
        <DataTableToolbar table={table}
                          onOpen={props.onOpen}
                          reLoading={props.reLoading}
                          deLoading={props.deLoading}
                          onDelete={() => props.onDelete(table.getSelectedRowModel().rows)}/>
      </CardHeader>
      <CardContent className={'pb-0'}>
        <ScrollArea className="md:h-[calc(100svh-400px)] lg:h-[calc(100svh-400px)] rounded-md border">
          <Table key={'table'}>
            <TableHeader className='bg-gray-100 dark:bg-neutral-800'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan} className='text-foreground'>
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
              {props.reLoading ?
                <TableRow className='hover:bg-background'>
                  <TableCell colSpan={props.columns.length}>
                    <SkeletonList count={10}/>
                  </TableCell>
                </TableRow>
                :
                (table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className={'py-2'}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='py-2'>
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
                      colSpan={props.columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                ))
              }
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
