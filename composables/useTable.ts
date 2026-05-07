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
      sortable: true,
    },
    {
      name: "Role",
      slug: "role",
    },
    {
      name: "Created At",
      slug: "createdAt",
      sortable: true,
    },
  ];

  const tableBody = computed(() => {
    return toValue(users).map(user => {
      return tableHead.map(head => ({
        name:
          head.slug === "createdAt"
            ? new Date(user[head.slug as keyof User]).toLocaleDateString()
            : user[head.slug as keyof User],
        slug: head.slug,
      }));
    });
  });

  return {
    tableHead,
    tableBody,
  };
};
