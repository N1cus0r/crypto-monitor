from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password

from .models import CustomUser


class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["user_id"] = user.id
        token["email"] = user.email
        token["watchlist"] = user.watchlist

        return token


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["email", "password"]

    def validate(self, attrs):
        email = attrs.get("email")
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email already exists")

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)

        return user
