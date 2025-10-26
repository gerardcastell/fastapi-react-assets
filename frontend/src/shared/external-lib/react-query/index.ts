import type { DefaultOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  },
  mutations: {
    throwOnError: true,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
export {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

// Dev tools
export { ReactQueryDevtools } from "@tanstack/react-query-devtools";
