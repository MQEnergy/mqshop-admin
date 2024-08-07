import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {DataTableToolbar} from "./data-table-toolbar";
import DataTablePagination from "./data-table-pagination";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SkeletonList} from "@/components/custom/skeleton-list";
import {TableContext} from "@/context";
import {cn} from "@/lib/utils";

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
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[]
  noPagination?: boolean
}

export function useDataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  return useReactTable({
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
}

export function DataTable<TData, TValue>({...props}: DataTableProps<TData, TValue>) {
  const {onRefresh} = useContext(TableContext);
  const table = useDataTable(props)

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
        <ScrollArea
          className={cn(
            `md:h-[calc(100svh-400px)] lg:h-[calc(100svh-400px)] rounded-md border`,
            props.noPagination && 'md:h-[calc(100svh-364px)] lg:h-[calc(100svh-364px)]'
          )}>
          <Table key={'table'}>
            <TableHeader className='bg-gray-100 dark:bg-neutral-800'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan} className='text-foreground' style={{
                        width: header.getSize() !== 150 ? header.getSize() : undefined
                      }}>
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
                (table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className={'py-2'}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className='py-2'
                                   style={{width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined}}>
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
        <div className='p-4'>
          {!props.noPagination && <DataTablePagination table={table} sizes={[10, 20, 50]}/>}
        </div>
      </CardContent>
    </Card>
  )
}
