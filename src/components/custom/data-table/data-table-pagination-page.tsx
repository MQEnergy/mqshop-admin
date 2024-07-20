import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from "@/components/ui/pagination.tsx";
import {Button} from "@/components/custom/button.tsx";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {Table} from "@tanstack/react-table";


interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

function PaginationPage<TData>({table}: DataTablePaginationProps<TData>) {
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
        {pageList.map((p) => {
          return (
            <PaginationItem key={'page-' + p.toString()}>
              {p === '...' ?
                <PaginationEllipsis/> :
                <PaginationLink
                  size={'sm'}

                  className={'cursor-pointer'}
                  onClick={(e) => {
                    e.preventDefault()
                    table.setPageIndex(Number(p) - 1)
                  }}
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
  )
}

PaginationPage.displayName = 'PaginationPage'

export default PaginationPage