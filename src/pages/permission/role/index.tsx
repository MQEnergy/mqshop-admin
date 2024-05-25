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
import {useEffect} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {MemberIndexReq} from "@/apis/models/permission-model.ts";
import {SkeletonList} from "@/components/custom/skeleton-list.tsx";
import {columns} from './columns'

export default function Role() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "角色管理",
    link: '/permissions/role'
  }];
  const {t} = useTranslation();
  const {onPaginationChange, page, limit, pagination} = usePagination();
  // 请求
  const {data, loading, run, refresh} = useRequest((params: MemberIndexReq) => MemberList(params), {
    loadingDelay: 100, // 可以延迟 loading 变成 true 的时间，有效防止闪烁
    retryCount: 3, // 错误重试
    manual: true
  });
  useEffect(() => {
    run({page, limit})
  }, [page, limit]);

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
        {loading ?
            <SkeletonList count={10} className={'border'}/> :
            <DataTable data={data?.data?.list || []}
                       columns={columns}
                       pageCount={data?.data?.last_page || 0}
                       rowCount={data?.data?.total || 0}
                       loading={loading}
                       pagination={pagination}
                       onPaginationChange={onPaginationChange}
                       onRefresh={refresh}>
            </DataTable>
        }
      </>
  )
}
