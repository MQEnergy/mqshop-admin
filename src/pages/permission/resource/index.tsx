import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {DataTable} from "@/components/custom/data-table/data-table";
import {ResourceDelete, ResourceIndex} from "@/apis/permission";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns'
import {DataForm} from "./data-form";
import {toast} from "react-hot-toast";
import {TableContext} from '@/context';
import BanConfirm from "./ban-confirm.tsx";
import DeleteConfirm from "./delete-confirm.tsx";
import {DataTableSearchbar, SearchInfo} from "./components/data-table-searchbar.tsx";
import {useTranslation} from "react-i18next";
import {ColumnSchemaType} from "./data/schema.ts";
import {Tooltip} from "react-tooltip";
import {useDataTable} from "@/hooks/use-data-table.tsx";

export default function Resource() {
  // =========================== Params ==========================================
  const {t} = useTranslation()
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "资源管理", link: '/permissions/resource'}
  ];
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [searchForm, setSearchForm] = useState<SearchInfo | null>(null)
  const [formTitle, setFormTitle] = useState<string>('新增操作')
  const [rowItem, setRowItem] = useState<Partial<ColumnSchemaType>>({})
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isBanOpen, setIsBanOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)

  // =========================== API request ======================================
  const indexRes = useRequest(ResourceIndex, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  const deleteRes = useRequest(ResourceDelete, {
    manual: true
  })

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
    const runAsync = deleteRes.runAsync({
      ids: ids.join(','),
      noCache: true
    });
    toast.promise(
      runAsync,
      {
        loading: t('settings.table.action.processing.title') || 'loading...',
        success: (data) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
      handleRefresh()
    })
  }
  const handleOpen = (value: boolean) => {
    setIsOpen(value)
    setFormTitle('新增操作')
    setRowItem({})
  }
  const handleInfo = (values: any) => {
    setFormTitle('编辑操作')
    setRowItem(values)
    if (typeof values.__is_edit__ !== 'undefined' && typeof values.__is_edit__ === 'boolean') {
      setIsOpen(values.__is_edit__)
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
  const getSubRows = (row: ColumnSchemaType) => {
    return row.children
  }

  const table = useDataTable({
    columns,
    data: (indexRes.data?.data || []) as ColumnSchemaType[],
    pageCount: 0,
    rowCount: indexRes.data?.data.length,
    pagination: pagination,
    onPaginationChange: onPaginationChange,
    getSubRows: getSubRows
  })

  return (
    <TableContext.Provider value={{setInfo: handleInfo, trans: useTranslation(), onRefresh: handleRefresh}}>
      {/* breadcrumb */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* search bar */}
      <DataTableSearchbar info={rowItem} loading={indexRes.loading} onSearch={handleSearch}/>
      {/* data table list */}
      <DataTable table={table}
                 columns={columns}
                 reLoading={indexRes.loading}
                 deLoading={deleteRes.loading}
                 onOpen={handleOpen}
                 onDelete={handleDelete}
                 noPagination={true}/>
      {/* icon tooltip */}
      <Tooltip id="resource-tooltip" render={({content}) => {
        const contents = content?.split('|') || []
        if (contents.length < 2) {
          return ""
        }
        return (
          <div className={'min-w-[100px] flex flex-col space-y-1 max-h-[50px] overflow-scroll'}>
            <div className={'flex items-center'}><span className={'w-[45px]'}>前台：</span>{contents[0]}</div>
            <div className={'flex items-center'}><span className={'w-[45px]'}>接口：</span>{contents[1]}</div>
          </div>
        )
      }} clickable/>
      {/* data create / update form */}
      {isOpen &&
        <DataForm
          title={formTitle}
          data={rowItem}
          open={isOpen}
          onOpenChange={handleOpen}
        />
      }
      {/* ban confirm */}
      {isBanOpen && <BanConfirm open={isBanOpen} onOpen={setIsBanOpen} row={rowItem}/>}
      {/* delete confirm */}
      {isDeleteOpen && <DeleteConfirm open={isDeleteOpen} onOpen={setIsDeleteOpen} row={rowItem}/>}
    </TableContext.Provider>
  )
}
