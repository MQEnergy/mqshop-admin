import {AutoFormInputComponentProps, FieldConfig} from "@/components/custom/auto-form/types.ts";
import {FormControl, FormItem} from "@/components/ui/form.tsx";
import AutoFormLabel from "@/components/custom/auto-form/common/label.tsx";
import AutoFormTooltip from "@/components/custom/auto-form/common/tooltip.tsx";
import {Switch} from "@/components/ui/switch.tsx";

interface FieldConfigProps {
}

export default function FieldConfigForm({}: FieldConfigProps): FieldConfig<any> {
  return {
    cate_name: {
      label: '名称',
      description: '如：大小',
      inputProps: {
        required: true,
        placeholder: "请输入分类名称",
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