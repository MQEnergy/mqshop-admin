import ConfirmDialog from "@/components/custom/confirm-dialog.tsx";
import {useRequest} from "ahooks";
import {ProductAttrCateDelete} from "@/apis/product.ts";
import {toast} from "react-hot-toast";
import * as React from "react";
import {TableContext} from "@/context.tsx";

interface DeleteConfirmProps {
  row: any;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export function DeleteConfirm({...props}: DeleteConfirmProps) {
  // =========================== Params ==========================================
  const {trans, onRefresh} = React.useContext(TableContext)

  // =========================== API request =====================================
  const deleteRes = useRequest(ProductAttrCateDelete, {
    manual: true,
  })

  // =========================== Method ==========================================
  const handleDelete = () => {
    const runAsync = deleteRes.runAsync({
      ids: props.row.id,
      noCache: true,
    });
    toast.promise(
      runAsync,
      {
        loading: trans?.t('settings.table.action.processing.title') || 'loading...',
        success: (data) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Server Error'
      }
    ).then(() => {
      props.onOpen(false)
      onRefresh?.()
    })
  }

  return (
    <ConfirmDialog open={props.open}
                   isDelete={true}
                   description={trans?.t('settings.dialog.delete.desc')}
                   loading={deleteRes.loading}
                   onCancel={() => props.onOpen(false)}
                   onSubmit={handleDelete}/>)
}

DeleteConfirm.displayName = 'DeleteConfirm'

export default DeleteConfirm