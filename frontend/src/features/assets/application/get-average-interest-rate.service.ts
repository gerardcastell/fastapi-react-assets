import type { AverageInterestRateEntity } from "../domain/entities/average-interest-rate.entity";
import type { AssetsListRepository } from "../domain/repository/assets-list.repository";

export class GetAverageInterestRateService {
  private readonly assetsListRepository: AssetsListRepository;

  constructor(assetsListRepository: AssetsListRepository) {
    this.assetsListRepository = assetsListRepository;
  }

  async execute(): Promise<AverageInterestRateEntity> {
    return this.assetsListRepository.getAverageInterestRate();
  }
}
