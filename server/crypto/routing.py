from django.urls import path

from .consumers import MarketsConsumer, WatchlistMarketsConsumer

ws_urlpatterns = [
    path("ws/markets/", MarketsConsumer.as_asgi()),
    path("ws/watchlist/<int:user_id>/", WatchlistMarketsConsumer.as_asgi()),
]
