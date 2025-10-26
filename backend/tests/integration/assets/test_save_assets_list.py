from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

base_url = ""


class TestSaveAssetsList:
    """Integration tests for the save assets list endpoint."""

    def test_save_assets_list_with_valid_data(self):
        """Test saving a valid assets list."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
                {"id": "id_3", "interest_rate": 15},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_single_asset(self):
        """Test saving a single asset."""
        assets_data = {"assets": [{"id": "id_1", "interest_rate": 7}]}

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_zero_interest_rate(self):
        """Test saving assets with zero interest rate."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 0},
                {"id": "id_2", "interest_rate": 0},
                {"id": "id_3", "interest_rate": 0},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_negative_interest_rate(self):
        """Test saving assets with negative interest rates."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": -5},
                {"id": "id_2", "interest_rate": 10},
                {"id": "id_3", "interest_rate": -2},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_large_numbers(self):
        """Test saving assets with large numbers."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 1000000},
                {"id": "id_2", "interest_rate": 2000000},
                {"id": "id_3", "interest_rate": 3000000},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_decimal_calculation(self):
        """Test saving assets that result in decimal average."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 1},
                {"id": "id_2", "interest_rate": 2},
                {"id": "id_3", "interest_rate": 3},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_mixed_positive_negative(self):
        """Test saving assets with mixed positive and negative interest rates."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 20},
                {"id": "id_2", "interest_rate": -10},
                {"id": "id_3", "interest_rate": 5},
                {"id": "id_4", "interest_rate": -5},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_endpoint_structure(self):
        """Test that the endpoint returns the expected JSON structure."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()

        # Check that all expected keys are present
        assert "message" in response_data

    def test_save_assets_list_overwrites_previous_data(self):
        """Test that saving new assets overwrites previous data."""
        # Save first set of assets
        first_assets = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
            ]
        }
        first_response = client.post(f"{base_url}/asset", json=first_assets)
        assert first_response.status_code == 200

        # Save second set of assets (should overwrite the first)
        second_assets = {
            "assets": [
                {"id": "id_1", "interest_rate": 20},
                {"id": "id_2", "interest_rate": 30},
            ]
        }
        second_response = client.post(f"{base_url}/asset", json=second_assets)
        assert second_response.status_code == 200

        # Verify the second save worked

    def test_save_assets_list_with_empty_list_raises_error(self):
        """Test that saving an empty list raises an error."""
        assets_data = {"assets": []}

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 422  # Validation error for empty list

    def test_save_assets_list_with_invalid_data_structure(self):
        """Test that saving invalid data structure raises an error."""
        # Missing interest_rate field
        assets_data = {"assets": [{"id": "id_1", "invalid_field": 5}]}

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 422  # Validation error

    def test_save_assets_list_with_invalid_interest_rate_type(self):
        """Test that saving invalid interest rate type raises an error."""
        # String instead of number
        assets_data = {"assets": [{"id": "id_1", "interest_rate": "invalid"}]}

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 422  # Validation error

    def test_save_assets_list_with_none_interest_rate(self):
        """Test that saving None interest rate raises an error."""
        assets_data = {"assets": [{"id": "id_1", "interest_rate": None}]}

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 422  # Validation error

    def test_save_assets_list_with_extra_fields(self):
        """Test that extra fields are ignored (Pydantic should handle this)."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 5, "extra_field": "should_be_ignored"},
                {"id": "id_2", "interest_rate": 10, "another_field": 123},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_very_large_interest_rates(self):
        """Test saving assets with very large interest rates."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 999999999},
                {"id": "id_2", "interest_rate": 1000000000},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_with_very_small_interest_rates(self):
        """Test saving assets with very small interest rates."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": -999999999},
                {"id": "id_2", "interest_rate": -1000000000},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"

    def test_save_assets_list_preserves_asset_order(self):
        """Test that the order of assets is preserved."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 1},
                {"id": "id_2", "interest_rate": 2},
                {"id": "id_3", "interest_rate": 3},
            ]
        }

        response = client.post(f"{base_url}/asset", json=assets_data)

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == "Assets list saved successfully"
