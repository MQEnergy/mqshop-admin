import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {useRequest, useSetState} from "ahooks";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useContext, useEffect} from "react";
import {ColumnSchemaType, formSchema, FormSchemaType} from "./data/schema.ts";
import {TableContext} from "@/context";
import {DrawerClose, DrawerFooter} from "@/components/ui/drawer.tsx";
import AutoForm, {AutoFormSubmit} from "@/components/custom/auto-form";
import {Button} from "@/components/custom/button.tsx";
import FieldConfigForm from "./columns/data-form-fields.tsx";
import {ProductAttrCateCreate, ProductAttrCateUpdate} from "@/apis/product.ts";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);
  const row = props.data as unknown as ColumnSchemaType
  const [formInfo, setFormInfo] = useSetState<Partial<FormSchemaType>>({
    cate_name: "",
    status: 1
  })

  // =========================== API request ======================================
  const createRes = useRequest(ProductAttrCateCreate, {manual: true});
  const updateRes = useRequest(ProductAttrCateUpdate, {manual: true});
  useEffect(() => {
    setFormInfo(Object.assign(formInfo, row))
  }, [props.data]);

  // =========================== Method ===========================================
  const onSubmit = (values: FormSchemaType) => {
    const params = {
      cate_name: values.cate_name,
      status: values.status,
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

  return (
    <DrawerForm title={props.title}
                open={props.open}
                onSubmit={onSubmit}
                onClose={handleClose}
                noFooter={true}
                loading={updateRes.loading || createRes.loading}
                className='rounded-tl-lg rounded-bl-lg'>
      <AutoForm
        formSchema={formSchema}
        values={formInfo}
        onValuesChange={setFormInfo}
        onSubmit={onSubmit}
        fieldConfig={FieldConfigForm({})}>
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
  )
}
