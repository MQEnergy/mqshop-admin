import {Outlet} from 'react-router-dom'
import Sidebar from '@/components/layout/sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import {LayoutHeader} from '@/components/layout'
import {Search} from '@/components/custom/search'
import {ThemeToggle} from '@/components/custom/theme-switch'
import {UserNav} from '@/components/layout/user-nav'
import Notice from "@/components/layout/notice";
import Language from "@/components/layout/language";
import {useTranslation} from "react-i18next";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const {t} = useTranslation()

  return (
      <div className='relative h-full overflow-hidden bg-gray-50 dark:bg-black'>
        <Sidebar className='bg-background' isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
        <main
            id='content'
            className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-56'} h-full`}
        >
          <div className={`relative w-full h-16 overflow-hidden`}>
            <LayoutHeader
                className='fixed w-full h-16 z-10 border-b md:top-0 lg:top-0 right-0 sm:top-20 bg-background'>
              <div className={`flex ${isCollapsed ? 'md:ml-14' : 'md:ml-56'}`}>
                <Search placeholder={t('settings.search.placeholder')}/>
              </div>
              <div className='ml-auto flex items-center space-x-4'>
                <Notice/>
                <Language/>
                <ThemeToggle/>
                <UserNav/>
              </div>
            </LayoutHeader>
          </div>

          <Outlet/>
        </main>
      </div>
  )
}
