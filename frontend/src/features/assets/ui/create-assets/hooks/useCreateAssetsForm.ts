import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  assetsFormSchema,
  type AssetsFormSchemaType,
} from "../components/schemas";
import { useCreateAssets } from "./useCreateAssets";
export const useCreateAssetsForm = () => {
  const { createAssets, isPending } = useCreateAssets();
  const { handleSubmit, control } = useForm<AssetsFormSchemaType>({
    resolver: zodResolver(assetsFormSchema),
    defaultValues: {
      assets: [{ id: "", interestRate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
  });

  const handleSubmitForm = (data: AssetsFormSchemaType) => {
    createAssets(
      data.assets.map((asset) => ({
        id: asset.id,
        interestRate: Number(asset.interestRate),
      })),
    );
  };

  const handleAddAsset = () => {
    append({ id: "", interestRate: "" });
  };
  return {
    handleSubmit,
    control,
    fields,
    append,
    remove,
    handleSubmitForm,
    handleAddAsset,
    isPending,
  };
};
