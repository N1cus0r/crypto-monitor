import pytest
import random

from django.urls import reverse

from authentication.models import CustomUser


@pytest.mark.django_db
def test_add_to_watchlist_view(client, authenticated_user, currency_id):
    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.put(
        path=reverse("crypto:add_to_watchlist"), data={"currency_id": currency_id}
    )

    assert response.status_code == 200

    user_watchlist = CustomUser.objects.get(id=authenticated_user["user"].id).watchlist

    assert len(user_watchlist) == 1

    assert currency_id in user_watchlist


@pytest.mark.django_db
def test_remove_from_watchlist_view(client, authenticated_user, currency_id):
    user = authenticated_user["user"]
    user.watchlist.append(currency_id)
    user.save()

    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )

    response = client.put(
        path=reverse("crypto:remove_from_watchlist"), data={"currency_id": currency_id}
    )

    assert response.status_code == 200

    assert len(CustomUser.objects.get(id=user.id).watchlist) == 0


@pytest.mark.django_db
def test_get_watchlist_markets_view(client, authenticated_user, currency_ids):
    watchlist = random.sample(currency_ids, k=3)
    user = authenticated_user['user']
    user.watchlist.extend(watchlist)
    user.save()

    client.credentials(
        HTTP_AUTHORIZATION="Bearer " + str(authenticated_user["access_token"])
    )
    
    response = client.get(
        path=reverse('crypto:get_watchlist_markets')
    )

    assert response.status_code == 200

    assert len(response.json()) == len(watchlist)