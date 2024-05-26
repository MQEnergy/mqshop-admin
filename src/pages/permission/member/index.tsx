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
import {MemberDelete, MemberList} from "@/apis/permission";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns'
import {DataForm} from "@/pages/permission/member/data-form";
import {toast} from "react-hot-toast";

export default function Member() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "用户管理",
    link: '/permissions/member'
  }];
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();

  // member list
  const memberIndexRes = useRequest(MemberList, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  useEffect(() => {
    memberIndexRes.run({page, limit})
  }, [page, limit]);

  // member delete
  const memberDeleteRes = useRequest(MemberDelete, {
    manual: true
  })

  const handleRefresh = () => {
    memberIndexRes.run({page, limit, noCache: true})
  }

  const handleDelete = (values: any[]) => {
    const ids = values.map(item => item.getValue('id'))
    memberDeleteRes.runAsync({
      id: ids[0],
      noCache: true
    }).then(res => {
      toast.success(res.data?.message || '操作成功')
      handleRefresh()
    })
  }

  return (
    <>
      {/* breadcrumb */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* search bar */}
      <DataTableSearchBar className={'border-none shadow'}>
        <SearchInput placeholder={t('settings.search.placeholder')} className={'md:w-full lg:w-full'}
                     type={'search'}/>
        {[1, 2, 3].map((index) => (
          <Select key={'search-' + index}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Please select..."/>
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

      {/* data table list */}
      <DataTable data={memberIndexRes.data?.data?.list || []}
                 columns={columns}
                 pageCount={memberIndexRes.data?.data?.last_page || 0}
                 rowCount={memberIndexRes.data?.data?.total || 0}
                 pagination={pagination}
                 onPaginationChange={onPaginationChange}
                 reLoading={memberIndexRes.loading}
                 deLoading={memberDeleteRes.loading}
                 onRefresh={handleRefresh}
                 onOpen={setIsOpen}
                 onDelete={handleDelete}/>

      {/* data create / update form */}
      <DataForm open={isOpen}
                onOpenChange={setIsOpen}
                onRefresh={handleRefresh}/>
    </>
  )
}
