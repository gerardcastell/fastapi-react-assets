from fastapi import FastAPI

from app.health.infrastructure.api.routes import router as health_router

app = FastAPI()

app.include_router(health_router)
