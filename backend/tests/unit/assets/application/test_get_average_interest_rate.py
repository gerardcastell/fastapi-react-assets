from unittest.mock import Mock

import pytest

from app.contexts.assets.application.get_average_interest_rate import (
    GetAverageInterestRateService,
)
from app.contexts.assets.domain.repositories.assets_list_repository import (
    AssetsListRepository,
)


class TestGetAverageInterestRateService:
    def setup_method(self):
        """Set up test fixtures before each test method."""
        self.mock_repository = Mock(spec=AssetsListRepository)
        self.service = GetAverageInterestRateService(
            assets_list_repository=self.mock_repository,
        )

    def test_get_average_interest_rate_success(self):
        """Test successful retrieval of average interest rate."""
        # Arrange
        expected_avg_rate = 10.5
        self.mock_repository.get_average_interest_rate.return_value = expected_avg_rate

        # Act
        result = self.service()

        # Assert
        assert result == expected_avg_rate
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_repository_called(self):
        """Test that repository get_average_interest_rate method is called."""
        # Arrange
        self.mock_repository.get_average_interest_rate.return_value = 7.25

        # Act
        self.service()

        # Assert
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_return_value(self):
        """Test that the service returns the value from repository."""
        # Arrange
        repository_value = 15.75
        self.mock_repository.get_average_interest_rate.return_value = repository_value

        # Act
        result = self.service()

        # Assert
        assert result == repository_value
        assert isinstance(result, float)

    def test_get_average_interest_rate_zero_value(self):
        """Test handling of zero average interest rate."""
        # Arrange
        expected_avg_rate = 0.0
        self.mock_repository.get_average_interest_rate.return_value = expected_avg_rate

        # Act
        result = self.service()

        # Assert
        assert result == expected_avg_rate
        assert isinstance(result, float)
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_negative_value(self):
        """Test handling of negative average interest rate."""
        # Arrange
        expected_avg_rate = -5.5
        self.mock_repository.get_average_interest_rate.return_value = expected_avg_rate

        # Act
        result = self.service()

        # Assert
        assert result == expected_avg_rate
        assert isinstance(result, float)
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_high_precision_value(self):
        """Test handling of high precision average interest rate."""
        # Arrange
        expected_avg_rate = 12.3456789
        self.mock_repository.get_average_interest_rate.return_value = expected_avg_rate

        # Act
        result = self.service()

        # Assert
        assert result == expected_avg_rate
        assert isinstance(result, float)
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_large_value(self):
        """Test handling of large average interest rate value."""
        # Arrange
        expected_avg_rate = 999.99
        self.mock_repository.get_average_interest_rate.return_value = expected_avg_rate

        # Act
        result = self.service()

        # Assert
        assert result == expected_avg_rate
        assert isinstance(result, float)
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_repository_exception(self):
        """Test handling of repository exceptions."""
        # Arrange
        self.mock_repository.get_average_interest_rate.side_effect = Exception(
            "Repository error"
        )

        # Act & Assert
        with pytest.raises(Exception, match="Repository error"):
            self.service()

        # Verify repository was called
        self.mock_repository.get_average_interest_rate.assert_called_once()

    def test_get_average_interest_rate_multiple_calls(self):
        """Test that multiple calls work correctly."""
        # Arrange
        first_call_value = 5.5
        second_call_value = 8.25
        self.mock_repository.get_average_interest_rate.side_effect = [
            first_call_value,
            second_call_value,
        ]

        # Act
        first_result = self.service()
        second_result = self.service()

        # Assert
        assert first_result == first_call_value
        assert second_result == second_call_value
        assert self.mock_repository.get_average_interest_rate.call_count == 2

    def test_get_average_interest_rate_no_parameters(self):
        """Test that the service method takes no parameters."""
        # Arrange
        self.mock_repository.get_average_interest_rate.return_value = 3.14

        # Act
        result = self.service()

        # Assert
        assert result == 3.14
        # Verify the repository method was called with no arguments
        self.mock_repository.get_average_interest_rate.assert_called_once_with()
