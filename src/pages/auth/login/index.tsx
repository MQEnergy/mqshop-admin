import ViteLogo from "@/assets/react.svg";
import {UserAuthForm} from "@/pages/auth/components/user-auth-form.tsx";
import {useTranslation} from "react-i18next";
import useUserInfoStore from "@/stores/user-info.ts";

export default function Index() {
  const {t} = useTranslation();
  const token = useUserInfoStore.getState().userInfo?.token || '';
  if (token !== '') {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUi = urlParams.get('redirect');
    window.location.href = redirectUi || '/';
    return <></>
  }
  return (
      <>
        <div
            className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
          <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
            <div className='absolute inset-0 bg-zinc-900'/>
            <div className='relative z-20 flex items-center text-lg font-medium'>
              <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2 h-6 w-6'
              >
                <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3'/>
              </svg>
              麻雀电商系统（mqshop）
            </div>

            <img
                src={ViteLogo}
                className='relative m-auto'
                width={301}
                height={60}
                alt='Vite'
            />

            <div className='relative z-20 mt-auto'>
              <blockquote className='space-y-2'>
                <p className='text-lg'>
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className='text-sm'>Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
          <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
              <div className='flex flex-col space-y-2 text-left'>
                <h1 className='text-2xl font-semibold tracking-tight'>{t('settings.auth.login')}</h1>
                <p className='text-sm text-muted-foreground'>
                  {t('settings.auth.login.tips')}<br/>
                  {t('settings.auth.login.tips1')}
                </p>
              </div>
              <UserAuthForm/>
              <p className='px-8 text-center text-sm text-muted-foreground'>
                By clicking login, you agree to our{' '}
                <a
                    href='/terms'
                    className='underline underline-offset-4 hover:text-primary'
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                    href='/privacy'
                    className='underline underline-offset-4 hover:text-primary'
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </>
  )
}