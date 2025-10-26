import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="function")
def test_client() -> TestClient:
    print("Creating test client")
    return TestClient(app)
