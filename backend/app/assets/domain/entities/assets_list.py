from typing import Annotated, List

from pydantic import Field

from app.assets.domain.entities.asset import Asset
from app.shared.domain.entity import Entity


class AssetsList(Entity):
    assets: Annotated[List[Asset], Field(description="The list of assets stored")]
    avg_interest_rate: Annotated[
        float, Field(description="The average interest rate of the assets")
    ]
