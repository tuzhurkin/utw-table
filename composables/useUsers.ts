import type { SortBy, SortDirection } from "~/types/table";
import type { User, Filter, Filters } from "~/types/table";

export function useUsers(rawUsers: User[]) {
  const route = useRoute();
  const router = useRouter();

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

  // query params
  type Query = {
    page?: number;
    perPage?: number;
    sort?: `${SortBy}:${SortDirection}` | "";
    role?: string;
    search?: string;
  };

  const defaultQuery: Query = {
    page: defaultPage,
    perPage: defaultPerPage,
    sort: "",
    role: "",
    search: "",
  };

  const queryParams = computed<Query>(() => ({
    page: page.value || defaultPage,
    perPage: perPage.value || defaultPerPage,
    sort: sortBy.value
      ? (`${sortBy.value}:${sortDirection.value}` as `${SortBy}:${SortDirection}`)
      : "",
    role: String(filters.value.role) || "",
    search: String(filters.value.name) || "",
  }));

  const setQueryParams = (params: Query) => {
    const query: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;
      if (value === defaultQuery[key as keyof Query]) return;
      query[key] = String(value);
    });

    router.push({ query });
  };

  watch(queryParams, (newParams: Query) => {
    setQueryParams(newParams);
  });

  const loadQueryParams = () => {
    const query = route.query;

    if (query.page) {
      const pageParam = parseInt(String(query.page), 10);
      if (!isNaN(pageParam) && pageParam > 0) {
        page.value = pageParam;
      } else {
        page.value = defaultPage;
      }
    }
    if (query.perPage) {
      const perPageParam = parseInt(String(query.perPage), 10);
      if (!isNaN(perPageParam) && perPageParam > 0) {
        perPage.value = perPageParam;
      } else {
        perPage.value = defaultPerPage;
      }
    }
    if (query.sort) {
      const sortParam = String(query.sort);
      if (sortParam) {
        const [sortByParam, sortDirectionParam] = sortParam.split(":");
        if (sortByParam && ["age", "createdAt"].includes(sortByParam)) {
          sortBy.value = sortByParam as SortBy;
        } else {
          sortBy.value = "";
        }
        if (sortDirectionParam && ["asc", "desc"].includes(sortDirectionParam)) {
          sortDirection.value = sortDirectionParam as SortDirection;
        } else {
          sortDirection.value = "asc";
        }
      }
    }
    if (query.role) {
      const roleParam = String(query.role);
      if (roleParam && ["admin", "manager", "user"].includes(roleParam)) {
        filtersData.value.find(f => f.idx === "role")!.value = roleParam;
      }
    }
    if (query.search) {
      const searchParam = String(query.search);
      if (searchParam) {
        filtersData.value.find(f => f.idx === "name")!.value = searchParam;
      }
    }
  };

  loadQueryParams();

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
    queryParams,
  };
}
