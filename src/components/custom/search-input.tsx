import {Input, InputProps} from '@/components/ui/input'
import {cn} from "@/lib/utils";
import {useTranslation} from "react-i18next";

interface SearchProps extends InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  onKeyword: (keyword: any) => void;
}

function SearchInput(props: SearchProps) {
  const {type, placeholder, className} = props
  const {t} = useTranslation()

  return (
    <div className='relative'>
      <Input
        type={type || 'search'}
        value={props.value}
        onChange={(e) => props.onKeyword(e.target.value)}
        placeholder={placeholder || t('settings.search.placeholder')}
        className={cn('h-9 md:w-[200px] lg:w-[300px]', className)}
      />
    </div>
  )
}

export {SearchInput}