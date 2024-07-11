import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {useRequest, useSetState} from "ahooks";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useContext, useEffect} from "react";
import {AttrColumnSchemaType, attrFormSchema, AttrFormSchemaType} from "./data/schema.ts";
import {TableContext} from "@/context";
import {DrawerClose, DrawerFooter} from "@/components/ui/drawer.tsx";
import AutoForm, {AutoFormSubmit} from "@/components/custom/auto-form";
import {Button} from "@/components/custom/button.tsx";
import {
  ProductAttrCateAttrCreate,
  ProductAttrCateAttrUpdate,
  ProductAttrCateList,
} from "@/apis/product.ts";
import AttrFieldConfigForm from "./columns/attr-data-form-fields.tsx";
import {ColumnSchemaType} from "@/pages/products/cate/data/schema.ts";
import {DependencyType} from "@/components/custom/auto-form/types.ts";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function AttrDataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);
  const row = props.data as unknown as AttrColumnSchemaType
  const [formInfo, setFormInfo] = useSetState<Partial<AttrFormSchemaType>>({
    cate_id: row?.cate_id || 0,
    attr_type: 1,
    attr_name: '',
    attr_value: '',
    input_type: 1,
    sort_order: 50,
  })

  // =========================== API request ======================================
  const createRes = useRequest(ProductAttrCateAttrCreate, {manual: true});
  const updateRes = useRequest(ProductAttrCateAttrUpdate, {manual: true});
  const parentListRes = useRequest(ProductAttrCateList, {manual: true});
  useEffect(() => {
    setFormInfo(Object.assign(formInfo, row))
  }, [props.data]);

  useEffect(() => {
    parentListRes.run({noCache: false});

  }, [props.open]);

  // =========================== Method ===========================================
  const onSubmit = (values: AttrFormSchemaType) => {
    console.log('values', values);
    const params = {
      cate_id: values.cate_id || 0,
      attr_type: values.attr_type,
      attr_name: values.attr_name,
      attr_value: values.attr_value || '',
      input_type: values.input_type,
      sort_order: values.sort_order,
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
        formSchema={attrFormSchema}
        values={formInfo}
        onValuesChange={setFormInfo}
        onSubmit={onSubmit}
        fieldConfig={AttrFieldConfigForm({
          resources: parentListRes.data?.data as ColumnSchemaType[]
        })}
        dependencies={[
          {
            sourceField: "input_type",
            type: DependencyType.DISABLES,
            targetField: "attr_value",
            when: (input_type: number | string) => {
              return String(input_type) === '1'
            },
          },
        ]}>
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
