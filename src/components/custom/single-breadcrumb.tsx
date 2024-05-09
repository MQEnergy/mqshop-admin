import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface BreadListItem {
  name?: string
  link?: string
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  breadList: BreadListItem[]
}

const SingleBreadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>((
    {className, breadList= [], ...props}, ref) => (
    <Breadcrumb ref={ref} className={className} {...props}>
      <BreadcrumbList>
        {breadList.map((val, idx) => (
                <>
                  <BreadcrumbItem key={'bread1-'+idx}>
                    <BreadcrumbLink asChild>
                      {val.link ? <a href={val.link}>{val.name}</a> : <a>{val.name}</a>}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {idx < breadList.length - 1 && <BreadcrumbSeparator key={'seperator-'+idx}/>}
                </>
            )
        )}
      </BreadcrumbList>
    </Breadcrumb>
))

SingleBreadcrumb.displayName = 'SingleBreadcrumb';

export {BreadListItem, SingleBreadcrumb}