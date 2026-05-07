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
  const perPage = computed<number>(() => (filters.value.perPage as number) || defaultPerPage);
  const total = computed(() => filteredUsers.value.length);
  const totalPages = computed(() => Math.ceil(total.value / perPage.value));

  const setPage = (value: number) => {
    page.value = value;
  };
  const resetPage = () => {
    page.value = defaultPage;
  };

  // filtered users
  const filtersData = ref<Filter[]>([
    {
      value: "",
      idx: "name",
      name: "name",
      placeholder: "Search by name or email",
      filterType: "search",
      searchFields: ["name", "email"],
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
    {
      value: defaultPerPage,
      idx: "perPage",
      name: "perPage",
      placeholder: `Show ${defaultPerPage}`,
      filterType: "select",
      options: [
        { value: 10, text: 10 },
        { value: 15, text: 15 },
        { value: 20, text: 20 },
      ],
      triggerText: "Show",
    },
  ]);

  const filters = computed<Filters>(() => {
    return filtersData.value.reduce((acc: Filters, filter) => {
      acc[filter.idx] = filter.value;
      return acc;
    }, {} as Filters);
  });

  const USER_FILTER_KEYS = new Set<keyof User>(["name", "email", "age", "role", "createdAt"]);

  const filteredUsers = computed<User[]>(() => {
    return users.value.filter((user: User) => {
      return Object.entries(filters.value).every(([key, value]) => {
        if (!value) return true;

        // skip filters that are not user data fields (perPage)
        if (!USER_FILTER_KEYS.has(key as keyof User)) return true;

        const filterItem = filtersData.value.find(f => f.idx === key);

        if (filterItem?.filterType === "select") {
          return String(user[key as keyof User] || "") === String(value);
        }

        // if filter type is search with multiple fields
        const searchQuery = String(value).toLowerCase();
        if (filterItem?.searchFields?.length) {
          return filterItem.searchFields.some(field =>
            String(user[field as keyof User] || "")
              .toLowerCase()
              .includes(searchQuery)
          );
        }

        // if filter type is search with single field
        return String(user[key as keyof User] || "")
          .toLowerCase()
          .includes(searchQuery);
      });
    });
  });

  watch(filters, () => {
    if (!isQueryLoaded) return;
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
    isQueryLoaded = false;
    const query = route.query;

    const [sortByParam = "", sortDirectionParam = ""] = String(query.sort || "").split(":");
    sortBy.value = ["age", "createdAt"].includes(sortByParam) ? (sortByParam as SortBy) : "";
    sortDirection.value = ["asc", "desc"].includes(sortDirectionParam)
      ? (sortDirectionParam as SortDirection)
      : "asc";

    const roleParam = String(query.role || "");
    filtersData.value.find(f => f.idx === "role")!.value = ["admin", "manager", "user"].includes(
      roleParam
    )
      ? roleParam
      : "";

    filtersData.value.find(f => f.idx === "name")!.value = String(query.search || "");

    const perPageParam = parseInt(String(query.perPage), 10);
    filtersData.value.find(f => f.idx === "perPage")!.value =
      !isNaN(perPageParam) && [10, 15, 20].includes(perPageParam) ? perPageParam : defaultPerPage;

    const pageParam = parseInt(String(query.page), 10);
    page.value =
      !isNaN(pageParam) && pageParam > 0 && pageParam <= totalPages.value ? pageParam : defaultPage;

    nextTick(() => {
      isQueryLoaded = true;
    });
  };

  let isQueryLoaded = false;
  loadQueryParams();
  watch(
    () => route.query,
    () => {
      loadQueryParams();
    }
  );

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
    queryParams,
  };
}
