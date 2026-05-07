import type { LocationQuery } from "vue-router";
import type { Query } from "~/types/table";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "~/constants/options";

const DEFAULT_QUERY: Query = {
  page: DEFAULT_PAGE,
  perPage: DEFAULT_PER_PAGE,
  sort: "",
  role: "",
  search: "",
};

const buildQuery = (params: Query): Record<string, string> => {
  const query: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (value === DEFAULT_QUERY[key as keyof Query]) return;
    query[key] = String(value);
  });

  return query;
};

export const useQuery = (
  queryParams: ComputedRef<Query>,
  restoreFromQuery: (query: LocationQuery) => void
) => {
  const route = useRoute();
  const router = useRouter();

  const isQueryLoaded = ref(false);

  const loadQueryParams = () => {
    isQueryLoaded.value = false;
    restoreFromQuery(route.query);
    nextTick(() => {
      isQueryLoaded.value = true;
      router.replace({ query: buildQuery(queryParams.value) });
    });
  };

  loadQueryParams();
  watch(
    () => route.query,
    () => {
      loadQueryParams();
    }
  );
  watch(queryParams, newParams => {
    if (!isQueryLoaded.value) return;
    router.push({ query: buildQuery(newParams) });
  });

  return {
    isQueryLoaded: readonly(isQueryLoaded),
  };
};
