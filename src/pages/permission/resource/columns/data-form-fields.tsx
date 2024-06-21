import {AutoFormInputComponentProps, FieldConfig} from "@/components/custom/auto-form/types.ts";
import AutoFormInput from "@/components/custom/auto-form/fields/input.tsx";
import {Button} from "@/components/custom/button.tsx";
import {z} from "zod";
import AutoFormSelect from "@/components/custom/auto-form/fields/select.tsx";
import {FormControl, FormItem} from "@/components/ui/form.tsx";
import AutoFormLabel from "@/components/custom/auto-form/common/label.tsx";
import AutoFormTooltip from "@/components/custom/auto-form/common/tooltip.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {icons} from "lucide-react";
import Icon from "@/components/custom/icon.tsx";

interface FieldConfigProps {
  onOpenIcon: () => void
}

export default function FieldConfigForm({...props}: FieldConfigProps): FieldConfig<any> {
  return {
    name: {
      label: '名称',
      description: '如：系统管理，增删改查',
      inputProps: {
        required: true,
        placeholder: "请输入菜单或操作名称",
      },
    },
    parent_id: {
      label: '父级',
      inputProps: {
        required: true,
        placeholder: '请选择父级',
      },
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        props.isRequired = false
        return <AutoFormInput {...props} />
      },
    },
    icon: {
      label: '图标',
      inputProps: {
        required: false,
        placeholder: '请点击选择图标'
      },
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        props.isRequired = false
        console.log(props.field.value)
        return (
          <div className={'relative'}>
            <AutoFormInput {...props} />
            {props.field.value &&
              <div className={'flex flex-row items-center justify-center w-[40px] h-[40px] absolute bottom-0 right-0 z-10'}>
                <Icon size={18} name={props.field.value as (keyof typeof icons)}/>
              </div>}
          </div>
        )
      },
      renderParent: ({children}) => (
        <div className="flex items-end gap-3">
          <div className="flex-1">
            {children}
          </div>
          <div>
            <Button type="button" onClick={props.onOpenIcon}>选择图标</Button>
          </div>
        </div>
      ),
    },
    desc: {
      label: '描述',
      inputProps: {
        placeholder: '请输入描述'
      }
    },
    alias: {
      label: '别名',
      description: "以冒号分隔，如：admin:index",
      inputProps: {
        required: true,
        placeholder: '请输入别名'
      }
    },
    b_url: {
      label: '后端地址',
      description: '请求接口地址，如：/backend/admin/index',
      inputProps: {
        required: true,
        placeholder: '请输入后端地址'
      }
    },
    f_url: {
      label: '前端地址',
      description: '页面访问地址，如：/permission/resource',
      inputProps: {
        required: true,
        placeholder: '请输入前端地址',
      }
    },
    menu_type: {
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        props.label = '资源类型'
        const values = z.array(z.object({
          label: z.string(),
          value: z.number()
        })).default([
          {label: '模块', value: 1},
          {label: '操作', value: 2},
        ])
        return <AutoFormSelect {...props} zodItem={values as unknown as z.ZodAny}/>
      },
    },
    sort_order: {
      label: '排序',
      fieldType: 'number'
    },
    _status: {
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        props.label = '状态'
        return (
          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
            <div className="space-y-1 leading-none">
              <AutoFormLabel label={props.label}
                             isRequired={props.isRequired}/>
              <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
            </div>
            <FormControl>
              <Switch
                checked={props.field.value}
                onCheckedChange={props.field.onChange}
                {...props.fieldProps}
              />
            </FormControl>
          </FormItem>
        )
      },
    }
  }
}