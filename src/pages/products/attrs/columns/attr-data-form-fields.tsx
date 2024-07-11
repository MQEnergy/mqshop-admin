import {AutoFormInputComponentProps, FieldConfig} from "@/components/custom/auto-form/types.ts";
import {FormControl, FormItem} from "@/components/ui/form.tsx";
import AutoFormLabel from "@/components/custom/auto-form/common/label.tsx";
import {ColumnSchemaType, SelectSchemaType} from "../data/schema.ts";
import AutoFormSelect from "@/components/custom/auto-form/fields/select.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {z} from "zod";
import AutoFormTooltip from "@/components/custom/auto-form/common/tooltip.tsx";

interface FieldConfigProps {
  resources: ColumnSchemaType[];
}

export default function AttrFieldConfigForm({resources}: FieldConfigProps): FieldConfig<any> {
  return {
    attr_name: {
      label: '属性名称',
      description: '如：尺寸、颜色',
      inputProps: {
        required: true,
        placeholder: "请输入属性名称",
      },
    },
    attr_type: {
      label: '属性类型',
      description: '说明：属性是配置在商品sku中的，参数是展示在商品详情中',
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        const handleClick = (value: string) => {
          props.form.setValue('attr_type', value)
        }
        return (
          <FormItem>
            <AutoFormLabel label={props.fieldConfigItem.label || ''}
                           isRequired={props.fieldConfigItem.inputProps?.required || false}/>
            <FormControl>
              <Tabs defaultValue={String(props.field.value)} onValueChange={handleClick}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="1">属性</TabsTrigger>
                  <TabsTrigger value="2">参数</TabsTrigger>
                </TabsList>
              </Tabs>
            </FormControl>
            <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
          </FormItem>
        )
      }
    },
    cate_id: {
      label: '属性分类',
      inputProps: {
        required: true,
        placeholder: "请选择属性分类",
      },
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        const _selectItems: SelectSchemaType = resources?.map((item: ColumnSchemaType) => {
          return {
            label: item.cate_name,
            value: item.id
          }
        }) || []
        const parentValues = z.array(z.object({
          label: z.string(),
          value: z.number()
        })).default(_selectItems)
        props.zodItem = parentValues as unknown as z.ZodAny
        return <AutoFormSelect {...props} />
      },
    },
    input_type: {
      label: '录入方式',
      description: '说明：点击从可选值中选择按钮，需要填写下面的可选值列表',
      inputProps: {
        required: true,
        placeholder: "",
      },
      fieldType: ({...props}: AutoFormInputComponentProps) => {
        const handleClick = (value: string) => {
          props.form.setValue('input_type', value)
        }
        return (
          <FormItem>
            <AutoFormLabel label={props.fieldConfigItem.label || ''}
                           isRequired={props.fieldConfigItem.inputProps?.required || false}/>
            <FormControl>
              <Tabs defaultValue={String(props.field.value)} onValueChange={handleClick}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="1">手工录入</TabsTrigger>
                  <TabsTrigger value="2">从可选值中选择</TabsTrigger>
                </TabsList>
              </Tabs>
            </FormControl>
            <AutoFormTooltip fieldConfigItem={props.fieldConfigItem}/>
          </FormItem>
        )
      }
    },
    attr_value: {
      label: '可选值列表',
      description: ' 如：黑色,红色,白色,粉色',
      inputProps: {
        required: false,
        placeholder: "请输入可选值 注意：以英文逗号相隔",
      },
      fieldType: 'textarea',
    },
    sort_order: {
      label: '排序',
      fieldType: 'number'
    },
  }
}