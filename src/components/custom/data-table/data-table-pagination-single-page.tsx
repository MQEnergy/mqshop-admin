import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination.tsx";
import {Button} from "@/components/custom/button.tsx";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {Table} from "@tanstack/react-table";


interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

function PaginationSinglePage<TData>({table}: DataTablePaginationProps<TData>) {

  return (
    <div className='flex items-center'>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <div className='text-sm font-medium mr-2'>
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </div>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant='outline'
              size={'sm'}
              onClick={(e) => {
                e.preventDefault()
                table.setPageIndex(0)
              }}
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
              onClick={(e) => {
                e.preventDefault()
                table.previousPage()
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
          {/* next */}
          <PaginationItem>
            <Button
              variant='outline'
              size={'sm'}
              onClick={(e) => {
                e.preventDefault()
                table.nextPage()
              }}
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
              onClick={(e) => {
                e.preventDefault()
                table.setPageIndex(table.getPageCount() - 1)
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4'/>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

PaginationSinglePage.displayName = 'PaginationSinglePage'

export default PaginationSinglePage