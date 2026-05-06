import type { User } from "~/types/table";

export function useUsers(rawUsers: User[]) {
  // users with preserved date on server and client sides
  const users = useState<User[]>("users", () =>
    rawUsers.map((user, i) => ({
      ...user,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    }))
  );

  // pagination
  const defaultPage = 1;
  const defaultPerPage = 10;
  const page = ref(defaultPage);
  const perPage = ref(defaultPerPage);
  const total = computed(() => users.value.length);
  const totalPages = computed(() => Math.ceil(total.value / perPage.value));
  const setPage = (value: number) => {
    page.value = value;
  };
  const resetPage = () => {
    page.value = defaultPage;
  };
  const setPerPage = (value: number) => {
    perPage.value = value;
    resetPage();
  };
  const resetPerPage = () => {
    perPage.value = defaultPerPage;
    resetPage();
  };

  const start = computed(() => (page.value - 1) * perPage.value);
  const end = computed(() => start.value + perPage.value);
  const paginatedUsers = computed(() => users.value.slice(start.value, end.value));

  // TODO:
  // - filteredUsers
  // - sortedUsers
  // - paginatedUsers
  // - totalPages
  // const paginatedUsers = null;
  // const totalPages = null;

  return {
    page,
    perPage,
    paginatedUsers,
    totalPages,
    total,
    setPage,
    setPerPage,
  };
}
