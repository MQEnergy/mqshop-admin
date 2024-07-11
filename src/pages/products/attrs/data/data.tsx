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
    value: 0,
    label: '禁用',
    icon: CircleIcon,
  },
]

export const inputTypes = [
  {
    value: 1,
    label: '手工录入',
  },
  {
    value: 2,
    label: '从列表中选择',
  }
]