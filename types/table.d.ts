export type TableCell = {
  name: string | number;
  slug: string;
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
