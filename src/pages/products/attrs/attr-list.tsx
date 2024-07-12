import {BreadListItem, SingleBreadcrumb} from "@/components/custom/single-breadcrumb";
import {useEffect, useState} from "react";
import {usePagination} from "@/hooks/use-pagination";
import {useRequest} from "ahooks";
import {columns} from './columns/attr'
import {toast} from "react-hot-toast";
import {TableContext} from '@/context';
import {DataTableSearchbar, SearchInfo} from "./components/data-table-searchbar.tsx";
import {useTranslation} from "react-i18next";
import {ProductAttrCateAttrDelete, ProductAttrCateAttrList} from "@/apis/product.ts";
import {AttrColumnSchemaType} from "./data/schema.ts";
import {useParams} from "react-router-dom";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataSimpleTable} from "@/components/custom/data-table/data-simple-table.tsx";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {useDataTable} from "@/hooks/use-data-table.tsx";
import {DataTableToolbar} from "@/components/custom/data-table/data-table-toolbar.tsx";
import {AttrDataForm} from "./attr-data-form.tsx";
import {AttrDeleteConfirm} from "./attr-delete-confirm.tsx";

export default function AttrList() {
  // =========================== Params ==========================================
  const {id} = useParams();
  const {t} = useTranslation()
  const breadList: BreadListItem[] = [
    {name: "首页", link: '/'},
    {name: "属性管理", link: '/products/attrs'},
    {name: "属性配置", link: ''},
  ];
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const {onPaginationChange, page, limit, pagination} = usePagination();
  const [searchForm, setSearchForm] = useState<SearchInfo | null>(null)
  const [formTitle, setFormTitle] = useState<string>('新增操作')
  const [rowItem, setRowItem] = useState<Partial<AttrColumnSchemaType>>({})
  const [attrType, setAttrType] = useState<string>('1')

  // =========================== API request ======================================
  const indexRes = useRequest(ProductAttrCateAttrList, {
    loadingDelay: 100, // Can delay the loading to true time, effectively prevent flicker
    retryCount: 3, // error retry
    manual: true
  });
  const deleteRes = useRequest(ProductAttrCateAttrDelete, {
    manual: true
  })

  useEffect(() => {
    if (searchForm) {
      indexRes.run({id: parseInt(id as string), attr_type: parseInt(attrType), page, limit, search: JSON.stringify(searchForm)})
    } else {
      indexRes.run({id: parseInt(id as string), attr_type: parseInt(attrType), page, limit})
    }
  }, [page, limit, searchForm]);

  // =========================== Method ===========================================
  const handleRefresh = () => {
    indexRes.run({id: parseInt(id as string), attr_type: parseInt(attrType), page, limit, noCache: true})
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
    setRowItem({...rowItem, cate_id: parseInt(id as string)})
  }
  const handleInfo = (values: any) => {
    setFormTitle('编辑操作')
    setRowItem(values)
    if (typeof values.__is_edit__ !== 'undefined' && typeof values.__is_edit__ === 'boolean') {
      setIsOpen(values.__is_edit__)
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
      indexRes.run({id: parseInt(id as string), attr_type: parseInt(attrType), page, limit, search: JSON.stringify(values)})
    }
  }
  const table = useDataTable({
    columns,
    data: (indexRes.data?.data.list || []) as AttrColumnSchemaType[],
    pageCount: indexRes.data?.data?.last_page || 0,
    rowCount: indexRes.data?.data?.total || 0,
    pagination: pagination,
    onPaginationChange: onPaginationChange,
  })

  const handleTabClick = (value: string) => {
    setAttrType(value)
    indexRes.run({id: parseInt(id as string), attr_type: parseInt(value), page: 1, limit, noCache: false})
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
            <Tabs defaultValue={attrType} className="w-[200px]" onValueChange={handleTabClick}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="1">属性列表</TabsTrigger>
                <TabsTrigger value="2">参数列表</TabsTrigger>
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
      {/* data create / update form */}
      {isOpen &&
        <AttrDataForm
          title={formTitle}
          data={rowItem}
          open={isOpen}
          onOpenChange={handleOpen}
        />
      }
      {/* delete confirm */}
      {isDeleteOpen && <AttrDeleteConfirm open={isDeleteOpen} onOpen={setIsDeleteOpen} row={rowItem}/>}
    </TableContext.Provider>
  )
}
