from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

base_url = "/health"


def test_read_main():
    response = client.get(f"{base_url}")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
