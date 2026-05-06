import type { TableCell, User } from "~/types/table";

export const useTable = (users: MaybeRefOrGetter<User[]>) => {
  const tableHead: TableCell[] = [
    {
      name: "Name",
      slug: "name",
    },
    {
      name: "Email",
      slug: "email",
    },
    {
      name: "Age",
      slug: "age",
    },
    {
      name: "Role",
      slug: "role",
    },
    {
      name: "Created At",
      slug: "createdAt",
    },
  ];

  const tableBody = computed(() => {
    return toValue(users).map(user => {
      return tableHead.map(head => ({
        name: user[head.slug as keyof User],
        slug: head.slug,
      }));
    });
  });

  return {
    tableHead,
    tableBody,
  };
};
