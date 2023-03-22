import jwt
import json
import requests
from django_celery_beat.models import IntervalSchedule, PeriodicTask

from core.settings import SECRET_KEY
from authentication.models import CustomUser


class Crypto:
    @staticmethod
    def get_markets():
        response = requests.get(
            "https://api.coingecko.com/api/v3/coins/markets"
            + "?vs_currency=usd"
            + "&order=market_cap_desc"
            + "&per_page=20"
            + "&page=1"
            + "&sparkline=false"
        )

        return response.json()

    @staticmethod
    def get_watchlist_markets(watchlist):
        response = requests.get(
            "https://api.coingecko.com/api/v3/coins/markets"
            + "?vs_currency=usd"
            + f"&ids={('%2C').join(watchlist)}"
            + "&order=market_cap_desc"
            + "&per_page=100"
            + "&page=1"
            + "&sparkline=false"
        )

        return response.json()


class Tasks:
    @staticmethod
    def add_get_markets_task(channel_name):
        interval = IntervalSchedule(every=30, period=IntervalSchedule.SECONDS)
        interval.save()

        PeriodicTask.objects.create(
            interval=interval,
            name=channel_name,
            task="crypto.tasks.get_markets",
            args=json.dumps([channel_name]),
        )

    @staticmethod
    def add_get_watchlist_markets_task(channel_name, user_id):
        user = CustomUser.objects.get(id=user_id)
        interval = IntervalSchedule(every=30, period=IntervalSchedule.SECONDS)
        interval.save()

        PeriodicTask.objects.create(
            interval=interval,
            name=channel_name,
            task="crypto.tasks.get_watchlist_markets",
            args=json.dumps([channel_name, user.watchlist]),
        )

    @staticmethod
    def remove_periodic_task(channel_name):
        task = PeriodicTask.objects.get(name=channel_name)
        task.interval.delete()
        task.delete()


class Token:
    @staticmethod
    def get_user_id(access_token):
        token_data = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])

        return token_data["user_id"]
