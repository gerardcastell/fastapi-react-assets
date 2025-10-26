import { useMemo } from "react";
import { HttpClient } from "../../../../../shared/external-lib/axios";
import { useMutation } from "../../../../../shared/external-lib/react-query";
import { toast } from "../../../../../shared/external-lib/react-toastify";
import { CreateAssetsListService } from "../../../application/create-assets-list.service";
import { AssetsListApiRepository } from "../../../infrastructure/repositories/assets-list-api.repository";

export const useCreateAssets = () => {
  const createAssetsListService = useMemo(
    () =>
      new CreateAssetsListService(
        new AssetsListApiRepository(new HttpClient()),
      ),
    [],
  );
  const { mutate: createAssets, isPending } = useMutation({
    mutationFn: (assets: { id: string; interestRate: number }[]) => {
      return createAssetsListService.execute(assets);
    },
    onSuccess: () => {
      toast.success("Assets created successfully");
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
