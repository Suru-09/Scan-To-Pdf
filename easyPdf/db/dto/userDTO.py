from rest_framework import serializers
from django.contrib.auth.models import User


class UserDto(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'password', 'last_name', 'username', 'email'
        )
