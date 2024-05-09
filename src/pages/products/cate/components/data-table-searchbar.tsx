import * as React from 'react'
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {Button} from "@/components/ui/button";
import {Trash2, Search} from "lucide-react";

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

// SearchBar 搜索栏
const DataTableSearchbar = React.forwardRef<HTMLDivElement, SearchBarProps>((
        {className, ...props}, ref) => (
        <Card ref={ref} className={className} {...props}>
          <CardContent className='pt-6'>
            <div className="flex grid md:grid-cols-5 lg:grid-cols-5 gap-2">
              <Input placeholder='请输入搜索关键词' className='w-full'></Input>
              {[1,2,3].map((index) => (
                  <Select key={'search-'+index}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a fruit"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              ))}
              <div className="md:col-end-6 lg:col-end-6 col-span-1 justify-self-end">
                <div className="flex gap-2">
                  <Button className="gap-1">
                    <Search className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    搜索
                  </span>
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <Trash2 className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    重置
                  </span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    )
)

DataTableSearchbar.displayName = "SearchBar";

export default DataTableSearchbar;