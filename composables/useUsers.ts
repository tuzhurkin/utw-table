import type { User, Filter, Filters } from "~/types/table";

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
  const total = computed(() => filteredUsers.value.length);
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

  // filters
  const filtersData = ref<Filter[]>([
    {
      value: "",
      idx: "name",
      name: "name",
      placeholder: "Search by name",
      filterType: "search",
    },
    {
      value: "",
      idx: "role",
      name: "role",
      placeholder: "Select role",
      filterType: "select",
      options: [
        {
          value: "admin",
          text: "Admin",
        },
        {
          value: "manager",
          text: "Manager",
        },
        {
          value: "user",
          text: "User",
        },
      ],
    },
  ]);

  const filters = computed<Filters>(() => {
    return filtersData.value.reduce((acc: Filters, filter) => {
      acc[filter.idx] = filter.value;
      return acc;
    }, {} as Filters);
  });

  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      return Object.entries(filters.value).every(([key, value]) => {
        if (!value) return true;

        // if filter type is select
        const filterItem = filtersData.value.find(f => f.idx === key);
        if (filterItem && filterItem.filterType === "select") {
          return String(user[key as keyof User] || "") === String(value);
        }

        // by default, filter users by checking substring
        return String(user[key as keyof User] || "")
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });
  });

  watch(filters, () => {
    resetPage();
  });

  const start = computed(() => (page.value - 1) * perPage.value);
  const end = computed(() => start.value + perPage.value);
  const paginatedUsers = computed(() => filteredUsers.value.slice(start.value, end.value));

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
    totalPages,
    total,
    filtersData,
    filters,
    filteredUsers,
    paginatedUsers,
    setPage,
    setPerPage,
  };
}
