// button types
export type BaseButton = {
  type?: string;
  text?: string | number | null;
  icon?: string | null;
  disabled?: boolean;
};

// input types
export type BaseInputValue = string | number | null;
export type BaseInputType = "text" | "number";
export type BaseInput = {
  idx: string;
  name: string;
  modelValue: BaseInputValue;
  type?: BaseInputType;
  placeholder?: string;
  disabled?: boolean;
};

// search types
export type BaseSearch = {
  idx: string;
  name: string;
  modelValue: BaseInputValue;
  type?: BaseInputType;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
};

// select types
export type BaseSelectValue = string | number | null;
export type BaseSelectOption = {
  value: BaseSelectValue;
  text: BaseSelectValue;
};
export type OptionValue = BaseSelectOption["value"];
export type BaseSelect = {
  idx: string;
  name: string;
  modelValue: BaseSelectValue;
  options: BaseSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  focused?: boolean;
  triggerText?: string;
  showAllOption?: string | null;
};
