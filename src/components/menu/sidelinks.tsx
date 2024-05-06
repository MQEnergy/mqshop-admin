import {
  IconApps,
  IconBarrierBlock,
  IconChecklist,
  IconError404,
  IconExclamationCircle,
  IconLayoutDashboard,
  IconMessages,
  IconServerOff,
  IconSettings,
  IconMenuOrder,
  IconUsers,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sideLinks: SideLink[] = [
  {
    title: 'menu.dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18}/>,
  },
  {
    title: 'menu.product',
    label: '3',
    href: '/products',
    icon: <IconChecklist size={18}/>,
    sub: [
      {
        title: 'menu.product.list',
        label: '',
        href: '/index',
        icon: <IconMessages size={18}/>,
      },
      {
        title: 'menu.cate.list',
        label: '1',
        href: '/cates',
        icon: <IconMessages size={18}/>,
      },
      {
        title: 'menu.brand.list',
        label: '',
        href: '/brands',
        icon: <IconMessages size={18}/>,
      },
    ]
  },
  {
    title: 'menu.order',
    label: '',
    href: '/order',
    icon: <IconMenuOrder size={18}/>,
    sub: [
      {
        title: 'menu.order.list',
        label: '',
        href: '/index',
        icon: <IconMessages size={18}/>,
      },
      {
        title: 'menu.order.delivery',
        label: '',
        href: '/delivery',
        icon: <IconApps size={18}/>,
      },
    ],
  },
  {
    title: 'menu.user',
    label: '',
    href: '/users',
    icon: <IconUsers size={18}/>,
  },
  {
    title: 'menu.exception',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18}/>,
    sub: [
      {
        title: 'menu.exception.401',
        label: '',
        href: '/401',
        icon: <IconError404 size={18}/>,
      },
      {
        title: 'menu.exception.404',
        label: '',
        href: '/404',
        icon: <IconError404 size={18}/>,
      },
      {
        title: 'menu.exception.500',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18}/>,
      },
      {
        title: 'menu.exception.503',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18}/>,
      },
    ],
  },
  {
    title: 'menu.settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18}/>,
  },
]
