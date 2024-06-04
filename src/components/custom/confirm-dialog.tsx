import {AlertDialogProps} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/custom/button.tsx";
import {useTranslation} from "react-i18next";

export interface DialogAlertProps extends AlertDialogProps {
  width?: string;
  height?: string;
  loading: boolean
  title?: string
  description?: string
  closeTitle?: string
  submitTitle?: string
  isDelete?: boolean
  onCancel: () => void
  onSubmit: (values: any) => void
}

function ConfirmDialog({...props}: DialogAlertProps) {
  const {t} = useTranslation()
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent className='min-w-[400px]' style={{
        width: props.width || '400px',
        maxWidth: props.width || '400px',
        height: props.height || 'auto'
      }}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title || t('settings.dialog.title')}</AlertDialogTitle>
          {props.description && <AlertDialogDescription>{props.description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button size={'sm'} variant={'outline'}
                  onClick={props.onCancel}>{props.title || t('settings.search.cancel')}</Button>
          {props.isDelete ?
            <Button variant={'destructive'} size={'sm'} loading={props.loading}
                    onClick={props.onSubmit}>{props.submitTitle || t('settings.search.cancel')}</Button>
            :
            <Button size={'sm'} loading={props.loading}
                    onClick={props.onSubmit}>{props.submitTitle || t('settings.search.ok')}</Button>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

export default ConfirmDialog
