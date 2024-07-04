import {DialogProps} from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/custom/button.tsx";
import {useTranslation} from "react-i18next";
import {cn} from "@/lib/utils";

export interface FormDialogProps extends DialogProps {
  className?: string;
  width?: string;
  height?: string;
  loading: boolean
  title?: string
  description?: string
  closeTitle?: string
  submitTitle?: string
  onCancel: () => void
  onSubmit?: (values: any) => void
}

function FormDialog({...props}: FormDialogProps) {
  const {t} = useTranslation()
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange} modal={true}>
      <DialogContent className='min-w-[400px]' style={{
        width: props.width || '400px',
        maxWidth: props.width || '400px',
        height: props.height || 'auto'
      }}>
        <DialogHeader>
          <DialogTitle>{props.title || t('settings.dialog.title')}</DialogTitle>
          {props.description && <DialogDescription>{props.description}</DialogDescription>}
        </DialogHeader>
        {props.children &&
          <div className={cn('my-4', props.className)}>
            {props.children}
          </div>
        }
        <DialogFooter className={'w-full bg-background absolute bottom-0 right-0 p-4'}>
          <Button size={'sm'} variant={'outline'}
                  onClick={props.onCancel}>{props.closeTitle || t('settings.search.cancel')}</Button>
          <Button size={'sm'} loading={props.loading}
                  onClick={props.onSubmit}>{props.submitTitle || t('settings.search.ok')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

FormDialog.displayName = 'FormDialog'

export default FormDialog
