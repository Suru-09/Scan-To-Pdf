from rest_framework import serializers
from ..models import IMG


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'id', 'name', 'image', 'order_no', 'size'
        )


class ImageIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMG
        fields = (
            'id'
        )