import type { BaseInputValue, BaseSelectValue, BaseSelectOption } from "./base";

export type TableCell = {
  name: string | number;
  slug: string;
  sortable?: boolean;
  colspan?: number;
};

export type TableRow = {
  cells: TableCell[];
  isBody: boolean;
};

export type TableData = {
  head: TableCell[];
  body: TableCell[][];
};

export type Role = "admin" | "manager" | "user";
export type SortBy = "age" | "createdAt";
export type SortDirection = "asc" | "desc";

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: Role;
  createdAt: string;
};

export type Pagination = {
  page: number;
  perPage?: number;
  totalPages: number;
  total: number;
};

type FilterBase = {
  idx: string;
  name: string;
  placeholder?: string;
};

export type SearchFilter = FilterBase & {
  filterType: "search";
  value: BaseInputValue;
  searchFields?: string[];
};

export type SelectFilter = FilterBase & {
  filterType: "select";
  value: BaseSelectValue;
  options: BaseSelectOption[];
  triggerText?: string;
  showAllOption?: string | null;
};

export type Filter = SearchFilter | SelectFilter;

export type Filters = {
  [key: string]: Filter["value"];
};

export type Query = {
  page?: number;
  perPage?: number;
  sort?: `${SortBy}:${SortDirection}` | "";
  role?: string;
  search?: string;
};
