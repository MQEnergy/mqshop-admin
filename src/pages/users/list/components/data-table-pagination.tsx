import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem, PaginationLink,
  PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-between overflow-auto px-2'>
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block '>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex items-center justify-between sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>每页数</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>

          <PaginationDemo table={table}/>
          {/*<Button*/}
          {/*  variant='outline'*/}
          {/*  className='hidden h-8 w-8 p-0 lg:flex'*/}
          {/*  onClick={() => table.setPageIndex(0)}*/}
          {/*  disabled={!table.getCanPreviousPage()}*/}
          {/*>*/}
          {/*  <span className='sr-only'>Go to first page</span>*/}
          {/*  <DoubleArrowLeftIcon className='h-4 w-4' />*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  variant='outline'*/}
          {/*  className='h-8 w-8 p-0'*/}
          {/*  onClick={() => table.previousPage()}*/}
          {/*  disabled={!table.getCanPreviousPage()}*/}
          {/*>*/}
          {/*  <span className='sr-only'>Go to previous page</span>*/}
          {/*  <ChevronLeftIcon className='h-4 w-4' />*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  variant='outline'*/}
          {/*  className='h-8 w-8 p-0'*/}
          {/*  onClick={() => table.nextPage()}*/}
          {/*  disabled={!table.getCanNextPage()}*/}
          {/*>*/}
          {/*  <span className='sr-only'>Go to next page</span>*/}
          {/*  <ChevronRightIcon className='h-4 w-4' />*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  variant='outline'*/}
          {/*  className='hidden h-8 w-8 p-0 lg:flex'*/}
          {/*  onClick={() => table.setPageIndex(table.getPageCount() - 1)}*/}
          {/*  disabled={!table.getCanNextPage()}*/}
          {/*>*/}
          {/*  <span className='sr-only'>Go to last page</span>*/}
          {/*  <DoubleArrowRightIcon className='h-4 w-4' />*/}
          {/*</Button>*/}
        </div>
      </div>
    </div>
  )
}

export function PaginationDemo<TData>({table}: DataTablePaginationProps<TData>) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        {table.getRowModel().rows}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
        <PaginationItem>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}