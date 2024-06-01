import * as React from 'react'
import {Card, CardContent} from "@/components/ui/card.tsx";

import {Button} from "@/components/custom/button.tsx";
import {Trash2, Search, Loader2} from "lucide-react";
import {useContext} from "react";
import {TableContext} from "@/context.tsx";

export interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  loading?: boolean
  onReset: () => void
  onSubmit: () => void
}

// DataTableSearchBar 搜索
const DataTableSearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({className, children, ...props}, ref) => {
    const {trans} = useContext(TableContext)
    return (
      <Card ref={ref} className={className} {...props}>
        <CardContent className='pt-6'>
          <div className="flex grid md:grid-cols-5 lg:grid-cols-5 gap-2">
            {children}

            <div className="md:col-end-6 lg:col-end-6 col-span-1 justify-self-end">
              <div className="flex gap-2">
                <Button className="gap-1" size={'sm'} onClick={props.onSubmit}>
                  {props.loading ? <Loader2 size={16} className='animate-spin'/> : <Search size={16}/>}
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {trans?.t('settings.search.submit')}
                    </span>
                </Button>
                <Button variant="outline" className="gap-1" size={'sm'} onClick={props.onReset}>
                  <Trash2 className="h-3.5 w-3.5"/>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {trans?.t('settings.search.reset')}
                </span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
);

DataTableSearchBar.displayName = 'DataTableSearchBar'

export default DataTableSearchBar;