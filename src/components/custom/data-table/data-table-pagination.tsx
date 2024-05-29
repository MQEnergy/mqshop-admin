import {Table} from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'
import PaginationPage from "@/components/custom/data-table/data-table-pagination-page.tsx";

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  sizes: number[]
}

function DataTablePagination<TData>({
                                      table,
                                      sizes
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
                {sizes.map((pageSize) => (
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
            <PaginationPage key='member-pagination' table={table}/>
          </div>
        </div>
      </div>
  )
}

DataTablePagination.displayName = 'DataTablePagination'

export default DataTablePagination