import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconMenuOrder,
  IconUsers,
} from '@tabler/icons-react'
import {useTranslation} from "react-i18next";
// import i18next from '@/locale'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

const { t } = useTranslation();

export const sideLinks: SideLink[] = [
  {
    title: t('menu.dashboard'),
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: '任务管理',
    label: '3',
    href: '/tasks',
    icon: <IconChecklist size={18} />,
  },
  {
    title: '商品管理',
    label: '9',
    href: '/chats',
    icon: <IconMessages size={18} />,
  },
  {
    title: '应用管理',
    label: '',
    href: '/apps',
    icon: <IconApps size={18} />,
  },
  {
    title: '订单管理',
    label: '',
    href: '',
    icon: <IconMenuOrder size={18} />,
    sub: [
      {
        title: '订单列表',
        label: '',
        href: '/sign-in',
        icon: <IconMessages size={18} />,
      },
      {
        title: '配送管理',
        label: '',
        href: '/sign-in-2',
        icon: <IconApps size={18} />,
      },
      {
        title: '配置管理',
        label: '',
        href: '/sign-up',
        icon: <IconUsers size={18} />,
      },
      {
        title: '设置管理',
        label: '',
        href: '/forgot-password',
        icon: <IconRouteAltLeft size={18} />,
      },
      {
        title: '其他管理',
        label: '',
        href: '/otp',
        icon: <IconHexagonNumber5 size={18} />,
      },
    ],
  },
  {
    title: 'Users',
    label: '',
    href: '/users',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Requests',
    label: '10',
    href: '/requests',
    icon: <IconRouteAltLeft size={18} />,
    sub: [
      {
        title: 'Trucks',
        label: '9',
        href: '/trucks',
        icon: <IconTruck size={18} />,
      },
      {
        title: 'Cargos',
        label: '',
        href: '/cargos',
        icon: <IconBoxSeam size={18} />,
      },
    ],
  },
  {
    title: 'Analysis',
    label: '',
    href: '/analysis',
    icon: <IconChartHistogram size={18} />,
  },
  {
    title: 'Extra Components',
    label: '',
    href: '/extra-components',
    icon: <IconComponents size={18} />,
  },
  {
    title: 'Error Pages',
    label: '',
    href: '',
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: 'Not Found',
        label: '',
        href: '/404',
        icon: <IconError404 size={18} />,
      },
      {
        title: 'Internal Server Error',
        label: '',
        href: '/500',
        icon: <IconServerOff size={18} />,
      },
      {
        title: 'Maintenance Error',
        label: '',
        href: '/503',
        icon: <IconBarrierBlock size={18} />,
      },
    ],
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]
