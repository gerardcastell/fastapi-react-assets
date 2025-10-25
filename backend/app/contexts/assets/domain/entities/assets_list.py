from typing import Annotated

from pydantic import Field

from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.shared.domain.entity import Entity


class AssetsList(Entity):
    assets: Annotated[list[Asset], Field(description="The list of assets stored")]
    avg_interest_rate: Annotated[
        float, Field(description="The average interest rate of the assets")
    ]
