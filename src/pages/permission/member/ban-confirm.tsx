import ConfirmDialog from "@/components/custom/confirm-dialog.tsx";
import {useRequest} from "ahooks";
import {MemberUpdate} from "@/apis/permission.ts";
import {toast} from "react-hot-toast";
import * as React from "react";
import {TableContext} from "@/context.tsx";

interface BanConfirmProps {
  row: any;
  open: boolean;
  onOpen: (open: boolean) => void;
}

export function BanConfirm({...props}: BanConfirmProps) {
  // 使用TableContext 获取onRefresh
  const {onRefresh} = React.useContext(TableContext)

  const banRes = useRequest(MemberUpdate, {
    manual: true,
  })
  // 定义参数description 当prop.row.status = 1时候 赋值：您确定要禁用吗？为2：您确定要开启吗？
  const description = props.row.status === 1 ? '您确定要禁用吗？' : '您确定要开启吗？'
  const submitTitle = props.row.status === 1 ? '禁用' : '开启'
  const status = props.row.status === 1 ? 2 : 1

  const handleBan = () => {
    const runAsync = banRes.runAsync({
      id: props.row.id,
      status: status,
      account: props.row.account,
      real_name: props.row.real_name,
      password: props.row.password,
      phone: props.row.phone,
      avatar: props.row.avatar,
      role_ids: props.row.role_ids,
      noCache: true,
    });
    toast.promise(
      runAsync,
      {
        loading: '操作中...',
        success: (data) => data.message,
        error: (err) => err.response?.data.message || err.message || 'Request Error'
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