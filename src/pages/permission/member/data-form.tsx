import {DrawerForm, DrawerFormProps} from "@/components/custom/drawer-form.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {PasswordInput} from "@/components/custom/password-input";
import {Switch} from "@/components/ui/switch";
import {useRequest} from "ahooks";
import {MemberCreate, RoleList} from "@/apis/permission";
import {MemberCreateReq, RoleListReq} from "@/apis/models/permission-model";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";
import {FancyMultiSelect, selectItem} from "@/components/custom/fancy-multi-select";
import * as React from "react";
import {useEffect, useState} from "react";
import {AvatarUploader} from "@/components/custom/avatar-uploader";
import {AttachmentUpload} from "@/apis/common";

interface AddFormProps extends DrawerFormProps {
  onRefresh?: () => void
}

export function DataForm(props: AddFormProps) {

  const formSchema = z.object({
    account: z.string().min(1, '账号不能为空').min(5, '账号最小为5个字符'),
    real_name: z.string(),
    password: z.string().min(1, '密码不能为空').min(6, '密码最小为6位数'),
    phone: z.string().min(1, '手机号不能为空'),
    avatar: z.string().min(1, '头像不能为空'),
    status: z.boolean(),
    role_ids: z.string().min(1, '角色不能为空')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: '',
      real_name: '',
      password: '',
      phone: '',
      avatar: '',
      status: true,
      role_ids: ''
    }
  })

  const {loading, runAsync} = useRequest((data: MemberCreateReq) => MemberCreate(data), {
    manual: true,
  });

  // 提交
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const runAsync1 = runAsync({
      account: values.account,
      real_name: values.real_name,
      password: values.password,
      phone: values.phone,
      avatar: values.avatar,
      role_ids: values.role_ids,
      status: values.status ? 1 : 2
    });
    await toast.promise(
      runAsync1,
      {
        loading: '提交中...',
        success: (data: ApiResult<any>) => <text className='text-sm'>{data.message}</text>,
        error: (err) => <text className='text-sm'>{err.response?.data.message || err.message || 'Request Error'}</text>,
      }
    )
    props.onOpenChange && props.onOpenChange(false)
    props.onRefresh && props.onRefresh()
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
  const roleRequest = useRequest((params: RoleListReq) => RoleList(params), {
    manual: true
  })
  const initRoleData = () => {
    roleRequest.runAsync({noCache: false}).then(r => {
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


  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [isLoading, setIsLoading] = useState(false)

  const onAvatarSubmit = (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_path', 'avatar')

    return AttachmentUpload(formData)
  };
  const onUploadSuccess = async (res: ApiResult<any>) => {
    form.setValue('avatar', res.data.file_path)
    await form.trigger('avatar') //
  }
  const handleRoleSelect = async (items: selectItem[]) => {
    const ids = items.map(item => item.value)
    form.setValue('role_ids', ids.join(','))
    await form.trigger('role_ids') // 手动触发重新验证
    setSelected(items)
  }
  const onUploadError = (err: Error) => {
    toast.error(err.message);
  }

  const handlePreview = async (preview: string | ArrayBuffer | null) => {
    setPreview(preview)
    if (preview === null) {
      form.setValue('avatar', '')
    }
    await form.trigger('avatar')
  }
  return (
    <DrawerForm open={props.open} onClose={handleClose} onSubmit={form.handleSubmit(onSubmit)} loading={loading}
                className='rounded-tl-lg rounded-bl-lg'>
      <Form {...form}>
        <div className='grid gap-2'>
          <FormField
            control={form.control}
            name='avatar'
            render={({}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>头像<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative flex-row'>
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
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='account'
            render={({field}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>账号<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入账号名称' {...field} />
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='real_name'
            render={({field}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>姓名</FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入真实姓名' {...field} />
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>手机号<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='输入手机号' {...field} />
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>密码<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <PasswordInput placeholder='输入密码' {...field} />
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role_ids'
            render={({}) => (
              <FormItem className='flex items-baseline space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>分配角色<span
                  className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <FancyMultiSelect list={roleList} selected={selected} onSelect={handleRoleSelect}/>
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({field}) => (
              <FormItem className='flex items-center space-y-4'>
                <FormLabel className='w-[80px] text-foreground'>状态</FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Switch checked={field.value}
                            onCheckedChange={field.onChange}></Switch>
                  </FormControl>
                  <FormMessage className='absolute left-0 pt-0.5'/>
                </div>
              </FormItem>
            )}></FormField>
        </div>
      </Form>
    </DrawerForm>
  )
}
