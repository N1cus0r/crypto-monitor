from rest_framework import serializers


class WatchlistIDSerializer(serializers.Serializer):
    currency_id = serializers.CharField(max_length=50)


class WatchlistSerializer(serializers.Serializer):
    watchlist = serializers.ListField(child=serializers.CharField(max_length=50))
