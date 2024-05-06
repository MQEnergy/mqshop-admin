import {Layout, LayoutBody} from "@/components/layout";
import DataTables from "@/pages/products/components/data-table";
import SearchBar from "@/pages/products/components/search-bar";
import {SingleBreadcrumb, BreadListItem} from "@/components/custom/single-breadcrumb";

export default function Products() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "商品管理",
    link: '/products'
  }];

  return (
      <Layout fixedHeight>
        <LayoutBody className='flex flex-col'>
          <div className='flex-1 md:m-auto lg:m-auto lg:flex-row space-y-5 md:w-10/12 lg:w-10/12'>
            <SingleBreadcrumb breadList={breadList}></SingleBreadcrumb>
            <SearchBar className='shadow-gray-200 shadow-md border-0'/>
            <DataTables className='shadow-gray-200 shadow-md border-0'/>
          </div>
        </LayoutBody>
      </Layout>
  )
}
