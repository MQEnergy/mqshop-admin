import {Skeleton} from "@/components/ui/skeleton"
import React from "react";
import {cn} from "@/lib/utils.ts";

interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

export function SkeletonList({className, count, ...props}: SkeletonListProps) {
  const skeletonList: number[] = []
  for (let i = 0; i < count; i++) {
    skeletonList.push(i)
  }
  return (
      <div className={cn('bg-background p-4 rounded-md w-full', className)} {...props}>
        {skeletonList.map((i) =>
            <div key={i} className="flex items-center my-8">
              <Skeleton className="h-6 w-6 rounded-full"/>
              <div className="space-y-2 ml-2">
                <Skeleton className={cn('h-4', i % 2 == 0 ? 'w-[200px]' : 'w-[150px]')}/>
              </div>
              <div className="space-y-2 ml-4">
                <Skeleton className="h-4 w-[180px]"/>
              </div>
              <div className="space-y-2 ml-2">
                <Skeleton className="h-4 w-[130px]"/>
              </div>
              <div className="space-y-2 ml-2 flex flex-1 items-end justify-end">
                <Skeleton className="h-4 w-[100px]"/>
              </div>
            </div>
        )}
      </div>
  )
}
