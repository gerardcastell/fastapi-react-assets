from app.shared.domain.error import DomainError


class InvalidListError(DomainError):
    """Error raised when a list is invalid."""

    def __init__(self, message: str = "List is invalid"):
        super().__init__(message)
