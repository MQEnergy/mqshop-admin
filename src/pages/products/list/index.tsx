import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns'
import {toast} from "react-hot-toast";
import {TableContext} from '@/context';
import BanConfirm from "./ban-confirm.tsx";
import DeleteConfirm from "./delete-confirm.tsx";
import {DataTableSearchbar, SearchInfo} from "./components/data-table-searchbar.tsx";
import {useTranslation} from "react-i18next";
import {ProductDelete, ProductIndex} from "@/apis/product.ts";
import {ColumnSchemaType} from "./data/schema.ts";
import {useDataTable} from "@/hooks/use-data-table.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {DataTableToolbar} from "@/components/custom/data-table/data-table-toolbar";
import {DataSimpleTable} from "@/components/custom/data-table/data-simple-table";
import {useNavigate} from "react-router-dom";

export default function Index() {
  // =========================== Params ==========================================
  const {t} = useTranslation()
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "商品管理", link: '/products/index'}
  ];
  const [isBanOpen, setIsBanOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [searchForm, setSearchForm] = useState<SearchInfo | null>(null)
  const [rowItem, setRowItem] = useState<Partial<ColumnSchemaType>>({})
  const [attrType, setAttrType] = useState<string>('1')
  const navigate = useNavigate()

  // =========================== API request ======================================
  const indexRes = useRequest(ProductIndex, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  const deleteRes = useRequest(ProductDelete, {
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
  const handleOpen = (_: boolean) => {
    setRowItem({})
    navigate(`/products/create`)
  }
  const handleInfo = (values: any) => {
    setRowItem(values)
    if (typeof values.__is_edit__ !== 'undefined' && typeof values.__is_edit__ === 'boolean') {
      navigate(`/products/detail/${values.id}`)
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

  const table = useDataTable({
    columns,
    data: (indexRes.data?.data.list || []) as ColumnSchemaType[],
    pageCount: indexRes.data?.data?.last_page || 0,
    rowCount: indexRes.data?.data?.total || 0,
    pagination: pagination,
    onPaginationChange: onPaginationChange,
  })

  const handleTabClick = (value: string) => {
    setAttrType(value)
    indexRes.run({page: 1, limit, noCache: true})
  }

  return (
    <TableContext.Provider value={{setInfo: handleInfo, trans: useTranslation(), onRefresh: handleRefresh}}>
      {/* breadcrumb */}
      <SingleBreadcrumb breadList={breadList}/>
      {/* search bar */}
      <DataTableSearchbar info={rowItem} loading={indexRes.loading} onSearch={handleSearch}/>
      {/* data table list */}
      <Card className={'border-none shadow'}>
        <CardHeader>
          <div className='flex justify-between'>
            <Tabs defaultValue={attrType} onValueChange={handleTabClick}>
              <TabsList className="grid w-[250px] grid-cols-3">
                <TabsTrigger value="1">全部</TabsTrigger>
                <TabsTrigger value="2">在售</TabsTrigger>
                <TabsTrigger value="3">库存不足</TabsTrigger>
              </TabsList>
            </Tabs>
            <DataTableToolbar table={table}
                              onOpen={handleOpen}
                              reLoading={indexRes.loading}
                              deLoading={deleteRes.loading}
                              onDelete={() => handleDelete(table.getSelectedRowModel().rows)}/>
          </div>
        </CardHeader>
        <CardContent className={'pb-0'}>
          <DataSimpleTable table={table}
                           columns={columns}
                           reLoading={indexRes.loading}
                           deLoading={deleteRes.loading}
                           onOpen={handleOpen}
                           onDelete={handleDelete}/>
        </CardContent>
      </Card>
      {/* ban confirm */}
      {isBanOpen && <BanConfirm open={isBanOpen} onOpen={setIsBanOpen} row={rowItem}/>}
      {/* delete confirm */}
      {isDeleteOpen && <DeleteConfirm open={isDeleteOpen} onOpen={setIsDeleteOpen} row={rowItem}/>}
    </TableContext.Provider>
  )
}
