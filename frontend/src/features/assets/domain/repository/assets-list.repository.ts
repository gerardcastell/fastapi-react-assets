import type { AssetEntity } from "../entities/asset.entity";
import type { AverageInterestRateEntity } from "../entities/average-interest-rate.entity";

export interface AssetsListRepository {
  create(assetsList: AssetEntity[]): Promise<void>;
  getAverageInterestRate(): Promise<AverageInterestRateEntity | null>;
}
