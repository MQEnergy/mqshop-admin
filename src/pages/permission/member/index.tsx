import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {DataTable} from "@/components/custom/data-table/data-table";
import {MemberDelete, MemberIndex} from "@/apis/permission";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns'
import {DataForm} from "./data-form";
import {toast} from "react-hot-toast";
import {TableContext} from '@/context';
import {ResetPassForm} from "./reset-pass";
import {AssignRoleForm} from "./assign-role";
import BanConfirm from "./ban-confirm.tsx";
import DeleteConfirm from "./delete-confirm.tsx";
import {DataTableSearchbar, SearchInfo} from "./components/data-table-searchbar.tsx";
import {useTranslation} from "react-i18next";

export default function Member() {
  // =========================== Params ==========================================
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "用户管理", link: '/permissions/member'}
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false)
  const [isBanOpen, setIsBanOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [searchForm, setSearchForm] = useState<SearchInfo | null>(null)
  const [detailInfo, setDetailInfo] = useState({
    title: '',
    info: null
  })
  // =========================== Params ===========================================

  // =========================== API request ======================================
  const indexRes = useRequest(MemberIndex, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  const deleteRes = useRequest(MemberDelete, {
    manual: true
  })
  // =========================== API request ======================================
  useEffect(() => {
    if (searchForm) {
      indexRes.run({page, limit, search: JSON.stringify(searchForm)})
    } else {
      indexRes.run({page, limit})
    }
  }, [page, limit, searchForm]);

  // =========================== Method ===========================================
  const handleRefresh = () => {
    indexRes.run({page, limit, noCache: true})
  }
  const handleDelete = (values: any[]) => {
    const ids = values.map(item => item.getValue('id'))
    if (ids.length == 0) {
      toast.error('请选择要删除的数据')
      return
    }
    deleteRes.runAsync({
      ids: ids.join(','),
      noCache: true
    }).then(res => {
      toast.success(res.data?.message || '操作成功')
      handleRefresh()
    })
  }
  const handleOpen = (value: boolean) => {
    setIsOpen(value)
    setDetailInfo({
      title: '新增操作',
      info: null
    })
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
    if (typeof values.__is_forbidden__ !== 'undefined' && typeof values.__is_forbidden__ === 'boolean') {
      setIsBanOpen(values.__is_forbidden__)
    }
    if (typeof values.__is_delete__ !== 'undefined' && typeof values.__is_delete__ === 'boolean') {
      setIsDeleteOpen(values.__is_delete__)
    }
  }
  const handleSearch = (values: SearchInfo) => {
    if (values.keyword === '' && values.status === '') {
      handleRefresh()
      return
    }
    onPaginationChange({
      ...pagination,
      pageIndex: 0,
    })
    if (searchForm !== values) {
      setSearchForm(values)
    } else {
      indexRes.run({page, limit, search: JSON.stringify(values)})
    }
  }
  // =========================== Method ===========================================

  return (
    <TableContext.Provider value={{setInfo: handleInfo, trans: useTranslation(), onRefresh: handleRefresh}}>
      {/* breadcrumb */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* search bar */}
      <DataTableSearchbar info={detailInfo.info} loading={indexRes.loading} onSearch={handleSearch}/>
      {/* data table list */}
      <DataTable data={indexRes.data?.data?.list || []}
                 columns={columns}
                 pageCount={indexRes.data?.data?.last_page || 0}
                 rowCount={indexRes.data?.data?.total || 0}
                 pagination={pagination}
                 reLoading={indexRes.loading}
                 deLoading={deleteRes.loading}
                 onOpen={handleOpen}
                 onDelete={handleDelete}
                 onPaginationChange={onPaginationChange}/>
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
        <ResetPassForm
          width={'450px'}
          row={detailInfo.info}
          open={isResetOpen}
          onOpen={setIsResetOpen}
        />}
      {/* assign role dialog */}
      {isRoleOpen &&
        <AssignRoleForm
          width={'450px'}
          row={detailInfo.info}
          open={isRoleOpen}
          onOpen={setIsRoleOpen}
        />}
      {/* ban confirm */}
      {isBanOpen && <BanConfirm open={isBanOpen} onOpen={setIsBanOpen} row={detailInfo.info}/>}
      {/* delete confirm */}
      {isDeleteOpen && <DeleteConfirm open={isDeleteOpen} onOpen={setIsDeleteOpen} row={detailInfo.info}/>}
    </TableContext.Provider>
  )
}
