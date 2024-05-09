import {
  Blocks,
  Layers3,
  LayoutDashboard,
  ScanEye,
  Settings,
  ShoppingBag,
  Ticket,
  Ribbon,
  Users, Feather, Shirt, ShoppingBasket, TicketCheck, BookUser, Contact, SquareLibrary, Dock, FileCog, Images, ToyBrick
} from "lucide-react";

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
    icon: <LayoutDashboard size={18}/>,
  },
  {
    title: 'menu.product',
    label: '3',
    href: '/products',
    icon: <Shirt size={18}/>,
    sub: [
      {
        title: 'menu.product.list',
        label: '',
        href: '/index',
        icon: <Blocks size={18}/>,
      },
      {
        title: 'menu.cate.list',
        label: '1',
        href: '/cates',
        icon: <Layers3 size={18}/>,
      },
      {
        title: 'menu.brand.list',
        label: '',
        href: '/brands',
        icon: <Ribbon size={18}/>,
      },
      {
        title: 'menu.attrs.list',
        label: '',
        href: '/attrs',
        icon: <Feather size={18}/>,
      },
    ]
  },
  {
    title: 'menu.order',
    label: '',
    href: '/orders',
    icon: <ShoppingBag size={18}/>,
    sub: [
      {
        title: 'menu.order.list',
        label: '',
        href: '/index',
        icon: <ShoppingBasket size={18}/>,
      },
    ],
  },
  {
    title: 'menu.invoice',
    label: '',
    href: '/invoices',
    icon: <Ticket size={18}/>,
    sub: [
      {
        title: 'menu.invoice.list',
        label: '',
        href: '/index',
        icon: <TicketCheck size={18}/>,
      },
    ],
  },
  {
    title: 'menu.user',
    label: '',
    href: '/users',
    icon: <Users size={18}/>,
    sub: [
      {
        title: 'menu.user.list',
        label: '',
        href: '/index',
        icon: <BookUser size={18}/>,
      },
    ],
  },
  {
    title: 'menu.system.permission',
    label: '',
    href: '/permissions',
    icon: <ScanEye size={18}/>,
    sub: [
      {
        title: 'menu.system.permission.member',
        label: '',
        href: '/member',
        icon: <Contact size={18}/>,
      },
      {
        title: 'menu.system.permission.role',
        label: '',
        href: '/role',
        icon: <SquareLibrary size={18}/>,
      },
      {
        title: 'menu.system.permission.resource',
        label: '',
        href: '/resource',
        icon: <Dock size={18}/>,
      },
    ]
  },
  {
    title: 'menu.system.settings',
    label: '',
    href: '/settings',
    icon: <Settings size={18}/>,
    sub: [
      {
        title: 'menu.system.settings.attach',
        label: '',
        href: '/attachment',
        icon: <FileCog size={18}/>,
      },
      {
        title: 'menu.system.settings.banner',
        label: '',
        href: '/banner',
        icon: <Images size={18}/>,
      },
    ]
  },
  {
    title: 'menu.system.plugin',
    label: '',
    href: '/plugins',
    icon: <Blocks size={18}/>,
    sub: [
      {
        title: 'menu.system.plugin.list',
        label: '',
        href: '/index',
        icon: <ToyBrick size={18}/>,
      },
    ]
  },
]
