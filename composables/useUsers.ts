import type { LocationQuery } from "vue-router";
import type { SortBy, SortDirection, User, Filter, Filters, Query } from "~/types/table";
import { normalizeFilterOptions, isOneOf } from "~/utils";
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  PER_PAGE_OPTIONS,
  ROLE_OPTIONS,
  SEARCH_OPTIONS,
  SORT_BY_OPTIONS,
  SORT_DIRECTION,
  USER_FILTER_OPTIONS,
} from "~/constants/options";
import { useQuery } from "~/composables/useQuery";

export function useUsers(rawUsers: User[]) {
  // users with preserved date on server and client sides
  const users = useState<User[]>("users", () =>
    rawUsers.map((user, i) => ({
      ...user,
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    }))
  );

  // pagination
  const page = ref(DEFAULT_PAGE);
  const perPage = computed<number>(() => (filters.value.perPage as number) || DEFAULT_PER_PAGE);
  const total = computed(() => filteredUsers.value.length);
  const totalPages = computed(() => Math.ceil(total.value / perPage.value));
  const isDataEmpty = computed(() => total.value === 0);

  const setPage = (value: number) => {
    page.value = value;
  };
  const resetPage = () => {
    page.value = DEFAULT_PAGE;
  };

  // filtered users
  const filtersData = ref<Filter[]>([
    {
      value: "",
      idx: "name",
      name: "name",
      placeholder: "Search by name or email",
      filterType: "search",
      searchFields: SEARCH_OPTIONS,
    },
    {
      value: "",
      idx: "role",
      name: "role",
      placeholder: "Select role",
      filterType: "select",
      options: normalizeFilterOptions(ROLE_OPTIONS),
    },
    {
      value: DEFAULT_PER_PAGE,
      idx: "perPage",
      name: "perPage",
      placeholder: `Show ${DEFAULT_PER_PAGE}`,
      filterType: "select",
      options: normalizeFilterOptions(PER_PAGE_OPTIONS),
      triggerText: "Show",
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
        if (!isOneOf(USER_FILTER_OPTIONS, key)) return true;

        const filterItem = filtersData.value.find(f => f.idx === key);

        if (filterItem?.filterType === "select") {
          return String(user[key as keyof User] || "") === String(value);
        }

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

  // query params state
  const queryParams = computed<Query>(() => ({
    page: page.value || DEFAULT_PAGE,
    perPage: perPage.value || DEFAULT_PER_PAGE,
    sort: sortBy.value
      ? (`${sortBy.value}:${sortDirection.value}` as `${SortBy}:${SortDirection}`)
      : "",
    role: String(filters.value.role) || "",
    search: String(filters.value.name) || "",
  }));

  const restoreFromQuery = (query: LocationQuery) => {
    const [sortByParam = "", sortDirectionParam = ""] = String(query.sort || "").split(":");
    sortBy.value = isOneOf(SORT_BY_OPTIONS, sortByParam) ? (sortByParam as SortBy) : "";
    sortDirection.value = isOneOf(SORT_DIRECTION, sortDirectionParam)
      ? (sortDirectionParam as SortDirection)
      : "asc";

    const roleParam = String(query.role || "");
    filtersData.value.find(f => f.idx === "role")!.value = isOneOf(ROLE_OPTIONS, roleParam)
      ? roleParam
      : "";

    filtersData.value.find(f => f.idx === "name")!.value = String(query.search || "");

    const perPageParam = parseInt(String(query.perPage), 10);
    filtersData.value.find(f => f.idx === "perPage")!.value =
      !isNaN(perPageParam) && isOneOf(PER_PAGE_OPTIONS, perPageParam)
        ? perPageParam
        : DEFAULT_PER_PAGE;

    const pageParam = parseInt(String(query.page), 10);
    page.value =
      !isNaN(pageParam) && pageParam > 0 && pageParam <= totalPages.value
        ? pageParam
        : DEFAULT_PAGE;
  };

  const { isQueryLoaded } = useQuery(queryParams, restoreFromQuery);

  watch(filters, () => {
    if (!isQueryLoaded.value) return;
    resetPage();
  });

  return {
    page,
    perPage,
    total,
    totalPages,
    isDataEmpty,
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
