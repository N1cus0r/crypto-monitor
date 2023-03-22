from celery import shared_task
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from authentication.models import CustomUser
from .utils import Crypto

channel_layer = get_channel_layer()


@shared_task
def get_markets(channel_name):
    markets = Crypto.get_markets()
    async_to_sync(channel_layer.send)(
        channel_name, {"type": "send_markets", "markets": markets}
    )
    return markets[0]["current_price"]


@shared_task
def get_watchlist_markets(channel_name, watchlist):
    markets = Crypto.get_watchlist_markets(watchlist)
    async_to_sync(channel_layer.send)(
        channel_name, {"type": "send_markets", "markets": markets}
    )
