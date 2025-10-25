from abc import ABC, abstractmethod

from app.contexts.assets.domain.entities.assets_list import AssetsList


class AssetsListRepository(ABC):
    @abstractmethod
    def get_average_interest_rate(self) -> float:
        pass

    @abstractmethod
    def save(self, assets_list: AssetsList) -> AssetsList:
        pass
