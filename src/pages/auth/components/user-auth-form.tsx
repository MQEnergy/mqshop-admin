import {HTMLAttributes} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {IconBrandFacebook, IconBrandGithub} from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/custom/button'
import {PasswordInput} from '@/components/custom/password-input'
import {cn} from '@/lib/utils'
import {useTranslation} from "react-i18next";
import {Login} from "@/apis/auth";
import useUserInfoStore from "@/stores/user-info";
import {useRequest} from "ahooks";
import {toast} from "react-hot-toast";
import {ApiResult} from "@/lib/request";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}


export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const {t} = useTranslation();
  const formSchema = z.object({
    account: z.string().min(5, '请输入账号名'),
    password: z.string().min(1, '请输入密码').min(6, '密码长度不少于6位'),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: 'admin',
      password: 'admin888',
    }
  })
  const loginRes = useRequest(Login, {
    manual: true
  })

  // 登录提交
  const onSubmit = (params: z.infer<typeof formSchema>) => {
    const runAsync = loginRes.runAsync({
      account: params.account,
      password: params.password,
      noCache: true
    });
    toast.promise(
      runAsync,
      {
        loading: '登录中...',
        success: (data: ApiResult<any>) => <span className='text-sm'>{data.message}</span>,
        error: (err) => <span
          className='text-sm'>{err.response?.data.message || err.message || 'Request Error'}</span>,
      }
    ).then((res) => {
      useUserInfoStore.setState({userInfo: res.data})
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUi = urlParams.get('redirect');
      window.location.href = redirectUi || '/';
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='account'
              render={({field}) => (
                <FormItem className='space-y-1'>
                  <FormLabel>{t('settings.auth.login.account')}</FormLabel>
                  <FormControl>
                    <Input placeholder='账号名称' {...field} />
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
                  <div className='flex items-center justify-between'>
                    <FormLabel>{t('settings.auth.login.password')}</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      {t('settings.auth.login.forget')}
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={loginRes.loading}>
              {t('settings.auth.login')}
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t'/>
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={loginRes.loading}
                leftSection={<IconBrandGithub className='h-4 w-4'/>}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={loginRes.loading}
                leftSection={<IconBrandFacebook className='h-4 w-4'/>}
              >
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
