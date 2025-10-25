from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.assets.domain.entities.assets_list import AssetsList
from app.contexts.assets.domain.repositories.assets_list_repository import (
    AssetsListRepository,
)
from app.contexts.assets.domain.services.interest_rate_avg_calculator.service import (
    InterestRateAvgCalculatorService,
)


class SaveAssetsListService:
    def __init__(
        self,
        assets_list_repository: AssetsListRepository,
        interest_rate_avg_calculator_service: InterestRateAvgCalculatorService,
    ):
        self.assets_list_repository = assets_list_repository
        self.interest_rate_avg_calculator_service = interest_rate_avg_calculator_service

    def __call__(self, raw_assets_list: list[dict]) -> AssetsList:
        # Create the asset entities from the raw data
        assets = [Asset(**asset) for asset in raw_assets_list]

        # Calculate the average interest rate
        avg_interest_rate = self.interest_rate_avg_calculator_service(assets)

        # Create the assets list entity
        assets_list = AssetsList(assets=assets, avg_interest_rate=avg_interest_rate)

        # Save the assets list to the repository
        return self.assets_list_repository.save(assets_list)
