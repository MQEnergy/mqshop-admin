import {
  CircleIcon,
} from '@radix-ui/react-icons'
import {SunIcon} from "lucide-react";

export const statuses = [
  {
    value: 1,
    label: '已上架',
    icon: SunIcon,
  },{
    value: 2,
    label: '定时上架',
    icon: SunIcon,
  },
  {
    value: 0,
    label: '下架',
    icon: CircleIcon,
  },
]