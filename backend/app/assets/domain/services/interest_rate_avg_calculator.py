from typing import List

from app.assets.domain.asset import Asset
from app.assets.domain.exceptions.non_empty_list_exception import NonEmptyListException


class InterestRateAvgCalculator:
    def __call__(self, assets: List[Asset]) -> float:
        if not assets or len(assets) == 0:
            raise NonEmptyListException()
        return sum(asset.interest_rate for asset in assets) / len(assets)
