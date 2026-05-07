import type { BaseSelectOption, BaseSelectValue } from "~/types/base";

const isOptionObject = (option: BaseSelectOption | BaseSelectValue): option is BaseSelectOption =>
  typeof option === "object";

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export const normalizeFilterOptions = (
  options: (BaseSelectOption | BaseSelectValue)[]
): BaseSelectOption[] =>
  options.map(option => {
    if (isOptionObject(option)) return option;
    return {
      value: option,
      text: typeof option === "string" ? capitalize(option) : option,
    };
  });

export const isOneOf = <T extends BaseSelectValue[]>(
  options: T,
  value: unknown
): value is T[number] => {
  return options.includes(value as T[number]);
};
