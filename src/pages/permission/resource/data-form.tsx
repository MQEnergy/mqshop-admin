import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DefaultValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/components/ui/switch";
import {useRequest} from "ahooks";
import {ResourceCreate, ResourceUpdate} from "@/apis/permission";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useContext} from "react";
import {formSchema, ResourceForm} from "./data/schema.ts";
import {TableContext} from "@/context";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);

  let defaultValues: DefaultValues<ResourceForm> = {
    id: 0,
    name: '',
    desc: '',
    alias: '',
    b_url:  '',
    f_url: '',
    icon: '',
    menu_type: 1,
    sort_order: 50,
    status: 1,
    _status: true
  }
  if (props.data) {
    const info = props.data as unknown as ResourceForm;
    defaultValues = Object.assign({}, info, {_status: info.status === 1})
  }
  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })
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
    // Todo
    const params = {
      name: values.name,
      desc: values.desc,
      alias: values.alias,
      b_url: values.b_url,
      f_url: values.f_url,
      icon: values.icon,
      menu_type: values.menu_type,
      sort_order: values.sort_order,
      parent_id: 0,
      path: "",
      status: values._status ? 1 : 2
    }
    let runAsync: Promise<ApiResult<any>>
    if (values.id) {
      runAsync = updateRes.runAsync({id: values.id, ...params});
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
    form.reset()
    props.onOpenChange?.(false)
  }
  // =========================== Method ======================================

  return (
    <DrawerForm title={props.title} open={props.open}
                onClose={handleClose} onSubmit={form.handleSubmit(onSubmit)}
                loading={updateRes.loading || createRes.loading}
                className='rounded-tl-lg rounded-bl-lg'>
      <Form {...form}>
        <div className='grid space-y-6 items-center'>
          <FormField
            control={form.control}
            name='name'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>名称<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入名称' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='desc'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>描述</FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入描述' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='_status'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>状态</FormLabel>
                <div className='w-full relative flex items-center'>
                  <FormControl>
                    <Switch checked={field.value}
                            onCheckedChange={field.onChange}></Switch>
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}></FormField>
        </div>
      </Form>
    </DrawerForm>
  )
}
