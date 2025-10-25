from typing import List

from app.assets.domain.entities.asset import Asset
from app.assets.domain.services.interest_rate_avg_calculator.errors import (
    EmptyListError,
    InvalidListError,
)


class InterestRateAvgCalculatorService:
    def __call__(self, assets: List[Asset]) -> float:
        if assets is None:
            raise InvalidListError()
        if len(assets) == 0:
            raise EmptyListError()
        return sum(asset.interest_rate for asset in assets) / len(assets)
