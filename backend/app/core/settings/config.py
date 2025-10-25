from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Config(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_title: str = Field(default="Assets Backend API")
    debug: bool = Field(default=False)
    log_level: str = Field(default="INFO")
    environment: str = Field()  # development, production, testing


config = Config()  # type: ignore
