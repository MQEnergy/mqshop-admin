import {IconMoon, IconSun} from '@tabler/icons-react'
import {useTheme} from './theme-provider'
import {Button} from '@/components/ui/button'
import {useEffect} from 'react'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Moon, Sun, Tv2} from "lucide-react";

export default function ThemeSwitch() {
  const {theme, setTheme} = useTheme()

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === 'dark' ? '#020817' : '#fff'
    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    metaThemeColor && metaThemeColor.setAttribute('content', themeColor)
  }, [theme])

  return (
    <Button
      size='icon'
      variant='ghost'
      className='rounded-full'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <IconMoon size={20}/> : <IconSun size={20}/>}
    </Button>
  )
}

export function ThemeToggle() {
  const {theme, setTheme} = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className='rounded-full'>
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>}
          {theme === 'system' && <Tv2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem className={'cursor-pointer'} onClick={() => setTheme("light")}>
          <Sun size={16}/><span className={'pl-2'}>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={'cursor-pointer'} onClick={() => setTheme("dark")}>
          <Moon size={16}/><span className={'pl-2'}>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={'cursor-pointer'} onClick={() => setTheme("system")}>
          <Tv2 size={16}/><span className={'pl-2'}>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
