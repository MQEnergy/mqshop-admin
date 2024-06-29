import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRequest} from "ahooks";
import {MemberRoleDistribution, RoleList} from "@/apis/permission.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import FormDialog from "@/components/custom/form-dialog.tsx";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request.ts";
import {useContext, useEffect, useRef, useState} from "react";
import {Member} from "@/pages/permission/member/data/schema";
import {TableContext} from "@/context";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/custom/multi-select";

interface AssignRoleProps {
  row: any;
  width?: string;
  open: boolean;
  onOpen: (value: boolean) => void;
}

export function AssignRoleForm({...props}: AssignRoleProps) {

  // ============================ Params =====================================
  const {trans, onRefresh} = useContext(TableContext);

  const [roleList, setRoleList] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([]);
  const roleItemList = useRef([]);

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

  // ============================ API request ==================================
  const roleRes = useRequest(RoleList, {manual: true})
  const changeRoleRes = useRequest(MemberRoleDistribution, {manual: true})

  const initRoleData = () => {
    roleRes.runAsync({noCache: false}).then(res => {
      const _roleList: string[] = res.data?.map((item: any) => {
        return item.name
      }) || []
      setRoleList(_roleList)
      roleItemList.current = res.data
      const roleSelected: string[] = info.role_list?.map((item: any) => {
        return item.name
      }) || []
      handleRoleSelect(roleSelected)
    });
  }

  useEffect(() => {
    if (props.open) {
      form.reset()
      setSelected([])
      initRoleData()
    }

  }, [props.open, props.row])

  useEffect(() => {
    if (form.getValues('role_ids') === '') {
      setSelected([])
    }
  }, [form.getValues('role_ids')])

  // ============================ Method ======================================
  const handleRoleSelect = (items: string[]) => {
    const filterList = roleItemList.current.filter((item: any) => items.indexOf(item.name) >= 0)
    const ids = filterList.map((item: any) => item.id)
    form.setValue('role_ids', ids.join(','), {
      shouldValidate: true, // trigger validation
    })
    setSelected(items)
  }

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
        loading: '处理中...',
        success: (data: ApiResult<any>) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
      handleCancel()
      onRefresh?.()
    })
  }
  return (
    <FormDialog
      className={'h-[170px]'}
      title={trans?.t('permission.member.role')}
      submitTitle={trans?.t('permission.member.role.confirm')}
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
                    <MultiSelector values={selected} onValuesChange={handleRoleSelect} loop className="max-w-xs">
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="请选择..."/>
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList className={'border'}>
                          {roleList.map((role) => (
                            <MultiSelectorItem key={role} value={role}>{role}</MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
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