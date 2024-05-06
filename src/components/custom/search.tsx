import { Input } from '@/components/ui/input'

export function Search() {
  return (
      <div>
        <Input
            type='search'
            placeholder='Search...'
            className='h-8 md:w-[200px] lg:w-[300px]'
        />
      </div>
  )
}
