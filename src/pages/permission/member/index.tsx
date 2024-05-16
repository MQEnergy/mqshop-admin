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
import {SkeletonList} from "@/components/custom/skeleton-list.tsx";
import {useImmer} from "use-immer";
import {useEffect} from "react";

export default function Tasks() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "客户管理",
    link: '/permissions/member'
  }];
  const {t} = useTranslation();
  const [pagination, updatePagination] = useImmer({
    isLoading: false,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageCount: 1,
    list: [],
  });
  const initData = () => {
    const {current, pageSize, list} = pagination
    updatePagination(draft => {
      draft.isLoading = true
    })
    MemberList({
      page: current,
      limit: pageSize
    }).then((res) => {
      updatePagination(draft => {
        draft.current = res.data.current_page || current
        draft.pageSize = res.data.per_page || pageSize
        draft.list = res.data.list || list
        draft.pageCount = res.data.last_page || 1
      })
    }).finally(() => {
      updatePagination(draft => {
        draft.isLoading = false
      })
    })
  }
  useEffect(() => {
    console.log(pagination.current)
    initData();
  }, [pagination.current, pagination.pageSize]);

  const handlePage = (page: number) => {
    updatePagination(draft => {
      draft.current = page;
    })
  }

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
        {pagination.isLoading ? <SkeletonList count={6} className={'border'}/> :
            <DataTable data={pagination.list} pageCount={pagination.pageCount} onPage={handlePage} columns={columns}/>}
      </>
  )
}
