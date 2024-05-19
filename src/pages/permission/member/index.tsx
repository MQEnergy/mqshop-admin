import {columns} from './components/columns'
import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {SearchInput} from "@/components/custom/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useTranslation} from "react-i18next";
import DataTableSearchBar from "@/components/custom/datatable/data-table-searchbar";
import {DataTable} from "@/components/custom/datatable/data-table";
import {MemberList} from "@/apis/permission";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";

export function useData(page: number, limit: number) {
  const [data, setData] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    MemberList({
      page: page,
      limit: limit
    }).then((res) => {
      setData(res.data.list)
      setPageCount(res.data.last_page)

    }).finally(() => {
      setIsLoading(false)
    })
    return () => {
    }

  }, [page, limit, setData, setIsLoading]);

  return [data, pageCount, isLoading];
}

export default function Tasks() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "客户管理",
    link: '/permissions/member'
  }];
  const {t} = useTranslation();
  const {onPaginationChange, page, limit, pagination} = usePagination();

  const [data, pageCount, isLoading] = useData(page, limit);

  return (
    <>
      {/* 面包屑 */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* 搜索 */}
      <DataTableSearchBar className={'shadow-none'}>
        <SearchInput placeholder={t('settings.search.placeholder')} className={'md:w-full lg:w-full'}
                     type={'search'}/>
        {[1, 2, 3].map((index) => (
          <Select key={'search-' + index}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="请选择..."/>
            </SelectTrigger>
            <SelectContent className='max-h-[200px]'>
              <SelectGroup>
                <SelectLabel>状态</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </DataTableSearchBar>
      {/* 列表 */}
      <DataTable data={data}
                 columns={columns}
                 loading={isLoading}
                 pageCount={pageCount}
                 pagination={pagination}
                 onPaginationChange={onPaginationChange}>
      </DataTable>
    </>
  )
}
