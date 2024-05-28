import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
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
import {Member} from "@/pages/permission/member/data/schema.ts";
import ReactLogo from "@/assets/react.svg";
import {TableContext} from "@/context";

interface DataFormProps<TData> extends DrawerFormProps {
  data?: TData
}

export function DataForm<TData>({...props}: DataFormProps<TData>) {

  const {onRefresh} = useContext(TableContext);

  const formSchema = z.object({
    id: z.number().default(0),
    uuid: z.string(),
    account: z.string().min(1, '账号不能为空').min(5, '账号不能小于5个字符'),
    real_name: z.string(),
    password: z.string().min(1, '密码不能为空').min(6, '密码不能少于6位数'),
    phone: z.string().min(1, '手机号不能为空'),
    avatar: z.string().min(1, '头像不能为空'),
    status: z.boolean(),
    role_ids: z.string().min(1, '角色不能为空')
  })

  const defaultValues = {
    id: 0,
    uuid: '',
    account: '',
    real_name: '',
    password: '',
    phone: '',
    avatar: '',
    role_ids: '',
    status: true
  }

  const info = props.data as Member || null

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: info ? info as DefaultValues<any> : defaultValues
  })

  const createRes = useRequest(MemberCreate, {
    manual: true,
  });
  const updateRes = useRequest(MemberUpdate, {
    manual: true,
  });

  const handleRefresh = () => {
    onRefresh?.()
  }

  // 提交
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const params = {
      account: values.account,
      real_name: values.real_name,
      password: values.password,
      phone: values.phone,
      avatar: values.avatar,
      role_ids: values.role_ids,
      status: values.status ? 1 : 2
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
        loading: '提交中...',
        success: (data: ApiResult<any>) => <span className='text-sm'>{data.message}</span>,
        error: (err) => <span
          className='text-sm'>{err.response?.data.message || err.message || 'Request Error'}</span>,
      }
    ).then(() => {
      props.onOpenChange && props.onOpenChange(false)
      handleRefresh()
    })
  }
  const handleClose = () => {
    form.reset()
    props.onOpenChange && props.onOpenChange(false)
    setPreview(null)
    setIsLoading(false)
  }

  // 获取角色列表
  const [roleList, setRoleList] = useState<selectItem[]>([])
  const [selected, setSelected] = React.useState<selectItem[]>([]);
  const roleRes = useRequest(RoleList, {
    manual: true
  })
  const initRoleData = () => {
    roleRes.runAsync({noCache: false}).then(r => {
      const _roleList = r.data.map((item: any) => {
        return {value: item.id, label: item.name}
      })
      setRoleList(_roleList || [])
    });
  }

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
      handlePreview(info.avatar ? import.meta.env.VITE_RESOURCE_URL + info.avatar : ReactLogo)
      const roleSelected = info.role_list?.map((item: any) => {
        return {label: item.name, value: item.id}
      }) || [];
      setSelected(roleSelected)
    }
  }, [props.data])

  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
      shouldValidate: true, // trigger validation
    })
    setSelected(items)
  }
  const onUploadError = (err: Error) => {
    toast.error(err.message);
  }
  const handlePreview = (preview: string | ArrayBuffer | null) => {
    setPreview(preview)
    if (preview === null || preview === '') {
      form.setValue('avatar', '', {
        shouldValidate: true, // trigger validation
      })
    }
  }

  return (
    <DrawerForm title={props.title} open={props.open} onClose={handleClose} onSubmit={form.handleSubmit(onSubmit)}
                loading={updateRes.loading || createRes.loading}
                className='rounded-tl-lg rounded-bl-lg'>
      <Form {...form}>
        <div className='grid space-y-6 items-center'>
          <FormField
            control={form.control}
            name='avatar'
            render={({}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[60px] text-foreground'>头像<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <AvatarUploader
                      loading={isLoading}
                      maxFiles={1}
                      onLoading={setIsLoading}
                      preview={preview}
                      onPreview={handlePreview}
                      onSuccess={onUploadSuccess}
                      onError={onUploadError}
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
            name='status'
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
