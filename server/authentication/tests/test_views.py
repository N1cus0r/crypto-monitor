import pytest

from django.urls import reverse


@pytest.mark.django_db
def test_register_user(client, fake):
    response = client.post(
        path=reverse("users:create_user"),
        data={"email": fake.email(), "password": fake.password()},
    )

    assert response.status_code == 201


@pytest.mark.django_db
def test_login_user(client, user):
    response = client.post(
        path=reverse("users:obtain_tokens"),
        data={
            "email": "test@mail.ru",
            "password": "test",
        },
    )

    assert response.status_code == 200
