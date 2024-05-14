import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Fragment} from "react";

interface BreadListItem {
  name?: string
  link?: string
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  breadList: BreadListItem[]
}

const SingleBreadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>((
    {className, breadList = [], ...props}, ref) => (
    <Breadcrumb ref={ref} className={className} {...props}>
      <BreadcrumbList>
        {breadList.map((val, idx) => {
              return (
                  <Fragment key={'bread1-' + idx}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        {val.link ? <a href={val.link}>{val.name}</a> : <a>{val.name}</a>}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {idx < breadList.length - 1 && <BreadcrumbSeparator/>}
                  </Fragment>
              )
            }
        )}
      </BreadcrumbList>
    </Breadcrumb>
))

SingleBreadcrumb.displayName = 'SingleBreadcrumb';

export {SingleBreadcrumb};
export type {BreadListItem};
