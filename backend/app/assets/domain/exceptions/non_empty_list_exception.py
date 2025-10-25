from app.shared.domain.exception import BaseException


class NonEmptyListException(BaseException):
    """Exception raised when a list is empty."""

    message = "List cannot be empty"
