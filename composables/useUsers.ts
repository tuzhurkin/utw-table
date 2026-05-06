import type { SortDirection } from "~/types/table";
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

  // filtered users
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

  const filteredUsers = computed<User[]>(() => {
    return users.value.filter((user: User) => {
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

  // sorted users
  const sortBy = ref<string>("");
  const sortDirection = ref<SortDirection>("asc");

  const onSorting = (slug: string) => {
    if (sortBy.value === slug) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortBy.value = slug;
      sortDirection.value = "asc";
    }
  };

  const sortedUsers = computed<User[]>(() => {
    return filteredUsers.value.toSorted((a: User, b: User) => {
      return sortDirection.value === "asc"
        ? a[sortBy.value as keyof User] < b[sortBy.value as keyof User]
          ? -1
          : 1
        : a[sortBy.value as keyof User] > b[sortBy.value as keyof User]
          ? -1
          : 1;
    });
  });

  // paginated users
  const start = computed(() => (page.value - 1) * perPage.value);
  const end = computed(() => start.value + perPage.value);
  const paginatedUsers = computed<User[]>(() => sortedUsers.value.slice(start.value, end.value));

  return {
    page,
    perPage,
    totalPages,
    total,
    filtersData,
    filters,
    filteredUsers,
    sortedUsers,
    paginatedUsers,
    sortBy,
    sortDirection,
    onSorting,
    setPage,
    setPerPage,
  };
}
