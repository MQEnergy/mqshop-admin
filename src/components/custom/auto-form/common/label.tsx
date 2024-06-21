import { FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {ReactNode} from "react";

function AutoFormLabel({
  icon,
  label,
  isRequired,
  className,
}: {
  icon?: ReactNode;
  label: string;
  isRequired: boolean;
  className?: string;
}) {
  return (
    <>
      <FormLabel className={cn('flex flex-row items-center', className)}>
        {icon} {label}
        {isRequired && <span className="text-destructive"> *</span>}
      </FormLabel>
    </>
  );
}

export default AutoFormLabel;
