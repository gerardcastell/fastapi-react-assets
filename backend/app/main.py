from fastapi import FastAPI

from app.contexts.assets.infrastructure.api.routes import router as assets_router
from app.contexts.health.infrastructure.api.routes import router as health_router
from app.core.containers.container import Container
from app.core.settings.config import config


class ContainerizedFastAPI(FastAPI):
    container: Container


def create_app():
    # Initialize the container
    container = Container()
    container.config.from_pydantic(config)

    # Create the app
    app = ContainerizedFastAPI()
    app.container = container

    # Wire the container
    container.wire(
        modules=[
            "app.contexts.assets.infrastructure.api.routes",
        ]
    )

    # Include the routers
    app.include_router(health_router)
    app.include_router(assets_router)

    return app


app = create_app()
