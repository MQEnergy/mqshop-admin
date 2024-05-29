import { FieldValues, UseFormWatch } from "react-hook-form";
import { Dependency, DependencyType, EnumValues } from "./types";
import * as z from "zod";

export default function resolveDependencies<
  SchemaType extends z.infer<z.ZodObject<any, any>>,
>(
  dependencies: Dependency<SchemaType>[],
  currentFieldName: keyof SchemaType,
  watch: UseFormWatch<FieldValues>,
) {
  let isDisabled = false;
  let isHidden = false;
  let isRequired = false;
  let overrideOptions: EnumValues | undefined;

  const currentFieldValue = watch(currentFieldName as string);

  const currentFieldDependencies = dependencies.filter(
    (dependency) => dependency.targetField === currentFieldName,
  );
  for (const dependency of currentFieldDependencies) {
    const watchedValue = watch(dependency.sourceField as string);

    const conditionMet = dependency.when(watchedValue, currentFieldValue);

    switch (dependency.type) {
      case DependencyType.DISABLES:
        if (conditionMet) {
          isDisabled = true;
        }
        break;
      case DependencyType.REQUIRES:
        if (conditionMet) {
          isRequired = true;
        }
        break;
      case DependencyType.HIDES:
        if (conditionMet) {
          isHidden = true;
        }
        break;
      case DependencyType.SETS_OPTIONS:
        if (conditionMet) {
          overrideOptions = dependency.options;
        }
        break;
    }
  }

  return {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  };
}
