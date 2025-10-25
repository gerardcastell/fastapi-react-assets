from app.contexts.assets.domain.repositories.assets_list_repository import (
    AssetsListRepository,
)


class GetAverageInterestRateService:
    def __init__(self, assets_list_repository: AssetsListRepository):
        self.assets_list_repository = assets_list_repository

    def __call__(self) -> float | None:
        return self.assets_list_repository.get_average_interest_rate()
