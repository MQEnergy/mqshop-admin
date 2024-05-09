import * as React from "react";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {RowData, Table} from "@tanstack/react-table";

const DataTableToolbar: React.FC<{
  table: Table<RowData>
}> = (props) => {
  return (
      <>
        <Input
            placeholder="Filter emails..."
            value={(props.table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                props.table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {props.table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                      <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                          }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                  )
                })}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
  )
}

export default DataTableToolbar;