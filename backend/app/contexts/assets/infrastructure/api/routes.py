from dependency_injector.wiring import Provide, inject
from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError

from app.contexts.assets.application.get_average_interest_rate import (
    GetAverageInterestRateService,
)
from app.contexts.assets.application.save_assets_list import SaveAssetsListService
from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.assets.domain.services.interest_rate_avg_calculator.errors import (
    EmptyListError,
    InvalidListError,
)
from app.contexts.assets.infrastructure.api.dtos import (
    GetAverageInterestRateResponse,
    SaveAssetsListRequest,
)
from app.core.containers.container import Container

router = APIRouter(tags=["assets"])


@router.post("/asset")
@inject
async def save_assets_list(
    payload: SaveAssetsListRequest,
    save_assets_list_service: SaveAssetsListService = Depends(
        Provide[Container.assets_list_services.save_assets_list_service]
    ),
):
    try:
        save_assets_list_service(
            assets=[
                Asset(id=asset.id, interest_rate=asset.interest_rate)
                for asset in payload.assets
            ]
        )
        return {"message": "Assets list saved successfully"}
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except EmptyListError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except InvalidListError as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.get("/interest_rate")
@inject
async def get_average_interest_rate(
    get_average_interest_rate_service: GetAverageInterestRateService = Depends(
        Provide[Container.assets_list_services.get_average_interest_rate_service]
    ),
) -> GetAverageInterestRateResponse:
    average_interest_rate = get_average_interest_rate_service()
    return GetAverageInterestRateResponse(average_interest_rate=average_interest_rate)
