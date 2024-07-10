import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useGetDataSources = (
	value: string,
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">,
) => {
	return useQuery({
		...options,
		queryKey: ["data-sources", value],
		queryFn: async () => {
			const { data } = await api.get<any>(`/fonte-de-dados-${value}`);
			return data;
		},
		enabled: Boolean(value)
	})
}