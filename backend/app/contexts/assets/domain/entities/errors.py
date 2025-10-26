from app.contexts.shared.domain.error import DomainError


class DuplicateAssetIdError(DomainError):
    """Error raised when an assets list contains duplicate asset IDs."""

    def __init__(self, duplicate_ids: list[str]):
        ids_str = ", ".join(duplicate_ids)
        message = f"Duplicate asset IDs found: {ids_str}"
        super().__init__(message)
        self.duplicate_ids = duplicate_ids
