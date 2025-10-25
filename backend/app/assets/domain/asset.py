from typing import Annotated

from pydantic import Field

from app.shared.domain.entity import Entity


class Asset(Entity):
    interest_rate: Annotated[int, Field(description="The interest rate of the asset")]
