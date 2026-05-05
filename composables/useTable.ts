import type { TableCell, User } from "~/types/table";

export const useTable = (users: User[]) => {
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

  // users with preserved date on server and client sides
  const stableUsers = useState<User[]>("table-users", () =>
    users.map((user, i) => ({
      ...user,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    }))
  );

  const tableBody = computed(() => {
    return stableUsers.value.map(user => {
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
