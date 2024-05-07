import {Input} from '@/components/ui/input'
import {cn} from "@/lib/utils";


interface SearchProps {
  type?: string;
  placeholder?: string;
  className?: string;
}

function Search(props: SearchProps) {
  const {type, placeholder, className} = props
  return (
      <div>
        <Input
            type={type || 'search'}
            placeholder={placeholder}
            className={cn('h-9 md:w-[200px] lg:w-[300px]', className)}
        />
      </div>
  )
}

export {Search}