from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

base_url = ""


class TestGetAverageInterestRate:
    """Integration tests for the get average interest rate endpoint."""

    def test_get_average_interest_rate_when_no_assets_exist(
        self, test_client: TestClient
    ):
        """Test getting average interest rate when no assets are stored."""
        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] is None

    def test_get_average_interest_rate_after_saving_assets(
        self, test_client: TestClient
    ):
        """Test getting average interest rate after saving assets."""
        # First, save some assets
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
                {"id": "id_3", "interest_rate": 15},
            ]
        }

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        # Then get the average interest rate
        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] == 10.0  # (5 + 10 + 15) / 3 = 10

    def test_get_average_interest_rate_with_single_asset(self, test_client: TestClient):
        """Test getting average interest rate with a single asset."""
        # Save a single asset
        assets_data = {"assets": [{"id": "id_1", "interest_rate": 7}]}

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        # Get the average interest rate
        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] == 7.0

    def test_get_average_interest_rate_with_zero_interest_rate(
        self, test_client: TestClient
    ):
        """Test getting average interest rate with assets having zero interest rate."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 0},
                {"id": "id_2", "interest_rate": 0},
                {"id": "id_3", "interest_rate": 0},
            ]
        }

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] == 0.0

    def test_get_average_interest_rate_with_negative_interest_rate(
        self, test_client: TestClient
    ):
        """Test getting average interest rate with negative interest rates."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": -5},
                {"id": "id_2", "interest_rate": 10},
                {"id": "id_3", "interest_rate": -2},
            ]
        }

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] == 1.0  # (-5 + 10 + -2) / 3 = 1

    def test_get_average_interest_rate_with_large_numbers(
        self, test_client: TestClient
    ):
        """Test getting average interest rate with large numbers."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 1000000},
                {"id": "id_2", "interest_rate": 2000000},
                {"id": "id_3", "interest_rate": 3000000},
            ]
        }

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert (
            response_data["average_interest_rate"] == 2000000.0
        )  # (1000000 + 2000000 + 3000000) / 3 = 2000000

    def test_get_average_interest_rate_with_decimal_calculation(
        self, test_client: TestClient
    ):
        """Test getting average interest rate that results in a decimal."""
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 1},
                {"id": "id_2", "interest_rate": 2},
                {"id": "id_3", "interest_rate": 3},
            ]
        }

        save_response = test_client.post(f"{base_url}/asset", json=assets_data)
        assert save_response.status_code == 200

        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        assert response_data["average_interest_rate"] == 2.0  # (1 + 2 + 3) / 3 = 2.0

    def test_get_average_interest_rate_endpoint_structure(
        self, test_client: TestClient
    ):
        """Test that the endpoint returns the expected JSON structure."""
        # Save some assets first
        assets_data = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
            ]
        }
        test_client.post(f"{base_url}/asset", json=assets_data)

        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()

        # Check that all expected keys are present
        assert "average_interest_rate" in response_data

        # Check that the average_interest_rate is a number
        assert isinstance(response_data["average_interest_rate"], (int, float))

    def test_get_average_interest_rate_after_multiple_saves(
        self, test_client: TestClient
    ):
        """Test that the latest save overwrites previous data."""
        # Save first set of assets
        first_assets = {
            "assets": [
                {"id": "id_1", "interest_rate": 5},
                {"id": "id_2", "interest_rate": 10},
            ]
        }
        test_client.post(f"{base_url}/asset", json=first_assets)

        # Save second set of assets (should overwrite the first)
        second_assets = {
            "assets": [
                {"id": "id_1", "interest_rate": 20},
                {"id": "id_2", "interest_rate": 30},
            ]
        }
        test_client.post(f"{base_url}/asset", json=second_assets)

        # Get the average interest rate
        response = test_client.get(f"{base_url}/interest_rate")

        assert response.status_code == 200
        response_data = response.json()
        # Should be the average of the second set: (20 + 30) / 2 = 25
        assert response_data["average_interest_rate"] == 25.0
