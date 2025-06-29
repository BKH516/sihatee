import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getToken } from "./auth";
import { apiClient } from "@/config/apiClient";

export const useGenericCrud = (resource: string) => {
  const queryClient = useQueryClient();
  const token = getToken();

  const addItem = useMutation({
    mutationFn: async (data: any) => {
      return await apiClient(`/${resource}`, {
        method: "POST",
        body: JSON.stringify(data),
        authToken: token,
      });
    },
    onSuccess: () => {
      toast.success("تمت الإضافة بنجاح");
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  const updateItem = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiClient(`/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        authToken: token,
      });
    },
    onSuccess: () => {
      toast.success("تم التحديث بنجاح ");
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: number) => {
      return await apiClient(`/${resource}/${id}`, {
        method: "DELETE",
        authToken: token,
      });
    },
    onSuccess: () => {
      toast.success("تم الحذف بنجاح ");
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });

  return {
    addItem,
    updateItem,
    deleteItem,
  };
};
