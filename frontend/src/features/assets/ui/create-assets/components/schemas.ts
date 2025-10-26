import { z } from "zod";

export const assetSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  interestRate: z
    .string()
    .min(1, { message: "Interest rate is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Interest rate must be a valid number",
    }),
});

export const assetsFormSchema = z.object({
  assets: z
    .array(assetSchema)
    .min(1, { message: "At least one asset is required" }),
});

export type AssetFormType = z.infer<typeof assetSchema>;
export type AssetsFormSchemaType = z.infer<typeof assetsFormSchema>;
