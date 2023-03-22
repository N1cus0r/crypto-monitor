from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("email not provided for creating user")
        if not password:
            raise ValueError("password not provided for creating user")

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    watchlist = ArrayField(
        base_field=models.CharField(max_length=50, unique=True),
        blank=True,
        default=list,
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email
