import { useMemo } from "react";
import { useNavigate } from "react-router";
import { HttpClient } from "../../../../../shared/external-lib/axios";
import {
  useMutation,
  useQueryClient,
} from "../../../../../shared/external-lib/react-query";
import { toast } from "../../../../../shared/external-lib/react-toastify";
import { CreateAssetsListService } from "../../../application/create-assets-list.service";
import { AssetsListApiRepository } from "../../../infrastructure/repositories/assets-list-api.repository";

export const useCreateAssets = () => {
  const navigate = useNavigate();
  const createAssetsListService = useMemo(
    () =>
      new CreateAssetsListService(
        new AssetsListApiRepository(new HttpClient()),
      ),
    [],
  );
  const queryClient = useQueryClient();
  const { mutate: createAssets, isPending } = useMutation({
    mutationFn: (assets: { id: string; interestRate: number }[]) => {
      return createAssetsListService.execute(assets);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interest-rate"] });
      toast.success("Assets created successfully");
      navigate("/");
    },
    onError: (e) => {
      toast.error(`Failed to create assets: ${e.message}`);
      console.error(e);
    },
    throwOnError: false,
  });

  return {
    createAssets,
    isPending,
  };
};
