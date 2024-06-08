import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import {getDefaultValueInZodStack} from "../utils";

export default function AutoFormSelect({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const baseValues = getDefaultValueInZodStack(zodItem)
  let values: {label: string, value: number}[] = [];
  values = baseValues?.map((item: any) => {
    return {
      label: item?.label || '',
      value: parseInt(item.value) || 0
    };
  });

  function findItem(value: any) {
    return values.find((item) => item.value === value);
  }

  return (
    <FormItem>
      <AutoFormLabel
        label={fieldConfigItem?.label || label}
        isRequired={isRequired}
      />
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...fieldProps}
        >
          <SelectTrigger className={fieldProps.className}>
            <SelectValue placeholder={fieldConfigItem.inputProps?.placeholder} >
              {field.value ? findItem(field.value)?.label : "Select an option"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {values.map((item) => (
              <SelectItem value={item.value.toString()} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
