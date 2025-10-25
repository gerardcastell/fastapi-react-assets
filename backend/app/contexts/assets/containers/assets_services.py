from dependency_injector import containers, providers

from app.contexts.assets.application.get_average_interest_rate import (
    GetAverageInterestRateService,
)
from app.contexts.assets.application.save_assets_list import SaveAssetsListService
from app.contexts.assets.domain.entities.assets_list import AssetsList
from app.contexts.assets.domain.services.interest_rate_avg_calculator.service import (
    InterestRateAvgCalculatorService,
)
from app.contexts.assets.infrastructure.persistence.assets_list.in_memory_repository import (
    InMemoryAssetsListRepository,
)
from app.contexts.shared.infrastructure.in_memory_database import InMemoryDatabase


class AssetsServicesContainer(containers.DeclarativeContainer):
    # Dependencies
    persistence = providers.Dependency[InMemoryDatabase[AssetsList]]()

    assets_list_repository = providers.Factory(
        InMemoryAssetsListRepository, persistence=persistence
    )

    interest_rate_avg_calculator_service = providers.Factory(
        InterestRateAvgCalculatorService
    )

    # Services
    save_assets_list_service = providers.Factory(
        SaveAssetsListService,
        assets_list_repository=assets_list_repository,
        interest_rate_avg_calculator_service=interest_rate_avg_calculator_service,
    )
    get_average_interest_rate_service = providers.Factory(
        GetAverageInterestRateService, persistence=persistence
    )
