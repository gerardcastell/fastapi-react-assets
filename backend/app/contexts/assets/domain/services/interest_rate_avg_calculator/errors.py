from app.contexts.shared.domain.error import DomainError


class EmptyListError(DomainError):
    """Error raised when a list is empty."""

    def __init__(self, message: str = "Empty list is not a valid list"):
        super().__init__(message)


class InvalidListError(DomainError):
    """Error raised when a list is invalid."""

    def __init__(self, message: str = "A valid assets list is required"):
        super().__init__(message)
