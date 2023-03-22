import pytest

from faker import Faker
from authentication.models import CustomUser


@pytest.mark.django_db
def test_create_user(fake):
    email = fake.email()
    password = fake.password()

    user = CustomUser.objects.create_user(email=email, password=password)

    assert CustomUser.objects.count() == 1

    assert str(user) == email

    assert user.check_password(password) is True


@pytest.mark.django_db
def test_create_superuser(fake):
    email = fake.email()
    password = fake.password()

    superuser = CustomUser.objects.create_superuser(email=email, password=password)

    assert CustomUser.objects.count() == 1

    assert str(superuser) == email

    assert superuser.check_password(password) is True
