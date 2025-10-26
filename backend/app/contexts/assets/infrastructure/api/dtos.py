from typing import Annotated

from pydantic import BaseModel, Field

# Post Asset Request


class AssetDto(BaseModel):
    id: Annotated[str, Field(description="The id of the asset")]
    interest_rate: Annotated[float, Field(description="The interest rate of the asset")]


class SaveAssetsListRequest(BaseModel):
    assets: Annotated[list[AssetDto], Field(description="The list of assets to save")]


# Get Average Interest Rate Response


class GetAverageInterestRateResponse(BaseModel):
    average_interest_rate: Annotated[
        float | None, Field(description="The average interest rate of the assets")
    ]
