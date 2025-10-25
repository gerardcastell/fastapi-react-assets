from typing import Generic, TypeVar

T = TypeVar("T")


class InMemoryDatabase(Generic[T]):
    def __init__(self):
        self.data: dict[str, T] = {}

    def get(self, key: str) -> T | None:
        return self.data.get(key)

    def set(self, key: str, value: T) -> None:
        self.data[key] = value
