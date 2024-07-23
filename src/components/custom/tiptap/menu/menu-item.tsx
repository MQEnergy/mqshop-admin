import { Button } from '../../button';

import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default function MenuItem({
                                   icon, title, action, isActive = null,
                                 }: {
  icon?: string,
  title?: string,
  action?: () => void,
  isActive?: (() => boolean) | null
}) {
  return <Button
    variant={'ghost'}
    className={`cursor-pointer border-0 text-gray-900 w-9 h-9 p-2 ${isActive && isActive() ? 'bg-gray-200' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      action?.()
    }}
    title={title}
  >
    <svg className="size-8 fill-current">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`}/>
    </svg>
  </Button>
}