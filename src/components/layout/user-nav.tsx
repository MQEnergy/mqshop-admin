import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useUserInfoStore from "@/stores/user-info";
import {Logout} from "@/apis/auth";
import {useImmer} from "use-immer";
import ConfirmDialog from "@/components/custom/confirm-dialog";
import {Copy} from "lucide-react";
import {toast} from "react-hot-toast";

export function UserNav() {
  const [state, updateState] = useImmer({
    isOpen: false,
    isLoading: false,
  });
  // 通过zustand获取userinfo信息
  const userInfo = useUserInfoStore(state => state.userInfo)
  // 获取userInfo中的info信息
  const {info} = userInfo || {}

  /**
   * 复制内容到剪切板
   */
  const handleCopy = () => {
    // 1. 获取剪切板对象
    const clipboard = window.navigator.clipboard
    // 2. 将需要复制的内容，设置到剪切板对象中
    clipboard.writeText(info?.uuid || '').then(() => {
      // 用toast组件显示复制成功提示
      toast.success('复制成功')
    }, () => {
      // 5. 复制失败，给出提示
      toast.error('复制失败')
    })
  }

  const handleLogout = () => {
    updateState(draft => {
      draft.isLoading = true;
    })
    Logout().then(() => {
      useUserInfoStore.setState({userInfo: null})
      window.location.href = `/login?redirect=${window.location.pathname}`
    }).finally(() => updateState(draft => {
      draft.isLoading = false
    }))
  }
  const handleDialog = () => updateState(draft => {
    draft.isOpen = !draft.isOpen
    draft.isLoading = false
  })

  return (
    <>
      <ConfirmDialog open={state.isOpen} description={'你确定要退出登录吗？'} submitTitle={'退出登录'}
                     loading={state.isLoading} onCancel={handleDialog} onSubmit={handleLogout}/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src='/avatars/01.png' alt='@shadcn'/>
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{info?.account || '未知'}</p>
              <p className='text-xs leading-none text-muted-foreground flex items-center'>
                <span>uuid: {info?.uuid || '-'}</span>
                <Copy size={12} className='ml-1 cursor-pointer' onClick={handleCopy}/>
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              个人中心
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              订单管理
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              设置中心
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleDialog}>
            退出登录
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
