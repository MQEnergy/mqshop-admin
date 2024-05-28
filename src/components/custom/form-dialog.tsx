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
  return (
    <Dialog open={props.open}>
      <DialogContent className='min-w-[400px]' style={{
        width: props.width || '400px',
        maxWidth: props.width || '400px',
        height: props.height || 'auto'
      }}>
        <DialogHeader>
          <DialogTitle>{props.title || '提示'}</DialogTitle>
          {props.description && <DialogDescription>{props.description}</DialogDescription>}
        </DialogHeader>
        {props.children &&
          <div className="py-4">
            {props.children}
          </div>
        }
        <DialogFooter>
          <Button size={'sm'} variant={'outline'} onClick={props.onCancel}>{props.closeTitle || '取消'}</Button>
          <Button size={'sm'} loading={props.loading} onClick={props.onSubmit}>{props.submitTitle || '确定'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

FormDialog.displayName = 'FormDialog'

export default FormDialog
