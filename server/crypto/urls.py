from django.urls import path
from .views import AddToWatchList, RemoveFromWatchList, GetWatchlistMarkets


app_name = "crypto"

urlpatterns = [
    path("add-to-watchlist/", AddToWatchList.as_view(), name="add_to_watchlist"),
    path(
        "remove-from-watchlist/",
        RemoveFromWatchList.as_view(),
        name="remove_from_watchlist",
    ),
    path(
        "get-watchlist-markets/",
        GetWatchlistMarkets.as_view(),
        name="get_watchlist_markets",
    ),
]
