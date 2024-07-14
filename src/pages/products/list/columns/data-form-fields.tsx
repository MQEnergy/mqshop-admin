import {AutoFormInputComponentProps, FieldConfig} from "@/components/custom/auto-form/types.ts";
import {FormControl, FormItem} from "@/components/ui/form.tsx";
import AutoFormLabel from "@/components/custom/auto-form/common/label.tsx";
import AutoFormTooltip from "@/components/custom/auto-form/common/tooltip.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {ColumnSchemaType} from "../data/schema.ts";
import {toast} from "react-hot-toast";
import {AvatarUploader} from "@/components/custom/avatar-uploader.tsx";
import {useEffect, useState} from "react";
import {AttachmentUpload} from "@/apis/common.ts";

interface FieldConfigProps {
  onUploadSuccess: (res: any) => void
  info: ColumnSchemaType
}

export default function FieldConfigForm({info, onUploadSuccess}: FieldConfigProps): FieldConfig<any> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<string | ArrayBuffer | null>('');

  useEffect(() => {
    const logoUrl = info.logo_url ? import.meta.env.VITE_RESOURCE_URL + info.logo_url : '';
    setPreview(logoUrl)
  }, [info])

  const onAvatarSubmit = (file: File) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file_path', 'avatar')
    return AttachmentUpload(formData)
  };
  return {
    logo_url: {
      label: '图标',
      description: '100 * 100px 大小不超过2M',
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        return (
          <div className="flex flex-row items-center space-x-2">
            <FormItem className="flex w-full flex-col justify-start">
              <AutoFormLabel label={props.fieldConfigItem.label || ''}
                             isRequired={props.fieldConfigItem.inputProps?.required || false}/>
              <FormControl>
                <AvatarUploader
                  loading={isLoading}
                  onLoading={setIsLoading}
                  preview={preview}
                  onPreview={setPreview}
                  onSuccess={onUploadSuccess}
                  onError={(err: Error) => {
                    toast.error(err.message);
                  }}
                  onUpload={onAvatarSubmit}/>
              </FormControl>
              <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
            </FormItem>
          </div>
        )
      },
    },
    brand_name: {
      label: '名称',
      description: '如：裤子',
      inputProps: {
        required: true,
        placeholder: "请输入分类名称",
      },
    },
    desc: {
      label: '描述',
      inputProps: {
        required: false,
        placeholder: '请输入分类描述'
      }
    },
    sort_order: {
      label: '排序',
      inputProps: {
        required: false,
        placeholder: '请输入排序 如：50'
      }
    },
    is_hot: {
      label: '热门',
      description: '是否热门 展示到热门列表',
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        return (
          <div>
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <div className="space-y-1 leading-none">
                <AutoFormLabel label={props.fieldConfigItem.label || ''}
                               isRequired={props.fieldConfigItem.inputProps?.required || false}/>
              </div>
              <FormControl>
                <Switch
                  checked={props.field.value}
                  onCheckedChange={props.field.onChange}
                  {...props.fieldProps}
                />
              </FormControl>
            </FormItem>
            <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
          </div>
        )
      },
    },
    status: {
      label: '状态',
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        return (
          <div>
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <div className="space-y-1 leading-none">
                <AutoFormLabel label={props.fieldConfigItem.label || ''}
                               isRequired={props.fieldConfigItem.inputProps?.required || false}/>
              </div>
              <FormControl>
                <Switch
                  checked={props.field.value}
                  onCheckedChange={props.field.onChange}
                  {...props.fieldProps}
                />
              </FormControl>
            </FormItem>
            <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
          </div>
        )
      },
    }
  }
}