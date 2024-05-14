import {AlertDialogProps} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/custom/button.tsx";

interface DialogAlertProps extends AlertDialogProps {
  onCancel(): void;

  onSubmit(): void;

  loading: boolean;
}

function ConfirmDialog(props: DialogAlertProps) {
  return (
      <AlertDialog open={props.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>你确定要退出登录吗?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button size={'sm'} variant={'outline'} onClick={props.onCancel}>取消</Button>
            <Button size={'sm'} loading={props.loading} onClick={props.onSubmit}>退出登录</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

export default ConfirmDialog
