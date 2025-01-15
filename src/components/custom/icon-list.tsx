import {CircleCheck, icons, LucideProps} from "lucide-react";
import Icon from "@/components/custom/icon.tsx";
import {cn} from "@/lib/utils.ts";
import React from "react";
import {IconCopy} from "@tabler/icons-react";
import {Tooltip} from "react-tooltip";

interface IconListProps extends Omit<LucideProps, 'ref'> {
  iconKeys: string[];
  selectedIcon: string;
  onSelectIcon: (name: string) => void;
}

type nameIconType = keyof typeof icons

function IconList({iconKeys, ...props}: IconListProps) {
  const [isCopy, setIsCopy] = React.useState<boolean>(false)

  const handleCopy = (text: string) => {
    const clipboard = window.navigator.clipboard
    clipboard.writeText(text).then(() => {
      setIsCopy(true)
      setTimeout(() => setIsCopy(false), 1500)
    }, () => {
      setIsCopy(false)
    })
  }

  return (
    <div className='flex flex-wrap justify-center items-center'>
      {iconKeys.length === 0 ?
        <div className={'text-sm text-gray-500 pt-10'}>暂无数据</div> :
        iconKeys.map((value) => {
          return (
            <a key={value}
               data-tooltip-id="icon-tooltip"
               data-tooltip-content={value}
               data-tooltip-offset={1}>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  props.onSelectIcon(value)
                }}
                className={
                  cn('m-1 h-14 w-14 border rounded-md flex flex-col items-center justify-center cursor-pointer',
                    props.selectedIcon === value ? 'bg-gray-200' : '')
                }>
                <Icon size={18} name={value as nameIconType}/>
              </div>
            </a>
          )
        })
      }
      <Tooltip id="icon-tooltip" render={({content}) => {
        return (
          <div className={'flex flex-row items-center justify-center space-x-2'}>
            <span>{content}</span>
            {!isCopy ?
              <IconCopy
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(content as string)
                }}
                className={'cursor-pointer'}
                size={12}/>
              :
              <CircleCheck size={12} className={'text-green-500'}/>
            }
          </div>
        )
      }} clickable/>
    </div>
  );
}
export default IconList