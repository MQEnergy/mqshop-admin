import {useNavigate, useRouteError} from 'react-router-dom'
import {Button} from '@/components/ui/button'
import {cn} from "@/lib/utils";
import React from "react";


interface Exception404Props extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Exception404({className, ...props}: Exception404Props) {
  const navigate = useNavigate()
  const error = useRouteError()
  if (error !== null) {
    console.log(error)
  }
  return (
      <div className={cn('h-svh ', className)} {...props}>
        <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
          <h1 className='text-[7rem] font-bold leading-tight'>404</h1>
          <span className='font-medium'>Oops! Page Not Found!</span>
          <p className='text-center text-muted-foreground'>
            It seems like the page you're looking for <br/>
            does not exist or might have been removed.
          </p>
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </div>
  )
}
