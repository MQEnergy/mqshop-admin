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
import {MemberDelete, MemberIndex} from "@/apis/permission";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns'
import {DataForm} from "@/pages/permission/member/data-form";
import {toast} from "react-hot-toast";
import {TableContext} from '@/context';
import {ResetPass} from "@/pages/permission/member/reset-pass";
import {AssignRole} from "@/pages/permission/member/assign-role";

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
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [detailInfo, setDetailInfo] = useState({
    title: '',
    info: null
  })
  // member list
  const indexRes = useRequest(MemberIndex, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  // member delete
  const deleteRes = useRequest(MemberDelete, {
    manual: true
  })

  useEffect(() => {
    indexRes.run({page, limit})
  }, [page, limit]);

  const handleRefresh = () => {
    indexRes.run({page, limit, noCache: true})
  }

  // Todo
  const handleDelete = (values: any[]) => {
    const ids = values.map(item => item.getValue('id'))
    deleteRes.runAsync({
      id: ids[0],
      noCache: true
    }).then(res => {
      toast.success(res.data?.message || '操作成功')
      handleRefresh()
    })
  }

  const handleOpen = (value: boolean) => {
    setDetailInfo({
      title: '新增操作',
      info: null
    })
    setIsOpen(value)
  }
  const handleInfo = (values: any) => {
    setDetailInfo({
      title: '编辑操作',
      info: values
    })
    if (typeof values.__is_edit__ !== 'undefined' && typeof values.__is_edit__ === 'boolean') {
      setIsOpen(values.__is_edit__)
    }
    if (typeof values.__is_reset_pass__ !== 'undefined' && typeof values.__is_reset_pass__ === 'boolean') {
      setIsResetOpen(values.__is_reset_pass__)
    }
    if (typeof values.__is_assign_role__ !== 'undefined' && typeof values.__is_assign_role__ === 'boolean') {
      setIsRoleOpen(values.__is_assign_role__)
    }
  }

  return (
    <TableContext.Provider value={{setInfo: handleInfo, onRefresh: handleRefresh}}>
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
      <DataTable data={indexRes.data?.data?.list || []}
                 columns={columns}
                 pageCount={indexRes.data?.data?.last_page || 0}
                 rowCount={indexRes.data?.data?.total || 0}
                 pagination={pagination}
                 onPaginationChange={onPaginationChange}
                 reLoading={indexRes.loading}
                 deLoading={deleteRes.loading}
                 onOpen={handleOpen}
                 onDelete={handleDelete}/>

      {/* data create / update form */}
      {isOpen &&
        <DataForm
          title={detailInfo.title}
          data={detailInfo.info}
          open={isOpen}
          onOpenChange={handleOpen}
        />
      }
      {/* reset password dialog */}
      {isResetOpen &&
        <ResetPass
          row={detailInfo.info}
          open={isResetOpen}
          onOpen={setIsResetOpen}
        />}
      {/* assign role dialog */}
      {isRoleOpen &&
        <AssignRole
          row={detailInfo.info}
          open={isRoleOpen}
          onOpen={setIsRoleOpen}
        />}
    </TableContext.Provider>
  )
}
