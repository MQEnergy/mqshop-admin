import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {DataTable} from "@/components/custom/data-table/data-table";
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
import {ProductCateDelete, ProductCateIndex} from "@/apis/product.ts";
import {ColumnSchemaType} from "@/pages/products/cate/data/schema.ts";

export default function Index() {
  // =========================== Params ==========================================
  const {t} = useTranslation()
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "分类管理", link: '/products/cates'}
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isBanOpen, setIsBanOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [searchForm, setSearchForm] = useState<SearchInfo | null>(null)
  const [detailInfo, setDetailInfo] = useState({
    title: '',
    info: null
  })

  // =========================== API request ======================================
  const indexRes = useRequest(ProductCateIndex, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  const deleteRes = useRequest(ProductCateDelete, {
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

  return (
    <TableContext.Provider value={{setInfo: handleInfo, trans: useTranslation(), onRefresh: handleRefresh}}>
      {/* breadcrumb */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* search bar */}
      <DataTableSearchbar info={detailInfo.info} loading={indexRes.loading} onSearch={handleSearch}/>
      {/* data table list */}
      <DataTable data={(indexRes.data?.data || []) as ColumnSchemaType[]}
                 columns={columns}
                 pageCount={0}
                 rowCount={indexRes.data?.data.length}
                 pagination={pagination}
                 reLoading={indexRes.loading}
                 deLoading={deleteRes.loading}
                 onOpen={handleOpen}
                 onDelete={handleDelete}
                 onPaginationChange={onPaginationChange}
                 getSubRows={getSubRows}
                 noPagination={true}/>
      {/* data create / update form */}
      {isOpen &&
        <DataForm
          title={detailInfo.title}
          data={detailInfo.info}
          open={isOpen}
          onOpenChange={handleOpen}
        />
      }
      {/* ban confirm */}
      {isBanOpen && <BanConfirm open={isBanOpen} onOpen={setIsBanOpen} row={detailInfo.info}/>}
      {/* delete confirm */}
      {isDeleteOpen && <DeleteConfirm open={isDeleteOpen} onOpen={setIsDeleteOpen} row={detailInfo.info}/>}
    </TableContext.Provider>
  )
}
