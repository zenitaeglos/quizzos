import pytest
from starlette.testclient import TestClient

from apipy.main import app


@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client


def test_main_page(test_app):
    response = test_app.get('/')
    assert response.status_code == 200
    assert response.json() == {'title': 'Welcome to Quizzos'}
