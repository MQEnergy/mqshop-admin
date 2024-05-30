import ConfirmDialog from "@/components/custom/confirm-dialog.tsx";
import {useRequest} from "ahooks";
import {MemberDelete} from "@/apis/permission.ts";
import {toast} from "react-hot-toast";
import * as React from "react";
import {TableContext} from "@/context.tsx";

interface DeleteConfirmProps {
  row: any;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export function DeleteConfirm({...props}: DeleteConfirmProps) {
  // 使用TableContext 获取onRefresh
  const {onRefresh} = React.useContext(TableContext)

  const deleteRes = useRequest(MemberDelete, {
    manual: true,
  })
  const handleDelete = () => {
    const runAsync = deleteRes.runAsync({
      ids: props.row.id,
      noCache: true,
    });
    toast.promise(
      runAsync,
      {
        loading: '处理中...',
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
                   description={'您确定要删除吗'}
                   loading={deleteRes.loading}
                   onCancel={() => props.onOpen(false)}
                   onSubmit={handleDelete}/>)
}

DeleteConfirm.displayName = 'DeleteConfirm'

export default DeleteConfirm