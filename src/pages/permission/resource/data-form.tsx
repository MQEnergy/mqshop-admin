import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {FormControl, FormItem} from "@/components/ui/form";
import {DefaultValues} from "react-hook-form";
import {Switch} from "@/components/ui/switch";
import {useRequest} from "ahooks";
import {ResourceCreate, ResourceUpdate} from "@/apis/permission";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useContext} from "react";
import {formSchema, ResourceForm, ResourceItem} from "./data/schema.ts";
import {TableContext} from "@/context";
import AutoForm, {AutoFormSubmit} from "@/components/custom/auto-form";
import {AutoFormInputComponentProps} from "@/components/custom/auto-form/types";
import AutoFormLabel from "@/components/custom/auto-form/common/label";
import AutoFormTooltip from "@/components/custom/auto-form/common/tooltip";
import {Button} from "@/components/custom/button";
import {DrawerClose, DrawerFooter} from "@/components/ui/drawer";
import AutoFormInput from "@/components/custom/auto-form/fields/input";
import {z} from "zod";
import AutoFormSelect from "@/components/custom/auto-form/fields/select";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);

  let defaultValues: DefaultValues<ResourceForm> = {
    name: '',
    desc: '',
    alias: '',
    b_url: '',
    f_url: '',
    icon: '',
    menu_type: 1,
    sort_order: 50,
    _status: true
  }
  const info = props.data as unknown as ResourceItem;
  if (info) {
    defaultValues = Object.assign({}, info, {_status: info.status === 1})
  }
  // =========================== Params ==========================================

  // =========================== API request ======================================
  const createRes = useRequest(ResourceCreate, {
    manual: true,
  });
  const updateRes = useRequest(ResourceUpdate, {
    manual: true,
  });
  // =========================== API request ======================================

  // =========================== Method ===========================================
  const onSubmit = (values: ResourceForm) => {
    const params = {
      name: values.name,
      desc: values.desc || '',
      alias: values.alias,
      b_url: values.b_url,
      f_url: values.f_url,
      icon: values.icon || '',
      menu_type: values.menu_type,
      sort_order: values.sort_order,
      parent_id: info?.parent_id || 0,
      path: info?.path || '',
      status: values._status ? 1 : 2
    }
    let runAsync: Promise<ApiResult<any>>
    if (info && info.id) {
      runAsync = updateRes.runAsync({id: info.id, ...params});
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
  // =========================== Method ======================================
  return (
    <DrawerForm title={props.title}
                open={props.open}
                onClose={handleClose}
                noFooter={true}
                className='rounded-tl-lg rounded-bl-lg'>
      <AutoForm
        onSubmit={onSubmit}
        formSchema={formSchema}
        values={defaultValues}
        fieldConfig={{
          name: {
            label: '名称',
            description: '如：系统管理，增删改查',
            inputProps: {
              required: true,
              placeholder: "请输入菜单或操作名称",
            },
          },
          icon: {
            label: '图标',
            inputProps: {
              required: false,
              placeholder: '请点击选择图标'
            },
            fieldType: ({...props}: AutoFormInputComponentProps) => {
              props.isRequired = false
              return <AutoFormInput {...props} />
            },
            renderParent: ({children}) => (
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  {children}
                </div>
                <div>
                  <Button type="button">选择图标</Button>
                </div>
              </div>
            ),
          },
          desc: {
            label: '描述',
            inputProps: {
              placeholder: '请输入描述'
            }
          },
          alias: {
            label: '别名',
            description: "以冒号分隔，如：admin:index",
            inputProps: {
              required: true,
              placeholder: '请输入别名'
            }
          },
          b_url: {
            label: '后端地址',
            description: '请求接口地址，如：/backend/admin/index',
            inputProps: {
              required: true,
              placeholder: '请输入后端地址'
            }
          },
          f_url: {
            label: '前端地址',
            description: '页面访问地址，如：/permission/resource',
            inputProps: {
              required: true,
              placeholder: '请输入前端地址',
            }
          },
          menu_type: {
            fieldType: ({...props}: AutoFormInputComponentProps) => {
              props.label = '资源类型'
              const values = z.array(z.object({
                label: z.string(),
                value: z.number()
              })).default([
                {label: '模块', value: 1},
                {label: '操作', value: 2},
              ])
              return <AutoFormSelect {...props} zodItem={values as unknown as z.ZodAny}/>
            },
          },
          sort_order: {
            label: '排序',
            fieldType: 'number'
          },
          _status: {
            fieldType: ({...props}: AutoFormInputComponentProps) => {
              props.label = '状态'
              return (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <div className="space-y-1 leading-none">
                    <AutoFormLabel label={props.label} isRequired={props.isRequired}/>
                    <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
                  </div>
                  <FormControl>
                    <Switch
                      checked={props.field.value}
                      onCheckedChange={props.field.onChange}
                      {...props.fieldProps}
                    />
                  </FormControl>
                </FormItem>
              )
            },
          }
        }}>
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
