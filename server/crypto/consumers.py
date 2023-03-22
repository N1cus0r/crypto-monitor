import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from .utils import Tasks


class MarketsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await database_sync_to_async(Tasks.add_get_markets_task)(self.channel_name)

    async def disconnect(self, close_code):
        await database_sync_to_async(Tasks.remove_periodic_task)(self.channel_name)

    async def send_markets(self, event):
        markets = event.get("markets")
        await self.send(text_data=json.dumps(markets))


class WatchlistMarketsConsumer(MarketsConsumer):
    async def connect(self):
        await self.accept()
        user_id = self.scope["url_route"]["kwargs"]["user_id"]
        await database_sync_to_async(Tasks.add_get_watchlist_markets_task)(
            self.channel_name, user_id
        )
