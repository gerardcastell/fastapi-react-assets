from unittest.mock import Mock

import pytest

from app.contexts.assets.application.save_assets_list import SaveAssetsListService
from app.contexts.assets.domain.entities.asset import Asset
from app.contexts.assets.domain.entities.assets_list import AssetsList
from app.contexts.assets.domain.repositories.assets_list_repository import (
    AssetsListRepository,
)
from app.contexts.assets.domain.services.interest_rate_avg_calculator.errors import (
    EmptyListError,
    InvalidListError,
)
from app.contexts.assets.domain.services.interest_rate_avg_calculator.service import (
    InterestRateAvgCalculatorService,
)


class TestSaveAssetsListService:
    def setup_method(self):
        """Set up test fixtures before each test method."""
        self.mock_repository = Mock(spec=AssetsListRepository)
        self.mock_calculator = Mock(wraps=InterestRateAvgCalculatorService())
        self.service = SaveAssetsListService(
            assets_list_repository=self.mock_repository,
            interest_rate_avg_calculator_service=self.mock_calculator,
        )

    def test_save_assets_list_success(self):
        """Test successful save of assets list with valid data."""
        # Arrange
        assets = [
            Asset(id="id_1", interest_rate=5),
            Asset(id="id_2", interest_rate=10),
            Asset(id="id_3", interest_rate=15),
        ]
        expected_avg_rate = 10.0  # (5 + 10 + 15) / 3 = 10.0
        expected_assets_list = AssetsList(
            assets=[
                Asset(id="id_1", interest_rate=5),
                Asset(id="id_2", interest_rate=10),
                Asset(id="id_3", interest_rate=15),
            ],
            avg_interest_rate=expected_avg_rate,
        )

        self.mock_repository.save.return_value = expected_assets_list

        # Act
        result = self.service(assets)

        # Assert
        assert result == expected_assets_list
        self.mock_calculator.assert_called_once()
        self.mock_repository.save.assert_called_once()

        # Verify the calculator was called with Asset entities
        called_assets = self.mock_calculator.call_args[0][0]
        assert len(called_assets) == 3
        assert all(isinstance(asset, Asset) for asset in called_assets)
        assert called_assets[0].interest_rate == 5
        assert called_assets[1].interest_rate == 10
        assert called_assets[2].interest_rate == 15

    def test_save_assets_list_empty_list(self):
        """Test handling of empty assets list (should raise EmptyListError)."""
        # Arrange
        assets = []

        # Act & Assert
        with pytest.raises(EmptyListError):
            self.service(assets)

        # Verify calculator was called but repository was not
        self.mock_calculator.assert_called_once()
        self.mock_repository.save.assert_not_called()

    def test_save_assets_list_none_list(self):
        """Test handling of None assets list (should raise InvalidListError)."""
        # Arrange
        assets = None

        # Act & Assert
        with pytest.raises(InvalidListError):
            self.service(assets)

        # Verify calculator was called (it handles the None check and raises the exception)
        # but repository was not called
        self.mock_calculator.assert_called_once_with(assets)
        self.mock_repository.save.assert_not_called()

    def test_save_assets_list_repository_called_with_correct_parameters(self):
        """Test that repository save method is called with correct parameters."""
        # Arrange
        assets = [Asset(id="id_1", interest_rate=8), Asset(id="id_2", interest_rate=12)]
        expected_avg_rate = 10.0  # (8 + 12) / 2 = 10.0

        self.mock_repository.save.return_value = Mock()

        # Act
        self.service(assets)

        # Assert
        self.mock_repository.save.assert_called_once()
        saved_assets_list = self.mock_repository.save.call_args[0][0]

        assert isinstance(saved_assets_list, AssetsList)
        assert saved_assets_list.avg_interest_rate == expected_avg_rate
        assert len(saved_assets_list.assets) == 2
        assert all(isinstance(asset, Asset) for asset in saved_assets_list.assets)

    def test_save_assets_list_calculator_called_with_asset_entities(self):
        """Test that interest rate calculator is called with correct parameters."""
        # Arrange
        assets = [Asset(id="id_1", interest_rate=3), Asset(id="id_2", interest_rate=7)]

        self.mock_repository.save.return_value = Mock()

        # Act
        self.service(assets)

        # Assert
        self.mock_calculator.assert_called_once()
        called_assets = self.mock_calculator.call_args[0][0]

        assert len(called_assets) == 2
        assert all(isinstance(asset, Asset) for asset in called_assets)
        assert called_assets[0].interest_rate == 3
        assert called_assets[1].interest_rate == 7

    def test_save_assets_list_single_asset(self):
        """Test save with a single asset."""
        # Arrange
        assets = [Asset(id="id_1", interest_rate=25)]
        expected_avg_rate = 25.0  # Single asset, so avg = 25.0
        expected_assets_list = AssetsList(
            assets=[Asset(id="id_1", interest_rate=25)],
            avg_interest_rate=expected_avg_rate,
        )

        self.mock_repository.save.return_value = expected_assets_list

        # Act
        result = self.service(assets)

        # Assert
        assert result == expected_assets_list
        self.mock_calculator.assert_called_once()
        self.mock_repository.save.assert_called_once()

    def test_save_assets_list_with_zero_interest_rate(self):
        """Test save with assets having zero interest rate."""
        # Arrange
        assets = [Asset(id="id_1", interest_rate=0), Asset(id="id_2", interest_rate=0)]
        expected_avg_rate = 0.0  # (0 + 0) / 2 = 0.0
        expected_assets_list = AssetsList(
            assets=[
                Asset(id="id_1", interest_rate=0),
                Asset(id="id_2", interest_rate=0),
            ],
            avg_interest_rate=expected_avg_rate,
        )

        self.mock_repository.save.return_value = expected_assets_list

        # Act
        result = self.service(assets)

        # Assert
        assert result == expected_assets_list
        self.mock_calculator.assert_called_once()
        self.mock_repository.save.assert_called_once()

    def test_save_assets_list_asset_creation_from_raw_data(self):
        """Test that Asset entities are properly created from raw data."""
        # Arrange
        assets = [
            Asset(id="id_1", interest_rate=1),
            Asset(id="id_2", interest_rate=2),
            Asset(id="id_3", interest_rate=3),
        ]

        self.mock_repository.save.return_value = Mock()

        # Act
        self.service(assets=assets)

        # Assert
        # Verify that the calculator was called with properly created Asset entities
        called_assets = self.mock_calculator.call_args[0][0]
        assert len(called_assets) == 3

        # Verify each asset has the correct interest rate
        for i, asset in enumerate(called_assets):
            assert isinstance(asset, Asset)
            assert asset.interest_rate == i + 1
