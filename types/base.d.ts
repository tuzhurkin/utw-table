// button types
export type BaseButtonType = "primary" | "primary yellow" | "texted" | "icony";
export type BaseButton = {
  tag?: string;
  tagType?: string;
  type?: BaseButtonType;
  text?: string | number | null;
  to?: string | object | null;
  href?: string | null;
  target?: string | null;
  disabled?: boolean;
  iconBefore?: string | null;
  icon?: string | null;
};

// input types
export type BaseInputValue = string | number | null;
export type BaseInputType = "text" | "number";
export type BaseInput = {
  idx: string;
  name: string;
  type: BaseInputType;
  modelValue: BaseInputValue;
  placeholder: string;
  autocomplete: string;
  disabled: boolean;
  min?: number;
  max?: number;
};

// search types
export type BaseSearch = {
  idx: string;
  name: string;
  type: BaseInputType;
  modelValue: BaseInputValue;
  placeholder: string;
  autocomplete: string;
  disabled: boolean;
};

// select types
export type BaseSelectValue = string | number | null;
export type BaseSelectOption = {
  value: BaseSelectValue;
  text: string;
};
export type OptionValue = BaseSelectOption["value"];
export type BaseSelect = {
  idx: string;
  name: string;
  modelValue: BaseSelectValue;
  placeholder: string;
  disabled: boolean;
  options: BaseSelectOption[];
  focused: boolean;
  triggerText: string;
};
