import jwt

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from authentication.models import CustomUser
from .serializers import WatchlistIDSerializer
from .utils import Token, Crypto


class AddToWatchList(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = WatchlistIDSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            user_id = Token.get_user_id(access_token)
            user = CustomUser.objects.get(id=user_id)
            user.watchlist.append(serializer.data.get("currency_id"))
            user.save(update_fields=["watchlist"])
            return Response({}, status=status.HTTP_200_OK)


class RemoveFromWatchList(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        serializer = WatchlistIDSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            access_token = request.auth.token
            user_id = Token.get_user_id(access_token)
            user = CustomUser.objects.get(id=user_id)
            user.watchlist.remove(serializer.data.get("currency_id"))
            user.save(update_fields=["watchlist"])
            return Response({}, status=status.HTTP_200_OK)


class GetWatchlistMarkets(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        access_token = request.auth.token
        user_id = Token.get_user_id(access_token)
        user = CustomUser.objects.get(id=user_id)
        watchlist_markets = Crypto.get_watchlist_markets(user.watchlist)
        return Response(watchlist_markets, status=status.HTTP_200_OK)
