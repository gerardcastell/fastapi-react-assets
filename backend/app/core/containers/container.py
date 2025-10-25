from dependency_injector import containers, providers

from app.contexts.assets.containers.assets_services import AssetsServicesContainer
from app.contexts.assets.domain.entities.assets_list import AssetsList
from app.contexts.shared.infrastructure.in_memory_database import InMemoryDatabase


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    assets_list_in_memory_database = providers.Singleton(InMemoryDatabase[AssetsList])

    assets_list_services = providers.Container(
        AssetsServicesContainer, persistence=assets_list_in_memory_database
    )
