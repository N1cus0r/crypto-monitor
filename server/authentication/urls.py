from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import CustomTokenObtainPairView, CreateUserView

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create_user"),
    path("jwt/login/", CustomTokenObtainPairView.as_view(), name="obtain_tokens"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="refresh_tokens"),
]
