import * as React from 'react'
import {IconEye, IconEyeOff} from '@tabler/icons-react'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import {Input} from "@/components/ui/input";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({className, ...props}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          type='button'
          size='icon'
          variant='ghost'
          className='absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye size={18}/> : <IconEyeOff size={18}/>}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export {PasswordInput}
