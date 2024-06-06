import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRequest} from "ahooks";
import {MemberChangePass} from "@/apis/permission.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import FormDialog from "@/components/custom/form-dialog.tsx";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request.ts";
import {useContext} from "react";
import {TableContext} from "@/context.tsx";

interface ResetPasswordProps {
  row: any;
  width?: string;
  open: boolean;
  onOpen: (value: boolean) => void;
}

export function ResetPass({...props}: ResetPasswordProps) {
  // =========================== Params ==========================================
  const {trans} = useContext(TableContext)
  const formSchema = z.object({
    new_pass: z.string().min(1, '密码不能为空').min(6, '密码不能少于6位数'),
    repeat_pass: z.string().min(1, '重复密码不能为空').min(6, '密码不能少于6位数'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      new_pass: '',
      repeat_pass: '',
    }
  })
  // =========================== Params ===========================================

  // =========================== API request ======================================
  const changePassRes = useRequest(MemberChangePass, {
    manual: true,
  })
  // =========================== API request ======================================

  // =========================== Method ===========================================
  const handleCancel = () => {
    props.onOpen(false)
  }
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.new_pass !== values.repeat_pass) {
      toast.error('两次密码不相同')
      return
    }
    const runAsync = changePassRes.runAsync({
      uuid: props.row.uuid,
      new_pass: values.new_pass,
      repeat_pass: values.repeat_pass,
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
    })
  }
  // =========================== Method ===========================================

  return (
    <FormDialog
      title={trans?.t('permission.member.reset')}
      submitTitle={trans?.t('permission.member.reset.confirm')}
      loading={changePassRes.loading}
      width={props.width}
      open={props.open}
      onOpenChange={props.onOpen}
      onCancel={handleCancel}
      onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className='grid space-y-6 items-center'>
          <FormField
            control={form.control}
            name='new_pass'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[100px] text-foreground'>密码
                  <span className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='请输入新密码' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs absolute left-0 pt-1'/>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='repeat_pass'
            render={({field}) => (
              <FormItem className='flex items-center space-y-0'>
                <FormLabel className='w-[100px] text-foreground'>重复密码
                  <span className="text-destructive"> *</span></FormLabel>
                <div className='w-full relative'>
                  <FormControl>
                    <Input placeholder='请再次输入密码' {...field} />
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