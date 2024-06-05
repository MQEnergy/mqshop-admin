import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {DefaultValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {PasswordInput} from "@/components/custom/password-input";
import {Switch} from "@/components/ui/switch";
import {useRequest} from "ahooks";
import {MemberCreate, MemberUpdate, RoleList} from "@/apis/permission";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {FancyMultiSelect, selectItem} from "@/components/custom/fancy-multi-select";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {AvatarUploader} from "@/components/custom/avatar-uploader";
import {AttachmentUpload} from "@/apis/common";
import {formSchema, MemberForm} from "@/pages/permission/member/data/schema.ts";
import ReactLogo from "@/assets/react.svg";
import {TableContext} from "@/context";

interface DataFormProps<TData> extends DrawerFormProps {
  data: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {
  // =========================== Params ======================================
  const {trans, onRefresh} = useContext(TableContext);

  let defaultValues: DefaultValues<MemberForm> = {
    uuid: '',
    account: '',
    real_name: '',
    password: '',
    phone: '',
    avatar: '',
    role_ids: '',
    status: 1,
    _status: true
  }
  if (props.data) {
    const info = props.data as unknown as MemberForm;
    defaultValues = Object.assign({}, info, {_status: info.status === 1})
  }
  const form = useForm<MemberForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })
  const [roleList, setRoleList] = useState<selectItem[]>([])
  const [selected, setSelected] = React.useState<selectItem[]>([]);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // =========================== Params ==========================================

  // =========================== API request ======================================
  const createRes = useRequest(MemberCreate, {
    manual: true,
  });
  const updateRes = useRequest(MemberUpdate, {
    manual: true,
  });
  const roleRes = useRequest(RoleList, {
    manual: true
  })
  // =========================== API request ======================================
  useEffect(() => {
    if (props.open) {
      initRoleData()
    }
  }, [props.open])
  useEffect(() => {
    if (form.getValues('role_ids') === '') {
      setSelected([])
    }
  }, [form.getValues('role_ids')])

  useEffect(() => {
    form.reset()
    setSelected([])
    if (props.data) {
      handlePreview(defaultValues.avatar ? import.meta.env.VITE_RESOURCE_URL + defaultValues.avatar : ReactLogo)
      const roleSelected = defaultValues.role_list?.map((item: any) => {
        return {label: item.name, value: item.id}
      }) || [];
      setSelected(roleSelected)
    }
  }, [props.data])
  // =========================== Method ===========================================
  const onSubmit = (values: MemberForm) => {
    console.log("values", values)
    const params = {
      account: values.account,
      real_name: values.real_name,
      password: values.password,
      phone: values.phone,
      avatar: values.avatar,
      role_ids: values.role_ids,
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
    setPreview(null)
    setIsLoading(false)
  }
  const initRoleData = () => {
    roleRes.runAsync({noCache: false}).then(r => {
      const _roleList = r.data.map((item: any) => {
        return {value: item.id, label: item.name}
      })
      setRoleList(_roleList || [])
    });
  }
  const onAvatarSubmit = (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_path', 'avatar')

    return AttachmentUpload(formData)
  };
  const onUploadSuccess = (res: ApiResult<any>) => {
    form.setValue('avatar', res.data.file_path, {
      shouldValidate: true,
    })
  }
  const handleRoleSelect = (items: selectItem[]) => {
    const ids = items.map(item => item.value)
    form.setValue('role_ids', ids.join(','), {
      shouldValidate: true,
    })
    setSelected(items)
  }
  const handlePreview = (preview: string | ArrayBuffer | null) => {
    setPreview(preview)
    if (!preview) {
      form.setValue('avatar', '', {
        shouldValidate: true,
      })
    }
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
            name='avatar'
            render={({}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>{trans?.t('')}头像<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <AvatarUploader
                      loading={isLoading}
                      onLoading={setIsLoading}
                      preview={preview}
                      onPreview={handlePreview}
                      onSuccess={onUploadSuccess}
                      onError={(err: Error) => {
                        toast.error(err.message);
                      }}
                      onUpload={onAvatarSubmit}/>
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='account'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>账号<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入账号名称' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='real_name'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>姓名</FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入真实姓名' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>号码<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入手机号码' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>密码<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <PasswordInput placeholder='输入密码' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role_ids'
            render={({}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>角色<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <FancyMultiSelect list={roleList} selected={selected} onSelect={handleRoleSelect}/>
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
