import {AlertDialogProps} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/custom/button.tsx";

interface DialogAlertProps extends AlertDialogProps {
  loading: boolean
  title?: string
  description?: string
  submitBtn?: string
  onCancel: () => void
  onSubmit: () => void
}

function ConfirmDialog(props: DialogAlertProps) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent className={'w-[400px]'}>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title || '提示'}</AlertDialogTitle>
          <AlertDialogDescription>{props.description || '您确定要这样操作吗？'}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button size={'sm'} variant={'outline'} onClick={props.onCancel}>{props.title || '取消'}</Button>
          <Button size={'sm'} loading={props.loading} onClick={props.onSubmit}>{props.submitBtn || '确定'}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

export default ConfirmDialog
