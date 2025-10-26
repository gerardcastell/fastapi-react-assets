import { AssetEntity } from "../domain/entities/asset.entity";
import type { AssetsListRepository } from "../domain/repository/assets-list.repository";

export class CreateAssetsListService {
  private readonly assetsListRepository: AssetsListRepository;

  constructor(assetsListRepository: AssetsListRepository) {
    this.assetsListRepository = assetsListRepository;
  }

  async execute(assets: { id: string; interestRate: number }[]): Promise<void> {
    await this.assetsListRepository.create(
      assets.map(
        (asset) =>
          new AssetEntity({
            id: asset.id,
            interestRate: asset.interestRate,
          }),
      ),
    );
  }
}
