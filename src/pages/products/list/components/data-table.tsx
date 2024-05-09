import * as React from 'react'
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import ToolBar from "@/pages/products/list/components/tool-bar";
import {DataTablePagination} from "@/pages/products/list/components/data-table-pagination";

interface DataTablesProps extends React.HTMLAttributes<HTMLDivElement> {

}

const DataTables = React.forwardRef<HTMLDivElement, DataTablesProps>(
    ({
       className,
       ...props
     }, ref) => {

      return (
          <Card ref={ref} className={className} {...props}>
            <CardHeader>
              <ToolBar/>
            </CardHeader>
            <CardContent className='overflow-y-scroll md:h-[calc(100svh-380px)]'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Created at</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
                      <TableRow key={'table='+index}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src="https://uko-react.vercel.app/static/products/airbud-4.png"
                              width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          Laser Lemonade Machine
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Draft</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">$499.99</TableCell>
                        <TableCell className="hidden md:table-cell">25</TableCell>
                        <TableCell className="hidden md:table-cell">
                          2023-07-12 10:42 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4"/>
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <div className='p-4'>
              {/*<DataTablePagination table={table}/>*/}
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </div>
          </Card>
      )
    }
)

DataTables.displayName = 'DataTables';

export default DataTables;