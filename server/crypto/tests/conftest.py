import pytest
import random
from faker import Faker

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


from authentication.models import CustomUser


@pytest.fixture(scope="session")
def fake():
    return Faker()


@pytest.fixture(scope="session")
def client():
    return APIClient()


@pytest.fixture(scope="session")
def currency_ids():
    return ["bitcoin", "ethereum", "tether", "binancecoin", "usd-coin", "ripple"]


@pytest.fixture
def currency_id(currency_ids):
    return random.choice(currency_ids)


@pytest.fixture
def user():
    return CustomUser.objects.create_user(email="test@mail.ru", password="test")


@pytest.fixture
def authenticated_user(user):
    access_token = RefreshToken.for_user(user).access_token

    return {"access_token": access_token, "user": user}
