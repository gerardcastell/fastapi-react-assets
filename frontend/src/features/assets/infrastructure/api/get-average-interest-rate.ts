import { z } from "zod";
import type { IHttpClient } from "../../../../shared/http/client.interface";

export const getAverageInterestRateResponseDtoSchema = z.object({
  average_interest_rate: z.number().nullable(),
});

export type GetAverageInterestRateResponseDtoT = z.infer<
  typeof getAverageInterestRateResponseDtoSchema
>;

export const getAverageInterestRate = async (
  httpClient: IHttpClient,
): Promise<GetAverageInterestRateResponseDtoT> => {
  const response =
    await httpClient.get<GetAverageInterestRateResponseDtoT>("/interest_rate");
  getAverageInterestRateResponseDtoSchema.parse(response);
  return response;
};
