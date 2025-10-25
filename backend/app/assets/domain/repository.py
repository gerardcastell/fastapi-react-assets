from abc import ABC, abstractmethod
from typing import List

from .asset import Asset


class AssetRepository(ABC):
    @abstractmethod
    def get_average_interest_rate(self) -> float:
        pass

    @abstractmethod
    def save_list(self, assets: List[Asset]) -> List[Asset]:
        pass
