import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {DataTable} from "@/components/custom/data-table/data-table";
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
import BanConfirm from "@/pages/permission/member/ban-confirm.tsx";
import DeleteConfirm from "@/pages/permission/member/delete-confirm.tsx";
import {DataTableSearchbar, SearchInfo} from "@/pages/permission/member/components/data-table-searchbar.tsx";

export default function Member() {
  const breadList: BreadListItem[] = [{
    name: "首页",
    link: '/'
  }, {
    name: "用户管理",
    link: '/permissions/member'
  }];
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isResetOpen, setIsResetOpen] = useState<boolean>(false)
  const [isRoleOpen, setIsRoleOpen] = useState<boolean>(false)
  const [isBanOpen, setIsBanOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
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
    if (typeof values.__is_forbidden__ !== 'undefined' && typeof values.__is_forbidden__ === 'boolean') {
      setIsBanOpen(values.__is_forbidden__)
    }
    if (typeof values.__is_delete__ !== 'undefined' && typeof values.__is_delete__ === 'boolean') {
      setIsDeleteOpen(values.__is_delete__)
    }
  }
  const handleSearch = (values: SearchInfo) => {
    console.log(values)
    if (values.keyword === '' && values.status === '' && values.role_id === '') {
      handleRefresh()
      return
    }
    // 请求接口返回数据列表
    const runAsync = indexRes.runAsync({
      page,
      limit,
      search: JSON.stringify(values),
      noCache: true
    });
    toast.promise(runAsync, {
      loading: '处理中...',
      success: (res) => res.message,
      error: (err) => err.response?.data.message || err.message || 'Server Error',
    }).then(() => {
    })
  }
  return (
    <TableContext.Provider value={{setInfo: handleInfo, onRefresh: handleRefresh}}>
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
              width={'450px'}
              row={detailInfo.info}
              open={isResetOpen}
              onOpen={setIsResetOpen}
          />}
      {/* assign role dialog */}
      {isRoleOpen &&
          <AssignRole
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
