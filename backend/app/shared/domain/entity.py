import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class Entity(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.now)
