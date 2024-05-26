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
    account: z.string().min(5, {message: '请输入账户名 如：admin'}),
    real_name: z.string(),
    password: z.string()
      .min(1, {
        message: '请输入密码',
      })
      .min(6, {
        message: '密码最小为6位数',
      }),
    phone: z.string().min(1, {message: '请输入手机号'}),
    avatar: z.string(),
    status: z.boolean(),
    role_ids: z.string()
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

  const handleRoleSelect = (items: selectItem[]) => {
    const ids = items.map(item => item.value)
    form.setValue('role_ids', ids.join(','))
    setSelected(items)
  }

  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [isLoading, setIsLoading] = useState(false)

  const onAvatarSubmit = (file: File) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file_path', 'avatar');

    return AttachmentUpload(formData)
  };
  const onUploadSuccess = (res: ApiResult<any>) => {
    form.setValue('avatar', res.data.file_path)
  }

  const onUploadError = (err: Error) => {
    toast.error(err.message);
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
              <FormItem className='flex items-start space-x-2 space-y-0 mt-2'>
                <FormLabel>头像</FormLabel>
                <FormControl>
                  <AvatarUploader loading={isLoading}
                                  maxFiles={1}
                                  onLoading={setIsLoading}
                                  preview={preview}
                                  onPreview={setPreview}
                                  onSuccess={onUploadSuccess}
                                  onError={onUploadError}
                                  onUpload={onAvatarSubmit}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='account'
            render={({field}) => (
              <FormItem className='space-y-1'>
                <FormLabel>账号</FormLabel>
                <FormControl>
                  <Input placeholder='输入账号名称' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='real_name'
            render={({field}) => (
              <FormItem className='space-y-1'>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder='输入真实姓名' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({field}) => (
              <FormItem className='space-y-1'>
                <FormLabel>手机号</FormLabel>
                <FormControl>
                  <Input placeholder='输入手机号' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem className='space-y-1'>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='输入密码' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='role_ids'
            render={({}) => (
              <FormItem className='space-y-1'>
                <FormLabel>分配角色</FormLabel>
                <FormControl>
                  <FancyMultiSelect list={roleList} selected={selected} onSelect={handleRoleSelect}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({field}) => (
              <FormItem className='flex items-center space-x-2 space-y-0 mt-2'>
                <FormLabel>状态</FormLabel>
                <FormControl>
                  <Switch checked={field.value}
                          onCheckedChange={field.onChange}></Switch>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}></FormField>
        </div>
      </Form>
    </DrawerForm>
  )
}
