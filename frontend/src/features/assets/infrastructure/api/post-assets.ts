import { z } from "zod";
import type { IHttpClient } from "../../../../shared/http/client.interface";

export const postAssetRequestDtoSchema = z.object({
  assets: z.array(
    z.object({
      id: z.string(),
      interest_rate: z.number(),
    }),
  ),
});

export type PostAssetRequestDtoT = z.infer<typeof postAssetRequestDtoSchema>;

export const postAssets = async (
  httpClient: IHttpClient,
  body: PostAssetRequestDtoT,
): Promise<void> => {
  postAssetRequestDtoSchema.parse(body);
  await httpClient.post<void>("/asset", {
    body,
  });
};
