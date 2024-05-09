import * as React from 'react'
import {Card, CardContent} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import {Trash2, Search} from "lucide-react";
import {useTranslation} from "react-i18next";

interface SearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

// DataTableSearchbar 搜索
const DataTableSearchbar = React.forwardRef<HTMLDivElement, SearchBarProps>(
    ({className, children, ...props}, ref) => {
      const {t} = useTranslation();

      return (
        <Card ref={ref} className={className} {...props}>
          <CardContent className='pt-6'>
            <div className="flex grid md:grid-cols-5 lg:grid-cols-5 gap-2">
              {children}

              <div className="md:col-end-6 lg:col-end-6 col-span-1 justify-self-end">
                <div className="flex gap-2">
                  <Button className="gap-1" size={'sm'}>
                    <Search className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {t('settings.search.submit')}
                    </span>
                  </Button>
                  <Button variant="outline" className="gap-1" size={'sm'}>
                    <Trash2 className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      {t('settings.search.reset')}
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

export default DataTableSearchbar;