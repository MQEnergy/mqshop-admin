import {HTMLAttributes, useState} from 'react'
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

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}


export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const {t} = useTranslation();
  const formSchema = z.object({
    account: z.string().min(5, {message: 'Please enter your account'}),
    password: z.string()
        .min(1, {
          message: 'Please enter your password',
        })
        .min(6, {
          message: 'Password must be at least 6 characters long',
        }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({
      account: 'admin',
      password: 'admin888',
    })
  })

  // 登录提交
  const onSubmit = async (params: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await Login({
        account: params.account,
        password: params.password
      });
      useUserInfoStore.setState({userInfo: response.data})
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUi = urlParams.get('redirect');
      window.location.href = redirectUi || '/';

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
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
                          <Input placeholder='name@example.com' {...field} />
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
              <Button className='mt-2' loading={isLoading}>
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
                    loading={isLoading}
                    leftSection={<IconBrandGithub className='h-4 w-4'/>}
                >
                  GitHub
                </Button>
                <Button
                    variant='outline'
                    className='w-full'
                    type='button'
                    loading={isLoading}
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
