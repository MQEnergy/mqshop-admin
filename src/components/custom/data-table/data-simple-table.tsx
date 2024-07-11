import {ColumnDef, flexRender, Row, Table as ReactTable} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/components/ui/table'
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area.tsx";
import DataTablePagination from "./data-table-pagination.tsx";
import {SkeletonList} from "@/components/custom/skeleton-list";
import {cn} from "@/lib/utils";

interface DateSimpleTableProps<TData, TValue> {
  table: ReactTable<TData>
  columns: ColumnDef<TData, TValue>[]
  isImport?: boolean // is import file
  imLoading?: boolean // import file loading
  isExport?: boolean // is export file
  exLoading?: boolean // export file loading
  deLoading: boolean // delete loading
  reLoading: boolean // refresh loading
  onOpen: (isOpen: boolean) => void
  onDelete: (values: Row<TData>[]) => void
  noPagination?: boolean
}

export function DataSimpleTable<TData, TValue>({...props}: DateSimpleTableProps<TData, TValue>) {
  return (
    <>
      <ScrollArea
        className={cn(
          `md:h-[calc(100svh-400px)] lg:h-[calc(100svh-400px)] rounded-md border`,
          props.noPagination && 'md:h-[calc(100svh-364px)] lg:h-[calc(100svh-364px)]'
        )}>
        <Table key={'table'}>
          <TableHeader className='bg-gray-100 dark:bg-neutral-800'>
            {props.table.getHeaderGroups().map((headerGroup) => (
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
              (props.table.getRowModel().rows.length > 0 ? (
                props.table.getRowModel().rows.map((row) => (
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
        {!props.noPagination && <DataTablePagination table={props.table} sizes={[10, 20, 50]}/>}
      </div>
    </>
  )
}
