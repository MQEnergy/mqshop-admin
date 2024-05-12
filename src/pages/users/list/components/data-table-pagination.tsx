import {
  ChevronLeftIcon, ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import {Table} from '@tanstack/react-table'

import {Button} from '@/components/ui/button'
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
                <SelectValue placeholder={table.getState().pagination.pageSize}/>
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
            <PaginationPage table={table}/>
          </div>
        </div>
      </div>
  )
}

export function PaginationPage<TData>({table}: DataTablePaginationProps<TData>) {
  // 循环获取分页显示
  const pageList: (string | number)[] = [];
  const total = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  if (total <= 6) {
    for (let i = 1; i <= total; i++) {
      pageList.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageList.push(...[1, 2, 3, '...', total - 2, total - 1, total]);
    } else if (currentPage > 3 && currentPage >= total - 5) {
      pageList.push(...['...', total - 5, total - 4, total - 3, total - 2, total - 1, total]);
    } else {
      pageList.push(...[currentPage, currentPage + 1, currentPage + 2, '...', total - 2, total - 1, total]);
    }
  }
  return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
                variant='outline'
                size={'sm'}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
                variant='outline'
                size={'sm'}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
          {pageList.map((p) => {
            return (
                <PaginationItem>
                  {p === '...' ? <PaginationEllipsis/> :
                      <PaginationLink
                          size={'sm'}
                          className={'cursor-pointer'}
                          onClick={() => table.setPageIndex(Number(p) - 1)}
                          isActive={table.getState().pagination.pageIndex === Number(p) - 1}
                      >{p}</PaginationLink>}
                </PaginationItem>
            )
          })}
          {/* next */}
          <PaginationItem>
            <Button
                variant='outline'
                size={'sm'}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
          {/* 最后一页 */}
          <PaginationItem>
            <Button
                variant='outline'
                size={'sm'}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
  )
}