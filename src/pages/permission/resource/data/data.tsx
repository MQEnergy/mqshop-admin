import {
  CircleIcon,
} from '@radix-ui/react-icons'
import {SunIcon} from "lucide-react";

export const statuses = [
  {
    value: 1,
    label: '正常',
    icon: SunIcon,
  },
  {
    value: 2,
    label: '禁用',
    icon: CircleIcon,
  },
]