from typing import Annotated

from pydantic import Field, model_validator

from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.assets.domain.entities.errors import DuplicateAssetIdError
from app.contexts.shared.domain.entity import Entity


class AssetsList(Entity):
    assets: Annotated[list[Asset], Field(description="The list of assets stored")]
    avg_interest_rate: Annotated[
        float, Field(description="The average interest rate of the assets")
    ]

    @model_validator(mode="after")
    def validate_unique_asset_ids(self) -> "AssetsList":
        """Validate that all asset IDs in the list are unique."""
        asset_ids = [asset.id for asset in self.assets]
        seen = set()
        duplicates = []

        for asset_id in asset_ids:
            if asset_id in seen:
                if asset_id not in duplicates:
                    duplicates.append(asset_id)
            else:
                seen.add(asset_id)

        if duplicates:
            raise DuplicateAssetIdError(duplicates)

        return self
