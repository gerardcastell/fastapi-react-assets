import pytest

from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.assets.domain.services.interest_rate_avg_calculator.errors import (
    InvalidListError,
)
from app.contexts.assets.domain.services.interest_rate_avg_calculator.service import (
    InterestRateAvgCalculatorService,
)


class TestInterestRateAvgCalculatorService:
    """Test cases for InterestRateAvgCalculatorService."""

    def setup_method(self):
        self.calculator = InterestRateAvgCalculatorService()

    def test_calculate_average_with_multiple_assets(self):
        """Test calculating average interest rate with multiple assets."""
        # Arrange
        assets = [
            Asset(interest_rate=5),
            Asset(interest_rate=10),
            Asset(interest_rate=15),
        ]

        # Act
        result = self.calculator(assets)

        # Assert
        expected_average = (5 + 10 + 15) / 3
        assert result == expected_average

    def test_calculate_average_with_single_asset(self):
        """Test calculating average interest rate with single asset."""
        # Arrange
        assets = [Asset(interest_rate=7)]

        # Act
        result = self.calculator(assets)

        # Assert
        assert result == 7.0

    def test_calculate_average_with_zero_interest_rates(self):
        """Test calculating average with assets having zero interest rates."""
        # Arrange
        assets = [
            Asset(interest_rate=0),
            Asset(interest_rate=0),
            Asset(interest_rate=0),
        ]

        # Act
        result = self.calculator(assets)

        # Assert
        assert result == 0.0

    def test_calculate_average_with_negative_interest_rates(self):
        """Test calculating average with negative interest rates."""
        # Arrange
        assets = [
            Asset(interest_rate=-5),
            Asset(interest_rate=10),
            Asset(interest_rate=-2),
        ]

        # Act
        result = self.calculator(assets)

        # Assert
        expected_average = (-5 + 10 + (-2)) / 3
        assert result == expected_average
        assert result == 1.0

    def test_calculate_average_with_decimal_result(self):
        """Test calculating average that results in decimal value."""
        # Arrange
        assets = [
            Asset(interest_rate=1),
            Asset(interest_rate=2),
        ]

        # Act
        result = self.calculator(assets)

        # Assert
        expected_average = (1 + 2) / 2
        assert result == expected_average
        assert result == 1.5

    def test_raises_invalid_list_error_with_empty_list(self):
        """Test that InvalidListError is raised when empty list is provided."""
        # Arrange
        assets = []

        # Act & Assert
        with pytest.raises(InvalidListError) as exc_info:
            self.calculator(assets)

        assert str(exc_info.value) == "Empty list is not a valid list"

    def test_raises_invalid_list_error_with_none(self):
        """Test that InvalidListError is raised when None is provided."""
        # Arrange
        assets = None

        # Act & Assert
        with pytest.raises(InvalidListError) as exc_info:
            self.calculator(assets)

        assert str(exc_info.value) == "A valid assets list is required"
