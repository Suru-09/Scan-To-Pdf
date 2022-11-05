from rest_framework import serializers
from django.contrib.auth.models import User


class UserDto(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name', 'last_name' , 'username', 'password', 'email'
        )


class UserLoginDto(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
             'username', 'password'
        )
