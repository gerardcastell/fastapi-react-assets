from app.contexts.assets.domain.entities.assets_list import AssetsList
from app.contexts.assets.domain.repositories.assets_list_repository import (
    AssetsListRepository,
)
from app.contexts.shared.infrastructure.in_memory_database import InMemoryDatabase


class InMemoryAssetsListRepository(AssetsListRepository):
    storage_key = "assets_list"

    def __init__(self, persistence: InMemoryDatabase[AssetsList]):
        self.persistence = persistence

    def get_average_interest_rate(self) -> float | None:
        assets_list = self.persistence.get(self.storage_key)
        return assets_list.avg_interest_rate if assets_list else None

    def save(self, assets_list: AssetsList) -> AssetsList:
        self.persistence.set(self.storage_key, assets_list)
        return assets_list
