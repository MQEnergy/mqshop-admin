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

export interface FormDialogProps extends DialogProps {
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
    <Dialog defaultOpen={props.open} onOpenChange={props.onOpenChange} modal={true}>
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
          <div className="py-4">
            {props.children}
          </div>
        }
        <DialogFooter>
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
