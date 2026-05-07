import type { BaseSelectValue, BaseSelectOption } from "./base";

export type SortBy = "age" | "createdAt";
export type SortDirection = "asc" | "desc";

export type TableCell = {
  name: string | number;
  slug: string;
  sortable?: boolean;
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

export type Filter = {
  value: BaseSelectValue;
  idx: string;
  name: string;
  placeholder: string;
  filterType: "search" | "select";
  searchFields?: string[];
  options?: BaseSelectOption[];
  triggerText?: string;
};

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
