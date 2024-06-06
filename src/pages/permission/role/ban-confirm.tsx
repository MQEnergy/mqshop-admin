import ConfirmDialog from "@/components/custom/confirm-dialog.tsx";
import {useRequest} from "ahooks";
import {RoleUpdate} from "@/apis/permission.ts";
import {toast} from "react-hot-toast";
import * as React from "react";
import {TableContext} from "@/context.tsx";

interface BanConfirmProps {
  row: any;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export function BanConfirm({...props}: BanConfirmProps) {
  // =========================== Params ======================================
  const {trans, onRefresh} = React.useContext(TableContext)
  const description = props.row.status === 1 ? trans?.t('settings.table.ban.desc') : trans?.t('settings.table.open.desc')
  const submitTitle = props.row.status === 1 ? trans?.t('permission.member.ban') : trans?.t('permission.member.open')
  // =========================== Params ======================================

  // =========================== API request ======================================
  const banRes = useRequest(RoleUpdate, {
    manual: true,
  })
  // =========================== API request ======================================

  // =========================== Method ===========================================
  const handleBan = () => {
    const runAsync = banRes.runAsync({
      id: props.row.id,
      status: props.row.status == 1 ? 2 : 1,
      name: props.row.name,
      desc: props.row.desc,
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
                   description={description}
                   submitTitle={submitTitle}
                   loading={banRes.loading}
                   onCancel={() => props.onOpen(false)}
                   onSubmit={handleBan}/>)
}

BanConfirm.displayName = 'BanConfirm'

export default BanConfirm