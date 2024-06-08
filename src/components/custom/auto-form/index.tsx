"use client";
import {Form} from "@/components/ui/form";
import React, {ReactElement} from "react";
import {DefaultValues, useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/custom/button";
import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";

import AutoFormObject from "./fields/object";
import {Dependency, FieldConfig} from "./types";
import {
  ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils";

export function AutoFormSubmit({
                                 children,
                                 className,
                                 loading,
                               }: {
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
}) {
  return (
    <Button type="submit" loading={loading} className={cn('w-[100px]', className)}>
      {children ?? "Submit"}
    </Button>
  );
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
                                                           formSchema,
                                                           values: valuesProp,
                                                           onValuesChange: onValuesChangeProp,
                                                           onParsedValuesChange,
                                                           onSubmit: onSubmitProp,
                                                           fieldConfig,
                                                           children,
                                                           className,
                                                           dependencies,
                                                         }: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: React.ReactNode;
  className?: string;
  dependencies?: Dependency<z.infer<SchemaType>>[];
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  const values = form.watch();
  // valuesString is needed because form.watch() returns a new object every time
  const valuesString = JSON.stringify(values);

  React.useEffect(() => {
    onValuesChangeProp?.(values);
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onParsedValuesChange?.(parsedValues.data);
    }
  }, [valuesString]);

  const handleClick = (e: any) => {
    if (e.target.type === 'submit') {
      form.handleSubmit(onSubmit)(e)
    }
  }
  const renderChildWithProps = (child: ReactElement) => {
    return React.cloneElement(child, {onClick: handleClick});
  };
  return (
    <div className={cn("w-full space-y-5", className)}>
      <Form {...form}>
        <AutoFormObject
          schema={objectFormSchema}
          form={form}
          dependencies={dependencies}
          fieldConfig={fieldConfig}
        />
        {React.Children.map(children as ReactElement, renderChildWithProps)}
      </Form>
    </div>
  );
}

export default AutoForm;
