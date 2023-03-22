import random
import pytest

from django_celery_beat.models import IntervalSchedule, PeriodicTask

from crypto.utils import Crypto, Tasks


def test_get_markets():
    json = Crypto.get_markets()

    assert len(json) == 20


def test_get_watchlist_markets(currency_ids):
    watchlist = random.sample(currency_ids, k=3)

    print(watchlist)
    json = Crypto.get_watchlist_markets(watchlist)

    assert len(json) == 3


@pytest.mark.django_db
def test_add_get_markets_task(fake):
    channel_name = fake.password(length=10)

    Tasks.add_get_markets_task(channel_name)

    assert PeriodicTask.objects.count() == 1

    assert PeriodicTask.objects.filter(name=channel_name).exists()

    Tasks.remove_periodic_task(channel_name)

    assert PeriodicTask.objects.count() == 0


@pytest.mark.django_db
def test_add_get_watchlist_markets_task(fake, user):
    channel_name = fake.password(length=10)

    Tasks.add_get_watchlist_markets_task(channel_name, user.id)

    assert PeriodicTask.objects.count() == 1

    assert PeriodicTask.objects.filter(name=channel_name).exists()

    Tasks.remove_periodic_task(channel_name)

    assert PeriodicTask.objects.count() == 0
