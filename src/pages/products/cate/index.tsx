import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import DataTableSearchbar from "@/pages/products/cate/components/data-table-searchbar";
import DataTables from "@/pages/products/cate/components/data-table";

export default function Cates() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "分类管理",
    link: '/products/cates'
  }];
  return (
      <>
        <SingleBreadcrumb breadList={breadList}></SingleBreadcrumb>
        <DataTableSearchbar/>
        <DataTables/>
      </>
  )
}
