from django.urls import path
from .views import AddToWatchList, RemoveFromWatchList, GetWatchlistMarkets

urlpatterns = [
    path("add-to-watchlist/", AddToWatchList.as_view()),
    path("remove-from-watchlist/", RemoveFromWatchList.as_view()),
    path("get-watchlist-markets/", GetWatchlistMarkets.as_view()),
]
