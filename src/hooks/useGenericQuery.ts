import { useQuery } from "@tanstack/react-query";
import { getToken } from "./auth";
import { apiClient } from "@/config/apiClient";


export const useGenericQuery = (resource: string) => {
    const token = getToken();

    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            return await apiClient(`/${resource}`, {
                method: "GET",
                authToken: token,
            });
        },
    });
};
