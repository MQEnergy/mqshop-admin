import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {useDebounce, useRequest, useSetState} from "ahooks";
import {ResourceCreate, ResourceList, ResourceUpdate} from "@/apis/permission";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {lazy, Suspense, useContext, useEffect, useMemo, useState} from "react";
import {formSchema, ResourceForm, ResourceItem} from "./data/schema.ts";
import {TableContext} from "@/context";
import AutoForm, {AutoFormSubmit} from "@/components/custom/auto-form";
import {Button} from "@/components/custom/button";
import {DrawerClose, DrawerFooter} from "@/components/ui/drawer";
import FormDialog from "@/components/custom/form-dialog.tsx";
import FieldConfigForm from "@/pages/permission/resource/columns/data-form-fields.tsx";
import {icons} from "lucide-react";
import {IconFidgetSpinner} from "@tabler/icons-react";
import {SearchInput} from "@/components/custom/search-input.tsx";

interface DataFormProps extends DrawerFormProps {
  data: ResourceItem | null
}

const IconsComponentLazy = lazy(() => import('@/components/custom/icon-list.tsx'));

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <IconFidgetSpinner className='ml-2 h-4 w-4 animate-spin'/>
      <p className="text-sm ml-2">Loading...</p>
    </div>
  );
};

export function DataForm({...props}: DataFormProps) {
  // ============================= Params =========================================
  const {trans, onRefresh} = useContext(TableContext);
  const [isOpenIcon, setIsOpenIcon] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [info, setInfo] = useSetState<Partial<ResourceForm>>({})
  const [iconKeys, setIconKeys] = useState<string[]>([]);
  const [IconsComponent, setIconsComponent] = useState<any>(IconsComponentLazy);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce(keyword, {wait: 100});

  // =========================== API request ======================================
  const createRes = useRequest(ResourceCreate, {manual: true});
  const updateRes = useRequest(ResourceUpdate, {manual: true});
  const parentListRes = useRequest(ResourceList, {manual: true});
  const memoizedIconsComponent = useMemo(() => (
    <IconsComponent iconKeys={iconKeys} size={18} selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon}/>
  ), [iconKeys, selectedIcon]);

  const row = (props.data || {
    id: 0,
    name: '',
    parent_id: 0,
    desc: '',
    alias: '',
    b_url: '',
    f_url: '',
    icon: '',
    menu_type: 1,
    sort_order: 50,
    path: '',
    status: 1
  }) as ResourceItem

  useEffect(() => {
    setInfo(Object.assign(info, row))
    setSelectedIcon(row.icon)

  }, [props.data]);

  useEffect(() => {
    parentListRes.run({id: row.id})

  }, [props.open]);

  useEffect(() => {
    if (debouncedKeyword) {
      const keys = Object.keys(icons).filter((name: string) => name.toLowerCase().includes(keyword.toLowerCase()));
      setIconKeys(keys)
    } else {
      setIconKeys(Object.keys(icons))
    }
  }, [debouncedKeyword]);

  // =========================== Method ===========================================
  const onSubmit = (formValues: ResourceForm) => {
    const params = {
      name: formValues.name,
      parent_id: formValues.parent_id,
      desc: formValues.desc || '',
      alias: formValues.alias,
      b_url: formValues.b_url,
      f_url: formValues.f_url,
      icon: formValues.icon || '',
      menu_type: formValues.menu_type,
      sort_order: formValues.sort_order,
      path: row.path || '',
      status: formValues.status
    }
    let runAsync: Promise<ApiResult<any>>
    if (row && row.id) {
      runAsync = updateRes.runAsync({id: row.id, ...params});
    } else {
      runAsync = createRes.runAsync(params);
    }
    toast.promise(
      runAsync,
      {
        loading: trans?.t('settings.table.action.processing.title') || 'loading...',
        success: (data: ApiResult<any>) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
      props.onOpenChange?.(false)
      onRefresh?.()
    })
  }
  const handleClose = () => {
    props.onOpenChange?.(false)
  }
  const handleIconSubmit = (_: any) => {
    setInfo({...info, icon: selectedIcon})
    setIsOpenIcon(false)
  }
  const handleSearch = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleOpenIcon = () => {
    const module = lazy(() => import('@/components/custom/icon-list.tsx'));
    setIconsComponent(module);
    setIconKeys(Object.keys(icons))
    setIsOpenIcon(true);
  }
  // =========================== Method ======================================
  return (
    <>
      <DrawerForm title={props.title}
                  open={props.open}
                  onClose={handleClose}
                  noFooter={true}
                  className='rounded-tl-lg rounded-bl-lg'>
        <AutoForm
          onSubmit={onSubmit}
          formSchema={formSchema}
          values={info}
          onValuesChange={setInfo}
          fieldConfig={FieldConfigForm({
            resources: parentListRes.data?.data as ResourceItem[],
            onOpenIcon: handleOpenIcon,
          })}>
          <DrawerFooter className='w-full bg-background h-[70px] fixed bottom-0 left-0 flex-row border-t'>
            <AutoFormSubmit loading={updateRes.loading || createRes.loading}>
              {trans?.t('settings.table.submit.title')}
            </AutoFormSubmit>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>{trans?.t('settings.search.cancel')}</Button>
            </DrawerClose>
          </DrawerFooter>
        </AutoForm>
      </DrawerForm>
      {isOpenIcon &&
        <FormDialog open={isOpenIcon}
                    width={'600px'}
                    height={'600px'}
                    className={'relative'}
                    loading={false}
                    onOpenChange={setIsOpenIcon}
                    onCancel={() => {
                      setIsOpenIcon(false)
                    }}
                    onSubmit={handleIconSubmit}>
          <SearchInput className={'md:w-[400px] lg:w-[400px] m-auto mb-2'}
                       placeholder={`请输入关键词搜索 ${iconKeys.length} icons ...`} value={keyword}
                       onKeyword={handleSearch}/>
          <div className={'w-full h-[420px] overflow-y-scroll py-4'}>
            <Suspense fallback={<Loading/>}>
              {memoizedIconsComponent}
            </Suspense>
          </div>
        </FormDialog>
      }
    </>
  )
}
