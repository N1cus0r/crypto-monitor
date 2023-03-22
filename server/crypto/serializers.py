from rest_framework import serializers


class WatchlistIDSerializer(serializers.Serializer):
    currency_id = serializers.CharField(max_length=50)
