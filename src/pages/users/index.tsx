import {Layout, LayoutBody} from '@/components/layout'
import {DataTable} from './components/data-table'
import {columns} from './components/columns'
import {tasks} from './data/tasks'
import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import SearchBar from "@/pages/products/components/search-bar";

export default function Tasks() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "任务管理",
    link: ''
  }];

  return (
      <Layout fixedHeight>
        <LayoutBody className='flex flex-col'>
          <div className='flex-1 md:m-auto lg:m-auto lg:flex-row space-y-5 md:w-10/12 lg:w-10/12'>
            <SingleBreadcrumb breadList={breadList}></SingleBreadcrumb>
            <SearchBar />
            <DataTable data={tasks} columns={columns}/>
          </div>
        </LayoutBody>
      </Layout>
  )
}
