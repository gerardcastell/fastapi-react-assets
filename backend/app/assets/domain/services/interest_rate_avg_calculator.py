from typing import List

from app.assets.domain.entities.asset import Asset
from app.assets.domain.errors.invalid_list_error import InvalidListError


class InterestRateAvgCalculatorService:
    def __call__(self, assets: List[Asset]) -> float:
        if not assets or len(assets) == 0:
            raise InvalidListError()
        return sum(asset.interest_rate for asset in assets) / len(assets)
