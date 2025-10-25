from fastapi import FastAPI

from app.contexts.health.infrastructure.api.routes import router as health_router
from app.core.containers.container import Container
from app.core.settings.config import config


class ContainerizedFastAPI(FastAPI):
    container: Container


app = ContainerizedFastAPI()

# Initialize the container
container = Container()
container.config.from_pydantic(config)


app.include_router(health_router)
