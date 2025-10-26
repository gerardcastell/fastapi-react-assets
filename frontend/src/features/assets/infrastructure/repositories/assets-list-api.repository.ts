import type { IHttpClient } from "../../../../shared/http/client.interface";
import type { AssetEntity } from "../../domain/entities/asset.entity";
import { AverageInterestRateEntity } from "../../domain/entities/average-interest-rate.entity";
import type { AssetsListRepository } from "../../domain/repository/assets-list.repository";
import {
  getAverageInterestRate,
  getAverageInterestRateResponseDtoSchema,
} from "../api/get-average-interest-rate";
import { postAssets } from "../api/post-assets";

export class AssetsListApiRepository implements AssetsListRepository {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async create(assetsList: AssetEntity[]): Promise<void> {
    await postAssets(this.httpClient, {
      assets: assetsList.map((asset) => ({
        id: asset.id,
        interest_rate: asset.interestRate,
      })),
    });
  }

  async getAverageInterestRate(): Promise<AverageInterestRateEntity | null> {
    const response = await getAverageInterestRate(this.httpClient);
    if (response.average_interest_rate === null) {
      return null;
    }
    getAverageInterestRateResponseDtoSchema.parse(response);
    return new AverageInterestRateEntity({
      value: response.average_interest_rate,
    });
  }
}
