import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DefaultValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/components/ui/switch";
import {useRequest} from "ahooks";
import {RoleCreate, RoleUpdate} from "@/apis/permission";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {useContext} from "react";
import {formSchema, RoleForm} from "./data/schema.ts";
import {TableContext} from "@/context";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);

  let defaultValues: DefaultValues<RoleForm> = {
    id: 0,
    name: '',
    desc: '',
    status: 1,
    _status: true
  }
  if (props.data) {
    const info = props.data as unknown as RoleForm;
    defaultValues = Object.assign({}, info, {_status: info.status === 1})
  }
  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })
  // =========================== Params ==========================================

  // =========================== API request ======================================
  const createRes = useRequest(RoleCreate, {
    manual: true,
  });
  const updateRes = useRequest(RoleUpdate, {
    manual: true,
  });
  // =========================== API request ======================================

  // =========================== Method ===========================================
  const onSubmit = (values: RoleForm) => {
    const params = {
      name: values.name,
      desc: values.desc,
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
