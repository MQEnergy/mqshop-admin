import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {File, ListFilter, PlusCircle} from "lucide-react";
import {Tabs} from "@radix-ui/react-tabs";

export default function ToolBar() {
  return (
      <Tabs defaultValue='all'>
        <div className="flex items-center">
          <TabsList className="h-9">
            <TabsTrigger value="all" className="h-7">全部</TabsTrigger>
            <TabsTrigger value="active" className="h-7">有库存</TabsTrigger>
            <TabsTrigger value="draft" className="h-7">缺货</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1" size={'sm'}>
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        过滤
                      </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Archived
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size={'sm'} className="gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    导出
                  </span>
            </Button>
            <Button className="gap-1" size={'sm'} >
              <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  添加商品
                </span>
            </Button>
          </div>
        </div>
      </Tabs>
  )
}