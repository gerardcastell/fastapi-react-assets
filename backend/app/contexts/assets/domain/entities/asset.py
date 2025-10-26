from typing import Annotated

from pydantic import Field

from app.contexts.shared.domain.entity import Entity


class Asset(Entity):
    interest_rate: Annotated[float, Field(description="The interest rate of the asset")]
