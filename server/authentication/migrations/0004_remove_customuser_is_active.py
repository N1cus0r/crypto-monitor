# Generated by Django 4.1.7 on 2023-03-19 21:06

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0003_alter_customuser_watchlist"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="is_active",
        ),
    ]
