import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRequest} from "ahooks";
import {MemberRoleDistribution, RoleList} from "@/apis/permission.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import FormDialog from "@/components/custom/form-dialog.tsx";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request.ts";
import {FancyMultiSelect, selectItem} from "@/components/custom/fancy-multi-select";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Member} from "@/pages/permission/member/data/schema";
import {TableContext} from "@/context";

interface AssignRoleProps {
  row: any;
  width?: string;
  open: boolean;
  onOpen: (value: boolean) => void;
}

export function AssignRole({...props}: AssignRoleProps) {

  const {onRefresh} = useContext(TableContext);

  const [roleList, setRoleList] = useState<selectItem[]>([])
  const [selected, setSelected] = React.useState<selectItem[]>([]);
  const info = props.row as Member || null

  const formSchema = z.object({
    role_ids: z.string().min(1, '角色不能为空')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_ids: '',
    }
  })

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
    if (props.row) {
      const roleSelected: selectItem[] = info.role_list?.map((item: any) => {
        return {label: item.name, value: item.id}
      }) || [];
      handleRoleSelect(roleSelected)
    }
  }, [props.row])

  const handleRoleSelect = (items: selectItem[]) => {
    const ids = items.map(item => item.value)
    form.setValue('role_ids', ids.join(','), {
      shouldValidate: true, // trigger validation
    })
    setSelected(items)
  }

  const changeRoleRes = useRequest(MemberRoleDistribution, {
    manual: true,
  })
  const handleCancel = () => {
    props.onOpen(false)
  }
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const runAsync = changeRoleRes.runAsync({
      id: info.id,
      role_ids: values.role_ids,
    })
    toast.promise(
      runAsync,
      {
        loading: '提交中...',
        success: (data: ApiResult<any>) => <span className='text-sm'>{data.message}</span>,
        error: (err) => <span
          className='text-sm'>{err.response?.data.message || err.message || 'Request Error'}</span>,
      }
    ).then(() => {
      handleCancel()
      onRefresh?.()
    })
  }
  return (
    <FormDialog
      title="角色分配"
      submitTitle={'确定分配'}
      loading={changeRoleRes.loading}
      width={props.width}
      open={props.open}
      onOpenChange={props.onOpen}
      onCancel={handleCancel}
      onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className='grid space-y-6 items-center'>
          <FormField
            control={form.control}
            name='role_ids'
            render={({}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[100px] text-foreground'>角色
                  <span className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <FancyMultiSelect list={roleList} selected={selected} onSelect={handleRoleSelect}/>
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
        </div>
      </Form>
    </FormDialog>
  )
}