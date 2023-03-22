import pytest

from rest_framework.test import APIClient
from faker import Faker

from authentication.models import CustomUser


@pytest.fixture(scope="session")
def fake():
    return Faker()


@pytest.fixture(scope="session")
def client():
    return APIClient()


@pytest.fixture()
def user():
    return CustomUser.objects.create_user(email="test@mail.ru", password="test")
